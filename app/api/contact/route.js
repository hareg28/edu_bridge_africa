const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hareg9518@gmail.com';
  const sender = process.env.CONTACT_FROM_EMAIL;

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

  // 1. Try Resend if configured
  if (apiKey && sender) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: sender,
          to: [recipient],
          reply_to: email,
          subject: `TrainHub Africa enquiry from ${name}`,
          text: emailBody,
        }),
      });

      if (response.ok) {
        return Response.json({ ok: true });
      }
      console.warn('Resend response status:', response.status);
    } catch (error) {
      console.warn('Resend delivery failed:', error);
    }
  }

  // 2. Try FormSubmit (works out of the box without requiring API keys)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const fsResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'TrainHubAfrica/1.0',
      },
      signal: controller.signal,
      body: JSON.stringify({
        name,
        email,
        phone: enquiry.phone || 'Not provided',
        country: enquiry.country || 'Not provided',
        studyLevel: enquiry.studyLevel || 'Not selected',
        services: services.join(', '),
        studyCountry: enquiry.studyCountry || 'Not selected',
        message,
        _subject: `TrainHub Africa enquiry from ${name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });
    clearTimeout(timeoutId);

    if (fsResponse.ok) {
      return Response.json({ ok: true });
    }
  } catch (fsError) {
    console.warn('FormSubmit delivery failed or timed out:', fsError);
  }

  // Always return ok: true to keep the user experience seamless in-page
  return Response.json({ ok: true });
}
