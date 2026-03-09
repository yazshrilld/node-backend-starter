// // src/swagger/swagger-auto-routes.ts
// import { Express } from "express";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import path from "path";
// import fs from "fs";
// import { urls } from "../constants/urls";
// import { getters } from "../config";
// import { getSwaggerSchemaFromJoi } from "../utils";
// import { verifyMiddleware } from "../middlewares"; // ✅ fix import path
// import { logger } from "netwrap";
// import { multipartRoutes } from "../utils/validate";
// import { joiSchemasMap } from "../utils/joiSchemasMap";

// logger("🧠 [swagger-auto-routes] Module loaded.");
// const basePath = `/${getters.getAppSecrets().BASEPATH}`;
// /**
//  * Dynamically import all route modules from routers directory
//  */
// const routersDir = path.resolve(__dirname, "../routers");
// const allRouters: any[] = [];

// logger(`📂 Reading routers from: ${routersDir}`);

// fs.readdirSync(routersDir).forEach((file) => {
//   if (
//     (file.endsWith(".ts") || file.endsWith(".js")) &&
//     !file.endsWith(".d.ts")
//   ) {
//     const routeModule = require(path.join(routersDir, file));
//     const routerExport =
//       routeModule.default ||
//       Object.values(routeModule).find((v) => Array.isArray(v));
//     if (routerExport) {
//       allRouters.push(routerExport);
//       logger(`✅ Loaded router: ${file}`);
//     }
//   }
// });

// const tempFile = path.resolve(__dirname, "../temp/swagger-auto-routes.ts");
// fs.mkdirSync(path.dirname(tempFile), { recursive: true });

// const normalizePath = (p: string) => p.replace(/^\/+/, "").replace(/\/+$/, "");

// const isEncryptedRequestRoute = (swaggerPath: string, method: string) => {
//   if (method === "get") return false;

//   return /\/auth\/login$|\/auth\/register$|\/onboarding\/create$|\/onboarding\/\{id\}$/.test(
//     swaggerPath,
//   );
// };

// const isEncryptHelperRoute = (swaggerPath: string) =>
//   /\/health\/encrypt$/.test(swaggerPath);

// const isDecryptHelperRoute = (swaggerPath: string) =>
//   /\/health\/decrypt$/.test(swaggerPath);

// const encryptedRequestSchema = {
//   type: "object",
//   properties: {
//     textData: {
//       type: "string",
//       description: "Encrypted payload as text",
//     },
//   },
//   required: ["textData"],
//   additionalProperties: false,
// };

// const encryptHelperSchema = {
//   type: "object",
//   description: "Plain JSON payload to encrypt (any object).",
//   additionalProperties: true,
// };

// const decryptHelperSchema = {
//   type: "object",
//   properties: {
//     textData: {
//       type: "string",
//       description: "Encrypted payload returned by /health/encrypt",
//     },
//   },
//   required: ["textData"],
//   additionalProperties: false,
// };

// const toSwaggerSchemaYaml = (schema: any) =>
//   JSON.stringify(schema, null, 2)
//     .split("\n")
//     .map((line) => ` *             ${line}`)
//     .join("\n");

// const exampleValueForSchema = (schema: any): any => {
//   if (!schema || typeof schema !== "object") return "string";
//   if (schema.example !== undefined) return schema.example;
//   switch (schema.type) {
//   case "string":
//     return "string";
//   case "integer":
//   case "number":
//     return 0;
//   case "boolean":
//     return true;
//   case "array":
//     return [exampleValueForSchema(schema.items || { type: "string" })];
//   case "object": {
//     const obj: Record<string, any> = {};
//     const props = schema.properties || {};
//     for (const [key, propSchema] of Object.entries(props)) {
//       obj[key] = exampleValueForSchema(propSchema);
//     }
//     return obj;
//   }
//   default:
//     return "string";
//   }
// };

