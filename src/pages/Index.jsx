import React, { useState } from 'react';
import { Container, VStack, Textarea, Button, Select, Text, Box, HStack } from "@chakra-ui/react";
import { FaExchangeAlt } from "react-icons/fa";

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('zh');

  const handleTranslate = async () => {
    // Placeholder for translation API integration
    // Replace this with actual API call
    setTranslatedText(`Translated (${sourceLang} to ${targetLang}): ${inputText}`);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%" spacing={4}>
          <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
            <option value="en">English</option>
            <option value="zh">Chinese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
          </Select>
          <Button onClick={() => { const temp = sourceLang; setSourceLang(targetLang); setTargetLang(temp); }}><FaExchangeAlt /></Button>
          <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
            <option value="en">English</option>
            <option value="zh">Chinese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="ru">Russian</option>
          </Select>
        </HStack>
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
        <Button colorScheme="blue" onClick={handleTranslate}>Translate</Button>
        {translatedText && (
          <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text>{translatedText}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;