import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Button, useToast } from "@chakra-ui/react";
import { Portal } from "@chakra-ui/portal";
import { FaLinkedin } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import { IoSchoolOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import usefollowUnfollow from "../hooks/usefollowUnfollow";



const UserHeader = ({user}) => {
    const toast = useToast();
   const currentUser = useRecoilValue(userAtom)  //this is the user that 
   const {handleFollowUnfollow , following, updating} = usefollowUnfollow(user);
   
   console.log(following)

    const copyURL = () => {
		const currentURL = window.location.href;
		navigator.clipboard.writeText(currentURL).then(() => {
			toast({
				title: "Success.",
				status: "success",
				description: "Profile link copied.",
				duration: 3000,
				isClosable: true,
			});
		});
	};

  // const handleFollowUnfollow = async() => {
  //   if(!currentUser){
  //     showToast("Error","Please login to follow","error")
  //     return;
  //   }
  //   if(updating) return;
  //   setUpdating(true)
  //   try {
  //     const res = await fetch(`/api/users/follow/${user._id}`, {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': "application/json",
  //       }
  //     })
  //     const data = await res.json();
  //     if(data.error){
  //       showToast("Error",data.error,"error");
  //       return;
  //     }
  //     if(following){
  //       showToast("Success",`unfollowed ${user.name}`,"success");
  //       user.followers.pop(); //simulate removing from follower
  //     }
  //     else{
  //       showToast("Success",`Followed ${user.name}`,"success");
  //       user.followers.push(currentUser?._id); // simulate adding to follower
  //     }
  //     setFollowing(!following);
  //     console.log(data);
  //   } catch (error) {
  //     console.log("Error",error)
  //   }
  //   finally{
  //     setUpdating(false)
  //   }
  // }

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"}>{user.name}</Text>
        <Flex gap={2} alignItems={"center"}>
        <IoSchoolOutline />
          <Text fontSize={"sm"}>{user.collegeName}</Text>
          <Text
            fontSize={"xs"}
            bg={"gray"}
            color={"gray.light"}
            p={1}
            borderRadius={"full"}
          >
            StuConnect.net
          </Text>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
        <CiLocationOn />
          <Text   fontSize={"xs"}
            bg={"white"}
            color={"gray.dark"}
           >{user.address}</Text>
        </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
            name={user.name}
            src={user.profilePic}  
            size={{
              base: "md",
              md: "xl",
            }}
          />
          )}
            {!user.profilePic && (
              <Avatar
           name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "md",
								md: "xl",
							}}
          ></Avatar>
            )}
          
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {currentUser?._id === user._id && (
        <Link as={RouterLink} to='/update'>
          <Button size={"sm"} bg={"gray"}>Update Profile</Button>
        </Link>
      )}
      {currentUser?._id !== user._id && <Button size={"sm"} bg={"gray"} onClick={handleFollowUnfollow} isLoading={updating}>
        {following ? "unfollow" : "Follow"}
      </Button>}

      
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>{user.followers.length} followers</Text>
            <Box w={"1"} h={"1"} bg={"gray.light"}borderRadius={"full"}></Box>
            <Link color={"gray.light"}>linkedIn.com
            </Link>
        </Flex>
       <Flex>
        <Box className="icon-container">
            <FaLinkedin size={24} cursor={"pointer"}/>
        </Box>
        <Box className='icon-container'>
						<Menu>
							<MenuButton>
								<CgMoreO size={24} cursor={"pointer"} />
							</MenuButton>
							<Portal>
								<MenuList bg={"gray.light"}>
									<MenuItem bg={"gray.light"}
                                     onClick={copyURL}
                                     >
										Copy profile link
									</MenuItem>
								</MenuList>
							</Portal>
						</Menu>
					</Box>
          </Flex>

      </Flex>
      <Flex w={"full"}> 
       <Flex flex={1}  borderBottom={"1.5px solid gray"} justifyContent={"center"} pb={"3"} cursor={"pointer"}> <Text fontWeight={"bold"}>Posts</Text></Flex>
       {/* <Flex flex={1}  borderBottom={"1.5px solid light"} justifyContent={"center"} pb={"3"} color={"gray.light"} cursor={"pointer"}> <Text fontWeight={"bold"}>Replies</Text></Flex> */}
      </Flex>
    </VStack>
  );
};

export default UserHeader;
