import { Container, Flex, Link, Text } from '@chakra-ui/react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTab from '../../components/Profile/ProfileTab'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername'
import { useParams, Link as RouterLink } from 'react-router-dom'

const ProfilePage = () => {
  const { username } = useParams()
  const { isLoading, userProfile } = useGetUserProfileByUsername(username)

  const userNotFound = !isLoading && !userProfile

  if (userNotFound) <UserNotFound/>

  return (
    <Container maxW={'container.lg'} py={5}>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={'full'}
        mx={'auto'}
        flexDirection={'column'}
      >
        <ProfileHeader />
      </Flex>

      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.300'}
        direction={'column'}
      >
        <ProfileTab />
        <ProfilePosts />
      </Flex>
    </Container>
  )
}

export default ProfilePage

const UserNotFound = () => (
  <Flex flexDir={'column'} textAlign={'center'} mx={'auto'}>
    <Text fontSize={'2xl'}>User Not Found</Text>
    <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} mx={'auto'}>
      Go Home
    </Link>
  </Flex>
)
