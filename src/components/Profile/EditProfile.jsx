import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Textarea
} from '@chakra-ui/react'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    bio: ''
  })

  const authUser = useAuthStore(state => state.user)

  const handleEditProfile = () => {
    console.log(inputs)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={'black'} boxShadow={'xl'} border={'1px solid gray'} mx={3}>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Flex >
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              rounded={'xl'}
              p={6}
              my={0}
            >
              <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                Edit Profile
              </Heading>

              <FormControl>
                <Stack direction={['column', 'row']} spacing={6}>
                  <Center>
                    <Avatar size="xl" src={authUser.profilePicURL} border={'2px solid white'}/>
                  </Center>
                  <Center w="full">
                    <Button w="full">Edit Profile Picture</Button>
                  </Center>
                </Stack>
              </FormControl>

              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Full Name"
                  size={'sm'}
                  type="text"
                  value={inputs.fullName || authUser.fullName }
                  onChange={e => setInputs({ ...inputs, fullName: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  size={'sm'}
                  type="email"
                  value={inputs.username || authUser.username }
                  onChange={e => setInputs({ ...inputs, username: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Bio"
                  size={'sm'}
                  type="password"
                  cols={3}
                  value={inputs.bio || authUser.bio }
                  onChange={e => setInputs({ ...inputs, bio: e.target.value })}
                />
              </FormControl>

              <Stack spacing={6} direction={['column', 'row']}>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  size={'sm'}
                  _hover={{
                    bg: 'red.500'
                  }}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  size={'sm'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                  onClick={handleEditProfile}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
       </ModalContent>
    </Modal>
  )
}

export default EditProfile
