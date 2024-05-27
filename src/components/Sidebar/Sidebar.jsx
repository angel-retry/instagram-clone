import { Box, Flex, Link } from "@chakra-ui/react"
import {Link as RouteLink} from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants"

const Sidebar = () => {
  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{base: 2, md: 4}}
    >
      <Flex direction={'column'} gap={10} w={'full'} height={'full'} alignItems={'center'}>
        <Link to={'/'} as={RouteLink} pl={2} display={{base: 'none', md: 'block'}} cursor={'pointer'}>
          <InstagramLogo />
        </Link>
        <Link to={'/'} as={RouteLink} p={2} display={{base: 'block', md: 'none'}} cursor={'pointer'} _hover={{bg: 'whiteAlpha.200'}} w={{base:10}}>
          <InstagramMobileLogo />
        </Link>
      </Flex>
    </Box>
  )
}

export default Sidebar
