import { useState, useEffect } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast } from "@chakra-ui/react";

import Header from '@/components/Header';

import api from "../services/api";

export default function Home() {

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [id, setId] = useState(null);
  const [products, setProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();


  const isValidFormData = () => {
    if (!name) {
      return toast({
        title: "Preencha o campo nome!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
    if (!value) {
      return toast({
        title: "Preencha o campo Valor!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
    if (!description) {
      return toast({
        title: "Preencha o campo de descrição!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
    if (!stockQuantity) {
      return toast({
        title: "Preencha o campo estoque!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }

    if (products.some((product) => product.name === name && product._id !== id)) {
      return toast({
        title: "Produto ja cadastrado!!",
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const handleSubmitCreateProduct = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      const { data } = await api.post("/products", { name, value, description, stockQuantity });
      setProducts(products.concat(data.data));
      setName("");
      setValue("");
      setDescription("");
      setStockQuantity("");
      setIsFormOpen(!isFormOpen);

      toast({
        title: "Produto cadastrado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (_id) => {
    try {
      await api.delete(`/products/${_id}`);
      toast({
        title: "Produto deletado com sucesso!!",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowUpdateClient = (product) => {
    setId(product._id);
    setName(product.name);
    setValue(product.value);
    setDescription(product.description);
    setStockQuantity(product.stockQuantity);
    setIsFormOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;

    try {
      setIsLoading(true);
      await api.put(`products/${id}`, { name, value, description, stockQuantity });
      setName("");
      setValue("");
      setDescription("");
      setStockQuantity("");
      setId(null);
      setIsFormOpen(!isFormOpen);

      toast({
        title: "Atualizado com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    [
      api.get("/products").then(({ data }) => {
        setProducts(data.data);
      }),
    ];
  }, [products]);

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
            <Button 
            colorScheme="green"
            onClick={() => setIsFormOpen(!isFormOpen)}
            >
            {isFormOpen ? "-" : "+"}
            </Button>
          </Flex>

          {isFormOpen ? (
          <VStack 
          as="form" 
          onSubmit={id ? handleUpdateProduct : handleSubmitCreateProduct}
          >
            <FormControl>
              <FormLabel>Nome do Produto</FormLabel>
              <Input
                type="text"
                placeholder="Digite o nome do produto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Valor</FormLabel>
              <Input
                type="number"
                placeholder="Digite o valor do produto"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input type="text"
                placeholder="Digite a descrição do produto"
                wrap="hard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Estoque</FormLabel>
              <Input
                type="number"
                placeholder="Digite o estoque do produto"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />
            </FormControl>

            <Button 
            colorScheme="green" 
            type="submit" 
            mt={6} 
            isLoading={isLoading}>
              {id ? "Atualizar" : "Cadastrar"}
            </Button>
          </VStack>
          ): null}

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
              {products.map((product, index) => (
                  <Tr key={index}>
                    <Td>{product.name}</Td>
                    <Td>{product.value}</Td>
                    <Td>{product.description}</Td>
                    <Td>{product.stockQuantity}</Td>  
                    <Td justifyContent="space-between">
                      <Flex>
                        <Button
                          size="sm"
                          fontSize="small"
                          colorScheme="yellow"
                          mr="2"
                          onClick={() => handleShowUpdateClient(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          fontSize="small"
                          colorScheme="red"
                          mr="2"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Excluir
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
