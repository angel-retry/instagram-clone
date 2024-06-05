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

const ProfileFollowModal = ({ isOpen, onClose }) => {
  const profileUser = useUserProfileStore(state => state.userProfile)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Followers</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              profileUser.followers.length > 0 && (
                profileUser.followers.map(follower => (
                  <Follow key={follower} userId={follower}/>
                ))
              )
            }
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default ProfileFollowModal
