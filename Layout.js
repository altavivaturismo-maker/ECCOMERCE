import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, Package, MapPin, Lightbulb, Info, Target, 
  Phone, Menu, X, Plane, Facebook, Instagram, 
  Mail, MapPinned, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navigationItems = [
  { title: "Início", url: createPageUrl("Home"), icon: Home },
  { title: "Pacotes", url: createPageUrl("Pacotes"), icon: Package },
  { title: "City Tours", url: createPageUrl("CityTours"), icon: MapPin },
  { title: "Consultoria", url: createPageUrl("Consultoria"), icon: Lightbulb },
  { title: "Minhas Reservas", url: createPageUrl("MyBookings"), icon: Package },
  { title: "Sobre Nós", url: createPageUrl("SobreNos"), icon: Info },
  { title: "Missão e Valores", url: createPageUrl("MissaoValores"), icon: Target },
  { title: "Contato", url: createPageUrl("Contato"), icon: Phone },
];

export default function Layout({ children }) {
  const location = useLocation();
  const [theme, setTheme] = useState("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <style>{`
        :root {
          --primary: 210 100% 45%;
          --primary-hover: 210 100% 40%;
          --secondary: 160 60% 45%;
          --secondary-hover: 160 60% 40%;
          --accent: 200 95% 50%;
        }
        
        .dark {
          --primary: 210 100% 55%;
          --primary-hover: 210 100% 60%;
          --secondary: 160 60% 55%;
          --secondary-hover: 160 60% 60%;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 80%;
          height: 2px;
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)));
          transition: transform 0.3s ease;
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          transform: translateX(-50%) scaleX(1);
        }

        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .plane-toggle {
          transition: transform 0.3s ease;
        }

        .plane-toggle:hover {
          transform: translateY(-2px);
        }
      `}</style>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg" 
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6905174582ce9a74d9fd2ca7/8f43725ce_logo.png"
                  alt="Altaviva Turismo"
                  className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">Altaviva Turismo</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">Sua viagem dos sonhos</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.url
                      ? "text-blue-600 dark:text-blue-400 active"
                      : "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 plane-toggle"
                title="Alternar tema"
              >
                <Plane className={`w-5 h-5 transition-colors ${
                  theme === "light" 
                    ? "text-blue-600" 
                    : "text-blue-400"
                }`} />
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] dark:bg-slate-900">
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="flex items-center gap-3 pb-6 border-b dark:border-slate-800">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6905174582ce9a74d9fd2ca7/8f43725ce_logo.png"
                        alt="Altaviva Turismo"
                        className="h-10 w-auto object-contain"
                      />
                      <div>
                        <h2 className="font-bold gradient-text">Altaviva Turismo</h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400">Menu</p>
                      </div>
                    </div>
                    {navigationItems.map((item) => (
                      <Link
                        key={item.title}
                        to={item.url}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          location.pathname === item.url
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Sobre */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6905174582ce9a74d9fd2ca7/8f43725ce_logo.png"
                  alt="Altaviva Turismo"
                  className="h-10 w-auto object-contain"
                />
                <h3 className="text-lg font-bold">Altaviva Turismo</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Transformando sonhos em experiências inesquecíveis. Sua agência de viagens completa em Franco da Rocha - SP.
              </p>
            </div>

            {/* Links Rápidos */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {navigationItems.slice(0, 5).map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.url}
                      className="text-slate-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPinned className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Franco da Rocha - SP<br />Centro da cidade</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>(11) 99447-9615</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400">
                  <Mail className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span>altavivaturismo@gmail.com</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-400">
                  <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Seg - Sex: 9h às 18h<br />Sáb: 9h às 13h</span>
                </li>
              </ul>
            </div>

            {/* Redes Sociais */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-3 mb-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/5511994479615" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
              <p className="text-slate-400 text-sm">
                Siga-nos nas redes sociais e fique por dentro de ofertas exclusivas!
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Altaviva Turismo Ltda. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-xs mt-2">
              Desenvolvido com ❤️ para proporcionar as melhores experiências de viagem
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
