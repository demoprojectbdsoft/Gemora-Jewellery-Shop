"use server";

import { serverMutation, serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const addReview = async (data: { productId: string; rating: number; comment: string }) => {
  const user = await getUserSession();
  return serverMutation(`/reviews`, { ...data, userId: user?.id });
};

export const getReviews = async (productId: string) => {
  return serverFetch(`/reviews?productId=${productId}`);
};

export const updateReview = async (id: string, data: { rating?: number; comment?: string }) => {
  return serverMutation(`/reviews/${id}`, data, "PATCH");
};

export const deleteReview = async (id: string) => {
  return serverMutation(`/reviews/${id}`, {}, "DELETE");
};