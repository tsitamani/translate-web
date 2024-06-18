import React from 'react';
import { Box, Container, Flex, Text, Select } from "@chakra-ui/react";
import { useLanguage } from '../context/LanguageContext';

const Layout = ({ children }) => {
  const { language, changeLanguage } = useLanguage();

  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg="blue.500" color="white" py={4}>
        <Container maxW="container.lg" display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl">FashiAI 翻译</Text>
          <Select value={language} onChange={(e) => changeLanguage(e.target.value)} width="200px">
            <option value="zho_Hans">中文</option>
            <option value="eng_Latn">英文</option>
            <option value="bod_Tibt">藏文</option>
            <option value="rus_Cyrl">俄文</option>
          </Select>
        </Container>
      </Box>
      <Container maxW="container.lg" py={4} flex="1">
        {children}
      </Container>
      <Box as="footer" bg="gray.700" color="white" py={4}>
        <Container maxW="container.lg">
          <Text fontSize="sm">© 2024 FashiAI. 版权所有.</Text>
        </Container>
      </Box>
    </Flex>
  );
};

export default Layout;