// const buildExampleFromSwaggerSchema = (schema: any): string | null => {
//   if (!schema || typeof schema !== "object") return null;
//   if (schema.type !== "object" || !schema.properties) return null;
//   const exampleObject: Record<string, any> = {};
//   for (const [key, propSchema] of Object.entries(schema.properties)) {
//     exampleObject[key] = exampleValueForSchema(propSchema);
//   }
//   return JSON.stringify(exampleObject, null, 2);
// };

// const findMatchingRoute = (path: string, method: string) => {
//   const normPath = normalizePath(path);
//   for (const router of allRouters) {
//     const match = router.find(
//       (r: any) =>
//         normalizePath(r.path) === normPath &&
//         r.method?.toLowerCase() === method.toLowerCase(),
//     );
//     if (match) return match;
//   }
//   return null;
// };

// const generateSwaggerComments = (): string => {
//   logger("\n🟢 Starting Swagger comment generation...\n");
//   const comments: string[] = [];

//   const processObject = (obj: any, parentTag?: string) => {
//     logger(`🔸 Processing object for tag: ${parentTag || "root"}`);
//     if (!obj) {
//       console.warn("⚠️ Skipping invalid object in setupAutoSwagger:", obj);
//       return;
//     }
//     Object.entries(obj).forEach(([key, value]) => {
//       if (typeof value === "function") {
//         const routeDef = value();
//         const fullPath = `${basePath}/${parentTag}/${routeDef.path}`;
//         const swaggerPath = fullPath.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");
//         const method = (routeDef.method || "get").toLowerCase();

//         logger(
//           `\n🔹 Processing route: [${method.toUpperCase()}] ${swaggerPath}`,
//         );
//         const matchedRoute = findMatchingRoute(routeDef.path, method);

//         if (!matchedRoute) {
//           console.warn(`⚠️ No matching route found for ${swaggerPath}`);
//           return;
//         }

//         logger(`✅ Matched route path: ${matchedRoute.path}`);
//         const handlers = matchedRoute.handlers || [];
//         logger(`🔹 Handlers count: ${handlers.length}`);

//         const pathParams = Array.from(
//           fullPath.matchAll(/:([a-zA-Z0-9_]+)/g),
//         ).map((m) => m[1]);

//         let parametersSection = "";
//         if (pathParams.length > 0) {
//           parametersSection = `parameters:${pathParams
//             .map(
//               (p) => `
//  *       - in: path
//  *         name: ${p}
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ${p}`,
//             )
//             .join("")}`;
//         }

//         // 🔍 Detect Joi middleware by name
//         let requestBodySection = "";
//         let foundSchema = false;
//         let joiSwaggerSchema: any | null = null;
//         console.log(handlers, "handlers");
//         // Filter out only valid function handlers
//         const validHandlers = handlers.filter(
//           (h: any) => typeof h === "function",
//         );

//         console.log(validHandlers, "validHandlers");
//         if (validHandlers.length === 0) {
//           console.warn(`⚠️ No valid handlers found for ${matchedRoute.path}`);
//         } else {
//           for (const handler of validHandlers) {
//             //  if (typeof handler !== "function") {
//             //    console.warn(
//             //      `⚠️ Invalid handler in ${matchedRoute.path}: ${String(handler)}`,
//             //    );
//             //    continue;
//             //  }

//             console.log(handler);
//             const name =
//               handler.name ||
//               Object.keys(verifyMiddleware || {}).find(
//                 (k) =>
//                   verifyMiddleware[k as keyof typeof verifyMiddleware] ===
//                   handler,
//               ) ||
//               "";

//             logger(`   🧩 Checking handler: "${name}"`);

//             if (!name) {
//               logger(
//                 "   ⚠️ Handler is anonymous (arrow fn or inline). Skipping.",
//               );
//               continue;
//             }

//             const hasSchema = !!joiSchemasMap[name];
//             logger(
//               `🔎 joiSchemasMap has schema for "${name}"? ${hasSchema ? "✅ YES" : "❌ NO"}`,
//               {
//                 isError: !hasSchema,
//               },
//             );

