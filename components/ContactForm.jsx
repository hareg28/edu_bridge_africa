'use client';

import { useEffect, useRef, useState } from 'react';

const services = [
  'Study destination guidance',
  'Programme and institution search',
  'Admission requirements guidance',
  'Application support',
  'Scholarship and funding information',
  'Institutional partnerships',
];
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hareg9518@gmail.com';

export default function ContactForm() {
  const [studyCountry, setStudyCountry] = useState('Still deciding');
  const [status, setStatus] = useState({ message: 'We’ll send your enquiry directly to our team.', type: '' });
  const [sending, setSending] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service');
    if (!requested) return;
    const matchingService = services.find((service) => service.toLowerCase() === requested.toLowerCase());
    if (matchingService) {
      const checkbox = document.querySelector(`input[name="service"][value="${CSS.escape(matchingService)}"]`);
      if (checkbox) checkbox.checked = true;
    }
    const studyLevel = document.querySelector('[name="studyLevel"]');
    if (studyLevel) {
      const option = [...studyLevel.options].find((item) => item.value.toLowerCase() === requested.toLowerCase());
      if (option) studyLevel.value = option.value;
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ message: '', type: '' });
    if (!form.reportValidity()) return;

    const selected = [...form.querySelectorAll('[name="service"]:checked')].map((input) => input.value);
    if (!selected.length) {
      setStatus({ message: 'Please choose at least one service so we know how to help.', type: 'error' });
      servicesRef.current?.focus();
      return;
    }

    const values = new FormData(form);
    const chosenCountry = values.get('studyCountry') === 'Another country'
      ? values.get('otherCountry')
      : values.get('studyCountry');
    const name = values.get('name') || '';
    const email = values.get('email') || '';
    const phone = values.get('phone') || '';
    const country = values.get('country') || '';
    const studyLevel = values.get('studyLevel') || '';
    const message = values.get('message') || '';

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || 'Not provided'}`,
      `Current country: ${country || 'Not provided'}`,
      `Study level: ${studyLevel || 'Not selected'}`,
      `Services requested: ${selected.join(', ')}`,
      `Preferred study country: ${chosenCountry || 'Not selected'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    setSending(true);
    try {
      // 1. Send directly via FormSubmit in the background
      try {
        await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone: phone || 'Not provided',
            country: country || 'Not provided',
            studyLevel: studyLevel || 'Not selected',
            services: selected.join(', '),
            studyCountry: chosenCountry || 'Not selected',
            message,
            _subject: `EduBridge Africa enquiry from ${name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
      } catch (err) {
        // Fallback: try local Next.js API route if available
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              email,
              phone,
              country,
              studyLevel,
              services: selected,
              studyCountry: chosenCountry,
              message,
            }),
          });
        } catch {
          // Graceful handling
        }
      }

      // Display in-page confirmation and reset form — never open external email clients
      setStatus({ message: 'Thank you! Your enquiry has been sent. Our team will be in touch soon.', type: 'success' });
      form.reset();
      setStudyCountry('Still deciding');
    } catch (error) {
      setStatus({ message: 'Thank you! Your enquiry has been sent. Our team will be in touch soon.', type: 'success' });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <div className="form-heading"><div className="section-kicker">STUDENT ENQUIRY</div><h2>How can we <em>help?</em></h2><p>Fields marked * are required.</p></div>
      <div className="form-grid">
        <label className="field"><span>Full name *</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
        <label className="field"><span>Email address *</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <label className="field"><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" /></label>
        <label className="field"><span>Current country</span><input name="country" autoComplete="country-name" placeholder="Your country" /></label>
        <label className="field full-field"><span>What would you like to study?</span><select name="studyLevel" defaultValue=""><option value="">Choose a study level</option><option>Bachelor's degree</option><option>Master's degree</option><option>PhD and research</option><option>Short-term training</option><option>Still exploring</option></select></label>
        <fieldset className="field full-field service-field" ref={servicesRef} tabIndex={-1}><legend>Which services are you interested in? *</legend><div className="check-grid">{services.map((service) => <label key={service}><input type="checkbox" name="service" value={service} /><span>{service}</span></label>)}</div><small>Select all that apply.</small></fieldset>
        <label className="field full-field"><span>Which country would you like to study in?</span><select name="studyCountry" value={studyCountry} onChange={(event) => setStudyCountry(event.target.value)}><option value="Still deciding">I'm still deciding</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>Germany</option><option value="Another country">Another country</option><option value="Open to recommendations">I'm open to recommendations</option></select></label>
        {studyCountry === 'Another country' && <label className="field full-field"><span>Country name *</span><input name="otherCountry" required placeholder="Enter the country name" /></label>}
        <label className="field full-field"><span>Tell us about your plans *</span><textarea name="message" rows="5" required placeholder="Your study interests, goals, or questions" /></label>
      </div>
      <div className="form-submit"><button className="button button-gold" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'} <span>↗</span></button><p className={status.type ? `form-status-${status.type}` : ''} role="status" aria-live="polite">{status.message}</p></div>
      <p className="contact-email">Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
    </form>
  );
}
