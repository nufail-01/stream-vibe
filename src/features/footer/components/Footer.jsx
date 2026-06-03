import { Link } from "react-router-dom";
import { FOOTER_LINKS } from "../constants/footerLinks";
import { HashLink } from "react-router-hash-link";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] border-t border-white/10">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 sm:gap-8 md:gap-10">
            {/* Footer Links */}
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3 sm:gap-4">
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  {section.title}
                </h4>

                <ul className="flex flex-col gap-2 sm:gap-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <HashLink
                        smooth
                        to={link.path}
                        className="text-white/50 text-xs sm:text-sm hover:text-white transition-colors duration-200 break-words"
                      >
                        {link.name}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Connect With Us */}
            <div className="flex flex-col gap-3 sm:gap-4 col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-2">
              <h4 className="text-white font-semibold text-sm sm:text-base">
                Connect With Us
              </h4>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  <FaFacebookF size={16} />
                </a>

                <a
                  href="https://twitter.com"
                  className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  <FaXTwitter size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/nufailshaikh/"
                  className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 px-4 sm:px-6 md:px-12 py-4 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © 2026 StreamVibe. All Rights Reserved. Developed by{" "}
            <span className="text-red-500 font-bold">Nufail Shaikh</span>.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-white/40 text-xs sm:text-sm">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>

            <span>|</span>

            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>

            <span>|</span>

            <Link to="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