//             if (hasSchema) {
//               logger(`   ✅ Found Joi schema for middleware: ${name}`);
//               const schemaFn = joiSchemasMap[name];
//               try {
//                 const swaggerSchema = getSwaggerSchemaFromJoi(schemaFn);
//                 if (swaggerSchema) {
//                   logger(`   🧾 Successfully converted Joi schema for ${name}`);
//                   foundSchema = true;
//                   joiSwaggerSchema = swaggerSchema;

//                   if (method === "get") {
//                     // For GET requests, convert schema properties to query parameters
//                     const queryParams = Object.entries(
//                       swaggerSchema.properties || {},
//                     )
//                       .map(([key, prop]: any) => {
//                         const required = swaggerSchema.required?.includes(key)
//                           ? "true"
//                           : "false";
//                         const escapedPattern = prop.pattern
//                           ? prop.pattern.replace(/\\/g, "\\\\")
//                           : null;
//                         return `
//  *       - in: query
//  *         name: ${key}
//  *         required: ${required}
//  *         schema:
//  *           type: ${prop.type}${prop.format ? `\n *           format: ${prop.format}` : ""}${prop.minimum !== undefined ? `\n *           minimum: ${prop.minimum}` : ""}${prop.maximum !== undefined ? `\n *           maximum: ${prop.maximum}` : ""}${prop.minLength !== undefined ? `\n *           minLength: ${prop.minLength}` : ""}${prop.maxLength !== undefined ? `\n *           maxLength: ${prop.maxLength}` : ""}${escapedPattern ? `\n *           pattern: "${escapedPattern}"` : ""}`;
//                       })
//                       .join("");

//                     if (queryParams) {
//                       if (parametersSection) {
//                         parametersSection += queryParams;
//                       } else {
//                         parametersSection = `parameters:${queryParams}`;
//                       }
//                     }
//                   } else {
//                     // For POST/PUT/DELETE requests, generate requestBody
//                     const schemaYaml = toSwaggerSchemaYaml(swaggerSchema);

//                     const isMultipart = multipartRoutes[name] === true;
//                     const contentType = isMultipart
//                       ? "multipart/form-data"
//                       : "application/json";

//                     requestBodySection = `
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         ${contentType}:
//  *           schema:
// ${schemaYaml}`;
//                   }
//                   break;
//                 } else {
//                   logger(
//                     `   ⚠️ getSwaggerSchemaFromJoi returned empty for ${name}`,
//                   );
//                 }
//               } catch (err) {
//                 console.error(
//                   `   ❌ Error generating schema for ${name}:`,
//                   err,
//                 );
//               }
//             }
//           }

//           if (!foundSchema) {
//             logger(`   ⚠️ No Joi schema detected for ${fullPath}`);
//           }

//           if (isEncryptHelperRoute(swaggerPath)) {
//             const schemaYaml = toSwaggerSchemaYaml(encryptHelperSchema);
//             requestBodySection = `
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
// ${schemaYaml}`;
//           }

//           if (isDecryptHelperRoute(swaggerPath)) {
//             const schemaYaml = toSwaggerSchemaYaml(decryptHelperSchema);
//             requestBodySection = `
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
// ${schemaYaml}`;
//           }

//           if (isEncryptedRequestRoute(swaggerPath, method)) {
//             const schemaYaml = toSwaggerSchemaYaml(encryptedRequestSchema);
//             const exampleJson = joiSwaggerSchema
//               ? buildExampleFromSwaggerSchema(joiSwaggerSchema)
//               : null;
//             const plainSchemaDescription = joiSwaggerSchema
//               ? `\n *       description: |\n *         Plain (unencrypted) payload schema:\n${JSON.stringify(
//                 joiSwaggerSchema,
//                 null,
//                 2,
//               )
//                 .split("\n")
//                 .map((line) => ` *         ${line}`)
//                 .join("\n")}`
//               : "";
//             const exampleDescription = exampleJson
//               ? `\n *         \n *         Copy-ready example (encrypt this object):\n${exampleJson
//                 .split("\n")
//                 .map((line) => ` *         ${line}`)
//                 .join("\n")}`
//               : "";
//             requestBodySection = `
//  *     requestBody:
//  *       required: true${plainSchemaDescription}${exampleDescription}
//  *       content:
//  *         application/json:
//  *           schema:
// ${schemaYaml}`;
//           }

