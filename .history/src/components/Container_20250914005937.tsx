import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";

// Ultra-smooth scroll handler
function ultraSmoothScrollTo(element: Element | null) {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - 80; // Account for fixed header

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  isActive?: boolean;
};

type GlitchTextProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#experience", text: "Experience" },
  { href: "#projects", text: "Projects" },
  { href: "#certifications", text: "Certifications" },
  { href: "#services", text: "Services" },
];

function GlitchText({ children, className, href, onClick }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn("relative overflow-hidden inline-block", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main text */}
        <span className="relative z-10">
          {children}
        </span>
        
        {/* Glitch effect layers */}
        {isHovered && (
          <>
            <motion.span
              className="absolute inset-0 text-red-500 opacity-80"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [-1, 1, -2, 1, 0],
                y: [0, -1, 1, -1, 0]
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{ 
                clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
                zIndex: 5
              }}
            >
              {children}
            </motion.span>
            
            <motion.span
              className="absolute inset-0 text-cyan-400 opacity-80"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [1, -1, 2, -1, 0],
                y: [1, 0, -1, 1, 0]
              }}
              transition={{
                duration: 0.12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.03
              }}
              style={{ 
                clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
                zIndex: 5
              }}
            >
              {children}
            </motion.span>
            
            <motion.span
              className="absolute inset-0 text-yellow-300 opacity-60"
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: [-1.5, 1.5, -1, 1, 0],
                y: [-0.5, 0.5, -1.5, 1.5, 0]
              }}
              transition={{
                duration: 0.18,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.06
              }}
              style={{ 
                clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
                zIndex: 5
              }}
            >
              {children}
            </motion.span>
          </>
        )}
      </Link>
    );
  }

  return (
    <span
      className={cn("relative overflow-hidden inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Glitch effect layers */}
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-80"
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: [-1, 1, -2, 1, 0],
              y: [0, -1, 1, -1, 0]
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
              zIndex: 5
            }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-cyan-400 opacity-80"
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: [1, -1, 2, -1, 0],
              y: [1, 0, -1, 1, 0]
            }}
            transition={{
              duration: 0.12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.03
            }}
            style={{ 
              clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
              zIndex: 5
            }}
          >
            {children}
          </motion.span>
          
          <motion.span
            className="absolute inset-0 text-yellow-300 opacity-60"
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: [-1.5, 1.5, -1, 1, 0],
              y: [-0.5, 0.5, -1.5, 1.5, 0]
            }}
            transition={{
              duration: 0.18,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.06
            }}
            style={{ 
              clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
              zIndex: 5
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
}

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    ultraSmoothScrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <motion.a
      href={props.href}
      onClick={handleClick}
      className={cn(
        "relative px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white",
        props.isActive && "text-white"
      )}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <GlitchText className="text-sm font-medium">
        {props.text}
      </GlitchText>
      {props.isActive && (
        <motion.div
          className="absolute inset-0 bg-white/10 rounded-full -z-10"
          layoutId="activeNav"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30
          }}
        />
      )}
    </motion.a>
  );
}

export default function Container(props: ContainerProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("#home");

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Souvik Bagchi",
    description: `Aspiring Data Scientist and Software Engineer pursuing B.Tech CSE (Data Science). Remote Lab Tester at Samsung Electronics. Member of NVIDIA & GitHub Developer Programs.`,
    image: "/assets/logo.webp",
    type: "website",
    ...customMeta,
  };

  // Check if we're on the main page
  const isMainPage = router.pathname === '/';

  // Handle scroll for navbar background and active section detection
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollTop = window.scrollY;
          setIsScrolled(currentScrollTop > 50);
          
          // Detect active section
          const sections = navLinks.map(link => link.href);
          const currentSection = sections.find(section => {
            const element = document.querySelector(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          
          if (currentSection) {
            setActiveSection(currentSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // preloader effect
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 2000);
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#7B82FE" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://www.souvikbagchi.social${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.souvikbagchi.social${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Souvik Bagchi" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Souvik Bagchi" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      
      {/* Desktop Logo Pill - Only on main page */}
      {isMainPage && !isLoading && (
        <motion.div
          data-navbar="true"
          className="z-[9998] hidden sm:block pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.1
          }}
          style={{ 
            position: 'fixed',
            top: '1.5rem',
            left: '0',
            right: '0',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className={cn(
                "group inline-block px-5 py-3 rounded-full bg-transparent border-2 relative overflow-hidden",
                "transition-all duration-500 ease-out pointer-events-auto",
                "shadow-lg shadow-black/20 backdrop-blur-sm",
                isScrolled 
                  ? "border-white/40 shadow-2xl shadow-black/50" 
                  : "border-white/20 shadow-lg shadow-black/20"
              )}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Rotating border gradient - same as buttons */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                    animation: 'spin 3s linear infinite'
                  }}
                />
              </div>
              
              {/* Inner content background - stable */}
              <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" />
              
              {/* Single shimmer effect on hover */}
              <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
              </div>
              
              <GlitchText 
                href="/" 
                className="relative z-10 text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300"
              >
                Souvik Bagchi
              </GlitchText>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Desktop Floating Pill Navbar - Only on main page - Hidden on mobile */}
      {isMainPage && !isLoading && (
        <motion.nav
          data-navbar="true"
          className={cn(
            "z-[9999] hidden lg:flex relative overflow-hidden group",
            "px-6 py-3 rounded-full bg-transparent border-2",
            "transition-all duration-500 ease-out items-center",
            "shadow-lg shadow-black/20 backdrop-blur-sm",
            isScrolled 
              ? "border-white/40 shadow-2xl shadow-black/50" 
              : "border-white/20 shadow-lg shadow-black/20"
          )}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.05
          }}
          style={{ 
            position: 'fixed',
            top: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
        >
          {/* Rotating border gradient - same as buttons */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                animation: 'spin 3s linear infinite'
              }}
            />
          </div>
          
          {/* Inner content background - stable */}
          <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" />
          
          {/* Single shimmer effect on hover */}
          <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
          </div>
          
          <div className="flex items-center space-x-1 relative z-10">
            {navLinks.map((link, i) => (
              <NavItem
                key={link.href}
                href={link.href}
                text={link.text}
                i={i}
                isActive={activeSection === link.href}
              />
            ))}
          </div>
        </motion.nav>
      )}

      {/* Mobile Navbar - Disabled to prevent blank space on mobile */}
      {/* {isMainPage && !isLoading && (
        <motion.nav>
      )} */}

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main className={cn("w-full", props.className)}>{children}</main>
      <Footer />
    </>
  );
}
