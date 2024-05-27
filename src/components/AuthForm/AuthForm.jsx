import { Box, Button, Flex, Image, Input, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleAuth = () => {
    console.log('inputs', inputs)
  }

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src='/logo.png' alt='logo image' />
          <Input
            placeholder='Email'
            fontSize={14}
            type='email'
            val={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          />
          <Input
            placeholder='Password'
            fontSize={14}
            type='password'
            val={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          {
            !isLogin
              ? (
                  <Input
                    placeholder='Confirm Password'
                    fontSize={14}
                    type='password'
                    val={inputs.confirmPassword}
                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                  />
                )
              : null
          }

          <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={handleAuth}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>

          {/* OR Text  */}
          <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
            <Text mx={1} color={'white'}>OR</Text>
            <Box flex={2} h={'1px'} bg={'gray.400'}></Box>
          </Flex>

          <Flex justifyContent={'center'} alignItems={'center'} cursor={'pointer'}>
            <Image src='/google.png' w={5} alt="Google logo" />
            <Text mx={2} color={'blue.500'}>
              Log in with Google
            </Text>
          </Flex>
        </VStack>
      </Box>

      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account ?" : 'Already have an account ?'}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'} fontSize={14}>
            {isLogin ? 'Sign Up' : 'Log in'}
          </Box>
        </Flex>
      </Box>
    </>

  )
}

export default AuthForm
