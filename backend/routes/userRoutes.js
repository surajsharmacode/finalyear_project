
import express from "express";
import { loginUser, logoutUser, signupUser,followUnFollowUser, updateUser,getUserProfile, getSuggestedUsers} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get('/profile/:query', getUserProfile);
router.get('/suggested',protectRoute, getSuggestedUsers);
router.post("/signup",signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id",protectRoute,followUnFollowUser);
router.put("/update/:id",protectRoute, updateUser);

//protectRoute is middleware for follow or unfollow user only if you are login



   



export default router;