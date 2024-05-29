import { Avatar, Button, Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'

const SuggestedHeader = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const authUser = useAuthStore(state => state.user)

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link
          to={`/${authUser.username}`}
          as={RouterLink}
        >
          <Avatar name={authUser.username} size={'md'} src={authUser.profilePicURL} />
        </Link>

        <Link
          to={`/${authUser.username}`}
          as={RouterLink}
        >
          <Text fontSize={12} fontWeight={'bold'}>
            {authUser.username}
          </Text>
        </Link>
      </Flex>

      <Button
        size={'xs'}
        bg={'transparent'}
        _hover={{ bg: 'transparent' }}
        fontSize={14}
        color={'blue.500'}
        fontWeight={'medium'}
        cursor={'pointer'}
        onClick={handleLogout}
        isLoading={isLoggingOut}
        p={0}
      >
        Log out
      </Button>
    </Flex>
  )
}

export default SuggestedHeader
