import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useShowToast from '../../hooks/useShowToast'
import useAuthStore from '../../store/authStore'
import useLikePost from '../../hooks/useLikePost'

const PostFooter = ({ post, username, isProfilePage }) => {
  const { isCommenting, handlePostComment } = usePostComment()
  const [comment, setComment] = useState('')
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const commentRef = useRef(null)
  const { handleLikePost, likes, isLiked } = useLikePost(post)

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
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18} >
          {!isLiked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)}
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
             {post.caption}
            </Text>
          </Text>

          {post.comments && (
            <Text fontSize={'sm'} color={'gray'}>
            View all {post.comments.length} comments
          </Text>
          )}

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
