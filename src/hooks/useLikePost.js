import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayRemove, arrayUnion, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import usePostStore from '../store/postStore'

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const addLike = usePostStore(state => state.addLike)
  const removeLike = usePostStore(state => state.removeLike)
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))

  const handleLikePost = async () => {
    if (isUpdating) return
    if (!authUser) return showToast('Error', 'You must be logged in to like a post', 'error')
    setIsUpdating(true)

    try {
      // notificationRef
      const notificationRef = doc(firestore, 'notifications', `${authUser.uid}_liked_${post.id}`)
      // postRef
      const postRef = doc(firestore, 'posts', post.id)
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      })
      setIsLiked(!isLiked)

      // 建立通知
      const notificationData = {
        receiverId: post.createdBy,
        senderId: authUser.uid,
        type: 'liked',
        postId: post.id,
        postImage: post.imageURL,
        createdAt: Date.now(),
        isRead: false
      }

      if (isLiked) {
        setLikes(likes - 1)
        removeLike(post.id, authUser.uid)
        await deleteDoc(notificationRef, notificationData)
      } else {
        if (authUser.uid !== post.createdBy) {
          await setDoc(notificationRef, notificationData)
        }
        setLikes(likes + 1)
        addLike(post.id, authUser.uid)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, handleLikePost, likes, isLiked }
}

export default useLikePost
