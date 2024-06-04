import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import useLogin from '../../hooks/useLogin'
import useShowToast from '../../hooks/useShowToast'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const [isInvalid, setIsInvalid] = useState(false)

  const { login, loading, error } = useLogin()
  const showToast = useShowToast()

  const handleLogin = async () => {
    setIsInvalid(false)
    if (!inputs.email || !inputs.password) {
      setIsInvalid(true)
      return showToast('Error', 'Please fill all th fields', 'error')
    }
    try {
      await login(inputs)
    } catch (error) {
      return showToast('Error', error.message, 'error')
    } finally {
      setIsInvalid(false)
    }
  }

  return (
    <>
      <Input
        placeholder='Email'
        fontSize={14}
        type='email'
        val={inputs.email}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        isInvalid={isInvalid}
      />
      <Input
        placeholder='Password'
        fontSize={14}
        type='password'
        val={inputs.password}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        isInvalid={isInvalid}
      />

      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={handleLogin} isLoading={loading}>
        Log in
      </Button>
    </>
  )
}

export default Login