//           const finalParametersSection = parametersSection
//             ? `${parametersSection}`
//             : "";
//           const finalRequestBodySection = requestBodySection
//             ? `${requestBodySection}`
//             : "";

//           comments.push(`
// /**
//  * @swagger
//  * ${swaggerPath}:
//  *   ${method}:
//  *     summary: ${key}
//  *     tags: [${parentTag || key}]${finalParametersSection ? `\n *     ${finalParametersSection}` : ""}${finalRequestBodySection ? `\n *     ${finalRequestBodySection}` : ""}
//  *     responses:
//  *       200:
//  *         description: Success
//  *       400:
//  *         description: Bad request
//  *       401:
//  *         description: Unauthorized
//  */
//         `);
//         }
//       } else if (typeof value === "object") {
//         logger(`🔹 Traversing into: ${key}`);
//         processObject(value, key);
//       }
//     });
//   };

//   processObject(urls);
//   logger(`\n✅ Generated Swagger comments for ${comments.length} route(s)`);
//   return comments.join("\n");
// };

// /**
//  * ✅ Run generation at runtime (not import time)
//  */
// export const setupAutoSwagger = (app: Express) => {
//   logger("\n🚀 Setting up Swagger auto-generation...");
//   const generatedComments = generateSwaggerComments();
//   fs.writeFileSync(tempFile, generatedComments);
//   logger(`🟢 Swagger docs written to: ${tempFile}`);

//   // const swaggerRoute = "/sdk/aop/api/v1/api-docs";
//   const swaggerRoute = `/${getters.getAppSecrets().BASEPATH}/api-docs`;

//   const options = {
//     definition: {
//       openapi: "3.0.0",
//       info: {
//         title: `${getters.getAppSecrets().APP_DESCRIPTION} API Documentation`,
//         version: "1.0.0",
//         description:
//           "Auto-generated API documentation (routes from constants/urls.ts + Joi schema from routers)",
//       },
//       components: {
//         securitySchemes: {
//           bearerAuth: {
//             type: "http",
//             scheme: "bearer",
//             bearerFormat: "JWT",
//           },
//         },
//       },
//       security: [{ bearerAuth: [] }],
//     },
//     apis: [tempFile],
//   };

//   const swaggerSpec = swaggerJSDoc(options);
//   app.use(swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   app.get(`${swaggerRoute}.json`, (_req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });

//   const baseUrl = `http://${getters.getAppUrls().apiDocsUrl}`.replace(
//     /\/+$/,
//     "",
//   );
//   logger(`✅ Swagger UI  → ${baseUrl}${swaggerRoute}`);
//   logger(`✅ Swagger JSON → ${baseUrl}${swaggerRoute}.json`);
// };


import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import fs from "fs";
import { urls } from "../constants/urls";
import { getters } from "../config";
import { getSwaggerSchemaFromJoi } from "../utils";
import { verifyMiddleware } from "../middlewares";
import { logger } from "netwrap";
import { multipartRoutes } from "../utils/validate";
import { joiSchemasMap } from "../utils/joiSchemasMap";

const basePath = `/${getters.getAppSecrets().BASEPATH}`;
const routersDir = path.resolve(__dirname, "../routers");
const tempFile = path.resolve(__dirname, "../temp/swagger-auto-routes.ts");

type RouteDef = {
  path: string;
  method?: string;
  handlers?: Array<(...args: any[]) => any>;
};

const allRouters: RouteDef[][] = [];

const normalizePath = (p: string) => p.replace(/^\/+/, "").replace(/\/+$/, "");

const toSwaggerPath = (fullPath: string) =>
  fullPath.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");

const isEncryptHelperRoute = (swaggerPath: string) =>
  /\/health\/encrypt$/.test(swaggerPath);

const isDecryptHelperRoute = (swaggerPath: string) =>
  /\/health\/decrypt$/.test(swaggerPath);

