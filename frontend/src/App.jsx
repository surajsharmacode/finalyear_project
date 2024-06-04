import { Box, Button, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import Header from "./components/Header"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import { useRecoilValue } from "recoil"
import userAtom from "./atoms/userAtom"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import CreatePost from "./components/CreatePost"
import ChatPage from "./pages/ChatPage"

function App() {
  //const [count, setCount] = useState(0)
  const user = useRecoilValue(userAtom);
  console.log("user from app>>",user)
  const{ pathname } = useLocation()

  return (
    <Box position={"relative"} w={"full"}>
    <Container maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}>
    <Header/>
    <Routes>
      <Route path="/" element={ user? <HomePage/>: <Navigate to="/auth"/>}/>
      <Route path="/auth" element={!user ? <AuthPage/> : <Navigate to="/"/>}/>
      <Route path="/update" element={user ? <UpdateProfilePage/> : <Navigate to="/auth"/>}/>
      <Route
						path='/:username'
						element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<AuthPage/>
							)
						}
					/>
      <Route path="/:username/post/:pid" element={<PostPage/>}/>
      <Route path="/chat" element={user? <ChatPage/> : <Navigate to={"/auth"} />}/>
    </Routes>

    {/* {user && <LogoutButton/>} */}
    {/* {user && <CreatePost/>} */}
     
    </Container>
    </Box>
  )
}

export default App
