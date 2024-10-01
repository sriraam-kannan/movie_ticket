import { Router } from "express";
import { addUser, getAllUsers, getUser, login } from "./userController";

const router = Router();

router.post("/addUser", (req, res) => {
  addUser(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error:", e });
  });
});
router.get("/getUser/:email", (req, res) => {
  getUser(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error:", e });
  });
});

router.get("/getAllUsers", (req, res) => {
  getAllUsers(req, res).catch((e) => {
    console.error(e);
    res.status(500).send({ message: "Internal server error:", e });
  });
});

router.post("/login", (req, res) => {
  login(req, res).catch((e) => {
    console.error(e);
    res.status(404).send({ message: "User not found, please sign-up" });
  });
});
export default router;
