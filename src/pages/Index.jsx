// src/pages/Index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Container, VStack, Textarea, Select, Text, Box, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";
import debounce from 'lodash.debounce';

const detectLanguage = (text) => {
  const patterns = {
    zho_Hans: /[\u4e00-\u9fa5]/, // 中文简体
    eng_Latn: /[a-zA-Z]/,         // 英文
    bod_Tibt: /[\u0F00-\u0FFF]/,  // 藏文
    zho_Hant: /[\u4e00-\u9fff]/,  // 文言文（基本等同于中文繁体）
    rus_Cyrl: /[\u0400-\u04FF]/,  // 俄文
  };

  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(text)) {
      return lang;
    }
  }

  return 'eng_Latn'; // 默认英文
};

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('zho_Hans');

  const textareaRef = useRef(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleTranslate = (text) => {
    const params = {
      text: text,
      source: sourceLang,
      target: targetLang,
    };

    console.log('Request params:', params);

    fetch('https://api-fashiai-2024-6-18-2.cpolar.cn/api/v3/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        setTranslatedText(data.result);
      })
      .catch(error => {
        console.error('Translation error:', error);
        setTranslatedText('Error translating text. ' + error.message);
      });
  };

  const debouncedTranslate = debounce(handleTranslate, 1200);

  useEffect(() => {
    if (inputText) {
      let detectedLang = sourceLang;
      if (sourceLang === 'auto') {
        detectedLang = detectLanguage(inputText);
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
            <option value="zho_Hans">中文</option>
            <option value="eng_Latn">英文</option>
            <option value="bod_Tibt">藏文</option>
            <option value="zho_Hant">文言文</option>
            <option value="rus_Cyrl">俄文</option>
          </Select>
          <Box as="button" onClick={() => { const temp = sourceLang; setSourceLang(targetLang); setTargetLang(temp); }}><FaExchangeAlt /></Box>
          <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="zho_Hans">中文 China</option>
            <option value="eng_Latn">英文 English</option>
            <option value="bod_Tibt">藏文 Tibetan</option>
            <option value="zho_Hant">文言文 Wenyan</option>
            <option value="rus_Cyrl">俄文 Russian</option>
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
