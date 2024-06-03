import { Avatar, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../Comment/Comment'
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import useDeletePost from '../../hooks/useDeletePost'
import useShowToast from '../../hooks/useShowToast'
import { useEffect, useRef } from 'react'

const ProfilePost = ({ post }) => {
  const showToast = useShowToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { userProfile } = useUserProfileStore()
  const authUser = useAuthStore(state => state.user)

  const { isDeleting, handleDeletePost } = useDeletePost(post.id)

  const commentContainerRef = useRef(null)

  const onDeletingPost = async () => {
    if (!window.confirm('Are you sure you want to delete the post?')) return
    try {
      await handleDeletePost()
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
    if (isOpen) return scrollToBottom()
  }, [isOpen, post.comments])

  return (
    <>
      <GridItem
      cursor={'pointer'}
      borderRadius={4}
      overflow={'hidden'}
      border={'1px solid'}
      borderColor={'whiteAlpha.300'}
      position={'relative'}
      aspectRatio={1 / 1}
      onClick={onOpen}
    >
      <Flex
        opacity={0}
        _hover={{ opacity: 1 }}
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={'blackAlpha.700'}
        transition={'all 0.3s ease'}
        zIndex={1}
        justifyContent={'center'}
      >
        <Flex alignItems={'center'} justifyContent={'center'} gap={{ base: 4, lg: 50 }}>
          <Flex alignItems={'center'}>
            <AiFillHeart size={20} />
            <Text fontWeight={'bold'} ml={2}>
              {post.likes.length}
            </Text>
          </Flex>

          <Flex alignItems={'center'}>
            <FaComment size={20} />
            <Text fontWeight={'bold'} ml={2}>
              {post.comments.length}
            </Text>
          </Flex>
        </Flex>

      </Flex>

      <Image src={post.imageURL} alt='profile post' w={'full'} h={'full'} objectFit={'cover'} objectPosition={'center'} />

      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }} >
        <ModalOverlay />
        <ModalContent >
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={5} >
            <Flex gap={4} w={{ base: '90%', sm: '70%', md: 'full' }} mx={'auto'} maxH={'90vh'} minH={'50vh'} >
              <Flex
                borderRadius={4}
                overflow={'hidden'}
                flex={1.5}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image src={post.imageURL} alt='profile post' />
              </Flex>

              <Flex flex={1} flexDir={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar name={userProfile.username} src={userProfile.profilePicURL} size={'sm'} />
                    <Text fontWeight={'bold'} fontSize={12}>
                    {userProfile.username}
                    </Text>
                  </Flex>
                  { authUser?.uid === userProfile.uid && (
                    <Button
                      _hover={{ color: 'red.600', bg: 'whiteAlpha.300' }}
                      borderRadius={4}
                      p={1}
                      bg={'transparent'}
                      size={'sm'}
                      onClick={onDeletingPost}
                      isLoading={isDeleting}
                    >
                      <MdDelete size={20} cursor={'pointer'}/>
                    </Button>
                  )
                  }

                </Flex>

                <Text fontWeight={'medium'} fontSize={12} mx={1} my={2}>
                  {post.caption}
                </Text>

                <Divider my={4} bg={'gray.500'} />

                <VStack w={'full'} alignItems={'start'} maxH={'350px'} overflowY={'auto'} ref={commentContainerRef} mb={2}>
                  {post.comments.map((comment, index) => (
                    <Comment key={index} comment ={comment} />
                  ))}
                </VStack>

                <Divider bg={'gray.800'} mt={'auto'} />

                <PostFooter isProfilePage={true} post={post}/>

              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default ProfilePost
