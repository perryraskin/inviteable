# Inviteable

A minimal event planning platform focused on privacy and simplicity. Create and manage events of any kind with complete control as a host and peace of mind as a guest.

![Inviteable Logo](https://res.cloudinary.com/raskin-me/image/upload/v1622141056/inviteable/inviteable-logo-2-alt-1_cpqw0x.png)

## Features

- 🎉 Create and manage events
- 👥 Invite guests and track RSVPs
- 🔒 Privacy-focused design
- 🌍 Timezone support
- 📱 Responsive design
- 🔗 Custom short URLs for events
- 🖼️ Image upload support
- 📍 Location mapping
- ✉️ Email notifications

## Tech Stack

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- Tailwind CSS
- Clerk Authentication
- AWS S3
- Google Maps API
- Rebrandly API
- Email Octopus

## Prerequisites

- Node.js 18+
- PostgreSQL
- AWS Account
- Clerk Account
- Rebrandly Account
- Google Maps API Key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
#Database
DATABASE_URL="postgresql://user:password@localhost:5432/inviteable"
DIRECT_URL="postgresql://user:password@localhost:5432/inviteable"

#AWS S3
INV_AWS_ACCESS_KEY="your_aws_access_key"
INV_AWS_SECRET_KEY="your_aws_secret_key"

#Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

#Rebrandly (not implemented yet)
REBRANDLY_API_KEY="your_rebrandly_api_key"
REBRANDLY_WORKSPACE_ID="your_workspace_id"
REBRANDLY_DOMAIN_ID="your_domain_id"

#Encryption (for cookies)
ENCRYPTION_SECRET="your_encryption_secret"
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-repo/inviteable.git
```

2. Install dependencies:

```bash
npm install
or
yarn install
```

3. Set up the database:

```bash
npx prisma generate
npx prisma db push
```

4. Run the development server:

```bash
npm run dev
or
yarn dev
```

The application will be available at `http://localhost:3111`

## Project Structure

- `/components` - React components
- `/pages` - Next.js pages and API routes
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/styles` - CSS and Tailwind configurations
- `/utilities` - Helper functions

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (if available)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Perry Raskin - [@perryraskin](https://github.com/perryraskin) - perry@raskin.me

Project Link: [https://github.com/perryraskin/inviteable](https://github.com/perryraskin/inviteable)
