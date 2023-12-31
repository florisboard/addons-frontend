import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/svg/logo.svg';
import { footerLinks, footerSocialMedias } from '@/fixtures/footer';

export default function Footer() {
  return (
    <footer className="footer mt-4 bg-base-200 p-10 text-base-content">
      <aside>
        <Image alt="FlorisBoard Logo" src={logo} />
        <p className="md:max-w-sm lg:max-w-none">
          <span className="font-medium">FlorisBoard.</span>
          <br />
          An open-source keyboard for Android which respects your privacy. Currently in early-beta.
        </p>
      </aside>
      <nav>
        <header className="footer-title">FlorisBoard</header>
        {footerLinks.map((link) => (
          <Link key={link.name} href={link.href} className="link-hover link">
            {link.name}
          </Link>
        ))}
      </nav>
      <nav>
        <header className="footer-title">Social Medias</header>
        {footerSocialMedias.map((link) => (
          <Link target="_blank" key={link.name} href={link.href} className="link-hover link">
            <link.Icon className="h-6 w-6" />
          </Link>
        ))}
      </nav>
    </footer>
  );
}
