import { Kicker } from '../../components/SiteBits';
import ContactForm from '../../components/ContactForm';

export const metadata = { title: 'Student Enquiry' };

export default function EnquiryPage() {
  return <>
    <section className="contact-page-intro"><Kicker>STUDENT ENQUIRY</Kicker><h1>Tell us about<br /><em>your study plans.</em></h1><p>Share your goals and the support you need.</p><div className="contact-location"><span>BASED IN</span><strong>Addis Ababa, Ethiopia</strong></div></section>
    <section className="form-section student-form-section"><ContactForm /></section>
  </>;
}