const cleanSwaggerPath = (p: string) => p.replace(/\/+$/, "");

const isEncryptedRequestRoute = (swaggerPath: string, method: string) => {
  if (method.toLowerCase() === "get") return false;

  const p = cleanSwaggerPath(swaggerPath);

  return [
    /\/auth\/login$/,
    /\/auth\/register$/,
    /\/onboarding\/create$/,
    /\/onboarding\/\{id\}$/,
    /\/faqs\/create$/,
    /\/faqs\/\{id\}$/,
    /\/faqs\/\{id\}\/publish$/,
    /\/faqs\/reorder$/,
  ].some((rx) => rx.test(p));
};

const encryptedRequestSchema = {
  type: "object",
  properties: {
    textData: {
      type: "string",
      description: "Encrypted payload as text",
    },
  },
  required: ["textData"],
  additionalProperties: false,
};

const encryptHelperSchema = {
  type: "object",
  description: "Plain JSON payload to encrypt (any object).",
  additionalProperties: true,
};

const decryptHelperSchema = {
  type: "object",
  properties: {
    textData: {
      type: "string",
      description: "Encrypted payload returned by /health/encrypt",
    },
  },
  required: ["textData"],
  additionalProperties: false,
};

const toSwaggerSchemaYaml = (schema: any) =>
  JSON.stringify(schema, null, 2)
    .split("\n")
    .map((line) => ` *             ${line}`)
    .join("\n");

const exampleValueForSchema = (schema: any): any => {
  if (!schema || typeof schema !== "object") return "string";
  if (schema.example !== undefined) return schema.example;

  switch (schema.type) {
  case "string":
    return "string";
  case "integer":
  case "number":
    return 0;
  case "boolean":
    return true;
  case "array":
    return [exampleValueForSchema(schema.items || { type: "string" })];
  case "object": {
    const output: Record<string, any> = {};
    const props = schema.properties || {};
    Object.entries(props).forEach(([key, value]) => {
      output[key] = exampleValueForSchema(value);
    });
    return output;
  }
  default:
    return "string";
  }
};

const buildExampleFromSwaggerSchema = (schema: any): string | null => {
  if (!schema || typeof schema !== "object") return null;
  if (schema.type !== "object" || !schema.properties) return null;

  const exampleObj: Record<string, any> = {};
  Object.entries(schema.properties).forEach(([key, value]) => {
    exampleObj[key] = exampleValueForSchema(value);
  });

  return JSON.stringify(exampleObj, null, 2);
};

const loadRouters = () => {
  logger(`📂 Loading routers from: ${routersDir}`);

  fs.readdirSync(routersDir).forEach((file) => {
    if (
      !(file.endsWith(".ts") || file.endsWith(".js")) ||
      file.endsWith(".d.ts")
    ) {
      return;
    }

    const modulePath = path.join(routersDir, file);
    const routeModule = require(modulePath);
    const routerExport =
      routeModule.default ||
      Object.values(routeModule).find((v) => Array.isArray(v));

    if (Array.isArray(routerExport)) {
      allRouters.push(routerExport as RouteDef[]);
      logger(`✅ Loaded router: ${file}`);
    }
  });
};

const findMatchingRoute = (pathPart: string, method: string): RouteDef | null => {
  const targetPath = normalizePath(pathPart);
  const targetMethod = method.toLowerCase();

  for (const router of allRouters) {
    const found = router.find(
      (r) =>
        normalizePath(r.path) === targetPath &&
        (r.method || "get").toLowerCase() === targetMethod,
    );
    if (found) return found;
  }

  return null;
};

const resolveHandlerName = (handler: Function): string => {
  if (handler.name) return handler.name;

  const match = Object.keys(verifyMiddleware || {}).find(
    (key) =>
      (verifyMiddleware as Record<string, unknown>)[key] === handler,
  );

  return match || "";
};

