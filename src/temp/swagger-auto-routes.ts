
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
 *             "companyId": {
 *               "type": "string",
 *               "nullable": true
 *             },
 *             "question": {
 *               "type": "string",
 *               "minLength": 3,
 *               "maxLength": 500
 *             },
 *             "answer": {
 *               "type": "string",
 *               "minLength": 3
 *             },
 *             "category": {
 *               "type": "string",
 *               "maxLength": 120,
 *               "nullable": true
 *             },
 *             "tags": {
 *               "type": "array",
 *               "items": {
 *                 "type": "string"
 *               }
 *             },
 *             "sortOrder": {
 *               "type": "integer",
 *               "minimum": 0
 *             },
 *             "isPublished": {
 *               "type": "boolean"
 *             },
 *             "isActive": {
 *               "type": "boolean"
 *             }
 *           },
 *           "required": [
 *             "question",
 *             "answer"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "companyId": "string",
 *           "question": "string",
 *           "answer": "string",
 *           "category": "string",
 *           "tags": [
 *             "string"
 *           ],
 *           "sortOrder": 0,
 *           "isPublished": true,
 *           "isActive": true
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


/**
 * @swagger
 * /api/widget/faqs/create:
 *   post:
 *     summary: createFaq
 *     tags: [faqs]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "companyId": {
 *               "type": "string",
 *               "nullable": true
 *             },
 *             "question": {
 *               "type": "string",
 *               "minLength": 3,
 *               "maxLength": 500
 *             },
 *             "answer": {
 *               "type": "string",
 *               "minLength": 3
 *             },
 *             "category": {
 *               "type": "string",
 *               "maxLength": 120,
 *               "nullable": true
 *             },
 *             "tags": {
 *               "type": "array",
 *               "items": {
 *                 "type": "string"
 *               }
 *             },
 *             "sortOrder": {
 *               "type": "integer",
 *               "minimum": 0
 *             },
 *             "isPublished": {
 *               "type": "boolean"
 *             },
 *             "isActive": {
 *               "type": "boolean"
 *             }
 *           },
 *           "required": [
 *             "question",
 *             "answer"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "companyId": "string",
 *           "question": "string",
 *           "answer": "string",
 *           "category": "string",
 *           "tags": [
 *             "string"
 *           ],
 *           "sortOrder": 0,
 *           "isPublished": true,
 *           "isActive": true
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
 * /api/widget/faqs/all:
 *   get:
 *     summary: getFaqs
 *     tags: [faqs]
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
 * /api/widget/faqs/{id}:
 *   get:
 *     summary: getFaqById
 *     tags: [faqs]
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
 * /api/widget/faqs/{id}:
 *   patch:
 *     summary: updateFaq
 *     tags: [faqs]
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
 * /api/widget/faqs/{id}:
 *   delete:
 *     summary: deleteFaq
 *     tags: [faqs]
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
 * /api/widget/faqs/{id}/publish:
 *   patch:
 *     summary: publishFaq
 *     tags: [faqs]
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
 * /api/widget/faqs/reorder:
 *   patch:
 *     summary: reorderFaqs
 *     tags: [faqs]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "items": {
 *               "type": "array",
 *               "items": {
 *                 "type": "object",
 *                 "properties": {
 *                   "id": {
 *                     "type": "string"
 *                   },
 *                   "sortOrder": {
 *                     "type": "integer",
 *                     "minimum": 0
 *                   }
 *                 },
 *                 "required": [
 *                   "id",
 *                   "sortOrder"
 *                 ],
 *                 "additionalProperties": false
 *               },
 *               "minItems": 1
 *             }
 *           },
 *           "required": [
 *             "items"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "items": [
 *             {
 *               "id": "string",
 *               "sortOrder": 0
 *             }
 *           ]
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
 * /api/widget/faqs/public:
 *   get:
 *     summary: getPublicFaqs
 *     tags: [faqs]
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         required: false
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
 * /api/widget/services/create:
 *   post:
 *     summary: createService
 *     tags: [services]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "companyId": {
 *               "type": "string",
 *               "nullable": true
 *             },
 *             "question": {
 *               "type": "string",
 *               "minLength": 3,
 *               "maxLength": 500
 *             },
 *             "answer": {
 *               "type": "string",
 *               "minLength": 3
 *             },
 *             "category": {
 *               "type": "string",
 *               "maxLength": 120,
 *               "nullable": true
 *             },
 *             "tags": {
 *               "type": "array",
 *               "items": {
 *                 "type": "string"
 *               }
 *             },
 *             "sortOrder": {
 *               "type": "integer",
 *               "minimum": 0
 *             },
 *             "isPublished": {
 *               "type": "boolean"
 *             },
 *             "isActive": {
 *               "type": "boolean"
 *             }
 *           },
 *           "required": [
 *             "question",
 *             "answer"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "companyId": "string",
 *           "question": "string",
 *           "answer": "string",
 *           "category": "string",
 *           "tags": [
 *             "string"
 *           ],
 *           "sortOrder": 0,
 *           "isPublished": true,
 *           "isActive": true
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
 * /api/widget/services/all:
 *   get:
 *     summary: getServices
 *     tags: [services]
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
 * /api/widget/services/{id}:
 *   get:
 *     summary: getServiceById
 *     tags: [services]
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
 * /api/widget/services/{id}:
 *   patch:
 *     summary: updateService
 *     tags: [services]
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
 * /api/widget/services/{id}:
 *   delete:
 *     summary: deleteService
 *     tags: [services]
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
 * /api/widget/services/{id}/publish:
 *   patch:
 *     summary: publishService
 *     tags: [services]
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
 * /api/widget/services/reorder:
 *   patch:
 *     summary: reorderServices
 *     tags: [services]
 *     
 *     requestBody:
 *       required: true
 *       description: |
 *         Plain (unencrypted) payload schema:
 *         {
 *           "type": "object",
 *           "properties": {
 *             "items": {
 *               "type": "array",
 *               "items": {
 *                 "type": "object",
 *                 "properties": {
 *                   "id": {
 *                     "type": "string"
 *                   },
 *                   "sortOrder": {
 *                     "type": "integer",
 *                     "minimum": 0
 *                   }
 *                 },
 *                 "required": [
 *                   "id",
 *                   "sortOrder"
 *                 ],
 *                 "additionalProperties": false
 *               },
 *               "minItems": 1
 *             }
 *           },
 *           "required": [
 *             "items"
 *           ],
 *           "additionalProperties": false
 *         }
 *         
 *         Copy-ready example (encrypt this object):
 *         {
 *           "items": [
 *             {
 *               "id": "string",
 *               "sortOrder": 0
 *             }
 *           ]
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
 * /api/widget/services/public:
 *   get:
 *     summary: getPublicServices
 *     tags: [services]
 *     parameters:
 *       - in: query
 *         name: companyId
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         required: false
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
