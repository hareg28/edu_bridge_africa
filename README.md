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

The enquiry form validates the visitor's selections and opens a prepared email draft. To set the recipient, create `.env.local` in the project root and add:

```text
NEXT_PUBLIC_CONTACT_EMAIL=your-real-contact-email
```

Restart the development server after changing this value. The project does not include a form-mail service or backend.

## Routes

- `/` — Home
- `/about` — About Us
- `/programs` — Programs
- `/services` — Services
- `/contact` — Contact
