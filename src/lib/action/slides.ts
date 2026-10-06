"use server";

import { SlideItem } from "@/types";
import { serverMutation } from "../core/server";
import { getUserSession } from "../core/session";

export const addSlide = async (data: Partial<SlideItem> | Record<string, unknown>) => {
  const user = await getUserSession();
  return serverMutation(`/slides`, { ...data, ownerId: user?.id });
};

export const updateSlide = async (id: string, data: Partial<SlideItem> | Record<string, unknown>) => {
  return serverMutation(`/slides/${id}`, data, "PATCH");
};

export const deleteSlide = async (id: string) => {
  return serverMutation(`/slides/${id}`, {}, "DELETE");
};