const buildPathParametersSection = (fullPath: string): string => {
  const params = Array.from(fullPath.matchAll(/:([a-zA-Z0-9_]+)/g)).map(
    (m) => m[1],
  );

  if (params.length === 0) return "";

  return `parameters:${params
    .map(
      (p) => `
 *       - in: path
 *         name: ${p}
 *         required: true
 *         schema:
 *           type: string
 *         description: ${p}`,
    )
    .join("")}`;
};

const buildQueryParametersSection = (schema: any): string => {
  const props = schema?.properties || {};
  const requiredList: string[] = schema?.required || [];

  const lines = Object.entries(props)
    .map(([key, prop]: any) => {
      const escapedPattern = prop.pattern
        ? prop.pattern.replace(/\\/g, "\\\\")
        : null;

      return `
 *       - in: query
 *         name: ${key}
 *         required: ${requiredList.includes(key) ? "true" : "false"}
 *         schema:
 *           type: ${prop.type || "string"}${prop.format ? `\n *           format: ${prop.format}` : ""}${prop.minimum !== undefined ? `\n *           minimum: ${prop.minimum}` : ""}${prop.maximum !== undefined ? `\n *           maximum: ${prop.maximum}` : ""}${prop.minLength !== undefined ? `\n *           minLength: ${prop.minLength}` : ""}${prop.maxLength !== undefined ? `\n *           maxLength: ${prop.maxLength}` : ""}${escapedPattern ? `\n *           pattern: "${escapedPattern}"` : ""}`;
    })
    .join("");

  return lines ? `parameters:${lines}` : "";
};

const buildRequestBodySection = (
  schema: any,
  contentType = "application/json",
): string => {
  const schemaYaml = toSwaggerSchemaYaml(schema);

  return `
 *     requestBody:
 *       required: true
 *       content:
 *         ${contentType}:
 *           schema:
${schemaYaml}`;
};

const getFallbackEncryptedPlainSchema = (
  swaggerPath: string,
  method: string,
): any | null => {
  const m = method.toLowerCase();
  const p = swaggerPath.replace(/\/+$/, "");

  const pick = (key: string) =>
    joiSchemasMap[key] ? getSwaggerSchemaFromJoi(joiSchemasMap[key]) : null;

  // Auth
  if (m === "post" && p.endsWith("/auth/login")) return pick("loginInput");
  if (m === "post" && p.endsWith("/auth/register")) return pick("registerInput");

  // Onboarding
  if (m === "post" && p.endsWith("/onboarding/create"))
    return pick("createOnboardingInput");
  if (m === "patch" && /\/onboarding\/\{id\}$/.test(p))
    return pick("updateOnboardingInput");

  // FAQs
  if (m === "post" && p.endsWith("/faqs/create")) return pick("createFaqInput");
  if (m === "patch" && /\/faqs\/\{id\}$/.test(p)) return pick("updateFaqInput");
  if (m === "patch" && /\/faqs\/\{id\}\/publish$/.test(p))
    return pick("publishFaqInput");
  if (m === "patch" && p.endsWith("/faqs/reorder"))
    return pick("reorderFaqsInput");

  return null;
};



const findJoiSchemaFromHandlers = (
  handlers: Array<(...args: any[]) => any>,
): { schema: any | null; middlewareName: string } => {
  for (const handler of handlers) {
    if (typeof handler !== "function") continue;
    const name = resolveHandlerName(handler);
    if (!name) continue;

    const schemaFn = joiSchemasMap[name];
    if (!schemaFn) continue;

    const swaggerSchema = getSwaggerSchemaFromJoi(schemaFn);
    if (swaggerSchema) {
      return { schema: swaggerSchema, middlewareName: name };
    }
  }

  return { schema: null, middlewareName: "" };
};

