import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import authScreenAtom from '../atoms/authAtom';
import { useSetRecoilState } from 'recoil';
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const setAuthScreen = useSetRecoilState(authScreenAtom);
    const [inputs, setInputs] = useState({
         name: '',
         collegeName: '',
         address: '',
         email: '',
         password: '',
    })
    const toast = useToast();

    const handleSignup = async () => {
    // console.log(inputs)
      try {
        const res = await fetch("/api/users/signup",{
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
           body: JSON.stringify(inputs)
        })
        const data = await res.json()
        console.log("data",data);
        if(data.error){
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            duration: 3000,
            isClosable: true,
          })
          return
        }     
        localStorage.setItem("user-info",JSON.stringify(data));
      } catch (error) {
        console.log("Error in signup",error)
      }
    }
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'start'}
        >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input type="text"
                    onChange={(e) => setInputs({...inputs,name: e.target.value})}
                    value={inputs.name}
                     />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>College or school Name</FormLabel>
                    <Input type="text" 
                       onChange={(e) => setInputs({...inputs,collegeName: e.target.value})}
                       value={inputs.collegeName}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <HStack>
              <Box>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input type="text"
                       onChange={(e) => setInputs({...inputs,address: e.target.value})}
                       value={inputs.address}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" 
                  onChange={(e) => setInputs({...inputs, email: e.target.value})}
                  value={inputs.email}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
                   onChange={(e) => setInputs({...inputs, password: e.target.value})}
                   value={inputs.password}
                   />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handleSignup}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link to="/login" color={'blue.400'}
                  onClick={() => setAuthScreen("login")}
                  >Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }