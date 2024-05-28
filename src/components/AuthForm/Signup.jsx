import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputs, setInputs] = useState({
    username: '',
    fullName: '',
    email: '',
    password: ''
  })

  return (
    <>
      <Input
        placeholder='Email'
        fontSize={14}
        type='email'
        val={inputs.email}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />

      <Input
        placeholder='Username'
        fontSize={14}
        type='text'
        val={inputs.username}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />

      <Input
        placeholder='Full Name'
        fontSize={14}
        type='text'
        val={inputs.fullName}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />

      <InputGroup>
        <Input
          placeholder='Password'
          fontSize={14}
          type={showPassword ? 'text' : 'password'}
          val={inputs.password}
          size={'sm'}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <InputRightElement h={'full'}>
          <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Input
        placeholder='Confirm Password'
        fontSize={14}
        type='password'
        val={inputs.confirmPassword}
        size={'sm'}
        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
      />

      <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} >
        Sign Up
      </Button>
    </>
  )
}

export default Signup
