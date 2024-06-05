import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import SuggestedUser from '../SuggestedUsers/SuggestedUser'

const Follow = ({ userId }) => {
  const { isLoading, userProfile } = useGetUserProfileById(userId)

  return (
    <>
      {isLoading && (
        <Flex gap={3} py={3}>
          <SkeletonCircle size='10' />
          <Skeleton>
            <div>contents wrapped</div>
          </Skeleton>
        </Flex>
      )}
      {!isLoading && <SuggestedUser user={userProfile} />}
    </>
  )
}

export default Follow
