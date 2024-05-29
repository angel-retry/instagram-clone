import { useEffect, useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDoc, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useUserProfileStore from '../store/userProfileStore'

const userGetUserProfileByUsername = () => {
  const [isLoading, setIsLoading] = useState(true)
  const showToast = useShowToast()
  const { userProfile, setUserProfile } = useUserProfileStore()

  useEffect(() => {
    const getUserProfile = async ({ username }) => {
      setIsLoading(true)
      try {
        const q = query(collection(firestore, 'users'), where('username', '==', username))
        const querySnapshot = await getDoc(q)

        if (querySnapshot.empty) setUserProfile(null)

        querySnapshot.forEach(doc => setUserProfile(doc.data()))
      } catch (error) {
        showToast('Error', error.message, 'error')
      }
    }

    getUserProfile()
  }, [setUserProfile, username, showToast])

  return {}
}

export default userGetUserProfileByUsername
