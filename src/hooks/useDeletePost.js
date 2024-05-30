import { useState } from 'react'
import useShowToast from './useShowToast'
import { deleteObject, ref } from 'firebase/storage'
import { firestore, storage } from '../firebase/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import useAuthStore from '../store/authStore'

const useDeletePost = (postId) => {
  const showToast = useShowToast()
  const [isDeleting, setIsDeleting] = useState(false)
  const authUser = useAuthStore(state => state.user)

  const handleDeletePost = async () => {
    if (isDeleting) return
    // 跳出警告是否要刪除
    if (!window.confirm('Are you sure you want to delete the post?')) return
    setIsDeleting(true)

    try {
      // 取得Post imageURL位置
      const imageRef = ref(storage, `posts/${postId}`)
      // 刪掉圖片
      await deleteObject(imageRef)

      // 取得使用者的資訊
      const userRef = doc(firestore, 'users', authUser.uid)
      // 刪掉post
      await deleteDoc(doc(firestore, 'posts', postId))
      // 更新使用者post資訊
      await updateDoc(userRef, {
        posts: arrayRemove(postId)
      })
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsDeleting(false)
    }
  }
  return { isDeleting, handleDeletePost }
}

export default useDeletePost
