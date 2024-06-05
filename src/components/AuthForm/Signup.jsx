import * as yup from 'yup'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Alert, AlertIcon, Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword'
import useShowToast from '../../hooks/useShowToast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  fullName: yup.string().required(),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .max(16, 'Password must be not over 16 characters long')
    .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one number')
    .required(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
}).required()

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { loading, error, signup } = useSignUpWithEmailAndPassword()

  const showToast = useShowToast()

  const onSubmit = (data) => {
    console.log({ data })
  }

  const onError = (error) => {
    if (!error) return
    console.log(error)
    showToast('Error', 'Please enter these fields', 'error')
  }

  return (
    <form style={{ width: '100%' }}>
      <Flex direction={'column'} gap={3}>
      <FormControl
        isRequired
        isInvalid={errors.email}
      >
        <Input
          placeholder='Email'
          fontSize={14}
          type='email'
          name="email"
          size={'sm'}
          {...register('email')}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={errors.username}
      >
        <Input
        placeholder='Username'
        fontSize={14}
        type='text'
        name='username'
        {...register('username')}
        size={'sm'}
      />
      <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={errors.fullName}
      >
        <Input
          placeholder='Full Name'
          fontSize={14}
          type='text'
          name='fullName'
          {...register('fullName')}
          size={'sm'}
        />
        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ errors.password }
      >
        <InputGroup>
          <Input
            placeholder='Password'
            fontSize={14}
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            name='password'
            size={'sm'}
          />

          <InputRightElement h={'full'}>
            <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={ errors.confirmPassword }
      >
        <InputGroup>
          <Input
            placeholder='Confirm Password'
            fontSize={14}
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            size={'sm'}
            name='confirmPassword'
          />

          <InputRightElement h={'full'}>
            <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
            </Button>
          </InputRightElement>
        </InputGroup>

        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>

      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={handleSubmit(onSubmit, onError)} isLoading={loading} isDisabled={errors.email || errors.username || errors.fullName || errors.password || errors.confirmPassword} >
        Sign Up
      </Button>
      </Flex>
    </form>
  )
}

export default Signup
