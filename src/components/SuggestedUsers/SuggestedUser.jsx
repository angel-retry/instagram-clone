import { Avatar, Box, Flex, VStack } from '@chakra-ui/react'

const SuggestedUser = ({ name, followers, avatar }) => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={4}>
        <Avatar src={avatar} name={name} size={'md'} />

        <VStack spacing={2} alignItems={'flex-start'}>
          <Box fontSize={12} fontWeight={'bold'}>
            {name}
          </Box>
          <Box fontSize={11} color={'gray.500'}>
            {followers} follwers
          </Box>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default SuggestedUser
