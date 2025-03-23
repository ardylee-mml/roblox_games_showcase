# Roblox Games Showcase

A Next.js application to showcase top Roblox games.

## Environment Variables

The following environment variables are required to run the application:

### Redis Configuration
- `REDIS_URL`: Redis connection URL in the format `redis://username:password@host:port`

For Vercel deployment:
1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add the `REDIS_URL` variable with your Redis connection string

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env.local` and fill in the required values
4. Run the development server:
   ```bash
   pnpm dev
   ```

## Deployment

The application is configured for deployment on Vercel. Make sure to:
1. Set up all required environment variables in your Vercel project settings
2. Connect your GitHub repository to Vercel for automatic deployments 