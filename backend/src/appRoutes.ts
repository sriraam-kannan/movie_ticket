import { Router } from "express";
import userRoutes from "../src/appModules/user/userRoutes";
import movieRoutes from "../src/appModules/movies/moviesRouter";

const router = Router();

router.use("/user", userRoutes);
router.use("/movies", movieRoutes);

export default router;
