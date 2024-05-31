import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import Comment from '../Comment/Comment'

const CommentsModal = ({ isOpen, onClose, comments }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'}>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex mb={4} gap={4} flexDir={'column'} maxH={'250px'} overflowY={'auto'}>
              {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </Flex>

            <form style={{ marginTop: '2rem' }}>
              <Input placeholder='Comment' size={'sm'} />
              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button type='submit' ml={'auto'} size={'sm'} my={4}>
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
