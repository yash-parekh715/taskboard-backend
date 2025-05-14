import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

import prisma from "../db/db.config.js";

// const prisma = new PrismaClient();

export const signup = async (req, res) => {
  console.log("Signup request received");
  const { email, password, username } = req.body;
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) return res.status(400).json({ error: "Email already in use." });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, username }
  });

  res.status(201).json({ message: "User created, kindly login now", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Incorrect password" });

  const token = signToken({ userid: user.userid, username: user.username });
  res.json({ token });
};
