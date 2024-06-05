import * as yup from 'yup'
import { Alert, AlertIcon, Button, Flex, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import useLogin from '../../hooks/useLogin'
import useShowToast from '../../hooks/useShowToast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
}).required()

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  })

  const { login, loading, error } = useLogin()
  const showToast = useShowToast()

  const onSumbit = async (data) => {
    try {
      await login(data)
    } catch (err) {
      return showToast('Error', error.message, 'error')
    }
  }

  const onError = (error) => {
    if (!error) return
    showToast('Error', 'Please enter these fields', 'error')
  }

  return (
    <form style={{ width: '100%' }}>
      <Flex direction={'column'} gap={3}>
        <FormControl
          isInvalid={errors.email}
        >
          <Input
            placeholder='Email'
            fontSize={14}
            type='email'
            name='email'
            size={'sm'}
            {...register('email')}
          />

          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
           isInvalid={errors.password}
        >
          <Input
            placeholder='Password'
            fontSize={14}
            type='password'
            name='password'
            size={'sm'}
            {...register('password')}
          />

          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {error && (
          <Alert status='error' fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
          </Alert>
        )}

        <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={handleSubmit(onSumbit, onError)} isLoading={loading} isDisabled={errors?.email || errors?.password}>
          Log in
        </Button>
      </Flex>
    </form>
  )
}

export default Login
