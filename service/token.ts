"use client"; // Ensure this runs only on the client side

import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "fallback-secret";

/**
 * @param {string} token - The token to encrypt.
 * @returns {string} The encrypted token.
 */
export const encryptToken = (token: string): string => {
  if (typeof window === "undefined") return ""; // Prevent execution on the server
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

/**
 * Decrypts a token using AES decryption.
 * @param {string} encryptedToken - The encrypted token.
 * @returns {string} The decrypted token.
 */
export const decryptToken = (encryptedToken: string): string => {
  if (typeof window === "undefined") return ""; // Prevent execution on the server
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

/**
 * Stores an encrypted token in cookies.
 * @param {string} token - The token to be encrypted and stored.
 * @param {number} expiresIn - Expiration time in days.
 */
export const setToken = (token: string, expiresIn: number) => {
  const encryptedToken = encryptToken(token);
  Cookies.set("tokenData", encryptedToken, {
    expires: expiresIn,
    sameSite: "Strict",
    secure: process.env.NODE_ENV === "production",
  });
};

/**
 * Retrieves and decrypts the token from cookies.
 * @returns {string | undefined} The decrypted token, or undefined if not found.
 */
export const getToken = (): string | undefined => {
  const encryptedToken = Cookies.get("tokenData");
  return encryptedToken ? decryptToken(encryptedToken) : undefined;
};

/**
 * Removes the token from cookies.
 */
export const removeToken = () => {
  Cookies.remove("tokenData");
};