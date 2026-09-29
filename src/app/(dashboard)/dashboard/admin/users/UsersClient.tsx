"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  Input,
  Button,
  Select,
  ListBox,
  Pagination,
} from "@heroui/react";
import {
  Users,
  Search,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Ban,
  Mail,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/action/user";

const ROLE_OPTIONS = [
  { id: "admin", label: "Admin" },
  { id: "customer", label: "Customer" },
];

const STATUS_OPTIONS = [
  { id: "active", label: "Active" },
  { id: "suspended", label: "Suspended" },
];

const FILTER_TABS = ["All", "Admin", "Customer"];
const STATUS_FILTER_TABS = ["All", "Active", "Suspended"];

const SORT_OPTIONS = [
  { key: "newest", label: "Newest First" },
  { key: "oldest", label: "Oldest First" },
  { key: "name_asc", label: "Name: A to Z" },
  { key: "name_desc", label: "Name: Z to A" },
];

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface UsersClientProps {
  initialUsers: any[];
  pagination: PaginationMeta;
}

export default function UsersClient({
  initialUsers = [],
  pagination,
}: UsersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [users, setUsers] = useState<any[]>(initialUsers);

  useEffect(() => {
    setUsers(Array.isArray(initialUsers) ? initialUsers : []);
  }, [initialUsers]);

  const currentRoleTab = searchParams.get("role")
    ? searchParams.get("role")!.charAt(0).toUpperCase() + searchParams.get("role")!.slice(1).toLowerCase()
    : "All";
  const currentStatusTab = searchParams.get("status")
    ? searchParams.get("status")!.charAt(0).toUpperCase() + searchParams.get("status")!.slice(1).toLowerCase()
    : "All";
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val === undefined || val === "" || (key === "role" && val.toLowerCase() === "all") || (key === "status" && val.toLowerCase() === "all")) {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      });

      if (!("page" in updates)) {
        params.delete("page");
      }

      const qs = params.toString();
      startTransition(() => {
        router.push(`/dashboard/admin/users${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateParams({ search: searchInput.trim() });
  };

  const handleResetFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.push("/dashboard/admin/users", { scroll: false });
    });
  };

  // Role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!userId || !newRole) return;
    try {
      const res = await updateUser(userId, { role: newRole });
      if (res?.success !== false) {
        toast.success(`User role updated to "${newRole}"`);
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === userId ? { ...u, role: newRole } : u
          )
        );
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update role");
      }
    } catch (err) {
      toast.error("Error updating user role");
    }
  };

  // Status change
  const handleStatusChange = async (userId: string, newStatus: string) => {
    if (!userId || !newStatus) return;
    try {
      const res = await updateUser(userId, { status: newStatus });
      if (res?.success !== false) {
        toast.success(`User status updated to "${newStatus}"`);
        setUsers((prev) =>
          prev.map((u) =>
            (u._id || u.id) === userId ? { ...u, status: newStatus } : u
          )
        );
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating user status");
    }
  };

  const getRoleBadge = (role?: string) => {
    const r = (role || "customer").toLowerCase();
    if (r === "admin") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-800/40">
          <ShieldCheck className="w-3 h-3" />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/40">
        <UserCheck className="w-3 h-3" />
        Customer
      </span>
    );
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "active").toLowerCase();
    if (s === "suspended") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/40">
          <Ban className="w-3 h-3" />
          Suspended
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40">
        <UserCheck className="w-3 h-3" />
        Active
      </span>
    );
  };

  const { page, limit, total, totalPages } = pagination || {
    page: 1,
    limit: 10,
    total: users.length,
    totalPages: 1,
  };
  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <Link href="/dashboard/admin" className="hover:text-sky-600 transition-colors">
              Admin Dashboard
            </Link>
            <span>/</span>
            <span className="text-sky-600 dark:text-sky-400">Users</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Manage{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Users
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            View all users, change roles, and manage account statuses.
          </p>
        </div>

        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Total users: <span className="font-extrabold text-gray-900 dark:text-white">{total}</span>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {FILTER_TABS.map((tab) => {
            const isActive = currentRoleTab.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => updateParams({ role: tab === "All" ? undefined : tab.toLowerCase() })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs"
                    : "bg-slate-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200/60 dark:border-gray-700"
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}

          <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          {STATUS_FILTER_TABS.map((tab) => {
            const isActive = currentStatusTab.toLowerCase() === tab.toLowerCase();
            return (
              <button
                key={`status-${tab}`}
                onClick={() => updateParams({ status: tab === "All" ? undefined : tab.toLowerCase() })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xs"
                    : "bg-slate-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 border border-slate-200/60 dark:border-gray-700"
                }`}
              >
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Search, Sort & Reset */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-9 pr-4 h-10 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-xs"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-10 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs cursor-pointer shrink-0"
            >
              Search
            </Button>
          </form>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="w-48">
              <Select
                aria-label="Sort Users"
                selectedKey={currentSort}
                onSelectionChange={(key) => updateParams({ sort: key ? String(key) : "newest" })}
              >
                <Select.Trigger className="h-10 w-full px-3.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between gap-1.5 cursor-pointer hover:border-sky-400 transition-colors shadow-xs [&>span]:text-xs [&>span]:font-semibold">
                  <Select.Value className="text-xs font-semibold truncate" />
                  <Select.Indicator className="[&>svg]:w-3.5 [&>svg]:h-3.5 text-gray-400 shrink-0" />
                </Select.Trigger>
                <Select.Popover className="w-52 p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
                  <ListBox>
                    {SORT_OPTIONS.map((opt) => (
                      <ListBox.Item
                        key={opt.key}
                        id={opt.key}
                        textValue={opt.label}
                        className="text-xs font-medium px-3 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center justify-between"
                      >
                        {opt.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {(currentSearch || currentRoleTab !== "All" || currentStatusTab !== "All" || currentSort !== "newest") && (
              <Button
                size="sm"
                onPress={handleResetFilters}
                className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs font-semibold cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Users Table ── */}
      {isPending ? (
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-12 text-center shadow-xs">
          <div className="w-8 h-8 border-3 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-gray-500">Loading users...</p>
        </Card>
      ) : users.length === 0 ? (
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              No users found
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentSearch
                ? "No users matched your search query."
                : "There are currently no users matching the selected filters."}
            </p>
          </div>
          {(currentSearch || currentRoleTab !== "All" || currentStatusTab !== "All") && (
            <Button
              onPress={handleResetFilters}
              className="px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </Button>
          )}
        </Card>
      ) : (
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-800 bg-slate-50/80 dark:bg-gray-800/40 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4 text-center">Role</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4">Member</th>
                  <th className="py-3.5 px-4 text-right">Points</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4 text-center">Change Role</th>
                  <th className="py-3.5 px-4 text-center">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800/60 text-xs">
                {users.map((user) => {
                  const id = user._id || user.id || "";
                  const name = user.name || "Unknown User";
                  const email = user.email || "—";
                  const avatar = user.image;
                  const initial = name.charAt(0).toUpperCase();
                  const dateStr = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—";

                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50/80 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      {/* User */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0 overflow-hidden">
                            {avatar ? (
                              <Image
                                src={avatar}
                                alt={name}
                                fill
                                sizes="32px"
                                className="object-cover rounded-full"
                                unoptimized
                              />
                            ) : (
                              <span>{initial}</span>
                            )}
                          </div>
                          <p className="font-bold text-gray-900 dark:text-white truncate max-w-[140px]">
                            {name}
                          </p>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="truncate">{email}</span>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {getRoleBadge(user.role)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>

                      {/* Member */}
                      <td className="py-3.5 px-4 whitespace-nowrap capitalize text-gray-600 dark:text-gray-300 font-semibold">
                        {user.member || "—"}
                      </td>

                      {/* Points */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap font-extrabold text-gray-900 dark:text-white">
                        {user.points ?? 0}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {dateStr}
                        </div>
                      </td>

                      {/* Change Role */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="w-32 mx-auto">
                          <Select
                            aria-label="Change Role"
                            selectedKey={user.role || "customer"}
                            onSelectionChange={(key) => handleRoleChange(id, String(key))}
                          >
                            <Select.Trigger className="h-8 w-full px-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-[11px] font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between cursor-pointer hover:border-violet-400 transition-colors [&>span]:text-[11px] [&>span]:font-semibold">
                              <Select.Value className="text-[11px] font-semibold" />
                              <Select.Indicator className="[&>svg]:w-3 [&>svg]:h-3 text-gray-400 shrink-0" />
                            </Select.Trigger>
                            <Select.Popover className="w-36 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                              <ListBox>
                                {ROLE_OPTIONS.map((opt) => (
                                  <ListBox.Item
                                    key={opt.id}
                                    id={opt.id}
                                    textValue={opt.label}
                                    className="text-[11px] font-medium px-2.5 py-1.5 rounded-md hover:bg-violet-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center justify-between"
                                  >
                                    {opt.label}
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </div>
                      </td>

                      {/* Change Status */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="w-32 mx-auto">
                          <Select
                            aria-label="Change Status"
                            selectedKey={user.status || "active"}
                            onSelectionChange={(key) => handleStatusChange(id, String(key))}
                          >
                            <Select.Trigger className="h-8 w-full px-2.5 rounded-lg border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 text-[11px] font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-colors [&>span]:text-[11px] [&>span]:font-semibold">
                              <Select.Value className="text-[11px] font-semibold" />
                              <Select.Indicator className="[&>svg]:w-3 [&>svg]:h-3 text-gray-400 shrink-0" />
                            </Select.Trigger>
                            <Select.Popover className="w-36 p-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
                              <ListBox>
                                {STATUS_OPTIONS.map((opt) => (
                                  <ListBox.Item
                                    key={opt.id}
                                    id={opt.id}
                                    textValue={opt.label}
                                    className="text-[11px] font-medium px-2.5 py-1.5 rounded-md hover:bg-emerald-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center justify-between"
                                  >
                                    {opt.label}
                                    <ListBox.ItemIndicator />
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 dark:border-gray-800 bg-slate-50/40 dark:bg-gray-900/40">
              <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 dark:text-gray-400">
                <Pagination.Summary className="text-xs">
                  Showing <span className="text-gray-800 dark:text-gray-200 font-bold">{startItem}–{endItem}</span> of{" "}
                  <span className="text-sky-600 dark:text-sky-400 font-bold">{total}</span> users
                </Pagination.Summary>

                <Pagination.Content className="flex items-center gap-1">
                  <Pagination.Item>
                    <Pagination.Previous
                      className="flex items-center gap-1 px-3 h-8 rounded-lg text-xs hover:bg-sky-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      isDisabled={page === 1 || isPending}
                      onPress={() => updateParams({ page: String(page - 1) })}
                    >
                      <Pagination.PreviousIcon />
                      <span>Prev</span>
                    </Pagination.Previous>
                  </Pagination.Item>

                  {getPageNumbers().map((p, i) =>
                    p === "ellipsis" ? (
                      <Pagination.Item key={`ellipsis-${i}`}>
                        <Pagination.Ellipsis className="px-2 text-gray-400 select-none text-xs" />
                      </Pagination.Item>
                    ) : (
                      <Pagination.Item key={p}>
                        <Pagination.Link
                          isActive={p === page}
                          isDisabled={isPending}
                          onPress={() => updateParams({ page: String(p) })}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            p === page
                              ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                              : "hover:bg-sky-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    )
                  )}

                  <Pagination.Item>
                    <Pagination.Next
                      className="flex items-center gap-1 px-3 h-8 rounded-lg text-xs hover:bg-sky-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      isDisabled={page === totalPages || isPending}
                      onPress={() => updateParams({ page: String(page + 1) })}
                    >
                      <span>Next</span>
                      <Pagination.NextIcon />
                    </Pagination.Next>
                  </Pagination.Item>
                </Pagination.Content>
              </Pagination>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
