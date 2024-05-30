import { Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo } from '../../assets/constants'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'
import SidebarItems from './SidebarItems'

const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout()
  const authUser = useAuthStore(state => state.user)

  if (!authUser) return null

  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w={'full'} height={'full'} alignItems={{ base: 'center', md: 'flex-start' }}>
        <Link to={'/'} as={RouteLink} pl={2} display={{ base: 'none', md: 'block' }} cursor={'pointer'} >
          <InstagramLogo />
        </Link>
        <Link to={'/'} as={RouteLink} p={2} display={{ base: 'block', md: 'none' }} cursor={'pointer'} _hover={{ bg: 'whiteAlpha.400' }} borderRadius={6} w={{ base: 10 }}>
          <InstagramMobileLogo />
        </Link>

        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label='logout'
          placement='right'
          ml={1}
          openDelay={500}
          display={{ base: 'block', md: 'none' }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={'center'}
            gap={4}
            _hover={{ bg: 'whiteAlpha.400' }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: 'full' }}
            mt={'auto'}
          >
            <BiLogOut size={25}/>
            <Button display={{ base: 'none', md: 'block' }} isLoading={isLoggingOut} variant={'ghost'} _hover={{ bg: 'transparent' }}>
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  )
}

export default Sidebar
