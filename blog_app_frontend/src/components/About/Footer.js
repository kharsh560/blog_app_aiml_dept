import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <div className=" text-black ">
      <div className="container mx-auto px-4">
        <div className="mt-8 text-center text-gray-400">
          <p>COPYRIGHT &copy; {new Date().getFullYear()} AI & ML Dept. Blog</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

