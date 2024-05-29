import { Avatar, Box, Button, Flex, Link, Tooltip } from '@chakra-ui/react'
import { Link as RouteLink } from 'react-router-dom'
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from '../../assets/constants'
import { AiFillHome } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'
import useAuthStore from '../../store/authStore'

const Sidebar = () => {
  const AuthUser = useAuthStore(state => state.user)

  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      text: 'Home',
      link: '/'
    },
    {
      icon: <SearchLogo />,
      text: 'Search'
    },
    {
      icon: <NotificationsLogo />,
      text: 'Notifications'
    },
    {
      icon: <CreatePostLogo />,
      text: 'Create'
    },
    {
      icon: <Avatar size={'sm'} name={AuthUser.username} src={AuthUser.profilePicURL} />,
      text: 'Profile',
      link: `/${AuthUser.username}`
    }
  ]

  const { handleLogout, isLoggingOut } = useLogout()

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
          {
            sidebarItems.map((item, index) => (
              <Tooltip
                key={index}
                hasArrow
                label={item.text}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: 'block', md: 'none' }}
              >
                <Link
                  display={'flex'}
                  to={item.link || null}
                  as={RouteLink}
                  alignItems={'center'}
                  justifyContent={{ base: 'center', md: 'flex-start' }}
                  gap={4}
                  _hover={{ bg: 'whiteAlpha.400' }}
                  borderRadius={6}
                  p={2}
                  w={{ base: 10, md: 'full' }}
                >
                  {item.icon}
                  <Box display={{ base: 'none', md: 'block' }}>
                    {item.text}
                  </Box>
                </Link>
              </Tooltip>
            ))
          }
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
