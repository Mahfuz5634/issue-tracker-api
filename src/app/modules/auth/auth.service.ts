import { db } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET as string;

export const AuthService = {
  //signup function
  async signup(playload: any) {
    const hashedPassword = await bcrypt.hash(playload.password, SALT_ROUND);

    const result = await db.query(
      `
            INSERT INTO users(name,email,password,role)
            VALUES($1,$2,$3,$4)
            RETURNING id,name,email,role,created_at,updated_at `,
      [
        playload.name,
        playload.email,
        hashedPassword,
        playload.role || "contributor",
      ],
    );
    return result.rows[0];
  },

  //login function
  async login(playload: any) {
    const userRes = await db.query(
      `SELECT * FROM users WHERE email= $1
            `,
      [playload.email],
    );
    const user = userRes.rows[0];
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(playload.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as NonNullable<
          jwt.SignOptions["expiresIn"]
        >,
      },
    );
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  },
};
