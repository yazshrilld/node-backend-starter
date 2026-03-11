import { routeCreator } from "../utils";

export const urls = {
  health: {
    check: () => routeCreator("check"),
    encrytData: () => routeCreator("encrypt", "post"),
    decryptData: () => routeCreator("decrypt", "post"),
  },
  sessions: {
    check: () => routeCreator("check"),
    addSession: () => routeCreator("add", "post"),
    getSessions: () => routeCreator(":conversationId", "get"),
    deleteSession: () => routeCreator(":conversationId", "delete"),
  },
  messages: {
    check: () => routeCreator("check"),
    createMessage: () => routeCreator("save", "post"),
    getMessages: () => routeCreator(":conversationId", "get"),
    updateMessageStatus: () => routeCreator(":messageId", "patch"),
  },
  auth: {
    check: () => routeCreator("check"),
    login: () => routeCreator("login", "post"),
    register: () => routeCreator("register", "post"),
  },
  onboarding: {
    createOnboarding: () => routeCreator("create", "post"),
    getOnboardings: () => routeCreator("all", "get"),
    getOnboardingById: () => routeCreator(":id", "get"),
    updateOnboarding: () => routeCreator(":id", "patch"),
    deleteOnboarding: () => routeCreator(":id", "delete"),
  },
  faqs: {
    createFaq: () => routeCreator("create", "post"),
    getFaqs: () => routeCreator("all", "get"),
    getFaqById: () => routeCreator(":id", "get"),
    updateFaq: () => routeCreator(":id", "patch"),
    deleteFaq: () => routeCreator(":id", "delete"),
    publishFaq: () => routeCreator(":id/publish", "patch"),
    reorderFaqs: () => routeCreator("reorder", "patch"),
    getPublicFaqs: () => routeCreator("public", "get"),
  },

  services: {
    createService: () => routeCreator("create", "post"),
    getServices: () => routeCreator("all", "get"),
    getServiceById: () => routeCreator(":id", "get"),
    updateService: () => routeCreator(":id", "patch"),
    deleteService: () => routeCreator(":id", "delete"),
    publishService: () => routeCreator(":id/publish", "patch"),
    reorderServices: () => routeCreator("reorder", "patch"),
    getPublicServices: () => routeCreator("public", "get"),
  },


};
