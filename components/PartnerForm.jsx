'use client';

export default function PartnerForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const subject = encodeURIComponent(`Partnership enquiry from ${values.organization}`);
    const body = encodeURIComponent(`Organization: ${values.organization}\nContact: ${values.name}\nEmail: ${values.email}\nWebsite: ${values.website || 'Not provided'}\n\nPartnership idea:\n${values.message}`);
    window.location.href = `mailto:hareg9518@gmail.com?subject=${subject}&body=${body}`;
  }

  return <form className="enquiry-form partner-form" onSubmit={handleSubmit}>
    <div className="form-heading"><div className="section-kicker">PARTNER ENQUIRY</div><h2>Let’s work <em>together.</em></h2><p>Tell us a little about your organization.</p></div>
    <div className="form-grid">
      <label className="field"><span>Organization *</span><input name="organization" autoComplete="organization" required placeholder="Organization name" /></label>
      <label className="field"><span>Your name *</span><input name="name" autoComplete="name" required placeholder="Full name" /></label>
      <label className="field"><span>Work email *</span><input name="email" type="email" autoComplete="email" required placeholder="you@organization.org" /></label>
      <label className="field"><span>Website</span><input name="website" type="url" placeholder="https://" /></label>
      <label className="field full-field"><span>How would you like to partner? *</span><textarea name="message" rows="4" required placeholder="Share the opportunity or idea" /></label>
    </div>
    <div className="form-submit"><button className="button button-gold" type="submit">Continue by email <span>↗</span></button><p>Your email app will open with your message ready to send.</p></div>
  </form>;
}
