import { Inter } from 'next/font/google';
import { Box, Button, Flex, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

import Header from '@/components/Header';

export default function Home() {
  return (
    <Box>
      <Header />
      <Flex align="center" justifyContent="center">
        <Box
          width={800}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          p={20}
          mt="25"
        >
          <Flex justifyContent="flex-end" alignItems="center">
            <Button colorScheme="green" border>+</Button>
          </Flex>

          <VStack as="form">
            <FormControl>
              <FormLabel>Nome do Produto</FormLabel>
              <Input type="text" placeholder="Digite o nome do produto" />
            </FormControl>

            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input type="number" placeholder="Digite o valor do produto" />
            </FormControl>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input type="text" placeholder="Digite a descrição do produto" wrap="hard" />
            </FormControl>

            <FormControl>
              <FormLabel>Estoque</FormLabel>
              <Input type="number" placeholder="Digite o estoque do produto" />
            </FormControl>

            <Button colorScheme="green" type="submit" mt={6}>
              Adicionar
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}
