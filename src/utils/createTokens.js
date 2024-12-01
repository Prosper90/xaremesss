import jwt from "jsonwebtoken";

const maxAge = "2h";

export const createToken = (id) => {
  // Check if the secret is available
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret key is missing in environment variables");
  }

  // Sign the JWT token with userId as payload
  const jwtToken = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });

  return jwtToken;
};

export function generateRandomAlphaNumeric(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
}
