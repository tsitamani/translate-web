import React, { useState, useEffect, useRef } from 'react';
import { franc } from 'franc';
import { Container, VStack, Textarea, Select, Text, Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import debounce from 'lodash.debounce';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('zh');

  const textareaRef = useRef(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleTranslate = async (text) => {
    // Placeholder for translation API integration
    // Replace this with actual API call
    setTranslatedText(`Translated (${sourceLang} to ${targetLang}): ${text}`);
  };

  const debouncedTranslate = debounce(handleTranslate, 500);

  useEffect(() => {
    if (inputText) {
      let detectedLang = sourceLang;
      if (sourceLang === 'auto') {
        detectedLang = franc(inputText);
        if (detectedLang === 'und') {
          detectedLang = 'en'; // default to English if language is undetermined
        }
      }
      setSourceLang(detectedLang);
      debouncedTranslate(inputText);
    }
    return () => {
      debouncedTranslate.cancel();
    };
  }, [inputText, targetLang, sourceLang]);

  return (
    <Container centerContent maxW="container.lg" py={10} bg="gray.50">
      <VStack spacing={4} width="100%">
        <HStack width="100%" spacing={4}>
          <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="auto">Auto Detect</option>
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
          <Box bg="white" p={4} borderWidth="1px" borderRadius="md">
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
              minHeight="150px"
              resize="none"
              ref={textareaRef}
              onInput={handleInput}
              _focus={{ boxShadow: "none", borderColor: "white" }}
              _hover={{ borderColor: "white" }}
              bg="white"
            />
            <Text>{charCount}/1200 characters</Text>
          </Box>
          {translatedText && (
            <Box bg="gray.100" p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text>{translatedText}</Text>
            </Box>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;