const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return Response.json({ error: 'The enquiry service is not configured yet. Please email us directly.' }, { status: 503 });
  }

  let enquiry;
  try {
    enquiry = await request.json();
  } catch {
    return Response.json({ error: 'Please check the form and try again.' }, { status: 400 });
  }

  const name = typeof enquiry.name === 'string' ? enquiry.name.trim() : '';
  const email = typeof enquiry.email === 'string' ? enquiry.email.trim() : '';
  const message = typeof enquiry.message === 'string' ? enquiry.message.trim() : '';
  const services = Array.isArray(enquiry.services) ? enquiry.services.filter((item) => typeof item === 'string') : [];

  if (!name || name.length > 150 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 10000 || !services.length) {
    return Response.json({ error: 'Please complete the required fields and choose at least one service.' }, { status: 400 });
  }

  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone / WhatsApp: ${enquiry.phone || 'Not provided'}`,
    `Current country: ${enquiry.country || 'Not provided'}`,
    `Study level: ${enquiry.studyLevel || 'Not selected'}`,
    `Services requested: ${services.join(', ')}`,
    `Preferred study country: ${enquiry.studyCountry || 'Not selected'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `EduBridge Africa enquiry from ${name}`,
        text: emailBody,
      }),
    });

    if (!response.ok) {
      console.error('Enquiry email provider rejected the request:', response.status);
      return Response.json({ error: 'We could not send your enquiry right now. Please try again or email us directly.' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Enquiry email delivery failed:', error);
    return Response.json({ error: 'We could not send your enquiry right now. Please try again or email us directly.' }, { status: 502 });
  }
}
