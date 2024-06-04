import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { firestore } from '../firebase/firebase'
import useShowToast from './useShowToast'

const useUpdateNotifications = (isReadNotifications) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const showToast = useShowToast()

  const updateNotifications = async () => {
    if (isUpdating) return
    if (isReadNotifications.length === 0) return
    setIsUpdating(true)
    try {
      await Promise.all(
        isReadNotifications.map(async (updateNotification) => {
          const notificationRef = doc(firestore, 'notifications', updateNotification.id)
          await updateDoc(notificationRef, { ...updateNotification, isRead: true })
        })
      )
    } catch (error) {
      console.error(error)
      showToast('Error', error.message, 'error')
    } finally {
      setIsUpdating(false)
    }
  }

  return { updateNotifications, isUpdating }
}

export default useUpdateNotifications
