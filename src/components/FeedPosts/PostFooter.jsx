import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useShowToast from '../../hooks/useShowToast'
import useAuthStore from '../../store/authStore'

const PostFooter = ({ post, username, isProfilePage }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(1000)
  const { isCommenting, handlePostComment } = usePostComment()
  const [comment, setComment] = useState('')
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const commentRef = useRef(null)

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikes(likes - 1)
    } else {
      setLiked(true)
      setLikes(likes + 1)
    }
  }

  const handleSubmitComment = async () => {
    try {
      await handlePostComment(post.id, comment)
      setComment('')
    } catch (error) {
      showToast('Error', error.message, 'error')
      console.error(error)
    }
  }

  return (
    <Box mb={10}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={'pointer'} fontSize={18}>
          {!liked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)}
        </Box>
        <Box cursor={'pointer'} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo/>
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={'sm'}>
        {likes} likes
      </Text>

      {!isProfilePage &&
      (
        <>
          <Text fontSize={'sm'} fontWeight={700}>
            {username}{' '}
            <Text as={'span'} fontWeight={400}>
              Feeling good...
            </Text>
          </Text>

          <Text fontSize={'sm'} color={'gray'}>
            View all 1,000 comments
          </Text>
        </>
      )}

      {authUser && (
        <Flex alignItems={'center'} justifyContent={'space-between'} gap={2} w={'full'}>
        <InputGroup>
          <Input variant={'flushed'} placeholder={'Add a comment...'} fontSize={14} value={comment} onChange={e => setComment(e.target.value)} ref={commentRef} />
          <InputRightElement>
            <Button fontSize={14} color={'blue.500'} fontWeight={600} cursor={'pointer'} _hover={{ color: 'white' }} bg={'transparent'} onClick={handleSubmitComment} isLoading={isCommenting} >Post</Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      )}

    </Box>
  )
}

export default PostFooter
