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
// FormSubmit secure hash (replaces raw email in action URL — avoids spam exposure)
const formSubmitId = 'd3e7187fa7619c5e92879916a7a55436';

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

  function handleSubmit(event) {
    const form = event.currentTarget;
    setStatus({ message: '', type: '' });
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }

    const selected = [...form.querySelectorAll('[name="service"]:checked')].map((input) => input.value);
    if (!selected.length) {
      event.preventDefault();
      setStatus({ message: 'Please choose at least one service so we know how to help.', type: 'error' });
      servicesRef.current?.focus();
      return;
    }

    // Background call to /api/contact in case Resend is configured on Vercel (3s max timeout)
    try {
      const values = new FormData(form);
      const chosenCountry = values.get('studyCountry') === 'Another country'
        ? values.get('otherCountry')
        : values.get('studyCountry');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: values.get('name'),
          email: values.get('email'),
          phone: values.get('phone'),
          country: values.get('country'),
          studyLevel: values.get('studyLevel'),
          services: selected,
          studyCountry: chosenCountry,
          message: values.get('message'),
        }),
      }).catch(() => {}).finally(() => clearTimeout(timeoutId));
    } catch {}

    // Form submits into the hidden iframe in the background
    setSending(true);

    // Provide instant in-page confirmation and reset form
    setTimeout(() => {
      setSending(false);
      setStatus({ message: 'Thank you! Your enquiry has been sent. Our team will be in touch soon.', type: 'success' });
      form.reset();
      setStudyCountry('Still deciding');
    }, 1200);
  }

  return (
    <>
      <iframe name="enquiry-hidden-frame" id="enquiry-hidden-frame" style={{ display: 'none' }} title="enquiry-target" />
      <form
        className="enquiry-form"
        action={`https://formsubmit.co/${formSubmitId}`}
        method="POST"
        target="enquiry-hidden-frame"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_subject" value="EduBridge Africa Student Enquiry" />
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
    </>
  );
}
