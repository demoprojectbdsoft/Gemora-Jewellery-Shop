import React from "react";
import { getUsers } from "@/lib/api/user";
import UsersClient from "./UsersClient";

export const dynamic = "force-dynamic";

interface AdminUsersPageProps {
  searchParams: Promise<{
    search?: string;
    role?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  // Build query string here in page.tsx to keep helper functions simple
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.role && params.role !== "ALL" && params.role !== "All") query.set("role", params.role);
  if (params?.status && params.status !== "ALL" && params.status !== "All") query.set("status", params.status);
  if (params?.sort) query.set("sort", params.sort);
  query.set("page", String(page));
  query.set("limit", String(limit));

  const usersRes = await getUsers(query.toString());

  const users = Array.isArray(usersRes?.data?.users)
    ? usersRes.data.users
    : Array.isArray(usersRes?.data)
    ? usersRes.data
    : Array.isArray(usersRes)
    ? usersRes
    : [];

  const pagination = usersRes?.data?.pagination ?? {
    page,
    limit,
    total: usersRes?.data?.total ?? users.length,
    totalPages: Math.max(1, Math.ceil((usersRes?.data?.total ?? users.length) / limit)),
  };

  return (
    <UsersClient
      initialUsers={users}
      pagination={pagination}
    />
  );
}
