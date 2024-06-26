import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SearchLogo } from '../../assets/constants'
import useSearchUser from '../../hooks/useSearchUser'
import { useRef } from 'react'
import SuggestedUser from '../SuggestedUsers/SuggestedUser'
import useShowToast from '../../hooks/useShowToast'

const Search = () => {
  const { isLoading, users, getUserProfile, setUsers } = useSearchUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const searchRef = useRef(null)
  const showToast = useShowToast()

  const handleSeachUser = async (e) => {
    e.preventDefault()
    if (!searchRef.current.value) {
      return showToast('Error', 'Please enter username', 'error')
    }
    getUserProfile(searchRef.current.value)
  }

  const handleClose = () => {
    onClose()
    setUsers([])
    searchRef.current.value = ''
  }

  console.log('users.length', users.length)
  console.log('users', { ...users })

  return (
    <>
    <Tooltip
      hasArrow
      label={'Search'}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}
    >
      <Flex
        alignItems={'center'}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        onClick={onOpen}
      >
        <SearchLogo size={25} />
        <Box display={{ base: 'none', md: 'block' }}>
          Search
        </Box>
      </Flex>
    </Tooltip>

    <Modal isOpen={isOpen} onClose={handleClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Search User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSeachUser} >
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder='enter username' ref={searchRef}/>
              </FormControl>

              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button type='submit' ml={'auto'} size={'sm'} my={4} isLoading={isLoading}>
                  Search
                </Button>
              </Flex>
            </form>
            {users.length > 0 && !isLoading && (
              <>
                {
                  users.map(user => <SuggestedUser key={user.uid} user={user} setUsers={setUsers} />)

                }
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default Search
