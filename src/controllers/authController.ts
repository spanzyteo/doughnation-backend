import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { createJWT } from "../utils/jwt";
import prisma from "../prismaClient";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Email already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = createJWT({ userId: user.id, name: user.name });

  return res.status(StatusCodes.CREATED).json({
    user: { id: user.id, name: user.name },
    token,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body 

  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid Credentials"})
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid credentials'})
  }

  const token = createJWT({ userId: user.id, name: user.name})

  return res.status(StatusCodes.OK).json({
    user: { id: user.id, name: user.name },
    token
  })
}

export { register, login }