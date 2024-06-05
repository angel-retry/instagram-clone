import { useEffect, useState } from 'react'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'
import useUserProfileStore from '../store/userProfileStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserPosts = (type) => {
  console.log(type)
  const [isLoading, setIsLoading] = useState(true)
  const { posts, setPosts } = usePostStore()
  const showToast = useShowToast()
  const userProfile = useUserProfileStore(state => state.userProfile)

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return
      setIsLoading(true)
      setPosts([])

      let q

      switch (type) {
        case 'profile':
          q = query(collection(firestore, 'posts'), where('createdBy', '==', userProfile.uid))
          break
        case 'liked':
          q = query(collection(firestore, 'posts'), where('likes', 'array-contains', userProfile.uid))
          break
        default:
          showToast('Error', 'Invalid type specified', 'error')
          setIsLoading(false)
          return
      }

      try {
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          setPosts([])
          setIsLoading(false)
          return
        }

        const posts = []
        querySnapshot.forEach(doc => {
          posts.push({ ...doc.data(), id: doc.id })
        })

        posts.sort((a, b) => b.createdAt - a.createdAt)

        setPosts(posts)
      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    getPosts()
  }, [setPosts, userProfile, showToast, type])

  return { isLoading, posts }
}

export default useGetUserPosts
