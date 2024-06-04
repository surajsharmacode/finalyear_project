
import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader';
//import UserPosts from '../components/UserPosts';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex,Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import useGetUserProfile from '../hooks/useGetUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

const UserPage = () => {
  const {user , loading} = useGetUserProfile()
  const {username} = useParams()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const showToast = useShowToast()
	useEffect(() => {
		const getPosts = async () => {
			if (!user) return;
			setFetchingPosts(true);
			try {
				const res = await fetch(`/api/posts/user/${username}`);
				const data = await res.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
				setPosts([]);
			} finally {
				setFetchingPosts(false);
			}
		};

		getPosts();
	}, [username, showToast, setPosts, user]);


  if(!user && loading) {
    return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
  }
  if (!user && !loading) return <h1>User not found</h1>;
  //if(!user) return null;
 
  return( <>
    <UserHeader user={user}/>
    {/* <UserPosts postTitle={"let us talk about machine learning"} postImg={"https://www.wordstream.com/wp-content/uploads/2021/07/machine-learning1-1.png"}/>
    <UserPosts postTitle={"chatgpt 4.0 applications"} postImg={"https://lh7-us.googleusercontent.com/1kS5joZIL861B_lWzUcH7GrnuVrtongaGm5o3wVD-4S_F5rgHm4sQoPRYz7Qi5ugVkr48RUIzIB98w5kuLRboYuZAvhiSUIPzTrocq6RaTxofx3wZqv5VGKxsqscWF8Jv9h1WmgCOsiZQ2OQmEFbfy0"}/> */}
    {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
			{fetchingPosts && (
				<Flex justifyContent={"center"} my={12}>
					<Spinner size={"xl"} />
				</Flex>
			)}

			{posts.map((post) => (
				<Post key={post._id} post={post} postedBy={post.postedBy} />
			))}
  </>)
  
}

export default UserPage;
