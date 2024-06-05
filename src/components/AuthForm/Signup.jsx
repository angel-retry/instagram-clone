import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Button, Flex, FormControl, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'
import useShowToast from '../../hooks/useShowToast'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputs, setInputs] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isInvalids, setIsInvalids] = useState({
    email: false,
    username: false,
    fullName: false,
    password: false,
    confirmPassword: false
  })

  const { loading, error, signup } = useSignUpWithEmailAndPassword()

  const showToast = useShowToast()

  const handleSignup = async () => {
    setIsInvalids({
      email: false,
      username: false,
      fullName: false,
      password: false,
      confirmPassword: false
    })

    const fields = ['email', 'username', 'fullName', 'password', 'confirmPassword']

    if (!inputs.email || !inputs.username || !inputs.fullName || !inputs.password || !inputs.confirmPassword) {
      fields.forEach(field => {
        if (!inputs[field]) {
          setIsInvalids(prevState => ({
            ...prevState,
            [field]: true
          }))
        }
      })
      return showToast('Error', 'Please fill the field.', 'error')
    }

    if (inputs.password !== inputs.confirmPassword) {
      setIsInvalids({ ...isInvalids, password: true, confirmPassword: true })
      return showToast('Error', 'Please input the same password.', 'error')
    }
  }

  return (
    <form style={{ width: '100%' }}>
      <Flex direction={'column'} gap={3}>
      <FormControl
        isRequired
        isInvalid={ isInvalids.email }
      >
        <Input
          placeholder='Email'
          fontSize={14}
          type='email'
          val={inputs.email}
          size={'sm'}
          onChange={(e) => {
            setInputs({ ...inputs, email: e.target.value })
            setIsInvalids({ ...isInvalids, email: false })
          }}
        />
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ isInvalids.email }
      >
        <Input
        placeholder='Username'
        fontSize={14}
        type='text'
        val={inputs.username}
        size={'sm'}
        onChange={(e) => {
          setInputs({ ...inputs, username: e.target.value })
          setIsInvalids({ ...isInvalids, username: false })
        }}
        isInvalid={ isInvalids.username }
      />
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ isInvalids.email }
      >
        <Input
          placeholder='Full Name'
          fontSize={14}
          type='text'
          val={inputs.fullName}
          size={'sm'}
          onChange={(e) => {
            setInputs({ ...inputs, fullName: e.target.value })
            setIsInvalids({ ...isInvalids, fullName: false })
          }}
          isInvalid={ isInvalids.fullName }
        />
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ isInvalids.email }
      >
        <InputGroup>
          <Input
            placeholder='Password'
            fontSize={14}
            type={showPassword ? 'text' : 'password'}
            val={inputs.password}
            size={'sm'}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value })
              setIsInvalids({ ...isInvalids, password: false })
            }}
            isInvalid={ isInvalids.password }
          />

          <InputRightElement h={'full'}>
            <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ isInvalids.email }
      >
        <InputGroup>
          <Input
            placeholder='Confirm Password'
            fontSize={14}
            type={showPassword ? 'text' : 'password'}
            val={inputs.confirmPassword}
            size={'sm'}
            onChange={(e) => {
              setInputs({ ...inputs, confirmPassword: e.target.value })
              setIsInvalids({ ...isInvalids, confirmPassword: false })
            }}
            isInvalid={ isInvalids.confirmPassword }
          />

          <InputRightElement h={'full'}>
            <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={handleSignup} isLoading={loading}>
        Sign Up
      </Button>
      </Flex>
    </form>
  )
}

export default Signup
