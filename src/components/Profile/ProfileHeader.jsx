import { Avatar, AvatarGroup, Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import EditProfile from './EditProfile'
import useFollowUser from '../../hooks/useFollowUser'
import ProfileFollowModal from './ProfileFollowModal'
import { useState } from 'react'

const ProfileHeader = () => {
  const [followModal, setFollowModal] = useState(null)
  console.log('followModal', followModal)
  const { userProfile } = useUserProfileStore()
  const authUser = useAuthStore(state => state.user)

  const { isOpen: isOpenEditProfile, onOpen: onOpenEditProfile, onClose: onCloseEditProfile } = useDisclosure()
  const { isOpen: isOpenFollowModal, onOpen: onOpenFollowModal, onClose: onCloseFollowModal } = useDisclosure()

  const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(userProfile.uid)

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
              <Button bg={'white'} color={'black'} _hover={{ bg: 'whiteAlpha.800' }} size={{ base: 'xs', md: 'sm' }} onClick={onOpenEditProfile}>
                Edit Profile
              </Button>
            </Flex>
          )
          }

          {visitingAnotherProfileAndAuth && (
            <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
              <Button bg={'blue.500'} color={'white'} _hover={{ bg: 'blue.600' }} size={{ base: 'xs', md: 'sm' }} onClick={handleFollowUser} isLoading={isUpdating}>
                {isFollowing ? 'unFollow' : 'follow'}
              </Button>
            </Flex>
          )
          }

        </Flex>

        <Flex gap={{ base: 2, sm: 4 }} alignItems={'center'}>
          <Text fontSize={{ base: 'xs', md: 'sm' }} >
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>

          <Text fontSize={{ base: 'xs', md: 'sm' }} onClick={() => {
            setFollowModal('followers')
            onOpenFollowModal()
          }} cursor={'pointer'} >
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.followers.length}
            </Text>
            Followers
          </Text>

          <Text fontSize={{ base: 'xs', md: 'sm' }} onClick={() => {
            setFollowModal('following')
            onOpenFollowModal()
          }} cursor={'pointer'}>
            <Text as={'span'} fontWeight={'bold'} mr={1}>
              {userProfile.following.length}
            </Text>
            Following
          </Text>

          <ProfileFollowModal isOpen={isOpenFollowModal} onClose={onCloseFollowModal} followModal={followModal} />
        </Flex>

        <Flex alignSelf={{ base: 'center', sm: 'flex-start' }}>
          <Text fontSize={'sm'} fontWeight={'bold'}>{userProfile.fullName}</Text>
        </Flex>

        <Text fontSize={'sm'} alignSelf={{ base: 'center', sm: 'flex-start' }}>{userProfile.bio}</Text>
      </VStack>

      {isOpenEditProfile && <EditProfile isOpen={isOpenEditProfile} onClose={onCloseEditProfile}/>}
    </Flex>
  )
}

export default ProfileHeader
