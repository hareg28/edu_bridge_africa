import Link from 'next/link';
import { Kicker } from '../../components/SiteBits';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return <>
    <section className="inner-hero"><Kicker>ABOUT EDUBRIDGE AFRICA</Kicker><h1>Education can change<br /><em>where your story goes.</em></h1><p>We help African students navigate international study opportunities.</p><Link className="button button-gold" href="/enquire">Meet with our team <span>↗</span></Link></section>
    <section className="inner-section section-wrap"><div><Kicker>OUR PURPOSE</Kicker><h2>Open doors.<br /><em>Build connections.</em></h2></div><div className="inner-prose"><p>Based in Addis Ababa, we connect students with education opportunities around the world.</p><Link className="underlined-link" href="/services">See how we can help <span>↗</span></Link></div></section>
    <section className="values-band"><Kicker>WHAT GUIDES US</Kicker><div className="values-grid"><article><span>01</span><h3>Student first</h3></article><article><span>02</span><h3>Clear guidance</h3></article><article><span>03</span><h3>Global connection</h3></article></div></section>
  </>;
}
