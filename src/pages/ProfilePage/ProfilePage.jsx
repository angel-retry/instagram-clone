import { Box, Container, Flex, Link, Skeleton, SkeletonCircle, Tab, TabIndicator, TabPanel, TabPanels, Tabs, Text, VStack } from '@chakra-ui/react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileTabList from '../../components/Profile/ProfileTabList'
import useGetUserProfileByUsername from '../../hooks/useGetUserProfileByUsername'
import { useParams, Link as RouterLink } from 'react-router-dom'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import { createContext } from 'react'

const ProfilePage = () => {
  const { username } = useParams()
  const { isLoading, userProfile } = useGetUserProfileByUsername(username)

  const userNotFound = !isLoading && !userProfile

  if (userNotFound) return <UserNotFound/>

  const TabContext = createContext()

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
        {!isLoading && userProfile && <ProfileHeader/>}
        {isLoading && <ProfileHeaderSkeleton/>}

      </Flex>

      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={'full'}
        mx={'auto'}
        borderTop={'1px solid'}
        borderColor={'whiteAlpha.300'}
        direction={'column'}
      >
        <Tabs variant='unstyled' display={'flex'} alignItems={'center'} flexDir={'column'}>
        <Flex position="relative" >
          <ProfileTabList />
          <TabIndicator height='1px' bg='white' borderRadius='1px' position="absolute" top="0" left="0" />
        </Flex>
        <TabPanels>
          <TabPanel>
            <ProfilePosts type='profile' />
          </TabPanel>
          <TabPanel>
           <ProfilePosts type='saved' />
          </TabPanel>
          <TabPanel>
           <ProfilePosts type='liked' />
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Flex>
    </Container>
  )
}

export default ProfilePage

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: 'column', sm: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SkeletonCircle size={24} />

      <VStack alignItems={{ base: 'center', sm: 'flex-start' }} gap={2} mx={'auto'} flex={1}>
        <Skeleton height={'12px'} w={'150px'} />
        <Skeleton height={'12px'} w={'100px'} />
      </VStack>
    </Flex>
  )
}

const UserNotFound = () => (
  <Flex flexDir={'column'} textAlign={'center'} mx={'auto'}>
    <Text fontSize={'2xl'}>User Not Found</Text>
    <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} mx={'auto'}>
      Go Home
    </Link>
  </Flex>
)
