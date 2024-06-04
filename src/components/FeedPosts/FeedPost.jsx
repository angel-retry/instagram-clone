import { Box, Flex, Image, Spinner } from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileById(post.createdBy)
  return (
    <>
    {isLoading
      ? (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Spinner />
        </Flex>
        )
      : (
      <>
        <PostHeader post={post} creatorProfile={userProfile} />
        <Box my={2} borderRadius={4} overflow={'hidden'}>
          <Image src={post.imageURL} w={'full'} />
        </Box>
        <PostFooter post={post} creatorProfile={userProfile}/>
      </>
        )}
    </>
  )
}

export default FeedPost
