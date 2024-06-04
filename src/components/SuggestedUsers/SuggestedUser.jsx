import { Avatar, Box, Button, Flex, VStack } from '@chakra-ui/react'
import useFollowUser from '../../hooks/useFollowUser'
import useAuthStore from '../../store/authStore'
import { Link } from 'react-router-dom'

const SuggestedUser = ({ user, setUsers }) => {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(user.uid)
  const authUser = useAuthStore(state => state.user)

  const onFollowUser = async () => {
    await handleFollowUser()
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(prevUser => {
        if (prevUser.uid === user.uid) {
          return {
            ...prevUser,
            followers: isFollowing ? prevUser.followers.filter(uid => uid !== authUser.uid) : [...prevUser.followers, authUser.uid]
          }
        }
        return prevUser
      })
      console.log('updatedUsers', { ...updatedUsers })
      return updatedUsers
    })
  }

  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} mb={3}>
      <Flex alignItems={'center'} gap={4}>
        <Link to={`/${user.username}`}>
          <Avatar name={user.username} src={user.profilePicURL} alt={user.username} size={'md'} />
        </Link>

        <VStack spacing={2} alignItems={'flex-start'}>
          <Link to={`/${user.username}`}>
            <Box fontSize={12} fontWeight={'bold'}>
              {user.username}
            </Box>
          </Link>
          <Box fontSize={11} color={'gray.500'}>
            {user.followers.length} follwers
          </Box>
        </VStack>
      </Flex>

      {authUser.uid !== user.uid && (
        <Button
          fontSize={13}
          bg={'transparent'}
          p={0}
          h={'max-content'}
          fontWeight={'medium'}
          color={'blue.400'}
          _hover={{ color: 'white' }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? 'unfollow' : 'follow'}
        </Button>
      )}
    </Flex>
  )
}

export default SuggestedUser
