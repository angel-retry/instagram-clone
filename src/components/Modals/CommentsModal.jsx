import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import Comment from '../Comment/Comment'
import usePostComment from '../../hooks/usePostComment'
import { useEffect, useRef } from 'react'
import useShowToast from '../../hooks/useShowToast'

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { isCommenting, handlePostComment } = usePostComment()
  const showToast = useShowToast()
  const commentRef = useRef(null)
  const commentContainerRef = useRef(null)

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      await handlePostComment(post.id, commentRef.current.value)
      commentRef.current.value = ''
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  useEffect(() => {
    const scrollToBottom = () => {
      if (commentContainerRef.current) {
        commentContainerRef.current.scrollTop = commentContainerRef.current.scrollHeight
      }
    }

    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, post.comments])

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'}>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex mb={4} gap={4} flexDir={'column'} maxH={'250px'} overflowY={'auto'} ref={commentContainerRef}>
              {post.comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            </Flex>

            <form style={{ marginTop: '2rem' }} onSubmit={handleSubmitComment}>
              <Input placeholder='Comment' size={'sm'} ref={commentRef} />
              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button type='submit' ml={'auto'} size={'sm'} my={4} isLoading={isCommenting}>
                  Post
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default CommentsModal
