import { doc, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebase'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useShowToast from './useShowToast'

const useSignUpWithEmailAndPassword = () => {
  const showToast = useShowToast()

  const [
    createUserWithEmailAndPassword,
    ,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const signup = async (inputs) => {
    if (!inputs.email || !inputs.username || !inputs.fullName || !inputs.password) {
      showToast('Error', 'Please fill all th fields', 'error')
      return
    }
    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

      if (!newUser && error) {
        showToast('Error', error.message, 'error')
        return
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: '',
          profilePicURL: '',
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        }

        await setDoc(doc(firestore, 'users', newUser.user.uid), userDoc)

        localStorage.setItem('user-info', JSON.stringify(userDoc))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { loading, error, signup }
}

export default useSignUpWithEmailAndPassword
