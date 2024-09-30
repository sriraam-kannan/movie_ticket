import { Router } from "express";
import { addUser, getAllUsers, getUser } from "./userController";

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

export default router;
