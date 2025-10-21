import { hash, verify } from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "./app/api/error.js";
import { Request } from "express";

const TOKEN_ISSUER = "chirpy";

export async function hashPassword(password: string) {
    const hashedPassword = await hash(password);
    return hashedPassword;
}

export async function checkPasswordHash(password: string, hash: string) {
    const isValid = await verify(hash, password);
    return isValid;
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userId: string, expiresIn: number, secret: string): string {

    const payload: payload = {
        iss: TOKEN_ISSUER,
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresIn,
    }

    return jwt.sign(payload, secret, { algorithm: "HS256" });
}

export function validateJWT(tokenString: string, secret: string): string {
    let decoded: payload;
    try {
      decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch (e) {
      throw new UnauthorizedError("Invalid token");
    }
  
    if (decoded.iss !== TOKEN_ISSUER) {
      throw new UnauthorizedError("Invalid issuer");
    }
  
    if (!decoded.sub) {
      throw new UnauthorizedError("No user ID in token");
    }
  
    return decoded.sub;
}

export function getBearerToken(req: Request): string {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new UnauthorizedError("No authorization header");
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    throw new UnauthorizedError("Invalid authorization type");
  }

  if (!token) {
    throw new UnauthorizedError("No token provided");
  }

  return token;
}