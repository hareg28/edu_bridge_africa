import Link from 'next/link';
import { Kicker } from '../../components/SiteBits';

export const metadata = { title: 'About TrainHub Africa' };

export default function AboutPage() {
  return <>
    <section className="inner-hero"><Kicker>ABOUT TRAINHUB AFRICA</Kicker><h1>Your trusted partner<br /><em>in education and training.</em></h1><p>TrainHub Africa PLC is a legally registered Ethiopian company connecting students and professionals with quality international education, training, and career opportunities.</p><Link className="button button-gold" href="/enquire">Meet with our team <span>↗</span></Link></section>
    <section className="inner-section section-wrap"><div><Kicker>OUR PURPOSE</Kicker><h2>Learn. Grow.<br /><em>Succeed.</em></h2></div><div className="inner-prose"><p>We work with national and international educational institutions, universities, and training providers to help students access suitable academic programs and empower professionals with skills for a global environment.</p><p>Our founding team brings international study experience, cross-cultural understanding, and a commitment to educational excellence. We are ICEF-certified and committed to professional standards and ethical practices in international student recruitment.</p><p>From free consultations and academic profile assessment to university selection, application and scholarship guidance, visa support, and pre-departure planning, we guide students throughout their journey.</p><p>Our mission is to make international education and professional training more accessible, transparent, and achievable for students and professionals across Africa.</p><Link className="underlined-link" href="/services">Explore our services <span>↗</span></Link></div></section>
    <section className="values-band"><Kicker>OUR COMMITMENT</Kicker><div className="values-grid"><article><span>01</span><h3>Integrity</h3></article><article><span>02</span><h3>Personalized guidance</h3></article><article><span>03</span><h3>Trusted partnerships</h3></article><article><span>04</span><h3>Opportunities without borders</h3></article></div></section>
  </>;
}
