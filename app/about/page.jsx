import Link from 'next/link';
import { CallToAction, Kicker } from '../../components/SiteBits';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return <>
    <section className="inner-hero"><Kicker>ABOUT EDUBRIDGE AFRICA</Kicker><h1>Education can change<br /><em>where your story goes.</em></h1><p>We connect African students with international education opportunities and help make the journey easier to navigate.</p><Link className="button button-gold" href="/contact">Meet with our team <span>↗</span></Link><img src="/assets/students.png" alt="Students celebrating their academic achievements" /></section>
    <section className="inner-section section-wrap"><div><Kicker>OUR PURPOSE</Kicker><h2>Open doors.<br /><em>Build connections.</em></h2></div><div className="inner-prose"><p>Based in Addis Ababa, we help African students explore international study and plan their next step.</p><Link className="underlined-link" href="/services">See how we can help <span>↗</span></Link></div></section>
    <section className="values-band"><Kicker>WHAT GUIDES US</Kicker><div className="values-grid"><article><span>01</span><h3>Student first</h3></article><article><span>02</span><h3>Clear guidance</h3></article><article><span>03</span><h3>Global connection</h3></article></div></section>
    <CallToAction title="Let's explore what" emphasis="could be next." />
  </>;
}
