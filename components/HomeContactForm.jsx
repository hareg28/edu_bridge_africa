'use client';

export default function HomeContactForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`Student enquiry from ${values.name}`);
    const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\nHow can we help?\n${values.message}`);
    window.location.href = `mailto:hareg9518@gmail.com?subject=${subject}&body=${body}`;
  }

  return <form className="home-contact-form" onSubmit={handleSubmit}>
    <label className="field"><span>Your name *</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
    <label className="field"><span>Email *</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
    <label className="field"><span>How can we help? *</span><textarea name="message" rows="3" required placeholder="Tell us a little about your plans" /></label>
    <button className="button button-gold" type="submit">Continue by email <span>↗</span></button>
    <p className="home-form-status">Your email app will open with your message ready to send.</p>
  </form>;
}
