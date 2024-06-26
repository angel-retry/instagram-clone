import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from '../../assets/constants'
import usePostComment from '../../hooks/usePostComment'
import useShowToast from '../../hooks/useShowToast'
import useAuthStore from '../../store/authStore'
import useLikePost from '../../hooks/useLikePost'
import { timeAgo } from '../../utils/timeAgo'
import CommentsModal from '../Modals/CommentsModal'

const PostFooter = ({ post, creatorProfile, isProfilePage }) => {
  const [comment, setComment] = useState('')
  const { isCommenting, handlePostComment } = usePostComment(post, comment)
  const showToast = useShowToast()
  const authUser = useAuthStore(state => state.user)
  const commentRef = useRef(null)
  const { handleLikePost, likes, isLiked } = useLikePost(post)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmitComment = async () => {
    try {
      await handlePostComment()
      setComment('')
    } catch (error) {
      showToast('Error', error.message, 'error')
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

      {isProfilePage && (
        <Text fontWeight={600} fontSize={12} color={'gray'}>
          Posted {timeAgo(post.createdAt) }
        </Text>
      )}

      {!isProfilePage &&
      (
        <>
          <Text fontSize={'sm'} fontWeight={700}>
            {creatorProfile?.username}{' '}
            <Text as={'span'} fontWeight={400}>
             {post.caption}
            </Text>
          </Text>

          {post.comments && (
          <>
            <Text fontSize={'sm'} color={'gray'} cursor={'pointer'} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          </>
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
