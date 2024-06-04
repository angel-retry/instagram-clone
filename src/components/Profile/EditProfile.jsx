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
import { useRef, useState } from 'react'
import useAuthStore from '../../store/authStore'
import usePreviewImg from '../../hooks/usePreviewImg'
import useEditProfile from '../../hooks/useEditProfile'
import useShowToast from '../../hooks/useShowToast'

const EditProfile = ({ isOpen, onClose }) => {
  const showToast = useShowToast()

  const authUser = useAuthStore(state => state.user)

  const [inputs, setInputs] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
    bio: authUser.bio
  })

  const fileRef = useRef(null)

  const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg()

  const { isUpdating, editProfile } = useEditProfile()

  const [isInvalid, setIsInvalid] = useState(false)

  const handleEditProfile = async () => {
    setIsInvalid(false)
    if (!inputs.fullName || !inputs.username) {
      setIsInvalid(true)
      return showToast('Error', 'Please fill all th fields', 'error')
    }
    try {
      await editProfile(inputs, selectedFile)
      setSelectedFile(null) // 清空目前所選的檔案
      onClose() // 關掉modal
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsInvalid(false)
    }
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
                    <Avatar size="xl" src={selectedFile || authUser.profilePicURL} border={'2px solid white'}/>
                  </Center>
                  <Center w="full">
                    <Button w="full" onClick={() => fileRef.current.click()}>Edit Profile Picture</Button>
                  </Center>
                  <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
                </Stack>
              </FormControl>

              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="Full Name"
                  size={'sm'}
                  type="text"
                  value={inputs.fullName }
                  onChange={e => setInputs({ ...inputs, fullName: e.target.value })}
                  isInvalid={isInvalid}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  size={'sm'}
                  type="email"
                  value={inputs.username }
                  onChange={e => setInputs({ ...inputs, username: e.target.value })}
                  isInvalid={isInvalid}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Bio"
                  size={'sm'}
                  type="password"
                  cols={3}
                  value={inputs.bio}
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
                  isLoading={isUpdating}
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
