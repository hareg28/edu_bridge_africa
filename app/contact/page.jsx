import { Kicker } from '../../components/SiteBits';
import PartnerForm from '../../components/PartnerForm';

export const metadata = { title: 'Partners' };

export default function ContactPage() {
  return <>
    <section className="contact-page-intro"><Kicker>PARTNER WITH TRAINHUB AFRICA</Kicker><h1>Let’s open doors<br /><em>together.</em></h1><p>We welcome schools, universities, and education organizations interested in working with us.</p><div className="contact-location"><span>BASED IN</span><strong>Addis Ababa, Ethiopia</strong></div></section>
    <section className="form-section"><PartnerForm /><aside className="form-aside"><div className="aside-icon">✳</div><h2>Build a<br />connection.</h2><p>Share your idea and our partnerships team will follow up.</p><div className="aside-line" /><a href="/about" className="underlined-link">About TrainHub <span>↗</span></a></aside></section>
  </>;
}
