import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import useShowToast from './useShowToast'
import { firestore } from '../firebase/firebase'

const useGetNotifications = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()

  useEffect(() => {
    if (!authUser) return

    setIsLoading(true)
    const q = query(collection(firestore, 'notifications'), where('receiverId', '==', authUser.uid))

    // onSnapshot設置監聽器，當資料變更時會自動載入
    // 將此函示給unsubscribe接收，當元件卸載時要觸發unsubscribe返回函示，結束監聽器
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notifications = []
      querySnapshot.forEach(doc => {
        notifications.push({ id: doc.id, ...doc.data() })
      })
      notifications.sort((a, b) => b.createdAt - a.createdAt)

      setNotifications(notifications)
      setIsLoading(false)
      console.log('notifications', notifications)
    },
    (error) => {
      console.error(error)
      showToast('Error', error.message, 'error')
      setIsLoading(false)
    }
    )

    // 元件卸载時執行 unsubscribe 函數，取消監聽器
    return () => unsubscribe()
  }, [authUser, showToast, setNotifications])

  return { isLoading, notifications }
}

export default useGetNotifications
