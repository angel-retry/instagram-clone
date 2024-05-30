import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from '@chakra-ui/react'
import { SearchLogo } from '../../assets/constants'
import useSearchUser from '../../hooks/useSearchUser'
import { useRef } from 'react'
import SuggestedUser from '../SuggestedUsers/SuggestedUser'

const Search = () => {
  const { isLoading, user, getUserProfile } = useSearchUser()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const searchRef = useRef(null)

  const handleSeachUser = async (e) => {
    e.preventDefault()
    getUserProfile(searchRef.current.value)
  }

  console.log(user)

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

    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
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
            {user && <SuggestedUser user={user} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default Search
