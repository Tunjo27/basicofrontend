import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [isFooterFixed, setIsFooterFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (contentHeight > viewportHeight) {
        setIsFooterFixed(false);
      } else {
        setIsFooterFixed(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`footer ${isFooterFixed ? 'fixed' : ''}`}>
      <p>
        &copy; {new Date().getFullYear()} API. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
