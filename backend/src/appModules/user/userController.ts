import { Request, Response } from "express";
import db from "../../database/db";

// create new user
export async function addUser(req: Request, res: Response) {
  console.log("addUser API Hit successful!!");
  const { name, email, password } = req.body;
  console.log("Request body", req.body);
  try {
    await db("users").insert({ name, email, password });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).json({ message: "Error adding user", error: error });
  }
}

// get user
export async function getUser(req: Request, res: Response) {
  console.log("getUser API Hit successful!!");
  const { email } = req.params;

  try {
    const user = await db("users").where({ email }).first();
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Error fetching user", error: error });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  console.log("getAllUsers API Hit successful!!");

  try {
    const users = await db("users").select("*"); // Fetch all users
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res
      .status(500)
      .json({ message: "Error fetching all users", error: error });
  }
}

export async function login(req: Request, res: Response) {
  console.log("login API Hit successful!!");

  try {
    const { email, password } = req.body;
    const user = await db("users").where({ email, password }).first();
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error loggin in");
    return res.status(500).json({ message: "Error logging in", error: error });
  }
}
