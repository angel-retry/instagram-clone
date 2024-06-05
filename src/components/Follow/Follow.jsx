import useGetUserProfileById from '../../hooks/useGetUserProfileById'
import SuggestedUser from '../SuggestedUsers/SuggestedUser'

const Follow = ({ userId }) => {
  console.log('userId', userId)
  const { isLoading, userProfile } = useGetUserProfileById(userId)

  if (isLoading) return null
  console.log('userProfile', userProfile)
  return (
    <>
    {!isLoading && <SuggestedUser user={userProfile} />}

    </>
  )
}

export default Follow
