# Meta Webhooks Handler

A Node.js application designed to handle webhooks from Meta platforms (Instagram, Facebook, and WhatsApp).

## Features

- Webhook verification for Meta platforms
- Message handling for WhatsApp
- Support for receiving and responding to webhook events

## Prerequisites

- Node.js (v18 or later recommended)
- PNPM package manager
- Meta Developer Account with configured webhook

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies using PNPM:
   ```bash
   pnpm install
   ```

3. Create a `.env` file based on the provided `.env-example`:
   ```bash
   cp .env-example .env
   ```

4. Fill in the environment variables in the `.env` file:
   - `WEBHOOK_VERIFY_TOKEN`: Your custom webhook verification token
   - `API_TOKEN`: Your Meta API token
   - `PORT`: The port number for the server (default: 3000)
   - `BUSINESS_PHONE`: Your business phone number ID from Meta
   - `API_VERSION`: Meta API version (e.g., v18.0)

## Development

To run the application in development mode with hot reloading:

```bash
pnpm dev
```

## Building and Running in Production

Build the TypeScript code:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Code Quality Tools

This project includes the following tools for maintaining code quality:

- ESLint: For code linting
- Prettier: For code formatting
- TypeScript: For type checking

### Available Scripts

- `pnpm lint`: Run ESLint to check for issues
- `pnpm lint:fix`: Fix ESLint issues automatically
- `pnpm format`: Format code using Prettier

## Webhook Setup

1. Set up a Meta App in the [Meta Developer Portal](https://developers.facebook.com/)
2. Configure your webhook URL: `https://your-domain.com/webhook`
3. Use the `WEBHOOK_VERIFY_TOKEN` from your `.env` file as the verification token
4. Subscribe to relevant webhook events (messages, messaging_postbacks, etc.)

## Project Structure

```
.
├── src/
│   ├── config/          # Environment and configuration
│   ├── controllers/     # Request handlers
│   │   └── WebhookController.ts
│   ├── routes/          # API routes
│   │   └── WebhookRoutes.ts
│   ├── services/        # Business logic
│   │   ├── handlers/    # Message handlers
│   │   │   ├── facebook/    # Facebook-specific handlers
│   │   │   ├── instagram/   # Instagram-specific handlers
│   │   │   └── whatsapp/    # WhatsApp-specific handlers
│   │   ├── MessageHandlerService.ts
│   │   ├── FacebookService.ts
│   │   └── WhatsAppService.ts
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   │   └── Logger.ts
│   └── app.ts          # Application entry point
├── logs/               # Application logs (gitignored)
├── eslint.config.js    # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── nodemon.json        # Nodemon configuration
```

## License

ISC
