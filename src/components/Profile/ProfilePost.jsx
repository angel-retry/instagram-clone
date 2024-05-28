import { Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const ProfilePost = ({ img }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <GridItem
      cursor={'pointer'}
      borderRadius={4}
      overflow={'hidden'}
      border={'1px solid'}
      borderColor={'whiteAlpha.300'}
      position={'relative'}
      aspectRatio={1 / 1}
      onClick={onOpen}
    >
      <Flex
        opacity={0}
        _hover={{ opacity: 1 }}
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={'blackAlpha.700'}
        transition={'all 0.3s ease'}
        zIndex={1}
        justifyContent={'center'}
      >
        <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
          <Flex alignItems={'center'}>
            <AiFillHeart size={20} />
            <Text fontWeight={'bold'} ml={2}>
              12
            </Text>
          </Flex>

          <Flex alignItems={'center'}>
            <FaComment size={20} />
            <Text fontWeight={'bold'} ml={2}>
              12
            </Text>
          </Flex>
        </Flex>

      </Flex>

      <Image src={img} alt='profile post' w={'full'} h={'full'} objectFit={'cover'} objectPosition={'center'} />

      </GridItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={'black'} pb={5}>
            <Flex gap={4} w={{ base: '90%', sm: '70%', md: 'full' }} mx={'auto'}>
              <Box
                borderRadius={4}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'whiteAlpha.300'}
                flex={1.5}
              >
                <Image src={img} alt='profile post' />
              </Box>

              <Flex flex={1} flexDir={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <Flex alignItems={'center'} gap={4}>
                    <Avatar src='/profilepic.png' name="as a programmer" size={'sm'} />

                    <Text fontWeight={'bold'} fontSize={12}>
                      asaprogrammer_
                    </Text>
                  </Flex>

                  <Box _hover={{ color: 'red.600', bg: 'whiteAlpha.300' }} borderRadius={4} p={1}>
                    <MdDelete size={20} cursor={'pointer'}/>
                  </Box>
                </Flex>

                <Divider my={4} bg={'gray.500'} />

              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>

  )
}

export default ProfilePost
