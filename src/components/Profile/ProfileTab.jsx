import { Box, Flex, Tab, TabIndicator, TabList, Tabs, Text } from '@chakra-ui/react'
import { BsBookmark, BsGrid3X3, BsSuitHeart } from 'react-icons/bs'
import { useContext } from 'react'
import { TabContext } from '../../contexts/TabContext'

const ProfileTab = () => {
  const { selectedTab, setSelectedTab } = useContext(TabContext)

  console.log(selectedTab)
  return (

    <Flex
      px={{ base: 2, sm: 4 }}
      maxW={'full'}
      mx={'auto'}
      borderTop={'1px solid'}
      borderColor={'whiteAlpha.300'}
      direction={'column'}
    >
      <Tabs variant='unstyled' display={'flex'} alignItems={'center'} flexDir={'column'}>
        <Flex position="relative" >
          <TabList>
            <Tab color={'gray'} _selected={{ color: 'white' }} onClick={() => setSelectedTab('profile') }>
              <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
                <Box fontSize={20}>
                  <BsGrid3X3 />
                </Box>
                <Text fontSize={14} fontWeight={'bold'} display={{ base: 'none', sm: 'block' }}>Posts</Text>
              </Flex>
            </Tab>

            <Tab color={'gray'} _selected={{ color: 'white' }} onClick={() => setSelectedTab('saved') }>
              <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
                <Box fontSize={20}>
                  <BsBookmark />
                </Box>

                <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Saved</Text>
              </Flex>
            </Tab>

            <Tab color={'gray'} _selected={{ color: 'white' }} onClick={() => setSelectedTab('liked') }>
              <Flex alignItems={'center'} p={3} gap={2} cursor={'pointer'} textTransform={'uppercase'} fontWeight={'bold'}>
                <Box fontSize={20}>
                  <BsSuitHeart />
                </Box>

                <Text fontSize={14} display={{ base: 'none', sm: 'block' }}>Likes</Text>
              </Flex>
            </Tab>
          </TabList>

          <TabIndicator height='1px' bg='white' borderRadius='1px' position="absolute" top="0" left="0" />
        </Flex>
      </Tabs>
    </Flex>

  )
}

export default ProfileTab
