import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import { collection, getDocs, query, where } from 'firebase/firestore'
import useShowToast from './useShowToast'
import { firestore } from '../firebase/firebase'

const useGetNotifications = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()

  useEffect(() => {
    const getNotifications = async () => {
      setIsLoading(true)
      const q = query(collection(firestore, 'notifications'), where('receiverId', '==', authUser.uid))

      try {
        const querySnapShot = await getDocs(q)
        const notifications = []
        querySnapShot.forEach(doc => {
          notifications.push({ id: doc.id, ...doc.data() })
        })

        notifications.sort((a, b) => b.createdAt - a.createdAt)

        setNotifications(notifications)
        console.log('notifications', notifications)
      } catch (error) {
        console.error(error)
        showToast('Error', error.message, 'error')
      } finally {
        setIsLoading(false)
      }
    }

    if (authUser) getNotifications()
  }, [authUser, showToast, setNotifications])

  return { isLoading, notifications }
}

export default useGetNotifications
