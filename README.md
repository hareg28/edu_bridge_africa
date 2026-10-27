# TrainHub Africa

TrainHub Africa is a Next.js website for international study guidance.

## Run it locally

Open Git Bash or the VS Code terminal in this folder and run:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Stop the local server with `Ctrl+C`.

## Contact form

The enquiry form delivers submissions directly to `hareg9518@gmail.com`. Submissions work out of the box via FormSubmit, and can optionally be routed through Resend by setting `RESEND_API_KEY`, `CONTACT_EMAIL`, and `CONTACT_FROM_EMAIL` in `.env.local`:

```text
RESEND_API_KEY=your-resend-api-key
CONTACT_EMAIL=hareg9518@gmail.com
CONTACT_FROM_EMAIL=TrainHub Africa <enquiries@your-verified-domain.com>
```

The form submits directly in the website page without opening any external email apps, displaying an immediate in-page confirmation.

## Routes

- `/` — Home
- `/about` — About Us
- `/programs` — Programs
- `/services` — Services
- `/contact` — Contact
