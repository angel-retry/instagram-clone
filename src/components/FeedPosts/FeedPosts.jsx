import { Container, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import useGetFeedPosts from '../../hooks/useGetFeedPosts'
import { InfoIcon } from '@chakra-ui/icons'

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts()

  return (
    <Container maxW={'container.sm'} py={10} px={2}>
      {
        isLoading && (
          <Flex justifyContent={'center'} alignItems={'center'} mt={'50%'}>
            <Spinner />
          </Flex>
        )
      }
      { !isLoading && posts.length > 0 && (
        <>
          {
            posts.map(post => (
            <FeedPost key={post.id} post={post} />
            ))
          }
        </>
      )}

      { !isLoading && posts.length === 0 && (
        <>
        <VStack color={'white'}>
          <InfoIcon fontSize={'36px'} />
          <Text fontSize={'md'} >
            Looks like you don&apos;t have any friends.
          </Text>
          <Text>
            Stop coding and go make some !!
          </Text>
        </VStack>
        </>
      )}
    </Container>
  )
}

export default FeedPosts
