// const isEncryptedBodyRequired = (req: Request): boolean => {
//   const path = req.path;
//   const method = req.method.toUpperCase();

//   if (method === "POST" && /\/auth\/login$/.test(path)) return true;
//   if (method === "POST" && /\/auth\/register$/.test(path)) return true;

//   if (method === "POST" && /\/onboarding\/create$/.test(path)) return true;
//   if (method === "PATCH" && /\/onboarding\/[^/]+$/.test(path)) return true;
//   if (method === "DELETE" && /\/onboarding\/[^/]+$/.test(path)) return true;

//   return false;
// };
