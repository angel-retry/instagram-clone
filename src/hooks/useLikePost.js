import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))

  const handleLikePost = async () => {
    if (isUpdating || !authUser) return
    if (!authUser) return showToast('Error', 'You must be logged in to like a post', 'error')
    setIsUpdating(true)

    try {
      // postRef
      const postRef = doc(firestore, 'posts', post.id)
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      })
      setIsLiked(!isLiked)
      isLiked ? setLikes(likes - 1) : setIsLiked(likes + 1)
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return { isUpdating, handleLikePost, likes, isLiked }
}

export default useLikePost
