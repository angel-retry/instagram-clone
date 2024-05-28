import { Box, Flex, Text, VStack, Link } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      <Flex alignItems={'center'} justifyContent={'space-between'} w={'full'}>
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
          Suggested for you
        </Text>

        <Text fontSize={12} fontWeight={'bold'} _hover={{ color: 'gray.400' }} cursor={'pointer'}>
          See All
        </Text>
      </Flex>

      <SuggestedUser name="lulu" followers={1392} avatar='/img1.png' />
      <SuggestedUser name="popo" followers={500} avatar='/img2.png' />
      <SuggestedUser name="dede" followers={780} avatar='/img3.png' />

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