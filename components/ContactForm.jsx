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
// Web3Forms access key — sends submissions to hareg9518@gmail.com
const WEB3FORMS_KEY = 'f90140af-459c-4748-9ce8-495b734ea831';

export default function ContactForm() {
  const [studyCountry, setStudyCountry] = useState('Still deciding');
  const [status, setStatus] = useState({ message: 'We'll send your enquiry directly to our team.', type: '' });
  const [sending, setSending] = useState(false);
  const servicesRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service');
    if (!requested) return;
    const matchingService = services.find((s) => s.toLowerCase() === requested.toLowerCase());
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

    if (!form.reportValidity()) return;

    const selected = [...form.querySelectorAll('[name="service"]:checked')].map((input) => input.value);
    if (!selected.length) {
      setStatus({ message: 'Please choose at least one service so we know how to help.', type: 'error' });
      servicesRef.current?.focus();
      return;
    }

    setSending(true);
    setStatus({ message: 'Sending your enquiry…', type: '' });

    const values = new FormData(form);
    const chosenCountry =
      values.get('studyCountry') === 'Another country'
        ? values.get('otherCountry')
        : values.get('studyCountry');

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: 'EduBridge Africa — New Student Enquiry',
      name: values.get('name'),
      email: values.get('email'),
      phone: values.get('phone') || 'Not provided',
      current_country: values.get('country') || 'Not provided',
      study_level: values.get('studyLevel') || 'Not specified',
      services_interested: selected.join(', '),
      study_country: chosenCountry,
      message: values.get('message'),
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ message: '✅ Thank you! Your enquiry has been sent. Our team will be in touch soon.', type: 'success' });
        form.reset();
        setStudyCountry('Still deciding');
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      setStatus({
        message: `Something went wrong — please email us directly at ${contactEmail}`,
        type: 'error',
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="enquiry-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form-heading">
        <div className="section-kicker">STUDENT ENQUIRY</div>
        <h2>How can we <em>help?</em></h2>
        <p>Fields marked * are required.</p>
      </div>
      <div className="form-grid">
        <label className="field"><span>Full name *</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
        <label className="field"><span>Email address *</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <label className="field"><span>Phone / WhatsApp</span><input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" /></label>
        <label className="field"><span>Current country</span><input name="country" autoComplete="country-name" placeholder="Your country" /></label>
        <label className="field full-field"><span>What would you like to study?</span>
          <select name="studyLevel" defaultValue="">
            <option value="">Choose a study level</option>
            <option>Bachelor's degree</option>
            <option>Master's degree</option>
            <option>PhD and research</option>
            <option>Short-term training</option>
            <option>Still exploring</option>
          </select>
        </label>
        <fieldset className="field full-field service-field" ref={servicesRef} tabIndex={-1}>
          <legend>Which services are you interested in? *</legend>
          <div className="check-grid">
            {services.map((service) => (
              <label key={service}><input type="checkbox" name="service" value={service} /><span>{service}</span></label>
            ))}
          </div>
          <small>Select all that apply.</small>
        </fieldset>
        <label className="field full-field"><span>Which country would you like to study in?</span>
          <select name="studyCountry" value={studyCountry} onChange={(e) => setStudyCountry(e.target.value)}>
            <option value="Still deciding">I'm still deciding</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
            <option value="Another country">Another country</option>
            <option value="Open to recommendations">I'm open to recommendations</option>
          </select>
        </label>
        {studyCountry === 'Another country' && (
          <label className="field full-field"><span>Country name *</span><input name="otherCountry" required placeholder="Enter the country name" /></label>
        )}
        <label className="field full-field"><span>Tell us about your plans *</span><textarea name="message" rows="5" required placeholder="Your study interests, goals, or questions" /></label>
      </div>
      <div className="form-submit">
        <button className="button button-gold" type="submit" disabled={sending}>
          {sending ? 'Sending…' : 'Send enquiry'} <span>↗</span>
        </button>
        <p className={status.type ? `form-status-${status.type}` : ''} role="status" aria-live="polite">
          {status.message}
        </p>
      </div>
      <p className="contact-email">Email: <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
    </form>
  );
}
