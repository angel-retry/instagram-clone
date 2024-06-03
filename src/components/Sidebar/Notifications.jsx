import { Tooltip, Box, Flex } from '@chakra-ui/react'
import { NotificationsLogo } from '../../assets/constants'
import useGetNotifications from '../../hooks/useGetNotifications'

const Notifications = () => {
  const { notifications } = useGetNotifications()

  return (
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
      >
        <NotificationsLogo size={25} />
        <Box display={{ base: 'none', md: 'block' }}>
          Notifications
        </Box>
      </Flex>

    </Tooltip>
  )
}

export default Notifications
