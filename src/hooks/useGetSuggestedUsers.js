import { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore'
import useShowToast from '../hooks/useShowToast'
import { query } from 'firebase/database'
import { collection, getDocs, limit, orderBy, where } from 'firebase/firestore'
import firebase from 'firebase/compat/app'

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const authUser = useAuthStore(state => state.user)
  const showToast = useShowToast()

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true)
      try {
        const q = query(
          collection(firebase, 'users'),
          where('uid', 'not-in', [authUser.uid, ...authUser.following]), // not-in 篩選屬性值不在給定數組中的文件，是多值比較，最多只能處理10個值
          orderBy('uid'),
          limit(3)
        )

        const querySnapShot = await getDocs(q)
        const users = []
        querySnapShot.forEach(doc => {
          users.push({ ...doc.data(), id: doc.id })
        })

        console.log('getSuggestedUsers', users)

        setSuggestedUsers(users)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setIsLoading(false)
      }
    }

    if (authUser) getSuggestedUsers()
  }, [authUser, showToast])

  return { isLoading, suggestedUsers }
}

export default useGetSuggestedUsers
