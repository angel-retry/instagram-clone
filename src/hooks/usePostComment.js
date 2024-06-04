import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import usePostStore from '../store/postStore'

const usePostComment = (post, comment) => {
  const [isCommenting, setIsCommenting] = useState(false)
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const addComment = usePostStore(state => state.addComment)

  const handlePostComment = async () => {
    if (isCommenting) return
    if (!authUser) return showToast('Error', 'You must be logged in to comment', 'error')
    setIsCommenting(true)

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: authUser.uid,
      postId: post.id
    }

    // 建立通知
    const notificationData = {
      receiverId: post.createdBy,
      senderId: authUser.uid,
      type: 'commented',
      postId: post.id,
      postImage: post.imageURL,
      createdAt: Date.now(),
      isRead: false,
      comment
    }

    try {
      await updateDoc(doc(firestore, 'posts', post.id), { comments: arrayUnion(newComment) })
      addComment(post.id, newComment)
      if (authUser.uid !== post.createdBy) {
        await addDoc(collection(firestore, 'notifications'), notificationData)
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsCommenting(false)
    }
  }

  return { isCommenting, handlePostComment }
}

export default usePostComment
