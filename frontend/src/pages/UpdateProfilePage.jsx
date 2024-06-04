import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar, 
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';
  
  export default function UpdateProfilePage() {

    const [user, setUser] = useRecoilState(userAtom);


    const [inputs,setInputs] = useState({
        name: user.name,
        collegeName: user.collegeName,
        address: user.address,
        bio: user.bio,
        email: user.email,
        password: "",
    });
    const fileRef = useRef(null);
    const [updating, setUpdating] = useState(false)
    const showToast = useShowToast

    const { handleImageChange, imgUrl } = usePreviewImg();
    //console.log(user,"user is here")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(updating) return;
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
			});
			const data = await res.json(); // updated user object
            if(data.error){
                showToast("Error",data.error,'error');
                return;
            }
            showToast("Success", "Profile updated successfully", "success");
            console.log("updated data from UpdateProfilePage",data)
            setUser(data)
            localStorage.setItem("user-info",JSON.stringify(data));
           
        } catch (error) {
            showToast("Error",error,'error')
        }
        finally{
          setUpdating(false);
        }
    }
    return (
      <form onSubmit={handleSubmit}>
      <Flex
        align={'center'}
        justify={'center'}
        my={6}
     //   bg={useColorModeValue('gray.50', 'gray.800')}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: 'xl', sm: '3xl' }}>
            Update profile
          </Heading>
          <FormControl id="userName">
            <FormLabel>User profile</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={"md"} src={ imgUrl || user.profilePic}/>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Change profile pic</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
              </Center>
            </Stack>
          </FormControl>
          <FormControl >
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.name}
              onChange={(e) => setInputs({...inputs,name: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>College Name</FormLabel>
            <Input
              placeholder=" college Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.collegeName}
              onChange={(e) => setInputs({...inputs, collegeName: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="address"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.address}
              onChange={(e) => setInputs({...inputs, address: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="write your bio.."
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.bio}
              onChange={(e) => setInputs({...inputs, bio: e.target.value})}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({...inputs, email: e.target.value})}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type='submit'
              isLoading={updating}
              >
              update
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    );
  }