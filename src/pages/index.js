import { Inter } from 'next/font/google';
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

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

          <Table variant="striped" mt={100}>
            <Thead bg="teal.500" backgroundColor="blue.900">
              <Tr>
                <Th textColor="white">Nome</Th>
                <Th textColor="white">Valor</Th>
                <Th textColor="white">Descrição</Th>
                <Th textColor="white">Estoque</Th>
                <Th textColor="white">Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Tela</Td>
                <Td>400,00</Td>
                <Td>Monitor Lg</Td>
                <Td>200</Td>
                <Td justifyContent="space-between">
                  <Flex>
                    <Button size="sm" fontSize="small" colorScheme="yellow" mr="2">Editar</Button>
                    <Button size="sm" fontSize="small" colorScheme="red" mr="2">Excluir</Button>
                  </Flex>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  )
}
