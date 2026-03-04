
/**
 * @swagger
 * /api/widget/health/check:
 *   get:
 *     summary: check
 *     tags: [health]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/health/encrypt:
 *   post:
 *     summary: encrytData
 *     tags: [health]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "description": "Plain JSON payload to encrypt (any object).",
 *               "additionalProperties": true
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/health/decrypt:
 *   post:
 *     summary: decryptData
 *     tags: [health]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload returned by /health/encrypt"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/sessions/check:
 *   get:
 *     summary: check
 *     tags: [sessions]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/sessions/add:
 *   post:
 *     summary: addSession
 *     tags: [sessions]
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "attachmentId": {
 *                   "type": "string"
 *                 },
 *                 "conversationId": {
 *                   "type": "string"
 *                 },
 *                 "businessId": {
 *                   "type": "string"
 *                 },
 *                 "messageId": {
 *                   "type": "string"
 *                 },
 *                 "fileName": {
 *                   "type": "string"
 *                 },
 *                 "fileType": {
 *                   "type": "string"
 *                 },
 *                 "fileSize": {
 *                   "type": "number",
 *                   "format": "float"
 *                 },
 *                 "mimeType": {
 *                   "type": "string"
 *                 },
 *                 "storageProvider": {
 *                   "type": "string",
 *                   "enum": [
 *                     "s3",
 *                     "cloudflare_r2"
 *                   ]
 *                 },
 *                 "storagePath": {
 *                   "type": "string"
 *                 },
 *                 "publicUrl": {
 *                   "type": "string",
 *                   "nullable": true
 *                 },
 *                 "uploadedBy": {
 *                   "type": "string"
 *                 },
 *                 "uploadedByType": {
 *                   "type": "string",
 *                   "enum": [
 *                     "customer",
 *                     "agent"
 *                   ]
 *                 },
 *                 "scanStatus": {
 *                   "type": "string",
 *                   "enum": [
 *                     "pending",
 *                     "clean",
 *                     "infected"
 *                   ]
 *                 }
 *               },
 *               "required": [
 *                 "conversationId",
 *                 "businessId"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/sessions/{conversationId}:
 *   get:
 *     summary: getSessions
 *     tags: [sessions]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: conversationId
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/messages/check:
 *   get:
 *     summary: check
 *     tags: [messages]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/messages/save:
 *   post:
 *     summary: createMessage
 *     tags: [messages]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/messages/{conversationId}:
 *   get:
 *     summary: getMessages
 *     tags: [messages]
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: conversationId
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/messages/{messageId}:
 *   patch:
 *     summary: updateMessageStatus
 *     tags: [messages]
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema:
 *           type: string
 *         description: messageId
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/auth/check:
 *   get:
 *     summary: check
 *     tags: [auth]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/auth/login:
 *   post:
 *     summary: login
 *     tags: [auth]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "emailOrUsername": {
 *               "type": "string"
 *             },
 *             "password": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "emailOrUsername",
 *             "password"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "emailOrUsername": "string",
 *           "password": "string"
 *         }
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload as text"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/auth/register:
 *   post:
 *     summary: register
 *     tags: [auth]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "username": {
 *               "type": "string"
 *             },
 *             "firstName": {
 *               "type": "string"
 *             },
 *             "lastName": {
 *               "type": "string"
 *             },
 *             "email": {
 *               "type": "string",
 *               "format": "email"
 *             },
 *             "phone": {
 *               "type": "string"
 *             },
 *             "password": {
 *               "type": "string",
 *               "minLength": 6
 *             },
 *             "role": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "username",
 *             "firstName",
 *             "lastName",
 *             "email",
 *             "phone",
 *             "password"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "username": "string",
 *           "firstName": "string",
 *           "lastName": "string",
 *           "email": "string",
 *           "phone": "string",
 *           "password": "string",
 *           "role": "string"
 *         }
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload as text"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/onboarding/create:
 *   post:
 *     summary: createOnboarding
 *     tags: [onboarding]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "companyName": {
 *               "type": "string",
 *               "minLength": 2,
 *               "maxLength": 120
 *             },
 *             "websiteUrl": {
 *               "type": "string",
 *               "nullable": true
 *             },
 *             "industryCategory": {
 *               "type": "string"
 *             },
 *             "companySizeOrRole": {
 *               "type": "string"
 *             },
 *             "brandColors": {
 *               "type": "object",
 *               "properties": {
 *                 "primary": {
 *                   "type": "string",
 *                   "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
 *                 },
 *                 "secondary": {
 *                   "type": "string",
 *                   "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$",
 *                   "nullable": true
 *                 }
 *               },
 *               "required": [
 *                 "primary"
 *               ],
 *               "additionalProperties": false
 *             },
 *             "widgetPosition": {
 *               "type": "string",
 *               "enum": [
 *                 "bottom-right",
 *                 "bottom-left"
 *               ]
 *             },
 *             "agentPersona": {
 *               "type": "object",
 *               "properties": {
 *                 "alias": {
 *                   "type": "string",
 *                   "minLength": 2,
 *                   "maxLength": 50
 *                 },
 *                 "profileImageUrl": {
 *                   "type": "string",
 *                   "nullable": true
 *                 }
 *               },
 *               "required": [
 *                 "alias"
 *               ],
 *               "additionalProperties": false
 *             },
 *             "hoursOfOperation": {
 *               "type": "object",
 *               "properties": {
 *                 "timezone": {
 *                   "type": "string"
 *                 },
 *                 "schedule": {
 *                   "type": "array",
 *                   "items": {
 *                     "type": "object",
 *                     "properties": {
 *                       "day": {
 *                         "type": "string",
 *                         "enum": [
 *                           "monday",
 *                           "tuesday",
 *                           "wednesday",
 *                           "thursday",
 *                           "friday",
 *                           "saturday",
 *                           "sunday"
 *                         ]
 *                       },
 *                       "start": {
 *                         "type": "string",
 *                         "pattern": "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                       },
 *                       "end": {
 *                         "type": "string",
 *                         "pattern": "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                       },
 *                       "isOpen": {
 *                         "type": "boolean"
 *                       }
 *                     },
 *                     "required": [
 *                       "day",
 *                       "start",
 *                       "end",
 *                       "isOpen"
 *                     ],
 *                     "additionalProperties": false
 *                   }
 *                 }
 *               },
 *               "required": [
 *                 "timezone",
 *                 "schedule"
 *               ],
 *               "additionalProperties": false
 *             },
 *             "languagePreferences": {
 *               "type": "object",
 *               "properties": {
 *                 "defaultLanguage": {
 *                   "type": "string"
 *                 },
 *                 "supportedLanguages": {
 *                   "type": "array",
 *                   "items": {
 *                     "type": "string"
 *                   },
 *                   "minItems": 1
 *                 }
 *               },
 *               "required": [
 *                 "defaultLanguage",
 *                 "supportedLanguages"
 *               ],
 *               "additionalProperties": false
 *             },
 *             "preChatFormFields": {
 *               "type": "array",
 *               "items": {
 *                 "type": "object",
 *                 "properties": {
 *                   "key": {
 *                     "type": "string"
 *                   },
 *                   "label": {
 *                     "type": "string"
 *                   },
 *                   "type": {
 *                     "type": "string",
 *                     "enum": [
 *                       "text",
 *                       "email",
 *                       "number",
 *                       "tel",
 *                       "textarea",
 *                       "select"
 *                     ]
 *                   },
 *                   "required": {
 *                     "type": "boolean"
 *                   },
 *                   "options": {
 *                     "type": "array",
 *                     "items": {
 *                       "type": "string"
 *                     }
 *                   }
 *                 },
 *                 "required": [
 *                   "key",
 *                   "label",
 *                   "type",
 *                   "required"
 *                 ],
 *                 "additionalProperties": false
 *               }
 *             },
 *             "knowledgeBaseData": {
 *               "type": "object",
 *               "properties": {
 *                 "urls": {
 *                   "type": "array",
 *                   "items": {
 *                     "type": "string"
 *                   }
 *                 },
 *                 "documents": {
 *                   "type": "array",
 *                   "items": {
 *                     "type": "string"
 *                   }
 *                 }
 *               },
 *               "additionalProperties": false
 *             }
 *           },
 *           "required": [
 *             "companyName",
 *             "industryCategory",
 *             "companySizeOrRole",
 *             "brandColors",
 *             "widgetPosition",
 *             "agentPersona",
 *             "hoursOfOperation",
 *             "languagePreferences",
 *             "knowledgeBaseData"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "companyName": "string",
 *           "websiteUrl": "string",
 *           "industryCategory": "string",
 *           "companySizeOrRole": "string",
 *           "brandColors": {
 *             "primary": "string",
 *             "secondary": "string"
 *           },
 *           "widgetPosition": "string",
 *           "agentPersona": {
 *             "alias": "string",
 *             "profileImageUrl": "string"
 *           },
 *           "hoursOfOperation": {
 *             "timezone": "string",
 *             "schedule": [
 *               {
 *                 "day": "string",
 *                 "start": "string",
 *                 "end": "string",
 *                 "isOpen": true
 *               }
 *             ]
 *           },
 *           "languagePreferences": {
 *             "defaultLanguage": "string",
 *             "supportedLanguages": [
 *               "string"
 *             ]
 *           },
 *           "preChatFormFields": [
 *             {
 *               "key": "string",
 *               "label": "string",
 *               "type": "string",
 *               "required": true,
 *               "options": [
 *                 "string"
 *               ]
 *             }
 *           ],
 *           "knowledgeBaseData": {
 *             "urls": [
 *               "string"
 *             ],
 *             "documents": [
 *               "string"
 *             ]
 *           }
 *         }
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload as text"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/onboarding/all:
 *   get:
 *     summary: getOnboardings
 *     tags: [onboarding]
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/onboarding/{id}:
 *   get:
 *     summary: getOnboardingById
 *     tags: [onboarding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/onboarding/{id}:
 *   patch:
 *     summary: updateOnboarding
 *     tags: [onboarding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "id": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "id"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "id": "string"
 *         }
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload as text"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        

/**
 * @swagger
 * /api/widget/onboarding/{id}:
 *   delete:
 *     summary: deleteOnboarding
 *     tags: [onboarding]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "id": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "id"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "id": "string"
 *         }
 *       content:
 *         application/json:
 *           schema:
 *             {
 *               "type": "object",
 *               "properties": {
 *                 "textData": {
 *                   "type": "string",
 *                   "description": "Encrypted payload as text"
 *                 }
 *               },
 *               "required": [
 *                 "textData"
 *               ],
 *               "additionalProperties": false
 *             }
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
        