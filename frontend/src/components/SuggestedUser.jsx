
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import usefollowUnfollow from "../hooks/usefollowUnfollow";


const SuggestedUser = ({ user }) => {

const {handleFollowUnfollow, following, updating} = usefollowUnfollow(user)

	return (
		<Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
			{/* left side */}
			<Flex gap={2} as={Link} to={`${user.name}`}>
				<Avatar src={user.profilePic} />
				<Box>
					<Text fontSize={"sm"} fontWeight={"bold"}>
						{user.name}
					</Text>
					<Text color={"gray.light"} fontSize={"sm"}>
						{user.address}
					</Text>
				</Box>
			</Flex>
			{/* right side */}
			<Button
				size={"sm"}
				color={following ? "black" : "white"}
				bg={following ? "white" : "blue.400"}
				onClick={handleFollowUnfollow}
				isLoading={updating}
				_hover={{
					color: following ? "black" : "white",
					opacity: ".8",
				}}
			>
				{following ? "Unfollow" : "Follow"}
			</Button>
		</Flex>
	);
};

export default SuggestedUser;