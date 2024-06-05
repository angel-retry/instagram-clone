import { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true)
  const showToast = useShowToast()
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true)
      setUserProfile(null)
      try {
        const userRef = await getDoc(doc(firestore, 'users', userId))

        if (userRef.exists()) {
          setUserProfile(userRef.data())
        }

        console.log(userRef.data())
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setIsLoading(false)
      }
    }
    getUserProfile()
  }, [showToast, setUserProfile, userId])

  return { isLoading, userProfile, setUserProfile }
}

export default useGetUserProfileById
