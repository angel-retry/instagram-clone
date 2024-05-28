import { Box, Image } from '@chakra-ui/react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'

const FeedPost = () => {
  return (
    <>
      <PostHeader />
      <Box my={2} borderRadius={4} overflow={'hidden'}>
        <Image src='/img1.png' alt='image' />
      </Box>
      <PostFooter />
    </>
  )
}

export default FeedPost
