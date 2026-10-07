import React from "react";
import AdminSettingsClient, {
  AdminSettingsData,
} from "./AdminSettingsClient";

const INITIAL_ADMIN_SETTINGS: AdminSettingsData = {
  store: {
    storeName: "Gemora Jewellery",
    supportEmail: "support@gemora.com",
    supportPhone: "+1 (555) 019-2834",
    currency: "USD",
    timezone: "America/New_York",
    orderPrefix: "GMR-",
    maintenanceMode: false,
  },
  notifications: {
    emailOnNewOrder: true,
    emailOnNewUser: false,
    smsOnCriticalError: true,
    dailyDigest: true,
  },
  security: {
    twoFactor: false,
    sessionTimeoutMins: 60,
    activeSessions: [
      {
        id: "sess-1",
        device: "Windows 11 (Chrome 128)",
        location: "New York, NY, USA",
        lastActive: "Active Now",
        isCurrent: true,
      },
      {
        id: "sess-2",
        device: "MacBook Pro (Safari 17.5)",
        location: "New York, NY, USA",
        lastActive: "4 hours ago",
        isCurrent: false,
      },
    ],
  },
};

async function getAdminSettingsData(): Promise<AdminSettingsData> {
  try {
    return INITIAL_ADMIN_SETTINGS;
  } catch (error) {
    console.error("Failed to fetch admin settings:", error);
    return INITIAL_ADMIN_SETTINGS;
  }
}

export default async function AdminSettingsPage() {
  const settingsData = await getAdminSettingsData();
  return <AdminSettingsClient initialSettings={settingsData} />;
}
