import { Box, Flex, Image, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'

const FeedPost = ({ post }) => {
  const { userProfile, isLoading } = useGetUserProfileById(post.createdBy)
  return (
    <>
    {isLoading
      ? (
          isLoading && (
            <VStack gap={4} alignItems={'flex-start'} mb={10}>
              <Flex gap={2} alignItems={'center'}>
                <SkeletonCircle size='10' />
                <VStack gap={2} alignItems={'flex-start'}>
                  <Skeleton height={'10px'} w={'200px'} />
                  <Skeleton height={'10px'} w={'200px'} />
                </VStack>
              </Flex>
              <Skeleton w={'full'}>
                <Box h={'500px'}>contents wrapped</Box>
              </Skeleton>
            </VStack>
          )
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
