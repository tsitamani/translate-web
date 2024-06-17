import React, { useState, useEffect } from 'react';
import { Container, VStack, Textarea, Select, Text, Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import debounce from 'lodash.debounce';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');

  const handleTranslate = async (text) => {
    // Placeholder for translation API integration
    // Replace this with actual API call
    setTranslatedText(`Translated (${sourceLang} to ${targetLang}): ${text}`);
  };

  const debouncedTranslate = debounce(handleTranslate, 500);

  useEffect(() => {
    if (inputText) {
      debouncedTranslate(inputText);
    }
    return () => {
      debouncedTranslate.cancel();
    };
  }, [inputText, sourceLang, targetLang]);

  return (
    <Container centerContent maxW="container.lg" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%" spacing={4}>
          <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="bo">藏文</option>
            <option value="lzh">文言文</option>
          </Select>
          <Box as="button" onClick={() => { const temp = sourceLang; setSourceLang(targetLang); setTargetLang(temp); }}><FaExchangeAlt /></Box>
          <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="zh">中文</option>
            <option value="en">英文</option>
            <option value="bo">藏文</option>
            <option value="lzh">文言文</option>
          </Select>
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
          <Box>
            <Textarea
              value={inputText}
              onChange={(e) => {
                const text = e.target.value;
                if (text.length <= 1200) {
                  setInputText(text);
                  setCharCount(text.length);
                }
              }}
              placeholder="Enter text to translate"
              size="md"
            />
            <Text>{charCount}/1200 characters</Text>
          </Box>
          {translatedText && (
            <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>{translatedText}</Text>
            </Box>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;