import { Box, Flex, Tab, TabList, Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'

const ProfileTabList = () => {
  return (
      <TabList>
        <Tab color={'gray'} _selected={{ color: 'white' }}>
          <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
            <Box fontSize={20}>
              <BsGrid3X3 />
            </Box>
            <Text fontSize={14} fontWeight={'bold'} display={{ base: 'none', sm: 'block' }}>Posts</Text>
          </Flex>
        </Tab>

        <Tab color={'gray'} _selected={{ color: 'white' }}>
          <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
            <Box fontSize={20}>
              <BsBookmark />
            </Box>

            <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Saved</Text>
          </Flex>
        </Tab>

        <Tab color={'gray'} _selected={{ color: 'white' }}>
          <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
            <Box fontSize={20}>
              <BsSuitHeart />
            </Box>

            <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Likes</Text>
          </Flex>
        </Tab>
      </TabList>
  )
}

export default ProfileTabList
