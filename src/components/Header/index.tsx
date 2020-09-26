import { Flex } from '@chakra-ui/core'
import React from 'react'

// import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  return (
    <Flex bg="purple.100" h="100px" w="full">
      {children}
    </Flex>
  )
}

export default Header
