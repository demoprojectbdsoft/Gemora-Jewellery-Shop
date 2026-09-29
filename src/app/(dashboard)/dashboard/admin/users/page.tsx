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

  const usersRes = await getUsers({
    ...params,
    page,
    limit,
  });

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
