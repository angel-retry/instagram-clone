import { Tooltip, Box, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Avatar, Text, Image, Link, Spinner, Skeleton, SkeletonCircle, Circle } from '@chakra-ui/react'
import { NotificationsLogo } from '../../assets/constants'
import useGetNotifications from '../../hooks/useGetNotifications'
import { Link as RouterLink } from 'react-router-dom'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import { timeAgo } from '../../utils/timeAgo'
import useUpdateNotifications from '../../hooks/useUpdateNotifications'

const Notifications = () => {
  const { notifications, isLoading } = useGetNotifications()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const notReadNotifications = notifications.filter(notification => !notification.isRead)

  console.log(notReadNotifications)

  const { updateNotifications, isUpdating } = useUpdateNotifications(notReadNotifications)

  const handleClose = async () => {
    await updateNotifications()
    if (!isUpdating) onClose()
  }

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

          {
            notReadNotifications.length > 0
              ? (
                  <>
                    <Flex position={'relative'} >
                      <NotificationsLogo size={25} />
                      <Circle w={'8px'} h={'8px'} bg={'red'} position={'absolute'} right={-1} />
                    </Flex>

                    <Box display={{ base: 'none', md: 'flex' }} gap={3} alignItems={'center'} >
                      Notifications

                      <Circle size={'20px'} bg='red' color='white' fontSize={'12px'} >
                      {notReadNotifications.length}</Circle>

                    </Box>
                  </>

                )
              : (
              <>
                <NotificationsLogo size={25} />
                <Box display={{ base: 'none', md: 'block' }}>
                  Notifications
                </Box>
              </>
                )
          }

        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={handleClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            { isLoading && <Spinner /> }
            { !isLoading && !notifications && <NoNotifications/>}
            { !isLoading && notifications && (
              notifications.map((notification) => (
                <Notification key={notification.id} notification={notification} onClose={handleClose} />
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
        <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'} _hover={{ bg: 'gray.800' }} p={{ base: 0, md: 3 }} mb={{ base: 3, md: 0 }} gap={3}>
          <Flex alignItems={'center'} gap={3} opacity={notification.isRead ? '0.5' : '1'}>
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
