import { serverFetch } from "../core/server";

export const getSlides = async (query?: string) => {
  return serverFetch(`/slides${query ? `?${query}` : ""}`);
};
