import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from '@chakra-ui/react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore()
  const authUser = useAuthStore(state => state.user)

  const visitingOwnProfileAndAuth = authUser && userProfile.username === authUser.username

  const visitingAnotherProfileAndAuth = authUser && userProfile.username !== authUser.username

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
        <Avatar name={userProfile.username} src={userProfile.profilePicURL} alt={userProfile.username} />
      </AvatarGroup>

      <VStack alignItems={'start'} gap={2} mx={'auto'}
       flex={1}>
        <Flex
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          justifyContent={{ base: 'center', sm: 'flex-start' }}
          alignItems={'center'}
          w={'full'}
        >
          <Text fontSize={{ base: 'sm', md: 'lg' }}>{userProfile.username}</Text>

          {visitingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button bg={'white'} color={'black'} _hover={{ bg: 'whiteAlpha.800' }} size={{ base: 'xs', md: 'sm' }}>
                Edit Profile
              </Button>
            </Flex>
          )
          }

          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button bg={'white'} color={'black'} _hover={{ bg: 'whiteAlpha.800' }} size={{ base: 'xs', md: 'sm' }}>
                Follow
              </Button>
            </Flex>
          )
          }

        </Flex>

        <Flex gap={{ base: 2, sm: 4 }} alignItems={'center'}>
          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: 'xs', md: 'sm' }}>
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>
        </Flex>

        <Flex alignSelf={{ base: 'center', sm: 'flex-start' }}>
          <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
        </Flex>

        <Text fontSize={'sm'} alignSelf={{ base: 'center', sm: 'flex-start' }}>{userProfile.bio}</Text>
      </VStack>
    </Flex>
  )
}

export default ProfileHeader
