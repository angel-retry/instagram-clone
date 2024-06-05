import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

import useUserProfileStore from '../../store/userProfileStore'
import Follow from '../Follow/Follow'

const ProfileFollowModal = ({ isOpen, onClose, followModal }) => {
  const profileUser = useUserProfileStore(state => state.userProfile)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>{followModal === 'follower' ? 'Followers' : 'Following'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              followModal === 'followers' && profileUser.followers.length > 0 && (
                profileUser.followers.map(follower => (
                  <Follow key={follower} userId={follower}/>
                ))
              )
            }
            {
              followModal === 'following' && profileUser.following.length > 0 && (
                profileUser.following.map(following => (
                  <Follow key={following} userId={following}/>
                ))
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ProfileFollowModal
