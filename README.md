# EduBridge Africa

EduBridge Africa is a Next.js website for international study guidance.

## Run it locally

Open Git Bash or the VS Code terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Stop the local server with `Ctrl+C`.

## Contact form

The enquiry form sends submissions to the EduBridge Africa inbox through the Resend email API. To enable delivery, create a Resend account, verify the sending domain, then copy `.env.example` to `.env.local` and set:

```text
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL=your-real-contact-email
CONTACT_FROM_EMAIL=EduBridge Africa <enquiries@your-verified-domain.com>
```

Restart the development server after changing these values. `CONTACT_FROM_EMAIL` must use a domain verified in Resend. The API key stays on the server and must never use a `NEXT_PUBLIC_` variable.

## Routes

- `/` — Home
- `/about` — About Us
- `/programs` — Programs
- `/services` — Services
- `/contact` — Contact
