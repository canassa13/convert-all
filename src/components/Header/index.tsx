import { Flex, Heading, Box, Text } from '@chakra-ui/core'
import React from 'react'
import { FiMenu } from 'react-icons/fi'
const Header: React.FC = props => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const MenuItems: React.FC = ({ children }) => (
    <Text
      mt={{ base: 4, md: 0 }}
      mr={20}
      display="block"
      fontWeight="bold"
      color="gray.200"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-4px)', color: 'gray.300' }}
    >
      {children}
    </Text>
  )

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      h="80px"
      bg="gray.800"
      color="white"
      paddingX={5}
      {...props}
    >
      <Flex align="center">
        <Heading as="h1" size="lg" color="gray.200">
          Convert All
        </Heading>
      </Flex>

      <Box
        display={{ sm: 'flex', md: 'none' }}
        onClick={handleToggle}
        alignItems="center"
        justifyContent="center"
        height={10}
        width={10}
        _hover={{ bg: 'gray.900' }}
        borderRadius={5}
      >
        <FiMenu color="white" />
      </Box>

      <Box
        display={{ sm: 'none', md: 'flex' }}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <MenuItems>Text</MenuItems>
        <MenuItems>Examples</MenuItems>
        <MenuItems>
          <a
            href="https://canassa.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </MenuItems>
      </Box>
    </Flex>
  )
}

export default Header
