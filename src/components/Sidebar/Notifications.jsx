import { Tooltip, Box, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Avatar, Text, Image, Link, Spinner, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import { NotificationsLogo } from '../../assets/constants'
import useGetNotifications from '../../hooks/useGetNotifications'
import { Link as RouterLink } from 'react-router-dom'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { timeAgo } from '../../utils/timeAgo'

const Notifications = () => {
  const { notifications, isLoading } = useGetNotifications()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Tooltip
        hasArrow
        label={'Notifications'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          onClick={onOpen}
        >
          <NotificationsLogo size={25} />
          <Box display={{ base: 'none', md: 'block' }}>
            Notifications
          </Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            { isLoading && <Spinner /> }
            { !isLoading && !notifications && <NoNotifications/>}
            { !isLoading && notifications && (
              notifications.map((notification) => (
                <Notification key={notification.id} notification={notification} onClose={onClose} />
              ))
            )}

          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default Notifications

const Notification = ({ notification, onClose }) => {
  const { userProfile, isLoading } = useGetUserProfileById(notification.senderId)
  return (
    <>
    {
      !isLoading
        ? (
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'} _hover={{ bg: 'gray.800' }} p={3}>
          <Flex alignItems={'center'} gap={2}>
            <Link
              as={RouterLink}
              to={`/${userProfile.username}`}
              onClick={onClose}
            >
              <Avatar name={userProfile.username} src={userProfile.profilePicURL} size={'md'} />
            </Link>
            <Flex direction={'column'}>
              <Text>
                <Link
                  _hover={{ borderBottom: '1px solid' }}
                  as={RouterLink}
                  to={`/${userProfile.username}`}
                  onClick={onClose}
                >
                  {userProfile.username}{' '}
                </Link>
                { notification.type }{' '}
                your post.
              </Text>
              <Text fontSize={'sm'} color={'gray.500'}>
               - {timeAgo(notification.createdAt)}
              </Text>
            </Flex>
          </Flex>

          <Image src={notification.postImage} h={'50px'} w={'50px'} objectFit={'cover'} />

        </Flex>
          )
        : (
            <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'} mb={3}>
              <Flex alignItems={'center'} gap={2}>
                  <SkeletonCircle size='10' />
                <Skeleton height='20px' />
              </Flex>
            </Flex>
          )
    }
    </>
  )
}

const NoNotifications = () => {
  return (
    <Flex >
      <Text>No notification</Text>
    </Flex>
  )
}
