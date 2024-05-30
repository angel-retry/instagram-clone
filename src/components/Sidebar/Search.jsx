import { Box, Flex, Tooltip } from '@chakra-ui/react'
import { SearchLogo } from '../../assets/constants'

const Search = () => {
  return (
    <Tooltip
      hasArrow
      label={'Search'}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}
    >
      <Flex
        alignItems={'center'}
        justifyContent={{ base: 'center', md: 'flex-start' }}
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
      >
        <SearchLogo size={25} />
        <Box display={{ base: 'none', md: 'block' }}>
          Search
        </Box>
      </Flex>
    </Tooltip>
  )
}

export default Search