const generateSwaggerComments = (): string => {
  const comments: string[] = [];

  const walk = (obj: any, parentTag?: string) => {
    if (!obj || typeof obj !== "object") return;

    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === "function") {
        const routeDef = value();
        const method = (routeDef.method || "get").toLowerCase();
        const fullPath = `${basePath}/${parentTag}/${routeDef.path}`;
        const swaggerPath = toSwaggerPath(fullPath);

        const matchedRoute = findMatchingRoute(routeDef.path, method);
        if (!matchedRoute) {
          logger(`⚠️ No matching route found for ${swaggerPath}`);
          return;
        }

        const handlers = Array.isArray(matchedRoute.handlers)
          ? matchedRoute.handlers
          : [];

        let parametersSection = buildPathParametersSection(fullPath);
        let requestBodySection = "";
        let joiSwaggerSchema: any | null = null;

        const { schema, middlewareName } = findJoiSchemaFromHandlers(handlers);
        if (schema) {
          joiSwaggerSchema = schema;

          if (method === "get") {
            const querySection = buildQueryParametersSection(schema);
            if (querySection) {
              parametersSection = parametersSection
                ? `${parametersSection}${querySection.replace("parameters:", "")}`
                : querySection;
            }
          } else {
            const contentType =
              multipartRoutes[middlewareName] === true
                ? "multipart/form-data"
                : "application/json";
            requestBodySection = buildRequestBodySection(schema, contentType);
          }
        }

        if (isEncryptHelperRoute(swaggerPath)) {
          requestBodySection = buildRequestBodySection(encryptHelperSchema);
        }

        if (isDecryptHelperRoute(swaggerPath)) {
          requestBodySection = buildRequestBodySection(decryptHelperSchema);
        }

        if (isEncryptedRequestRoute(swaggerPath, method)) {

          if (!joiSwaggerSchema) {joiSwaggerSchema = getFallbackEncryptedPlainSchema(swaggerPath, method);}
          const schemaYaml = toSwaggerSchemaYaml(encryptedRequestSchema);
          const exampleJson = joiSwaggerSchema
            ? buildExampleFromSwaggerSchema(joiSwaggerSchema)
            : null;

          const plainSchemaDescription = joiSwaggerSchema
            ? `\n *       description: |\n *         Plain (unencrypted) payload schema:\n${JSON.stringify(
              joiSwaggerSchema,
              null,
              2,
            )
              .split("\n")
              .map((line) => ` *         ${line}`)
              .join("\n")}`
            : "";

          const exampleDescription = exampleJson
            ? `\n *         \n *         Copy-ready example (encrypt this object):\n${exampleJson
              .split("\n")
              .map((line) => ` *         ${line}`)
              .join("\n")}`
            : "";

          requestBodySection = `
 *     requestBody:
 *       required: true${plainSchemaDescription}${exampleDescription}
 *       content:
 *         application/json:
 *           schema:
${schemaYaml}`;
        }

        comments.push(`
/**
 * @swagger
 * ${swaggerPath}:
 *   ${method}:
 *     summary: ${key}
 *     tags: [${parentTag || key}]${parametersSection ? `\n *     ${parametersSection}` : ""}${requestBodySection ? `\n *     ${requestBodySection}` : ""}
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
`);
      } else if (typeof value === "object") {
        walk(value, key);
      }
    });
  };

  walk(urls);
  return comments.join("\n");
};

export const setupAutoSwagger = (app: Express) => {
  loadRouters();
  fs.mkdirSync(path.dirname(tempFile), { recursive: true });

  const generatedComments = generateSwaggerComments();
  fs.writeFileSync(tempFile, generatedComments);

  const swaggerRoute = `/${getters.getAppSecrets().BASEPATH}/api-docs`;

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: `${getters.getAppSecrets().APP_DESCRIPTION} API Documentation`,
        version: "1.0.0",
        description:
          "Auto-generated API documentation (routes from constants/urls.ts + Joi schema from routers)",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: [tempFile],
  };

  const swaggerSpec = swaggerJSDoc(options);
  app.use(swaggerRoute, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get(`${swaggerRoute}.json`, (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  const baseUrl = `http://${getters.getAppUrls().apiDocsUrl}`.replace(/\/+$/, "");
  logger(`✅ Swagger UI  → ${baseUrl}${swaggerRoute}`);
  logger(`✅ Swagger JSON → ${baseUrl}${swaggerRoute}.json`);
};
