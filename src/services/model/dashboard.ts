import { dashboardModel } from "../../models";

const { DashboardModel } = dashboardModel;

type DashboardQuery = {
  companyId?: string;
  period?: "day" | "week" | "month";
  fromDate?: string;
  toDate?: string;
  limit?: number | string;
};

const buildFilter = (query: DashboardQuery) => {
  const filter: Record<string, unknown> = {};

  if (query.companyId) filter.companyId = query.companyId;
  if (query.period) filter.period = query.period;

  if (query.fromDate || query.toDate) {
    filter.fromDate = {
      ...(query.fromDate ? { $gte: new Date(query.fromDate) } : {}),
    };
    filter.toDate = {
      ...(query.toDate ? { $lte: new Date(query.toDate) } : {}),
    };
  }

  return filter;
};

const getLatestDashboardDoc = async (query: DashboardQuery) => {
  const filter = buildFilter(query);
  return await DashboardModel.findOne(filter).sort({ toDate: -1, createdAt: -1 });
};

export const getSummary = async (query: DashboardQuery) => {
  const doc = await getLatestDashboardDoc(query);

  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    summary: doc?.summary || {
      totalConversations: 0,
      openTickets: 0,
      resolvedTickets: 0,
      activeStaff: 0,
    },
  };
};

export const getActivityFeed = async (query: DashboardQuery) => {
  const doc = await getLatestDashboardDoc(query);
  const limit = Math.min(Number(query.limit || 20), 100);

  const feed = Array.isArray(doc?.activityFeed) ? doc!.activityFeed : [];

  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    activityFeed: feed
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, Number.isNaN(limit) ? 20 : limit),
  };
};

export const getAlerts = async (query: DashboardQuery) => {
  const doc = await getLatestDashboardDoc(query);

  const alerts = Array.isArray(doc?.alerts) ? doc!.alerts : [];

  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    alerts: alerts
      .filter((a: any) => a?.isActive !== false)
      .sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
  };
};

export const getHealth = async (query: DashboardQuery) => {
  const doc = await getLatestDashboardDoc(query);

  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    health: doc?.health || {
      status: "healthy",
      modules: {
        auth: "healthy",
        onboarding: "healthy",
        faqs: "healthy",
        services: "healthy",
        staff: "healthy",
        analytics: "healthy",
      },
      lastCheckedAt: new Date(),
    },
  };
};

export default {
  getSummary,
  getActivityFeed,
  getAlerts,
  getHealth,
};
