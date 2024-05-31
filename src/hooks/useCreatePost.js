import { useState } from 'react'
import useShowToast from './useShowToast'
import useUserProfileStore from '../store/userProfileStore'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/postStore'
import { useLocation } from 'react-router-dom'
import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { storage, firestore } from '../firebase/firebase'

const useCreatePost = () => {
  const showToast = useShowToast()
  const [isLoading, setIsLoading] = useState(false)
  const authUser = useAuthStore(state => state.user)
  const createPost = usePostStore(state => state.createPost)
  const addPost = useUserProfileStore(state => state.addPost)
  const userProfile = useUserProfileStore(state => state.userProfile)
  const { pathname } = useLocation()

  const handleCreatePost = async (selectedFile, caption) => {
    if (isLoading) return
    if (!selectedFile) return showToast('Error', 'Please select a file', 'error')
    setIsLoading(true)

    const newPost = {
      caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid
    }

    try {
      // 新增post資料
      const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

      // firestore的使用者資料位置
      const userDocRef = doc(firestore, 'users', authUser.uid)
      // storage存取圖片的路徑
      const imageRef = ref(storage, `posts/${postDocRef.id}`)

      // 更新使用者的posts欄位
      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) })
      // 上傳使用者的圖片
      await uploadString(imageRef, selectedFile, 'data_url')
      // 下載使用者上傳的url路徑
      const downloadURL = await getDownloadURL(imageRef)
      // 再更新posts的profilePicURL
      await updateDoc(postDocRef, { imageURL: downloadURL })

      // newPost新增上傳圖片屬性
      newPost.imageURL = downloadURL

      if (userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id })

      if (pathname === `/${authUser.username}` && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id })

      showToast('Success', 'Post created successfully', 'success')
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreatePost }
}

export default useCreatePost
