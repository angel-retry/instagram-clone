import { useState } from 'react'
import useShowToast from './useShowToast'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const showToast = useShowToast()

  const getUserProfile = async (username) => {
    setIsLoading(true)
    setUsers([])
    try {
      const q = query(collection(firestore, 'users'),
        where('username', '>=', username),
        where('username', '<', username + '\uf8ff'))

      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) return showToast('Error', 'User not found', 'error')

      const getUsers = []

      querySnapshot.forEach(doc => {
        getUsers.push({ ...doc.data() })
      })

      setUsers(getUsers)
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, users, getUserProfile, setUsers }
}

export default useSearchUser
