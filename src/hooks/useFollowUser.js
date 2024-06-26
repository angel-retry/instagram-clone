import { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import useUserProfileStore from '../store/userProfileStore'

const useFollowUser = (userId) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const { user, setUser } = useAuthStore()
  const { userProfile, setUserProfile } = useUserProfileStore()
  const showToast = useShowToast()

  const handleFollowUser = async () => {
    if (!userId) return showToast('Error', 'there is no User to follow', 'error')
    setIsUpdating(true)
    try {
      const currentUserRef = doc(firestore, 'users', user.uid)
      const userToFollowOrUnFollowRef = doc(firestore, 'users', userId)

      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
      })

      await updateDoc(userToFollowOrUnFollowRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
      })

      if (isFollowing) {
        // unfollow
        setUser({
          ...user,
          following: user.following.filter(uid => uid !== userId)
        })

        if (userProfile) {
          if (userProfile.uid === user.uid) {
            setUserProfile({
              ...userProfile,
              following: userProfile.following.filter(uid => uid !== userId)
            })
          } else {
            setUserProfile({
              ...userProfile,
              followers: userProfile.followers.filter(uid => uid !== user.uid)
            })
          }
        }

        localStorage.setItem('user-info', JSON.stringify({
          ...user,
          following: user.following.filter(uid => uid !== userId)
        }))

        setIsFollowing(false)
      } else {
        //  follow
        setUser({
          ...user,
          following: [...user.following, userId]
        })

        if (userProfile) {
          if (userProfile.uid === user.uid) {
            console.log('authUser', user.uid)
            console.log('userId', userId)
            setUserProfile({
              ...userProfile,
              following: [...user.following, userId]
            })
          } else {
            setUserProfile({
              ...userProfile,
              followers: [...userProfile.followers, user.uid]
            })
          }
        }

        localStorage.setItem('user-info', JSON.stringify({
          ...user,
          following: [...user.following, userId]
        }))

        setIsFollowing(true)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId)
      setIsFollowing(isFollowing)
    }
  }, [user, userId])

  return { isUpdating, isFollowing, handleFollowUser }
}

export default useFollowUser
