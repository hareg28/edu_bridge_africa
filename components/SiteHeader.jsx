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
  ['Contact', '/contact'],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 54">
        <path d="M24 2 4 10v14c0 13 8 22 20 28 12-6 20-15 20-28V10L24 2Z" />
        <path className="mark-cut" d="M24 11 13 16v9c0 8 4 14 11 18 7-4 11-10 11-18v-9l-11-5Z" />
        <path className="mark-cap" d="m8 10 16-7 16 7-16 7L8 10Zm7 4v5c4 3 14 3 18 0v-5l-9 4-9-4Z" />
      </svg>
    </span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="EduBridge Africa home" onClick={() => setOpen(false)}>
        <BrandMark />
        <span className="brand-name">EduBridge <b>Africa</b><small>Your bridge to global education</small></span>
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
