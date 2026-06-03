import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../assets/icons/logo.svg?react";
import { Search, Bell, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Movies & Shows", path: "/movies" },
  { name: "Support", path: "/support" },
  { name: "Subscriptions", path: "/subscriptions" },
];

// ✅ Reusable isActive function
const checkIsActive = (link, pathname) => {
  if (link.path === "/") return pathname === "/";
  if (link.path === "/movies") {
    return (
      pathname.startsWith("/movies") ||
      pathname.startsWith("/shows")
    );
  }
  return pathname.startsWith(link.path);
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setVisible(true);
    setMenuOpen(false);
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4">
      {/* Background */}
      <div
        className={`absolute inset-0 -z-10 border-b transition-all duration-500 ease-out ${
          scrolled
            ? "backdrop-blur-xl bg-[#141414]/80 border-white/5 shadow-2xl shadow-black/40"
            : "backdrop-blur-none bg-transparent border-transparent"
        }`}
      />

      {/* Logo */}
      <div className="flex items-center shrink-0">
        <Logo className="h-8 sm:h-10 w-auto" />
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-1 sm:px-1.5 py-1 sm:py-1.5 gap-0.5 sm:gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = checkIsActive(link, location.pathname);
          return (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#1A1A1A] text-white border border-white/5 shadow-inner"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </button>
          );
        })}
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-2">
        <button className="p-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5">
          <Search size={20} />
        </button>
        <button className="p-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5">
          <Bell size={20} />
        </button>
        <button
          className="md:hidden p-2.5 text-zinc-400 hover:text-white cursor-pointer rounded-lg hover:bg-white/5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* end container */}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 sm:mt-3 px-2 sm:px-3 max-w-7xl mx-auto bg-[#141414]/95 backdrop-blur-xl border border-white/10 rounded-xl p-2 sm:p-3 flex flex-col gap-0.5 sm:gap-1 md:hidden shadow-2xl">
          {NAV_LINKS.map((link) => {
            const isActive = checkIsActive(link, location.pathname);
            return (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-medium text-left transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;