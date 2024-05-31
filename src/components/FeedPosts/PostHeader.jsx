import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { timeAgo } from '../../utils/timeAgo'
import { Link } from 'react-router-dom'
import useFollowUser from '../../hooks/useFollowUser'

const PostHeader = ({ post, creatorProfile }) => {
  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(post.createdBy)
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} my={2}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${creatorProfile?.username}`}>
          <Avatar name={creatorProfile?.username} src={creatorProfile?.profilePicURL} alt={`${creatorProfile?.username} profile pic`} size={'sm'} />
        </Link>

        <Flex fontSize={12} fontWeight={'bold'} gap={2}>
          <Link to={`/${creatorProfile?.username}`}>
            {creatorProfile?.username}
          </Link>
          <Box color={'gray.500'}>• {timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={'pointer'} onClick={handleFollowUser}>
        <Text
          fontSize={12}
          color={'blue.500'}
          fontWeight={'bold'}
          _hover={{ color: 'white' }}
          transition={'0.2s ease-in-out'}
        >
          {isFollowing ? 'unfollow' : 'follow' }
        </Text>
      </Box>
    </Flex>
  )
}

export default PostHeader
