import { Box, Flex, Text, VStack, Link, Spinner } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers'

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers()

  if (isLoading) return null

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {!isLoading && suggestedUsers.length !== 0 && (
        <>

          <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'} >
            <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
              Suggested for you
            </Text>

            <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
              See All
            </Text>
          </Flex>

          {
            suggestedUsers.map((user) => (
              <SuggestedUser key={user.uid} user={user} />
            ))
          }

        </>
      )}

      {
        !isLoading && suggestedUsers.length === 0 && (
          <VStack >
            <Text fontSize={'12px'}>there are no suggested users.</Text>
          </VStack>
        )
      }

      {isLoading && (
        <Flex justifyContent={'center'} alignItems={'center'}>
          <Spinner />
        </Flex>
      )}

      <Box fontSize={12} color={'gray.500'} mt={5} alignSelf={'flex-start'}>
        © 2023 Built By{' '}
        <Link href='https://www.youtube.com/@asaprogrammer_' target='_blank' color={'blue.500'} fontSize={12}>
          As a Programmer
        </Link>
      </Box>
    </VStack>
  )
}

export default SuggestedUsers
