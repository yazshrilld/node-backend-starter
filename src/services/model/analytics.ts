import { analyticsModel } from "../../models";

const { AnalyticsModel } = analyticsModel;

type AnalyticsQuery = {
  companyId?: string;
  period?: "day" | "week" | "month";
  fromDate?: string;
  toDate?: string;
};

const buildFilter = (query: AnalyticsQuery) => {
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

const getLatestAnalyticsDoc = async (query: AnalyticsQuery) => {
  const filter = buildFilter(query);
  return await AnalyticsModel.findOne(filter).sort({ toDate: -1, createdAt: -1 });
};

export const getOverview = async (query: AnalyticsQuery) => {
  const doc = await getLatestAnalyticsDoc(query);
  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    overview: doc?.overview || {
      totalConversations: 0,
      openTickets: 0,
      resolvedTickets: 0,
      activeStaff: 0,
    },
  };
};

export const getUsage = async (query: AnalyticsQuery) => {
  const doc = await getLatestAnalyticsDoc(query);
  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    usage: doc?.usage || [],
  };
};

export const getIssues = async (query: AnalyticsQuery) => {
  const doc = await getLatestAnalyticsDoc(query);
  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    issues: doc?.issues || {
      escalations: 0,
      unresolvedBacklog: 0,
      reopenRate: 0,
    },
  };
};

export const getResponseTimes = async (query: AnalyticsQuery) => {
  const doc = await getLatestAnalyticsDoc(query);
  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    responseTimes: doc?.responseTimes || {
      averageFirstResponseMins: 0,
      averageResolutionMins: 0,
    },
  };
};

export const getSatisfaction = async (query: AnalyticsQuery) => {
  const doc = await getLatestAnalyticsDoc(query);
  return {
    period: doc?.period || query.period || "day",
    fromDate: doc?.fromDate || null,
    toDate: doc?.toDate || null,
    satisfaction: doc?.satisfaction || {
      csatAverage: 0,
      responsesCount: 0,
    },
  };
};

export default {
  getOverview,
  getUsage,
  getIssues,
  getResponseTimes,
  getSatisfaction,
};
