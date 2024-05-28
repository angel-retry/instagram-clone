import { Avatar, AvatarGroup, Flex } from '@chakra-ui/react'

const ProfileHeader = () => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}>
      <AvatarGroup size={{ base: 'xl', md: '2xl' }} justifySelf={'center'} alignSelf={'flex-start'} mx={'auto'}>
        <Avatar name='As a Programmer' src='/profilepic.png' alt='As a Programmer' />
      </AvatarGroup>
    </Flex>
  )
}

export default ProfileHeader
