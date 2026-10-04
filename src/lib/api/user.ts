import { serverFetch } from "../core/server";

export const getUserById = async (userId: string) => {
  return serverFetch(`/users/${userId}`);
};

export const getUsers = async (query?: string) => {
  return serverFetch(`/users${query ? `?${query}` : ""}`);
};