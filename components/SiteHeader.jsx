'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Programs', '/programs'],
  ['Services', '/services'],
  ['Partners', '/contact'],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img src="/assets/trainhub-mark.webp" alt="" />
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="TrainHub Africa home" onClick={() => setOpen(false)}>
        <BrandMark />
        <span className="brand-name">TrainHub <b>Africa</b><small>Learn. Grow. Succeed.</small></span>
      </Link>
      <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        ><span /><span /></button>
      </div>
    </header>
  );
}
