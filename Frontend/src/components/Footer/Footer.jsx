import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-200 dark:bg-gray-900 border-t border-black/10 dark:border-gray-700 transition-colors">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  &copy; Copyright 2025. All Rights Reserved by Priyanshu.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Company
              </h3>
              <ul>
                {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map((item) => (
                  <li key={item} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Support
              </h3>
              <ul>
                {['Account', 'Help', 'Contact Us', 'Customer Support'].map((item) => (
                  <li key={item} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Legals Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="mb-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Legals
              </h3>
              <ul>
                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                  <li key={item} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
