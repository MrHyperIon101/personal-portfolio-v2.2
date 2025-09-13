import React, { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  Award,
  Briefcase,
  Calendar,
  ExternalLink,
  X,
  ArrowUpRight,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VanillaTilt from "vanilla-tilt";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";
import AnimatedBackground from "@/components/AnimatedBackground";
import { 
  getMacOptimizedConfig, 
  isMacDevice,
  prefersReducedMotion as checkReducedMotion 
} from "@/lib/macOptimizations";
import {
  getMobileOptimizedConfig,
  isMobileDevice,
  isTabletDevice,
  getMobileGestureSettings,
  getMobileCSSOptimizations,
  getAggressiveMobileVariants,
  disableScrollAnimationsOnMobile
} from "@/lib/mobileOptimizations";
import MobilePerformanceMonitor from "@/components/MobilePerformanceMonitor";

const aboutStats = [
  { label: "Technologies mastered", value: "15+" },
  { label: "Years Learning", value: "3+" },
  { label: "Active Projects", value: "7+" },
  { label: "Certifications Earned", value: "16+" },
  { label: "Community Memberships", value: "7+" },
  { label: "Years Experience", value: "1+" },
];

const experiences = [
  {
    company: "Samsung Electronics",
    role: "Remote Lab Tester",
    duration: "May 2024 - Present",
    location: "West Bengal, India",
    description: "Testing applications across Samsung's diverse ecosystem including mobile devices, wearables, and Smart TVs. Contributing to Samsung's development platform improvement and enhancing user engagement through thorough testing.",
    technologies: ["Project Management", "Testing", "Software Testing", "Functional Testing", "Samsung Ecosystem"],
  },
  {
    company: "Google Cloud Skills Boost",
    role: "Google Cloud Arcade Facilitator - Cohort 2",
    duration: "Aug 2025 - Present",
    location: "West Bengal, India (Remote)",
    description: "Participated in a global learning initiative focused on Cloud Computing, ML/AI, Big Data, and Security. Engaged in hands-on practice using Google Cloud Skills Boost, utilizing 600 free credits for skill enhancement. Earned multiple skill badges through interactive labs, trivia, and gamified challenges.",
    technologies: ["Google Cloud Platform (GCP)", "Cloud Applications", "Cloud Computing", "Machine Learning", "Big Data", "Security"],
  },
  {
    company: "NVIDIA Developer Program",
    role: "Developer Program Member",
    duration: "Apr 2025 - Present",
    location: "West Bengal, India (Remote)",
    description: "Contributed to the NVIDIA Developer Program by enhancing developer engagement through advanced tools and resources. Facilitated training sessions to empower developers with skills in AI and accelerated computing. Collaborated with a dedicated community to share the latest news and research, fostering innovation.",
    technologies: ["CUDA", "Artificial Intelligence (AI)", "Accelerated Computing", "Deep Learning"],
  },
  {
    company: "CodeAlpha",
    role: "Web Developer Intern",
    duration: "Aug 2025 - Present",
    location: "Sikkim, India (Remote)",
    description: "Designed and developed responsive web pages utilizing modern UI/UX practices to enhance user engagement. Collaborated with mentors and peers to streamline design workflows, improving coding efficiency by 20%. Translated complex design concepts into interactive web solutions, ensuring seamless user experiences.",
    technologies: ["Visual Web Developer", "Software Infrastructure", "Engineering", "Internet Software", "UI/UX Design"],
  },
  {
    company: "Codec Technologies India",
    role: "Python Developer Intern",
    duration: "Aug 2025 - Present",
    location: "Sikkim, India (Hybrid)",
    description: "Collaborated with experienced project heads to develop Python applications, enhancing my coding skills in a real-world setting. Contributed to multiple projects, focusing on optimizing code efficiency and functionality. Gained exposure to industry best practices in software development and agile methodologies.",
    technologies: ["Python (Programming Language)", "Software Infrastructure", "Engineering", "Agile Methodologies"],
  },
  {
    company: "Microsoft",
    role: "Windows Insider Program Member",
    duration: "Oct 2021 - Present",
    location: "West Bengal, India (Remote)",
    description: "Engaged actively in the Windows Insider Program across multiple channels including Canary, Beta Preview, and Release Preview. Provided critical feedback on early-stage tools and features, collaborated with developers through GitHub to enhance user experience. Conducted extensive testing of Windows 11 builds and reported over 50 bugs, contributing to product refinement.",
    technologies: ["Windows", "Windows Server", "Windows Canary", "Beta Testing", "GitHub"],
  },
  {
    company: "GitHub Developer Program",
    role: "Developer Program Member",
    duration: "Mar 2024 - Present",
    location: "Remote",
    description: "Building tools and integrations with GitHub APIs, contributing to open-source projects, and leveraging GitHub's developer ecosystem to create better software.",
    technologies: ["Software Development", "Web Development", "SDLC", "GitHub", "GitHub Actions"],
  },
  {
    company: "Google Developer Group (GDG) Kolkata",
    role: "Active Community Member",
    duration: "Jan 2024 - Present",
    location: "Kolkata, India",
    description: "Active member of GDG Kolkata participating in developer meetups, workshops, and technology events. Contributing to local developer community growth and knowledge sharing.",
    technologies: ["Community Building", "Google Cloud", "Android Development", "Web Development"],
  },
  {
    company: "Google Developer Group (GDG) Siliguri",
    role: "Active Community Member",
    duration: "Feb 2024 - Present",
    location: "Siliguri, India",
    description: "Engaged community member participating in tech talks, hackathons, and developer events. Fostering innovation and collaboration in the North Bengal tech ecosystem.",
    technologies: ["Community Engagement", "Technology Advocacy", "Innovation", "Collaboration"],
  },
  {
    company: "Nothing Community",
    role: "Community Member & Beta Tester",
    duration: "Jun 2024 - Present",
    location: "Remote",
    description: "Active member of Nothing's global community, providing feedback on Nothing OS features and contributing to product development through beta testing and community engagement.",
    technologies: ["Beta Testing", "Product Feedback", "Community Management", "Nothing OS"],
  },
  {
    company: "Encoders SMIT",
    role: "Web Development Bootcamp Graduate",
    duration: "Jul 2024 - Sep 2024",
    location: "Sikkim Manipal Institute",
    description: "Completed intensive web development bootcamp covering full-stack development, modern JavaScript frameworks, and industry best practices. Built multiple projects and collaborated with peers.",
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
  },
];

const certifications = [
  {
    title: "Google Cloud Arcade Facilitator - Cohort 2",
    issuer: "Google Cloud Skills Boost",
    date: "Aug 2025",
    description: "Participated in a global learning initiative focused on Cloud Computing, ML/AI, Big Data, and Security. Earned multiple skill badges through interactive labs, trivia, and gamified challenges.",
    technologies: ["Google Cloud Platform", "Cloud Computing", "Machine Learning", "Big Data"],
    featured: true,
  },
  {
    title: "Windows Insider Program Member (Canary)",
    issuer: "Microsoft",
    date: "Apr 2025",
    description: "Active member of Microsoft's Windows Insider Program, testing cutting-edge Windows features in the Canary channel.",
    technologies: ["Windows", "Windows Canary", "Beta Testing"],
    featured: true,
  },
  {
    title: "GitHub Developer Program Member",
    issuer: "GitHub",
    date: "May 2024",
    description: "Member of GitHub's exclusive Developer Program with access to advanced tools, APIs, and resources.",
    technologies: ["GitHub", "GitHub Actions", "Software Development"],
    featured: true,
  },
  {
    title: "NVIDIA Developer Program Member",
    issuer: "NVIDIA",
    date: "Apr 2025",
    description: "Access to cutting-edge GPU computing tools, CUDA development resources, and AI/ML frameworks.",
    technologies: ["CUDA", "AI", "Deep Learning"],
    featured: true,
  },
  {
    title: "Web Development Bootcamp",
    issuer: "Encoders SMIT",
    date: "Sep 2024",
    description: "Comprehensive web development bootcamp covering modern technologies and full-stack development.",
    technologies: ["Web Development", "Full Stack", "JavaScript"],
    featured: true,
  },
  {
    title: "Generative AI with Vertex AI: Prompt Design",
    issuer: "Google Cloud",
    date: "Jun 2025",
    description: "Advanced course on designing effective prompts for generative AI models using Google's Vertex AI platform.",
    technologies: ["Generative AI", "Vertex AI", "Prompt Engineering"],
    featured: false,
  },
  {
    title: "Build a computer vision app with Azure Cognitive Services",
    issuer: "Microsoft",
    date: "May 2025",
    description: "Hands-on experience building computer vision applications using Microsoft Azure Cognitive Services.",
    technologies: ["Azure", "Computer Vision", "AI"],
    featured: false,
  },
  {
    title: "Deep Learning with PyTorch: Image Segmentation",
    issuer: "Coursera",
    date: "Apr 2025",
    description: "Advanced deep learning specializing in image segmentation using PyTorch framework.",
    technologies: ["PyTorch", "Deep Learning", "Computer Vision"],
    featured: false,
  },
  {
    title: "A Tour of Firebase",
    issuer: "Google Cloud",
    date: "Jun 2025",
    description: "Comprehensive introduction to Firebase platform covering real-time databases and cloud functions.",
    technologies: ["Firebase", "Cloud Firestore", "Backend"],
    featured: false,
  },
  {
    title: "Getting started with Flutter Development",
    issuer: "Google Cloud Skills Boost",
    date: "Jun 2025",
    description: "Foundational course in Flutter mobile app development and cross-platform development.",
    technologies: ["Flutter", "Dart", "Mobile Development"],
    featured: false,
  },
  {
    title: "Machine Learning Pipelines with Azure ML Studio",
    issuer: "Coursera",
    date: "Apr 2025",
    description: "Advanced ML course focusing on building end-to-end ML pipelines using Azure ML Studio.",
    technologies: ["Azure ML", "Machine Learning", "MLOps"],
    featured: false,
  },
  {
    title: "Introduction to TensorFlow for Artificial Intelligence",
    issuer: "Coursera",
    date: "Mar 2025",
    description: "Comprehensive introduction to TensorFlow framework for building AI and machine learning applications.",
    technologies: ["TensorFlow", "Artificial Intelligence", "Machine Learning"],
    featured: false,
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    date: "Feb 2025",
    description: "Foundational knowledge of cloud computing concepts, services, and deployment strategies.",
    technologies: ["Cloud Computing", "Google Cloud", "DevOps"],
    featured: false,
  },
  {
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Jan 2025",
    description: "Comprehensive course covering React fundamentals, hooks, context, and modern development practices.",
    technologies: ["React", "JavaScript", "Frontend Development"],
    featured: false,
  },
  {
    title: "Docker & Kubernetes: The Complete Guide",
    issuer: "Udemy",
    date: "Dec 2024",
    description: "In-depth course on containerization with Docker and orchestration with Kubernetes.",
    technologies: ["Docker", "Kubernetes", "DevOps"],
    featured: false,
  },
  {
    title: "Python for Data Science and Machine Learning",
    issuer: "Udemy",
    date: "Nov 2024",
    description: "Comprehensive Python course focused on data science libraries and machine learning algorithms.",
    technologies: ["Python", "Data Science", "Machine Learning"],
    featured: false,
  },
  {
    title: "Git & GitHub Masterclass",
    issuer: "Udemy",
    date: "Oct 2024",
    description: "Advanced Git version control and GitHub collaboration workflows for software development.",
    technologies: ["Git", "GitHub", "Version Control"],
    featured: false,
  },
];

const projects = [
  {
    title: "Momentum - AI Task Hub",
    description: "Centralized AI Task Hub for smart task management",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop&auto=format",
    href: "https://momentum.bytepinai.com/welcome",
    technologies: ["Artificial Intelligence (AI)", "React", "Node.js", "TypeScript", "MongoDB"],
  },
  {
    title: "TypeAce - Typing Speed Master",
    description: "Modern typing test application to improve speed and accuracy",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=300&fit=crop&auto=format",
    href: "https://typeace-ochre.vercel.app/",
    technologies: ["React", "TypeScript", "JavaScript", "CSS3", "Web Development"],
  },
  {
    title: "TechBuild AI",
    description: "AI-Powered PC Building & Analysis Platform",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop&auto=format",
    href: "https://techbuild-wine.vercel.app/",
    technologies: ["Artificial Intelligence (AI)", "React", "Python (Programming Language)", "Machine Learning"],
  },
  {
    title: "PurixOS",
    description: "Revolutionary custom operating system for the modern era",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=300&fit=crop&auto=format",
    href: "https://www.purixos.tech/",
    technologies: ["Operating Systems", "C++", "Assembly", "System Programming"],
  },
  {
    title: "FinanceFlow",
    description: "AI-Powered Personal Finance Manager",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=300&fit=crop&auto=format",
    href: "https://studio--financeflow-5pu0m.us-central1.hosted.app/dashboard",
    technologies: ["Artificial Intelligence (AI)", "React", "Node.js", "MongoDB", "Financial Technology"],
  },
  {
    title: "EVENTIQ",
    description: "Comprehensive event management application",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=300&fit=crop&auto=format",
    href: "#",
    technologies: ["React", "Event Management", "Database Management", "UI/UX Design"],
  },
];

const services = [
  {
    service: "Full-Stack Development",
    description:
      "Building end-to-end web applications using modern technologies like React, Next.js, TypeScript, and Python.",
    icon: Code2,
  },
  {
    service: "AI/ML Solutions",
    description:
      "Developing AI-powered applications using TensorFlow, Google Gemini, and NVIDIA CUDA for intelligent automation.",
    icon: Frame,
  },
  {
    service: "Cloud & DevOps",
    description:
      "Implementing scalable cloud solutions with Google Cloud Platform, Azure, Firebase, and automated CI/CD pipelines.",
    icon: SearchCheck,
  },
  {
    service: "Mobile Development",
    description:
      "Creating cross-platform mobile applications using React Native, Flutter, and Android development.",
    icon: MonitorSmartphone,
  },
  {
    service: "Data Science & Analytics",
    description:
      "Extracting insights from data using advanced analytics, machine learning models, and business intelligence tools.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  
  // Mac optimization state
  const [isMac, setIsMac] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [macConfig, setMacConfig] = useState<ReturnType<typeof getMacOptimizedConfig>>();

  // Mobile optimization state
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [mobileConfig, setMobileConfig] = useState<ReturnType<typeof getMobileOptimizedConfig>>();
  const [mobileCSSOptimizations, setMobileCSSOptimizations] = useState<ReturnType<typeof getMobileCSSOptimizations>>({});

  // Popup state management
  const [selectedExperience, setSelectedExperience] = useState<typeof experiences[0] | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<typeof certifications[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isExperiencePopupOpen, setIsExperiencePopupOpen] = useState(false);
  const [isCertificationPopupOpen, setIsCertificationPopupOpen] = useState(false);
  const [isProjectTechPopupOpen, setIsProjectTechPopupOpen] = useState(false);

  // Utility functions for navigation and popups
  const navigateToRelatedContent = (technology: string) => {
    // First, try to find a matching project
    const relatedProject = projects.find(project => 
      project.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase()) || 
        technology.toLowerCase().includes(tech.toLowerCase())
      )
    );

    if (relatedProject) {
      const projectElement = document.getElementById('projects');
      if (projectElement) {
        ultraSmoothScrollTo(projectElement);
        // Highlight the related project briefly
        setTimeout(() => {
          const projectCards = document.querySelectorAll('[data-project-id]');
          const projectIndex = projects.findIndex(p => p.title === relatedProject.title);
          const targetCard = projectCards[projectIndex] as HTMLElement;
          if (targetCard) {
            targetCard.style.transform = 'scale(1.05)';
            targetCard.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
            setTimeout(() => {
              targetCard.style.transform = '';
              targetCard.style.boxShadow = '';
            }, 2000);
          }
        }, 500);
        return;
      }
    }

    // If no project found, try to find a matching certification
    const relatedCertification = certifications.find(cert => 
      cert.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase()) || 
        technology.toLowerCase().includes(tech.toLowerCase())
      )
    );

    if (relatedCertification) {
      const certificationElement = document.getElementById('certifications');
      if (certificationElement) {
        ultraSmoothScrollTo(certificationElement);
        // Highlight the related certification briefly
        setTimeout(() => {
          const certCards = document.querySelectorAll('[data-cert-id]');
          const certIndex = certifications.findIndex(c => c.title === relatedCertification.title);
          const targetCard = certCards[certIndex] as HTMLElement;
          if (targetCard) {
            targetCard.style.transform = 'scale(1.05)';
            targetCard.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.5)';
            setTimeout(() => {
              targetCard.style.transform = '';
              targetCard.style.boxShadow = '';
            }, 2000);
          }
        }, 500);
      }
    }
  };

  const openExperienceDetail = (experience: typeof experiences[0]) => {
    console.log('Opening experience detail:', experience.company);
    console.log('Experience object:', experience);
    setSelectedExperience(experience);
    setIsExperiencePopupOpen(true);
    console.log('State should be set now');
    document.body.style.overflow = 'hidden';
  };

  const openCertificationDetail = (certification: typeof certifications[0]) => {
    console.log('Opening certification detail:', certification.title);
    setSelectedCertification(certification);
    setIsCertificationPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePopups = () => {
    setIsExperiencePopupOpen(false);
    setIsCertificationPopupOpen(false);
    setIsProjectTechPopupOpen(false);
    setSelectedExperience(null);
    setSelectedCertification(null);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const openProjectTechPopup = (project: typeof projects[0]) => {
    console.log('Opening project tech popup:', project.title);
    setSelectedProject(project);
    setIsProjectTechPopupOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Detect Mac devices and motion preferences
  useEffect(() => {
    const macDevice = isMacDevice();
    const reducedMotion = checkReducedMotion();
    const config = getMacOptimizedConfig();
    
    setIsMac(macDevice);
    setPrefersReducedMotion(reducedMotion);
    setMacConfig(config);

    // Listen for changes in motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      setMacConfig(getMacOptimizedConfig());
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  // Detect mobile devices and optimize accordingly
  useEffect(() => {
    const mobileDevice = isMobileDevice();
    const tabletDevice = isTabletDevice();
    const config = getMobileOptimizedConfig();
    const cssOptimizations = getMobileCSSOptimizations();
    
    setIsMobile(mobileDevice);
    setIsTablet(tabletDevice);
    setMobileConfig(config);
    setMobileCSSOptimizations(cssOptimizations);

    // Apply ultra-aggressive mobile optimizations
    if (mobileDevice) {
      disableScrollAnimationsOnMobile();
    }

    // Listen for resize events to re-check mobile status
    const handleResize = () => {
      const newMobileDevice = isMobileDevice();
      const newTabletDevice = isTabletDevice();
      const newConfig = getMobileOptimizedConfig();
      const newCSSOptimizations = getMobileCSSOptimizations();
      
      setIsMobile(newMobileDevice);
      setIsTablet(newTabletDevice);
      setMobileConfig(newConfig);
      setMobileCSSOptimizations(newCSSOptimizations);

      // Apply mobile optimizations when switching to mobile
      if (newMobileDevice && !mobileDevice) {
        disableScrollAnimationsOnMobile();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ultra-smooth optimized scroll handler with advanced RAF throttling
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // Ultra-smooth scroll handler with RAF optimization
    const createUltraSmoothScrollHandler = () => {
      let ticking = false;
      let lastScrollY = 0;
      
      return () => {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Skip if scroll position hasn't changed significantly
        if (Math.abs(currentScrollY - lastScrollY) < 1 && ticking) return;
        
        if (!ticking) {
          requestAnimationFrame(() => {
            let current = "";
            const scrollY = window.pageYOffset || document.documentElement.scrollTop;
            
            setIsScrolled(scrollY > 10);

            // Ultra-smooth section detection with optimized thresholds
            sections.forEach((section) => {
              const rect = section.getBoundingClientRect();
              const elementTop = rect.top + scrollY;
              const offset = isMobile ? 150 : 200; // Optimized offset for each device
              
              if (scrollY >= elementTop - offset) {
                current = section.getAttribute("id") ?? "";
              }
            });

            // Update active section for background
            if (current && current !== activeSection) {
              setActiveSection(current);
            }

            // Ultra-smooth nav link updates with minimal DOM manipulation
            navLinks.forEach((li) => {
              const href = li.getAttribute("href");
              const shouldBeActive = href === `#${current}`;
              const isCurrentlyActive = li.classList.contains("nav-active");
              
              if (shouldBeActive && !isCurrentlyActive) {
                li.classList.add("nav-active");
              } else if (!shouldBeActive && isCurrentlyActive) {
                li.classList.remove("nav-active");
              }
            });
            
            lastScrollY = scrollY;
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const ultraSmoothScrollHandler = createUltraSmoothScrollHandler();

    // Add ultra-smooth scroll listener with optimized options
    window.addEventListener("scroll", ultraSmoothScrollHandler, { passive: true });

    // Ultra-smooth page initialization
    const initUltraSmoothScrolling = () => {
      // Optimize document scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.overflowX = 'hidden';
      document.body.style.overscrollBehavior = 'contain';
      
      // Force hardware acceleration on animated elements
      const animatedElements = document.querySelectorAll('[class*="motion"], [class*="animate"]');
      animatedElements.forEach(el => {
        const element = el as HTMLElement;
        element.style.transform = 'translateZ(0)';
        element.style.willChange = 'transform';
      });
    };

    const initTimer = setTimeout(initUltraSmoothScrolling, 100);

    return () => {
      window.removeEventListener("scroll", ultraSmoothScrollHandler);
      clearTimeout(initTimer);
    };
  }, [isMobile, activeSection]);

  // Ultra-smooth motion variants optimized for 60fps+ performance
  const getUltraSmoothVariants = () => {
    const baseTransition = {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1], // Ultra-smooth cubic bezier
    };

    const ultraSmoothVariants = {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.1,
            staggerChildren: isMobile ? 0.05 : 0.08,
            ...baseTransition
          }
        }
      },
      item: {
        hidden: { 
          opacity: 0, 
          y: isMobile ? 15 : 25,
          scale: 0.98,
          filter: "blur(1px)"
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: baseTransition
        }
      },
      hero: {
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            ...baseTransition,
            delay: 0.2
          }
        }
      },
      card: {
        hidden: {
          opacity: 0,
          y: 20,
          rotateY: 5,
          scale: 0.95
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          transition: baseTransition
        }
      }
    };

    // Use aggressive mobile variants if on mobile for performance
    return isMobile ? getAggressiveMobileVariants() : ultraSmoothVariants;
  };

  // Ultra-smooth gesture settings
  const getUltraSmoothGestureSettings = () => {
    if (isMobile) return getMobileGestureSettings();

    return {
      whileHover: { 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      },
      whileTap: { 
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
      }
    };
  };

  // Ultra-smooth scroll utility functions
  const ultraSmoothScrollTo = (element: Element | null) => {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80; // Account for fixed header

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  // Optimized card hover effect for Mac and Mobile
  useEffect(() => {
    if (!macConfig && !mobileConfig) return;
    
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    
    // Skip tilt effects on mobile devices for better performance
    if (isMobile || (mobileConfig && !mobileConfig.enableHoverEffects)) {
      // Clean up any existing tilt instances on mobile
      tilt.forEach(element => {
        const tiltElement = element as HTMLElement & { vanillaTilt?: { destroy: () => void } };
        if (tiltElement.vanillaTilt) {
          tiltElement.vanillaTilt.destroy();
        }
      });
      return;
    }
    
    // Mac-optimized tilt configuration for desktop only
    const tiltConfig = isMac ? {
      speed: macConfig?.enableGPU ? 100 : 50,
      glare: !prefersReducedMotion && (macConfig?.enableGPU ?? false),
      "max-glare": macConfig?.enableGPU ? 0.05 : 0,
      gyroscope: false, // Disabled on Mac for better performance
      perspective: 300,
      scale: prefersReducedMotion ? 1 : 0.99,
      transition: true,
      "transition-speed": (macConfig?.animationDuration ?? 0.6) * 1000,
    } : {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    };

    VanillaTilt.init(tilt, tiltConfig);
    
    return () => {
      tilt.forEach(element => {
        // Type assertion for VanillaTilt library
        const tiltElement = element as HTMLElement & { vanillaTilt?: { destroy: () => void } };
        if (tiltElement.vanillaTilt) {
          tiltElement.vanillaTilt.destroy();
        }
      });
    };
    }, [isMac, macConfig, prefersReducedMotion, isMobile, mobileConfig]);

  // Add mobile to the dependency array
  useEffect(() => {
    // Any mobile-specific effects can be added here
  }, [isMobile]);  return (
    <MobilePerformanceMonitor enableMonitoring={process.env.NODE_ENV === 'development'}>
      <Container>
        <div ref={refScrollContainer} className="relative z-10" style={isMobile ? mobileCSSOptimizations.optimizedScroll : undefined}>
        {/* Animated Background */}
        <AnimatedBackground activeSection={activeSection} />
        
        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="relative mt-20 mx-auto flex w-full max-w-7xl flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between px-4 sm:px-6 lg:px-8"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                className="group relative inline-block rounded-full bg-transparent border-2 border-blue-400/30 px-3 py-1.5 text-xs font-semibold text-blue-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-blue-400/60 hover:text-white overflow-hidden"
              >
                {/* Rotating border gradient */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                      animation: 'spin 3s linear infinite'
                    }}
                  />
                </div>
                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
                <span className="relative z-10">TypeScript</span>
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                className="group relative inline-block rounded-full bg-transparent border-2 border-cyan-400/30 px-3 py-1.5 text-xs font-semibold text-cyan-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-cyan-400/60 hover:text-white overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                      animation: 'spin 3s linear infinite'
                    }}
                  />
                </div>
                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
                <span className="relative z-10">React</span>
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                className="group relative inline-block rounded-full bg-transparent border-2 border-purple-400/30 px-3 py-1.5 text-xs font-semibold text-purple-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-purple-400/60 hover:text-white overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
                      animation: 'spin 3s linear infinite'
                    }}
                  />
                </div>
                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
                <span className="relative z-10">AI/ML</span>
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                className="group relative inline-block rounded-full bg-transparent border-2 border-emerald-400/30 px-3 py-1.5 text-xs font-semibold text-emerald-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-emerald-400/60 hover:text-white overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                      animation: 'spin 3s linear infinite'
                    }}
                  />
                </div>
                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                </div>
                <span className="relative z-10">Python</span>
              </motion.span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-4xl tracking-tighter text-foreground xl:text-5xl 2xl:text-6xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-4xl xl:text-5xl 2xl:text-6xl">
                  Souvik Bagchi.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                An aspiring <span className="text-gradient font-semibold">Data Scientist</span> and{" "}
                <span className="text-gradient font-semibold">Software Engineer</span> pursuing B.Tech CSE 
                (Data Science) at <span className="text-primary font-medium">Sikkim Manipal Institute of Technology</span>. 
                Currently working as <span className="text-primary font-medium">Remote Lab Tester</span> at{" "}
                <span className="text-gradient font-semibold">Samsung Electronics</span>, specializing in{" "}
                <span className="text-primary font-medium">AI-powered applications</span> and 
                cutting-edge technology solutions.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:mrhyperionai@gmail.com" passHref>
                <Button className="group">
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="group"
                onClick={() => ultraSmoothScrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>
          </div>
          
          {/* Scroll to discover text - positioned absolutely */}
          <div
            className={cn(
              styles.scroll,
              isScrolled && styles["scroll--hidden"],
            )}
          >
            Scroll to discover{" "}
            <TriangleDownIcon className="mt-1 animate-bounce" />
          </div>
          
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            {/* Hide Spline 3D scene on mobile for better performance */}
            {!isMobile && (
              <Suspense fallback={<span>Loading...</span>}>
                <Spline scene="/assets/scene.splinecode" />
              </Suspense>
            )}
            {/* Show a placeholder or alternative content on mobile */}
            {isMobile && (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <p className="text-lg">Building amazing experiences</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-10 mx-auto flex w-full max-w-7xl flex-col justify-start space-y-10 px-4 sm:px-6 lg:px-8"
          >
            {/* About Content with Image */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px] mb-6"
                >
                  I&apos;m an aspiring{" "}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gradient font-semibold"
                  >
                    Data Scientist
                  </motion.span>{" "}
                  and{" "}
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gradient font-semibold"
                  >
                    Software Engineer
                  </motion.span>{" "}
                  pursuing{" "}
                  <Link
                    href="https://smu.edu.in"
                    target="_blank"
                    className="underline decoration-primary decoration-2 underline-offset-4 hover:decoration-4 transition-all duration-300"
                  >
                    B.Tech CSE (Data Science) at Sikkim Manipal Institute of Technology
                  </Link>{" "}
                  since 2024.
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-base leading-relaxed text-muted-foreground xl:text-lg mb-6"
                >
                  Currently working as{" "}
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-primary font-medium"
                  >
                    Remote Lab Tester at Samsung Electronics
                  </motion.span>, 
                  with expertise in AI/ML, full-stack development, and cloud platforms. 
                  Member of{" "}
                  <motion.span 
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gradient font-semibold"
                  >
                    NVIDIA Developer Program
                  </motion.span>,{" "}
                  <motion.span 
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gradient font-semibold"
                  >
                    GitHub Developer Program
                  </motion.span>, and{" "}
                  <motion.span 
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gradient font-semibold"
                  >
                    Windows Insider Program (Canary)
                  </motion.span>.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-base leading-relaxed text-muted-foreground xl:text-lg"
                >
                  Specialized in building revolutionary projects 
                  like PurixOS, Momentum, TechBuild AI, and cutting-edge AI solutions.
                </motion.p>
              </motion.div>

              {/* Profile Image with Animated Bubbles */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Main Profile Image - Circular */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 rounded-full overflow-hidden border-4 border-gradient-to-br from-primary/50 to-secondary/50 shadow-2xl"
                  >
                    <Image
                      src="/assets/pro.png"
                      alt="Souvik Bagchi - Data Scientist and Software Engineer"
                      width={400}
                      height={400}
                      className="w-96 h-96 object-cover rounded-full"
                      quality={100}
                      priority
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Optimized Animated Bubbles - Conditional rendering for Mobile/Mac */}
                  {!prefersReducedMotion && 
                   !(isMobile && (mobileConfig?.isLowEndDevice ?? !mobileConfig?.enableAnimations)) && 
                   Array.from({ 
                     length: isMobile 
                       ? (mobileConfig?.isLowEndDevice ? 2 : 3) 
                       : isMac ? 4 : 6 
                   }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute rounded-full bg-gradient-to-br ${
                        i % 3 === 0 
                          ? 'from-primary/20 to-primary/5' 
                          : i % 3 === 1 
                          ? 'from-secondary/20 to-secondary/5'
                          : 'from-accent/20 to-accent/5'
                      } backdrop-blur-sm will-change-transform`}
                      style={{
                        width: `${Math.random() * (isMobile ? 15 : isMac ? 20 : 30) + 10}px`,
                        height: `${Math.random() * (isMobile ? 15 : isMac ? 20 : 30) + 10}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={isMobile ? {
                        y: [0, -5, 0],
                        scale: [1, 1.02, 1],
                        opacity: [0.1, 0.2, 0.1],
                      } : isMac ? {
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1],
                        opacity: [0.2, 0.4, 0.2],
                      } : {
                        y: [0, -20, 0],
                        x: [0, Math.random() * 15 - 7, 0],
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: isMobile 
                          ? (mobileConfig?.animationDuration ?? 0.4) * 8 
                          : macConfig 
                          ? macConfig.animationDuration * 5 
                          : (isMac ? 2 : 2.5 + Math.random() * 1),
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        delay: Math.random() * (isMobile ? 0.5 : 1),
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Optimized Floating Tech Icons - Conditional for Mobile/Mac */}
                  {!prefersReducedMotion && 
                   !(isMobile && (mobileConfig?.isLowEndDevice ?? !mobileConfig?.enableAnimations)) && [
                    { icon: "⚛️", delay: 0 },
                    { icon: "🐍", delay: 0.2 },
                    ...(isMobile 
                      ? [] // Reduce icons on mobile for better performance
                      : [{ icon: "🤖", delay: 0.4 }]
                    ),
                    ...(isMac || isMobile ? [] : [{ icon: "☁️", delay: 0.6 }, { icon: "📊", delay: 0.8 }]),
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`absolute will-change-transform ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl'}`}
                      style={{
                        top: `${20 + i * (isMobile ? 20 : 15)}%`,
                        right: `${-10 + (i % 2) * 20}%`,
                      }}
                      animate={isMobile ? {
                        y: [0, -4, 0],
                        rotate: [0, 45],
                        scale: [1, 1.01, 1],
                      } : isMac ? {
                        y: [0, -8, 0],
                        rotate: [0, 90],
                        scale: [1, 1.03, 1],
                      } : {
                        y: [0, -15, 0],
                        rotate: [0, 180],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: isMobile 
                          ? (mobileConfig?.animationDuration ?? 0.4) * 10 
                          : macConfig 
                          ? macConfig.animationDuration * 8 
                          : (isMac ? 2.5 : 3),
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        delay: item.delay,
                        ease: "easeInOut",
                      }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}

                  {/* Optimized Glowing Background - Conditional animation for Mobile/Mac */}
                  <motion.div
                    className={`absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 will-change-transform ${
                      isMobile && mobileConfig?.reduceBlur ? 'blur-sm' : 'blur-xl'
                    }`}
                    animate={prefersReducedMotion || (isMobile && mobileConfig?.isLowEndDevice) ? {} : isMobile ? {
                      scale: [1, 1.01, 1],
                      opacity: [0.2, 0.3, 0.2],
                    } : isMac ? {
                      scale: [1, 1.02, 1],
                      opacity: [0.3, 0.5, 0.3],
                    } : {
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                      duration: isMobile 
                        ? (mobileConfig?.animationDuration ?? 0.4) * 15 
                        : isMac ? 4 : 3,
                      repeat: prefersReducedMotion || (isMobile && mobileConfig?.isLowEndDevice) ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 xl:grid-cols-3"
            >
              {aboutStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05 + 0.3,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col items-center text-center xl:items-start xl:text-start p-6 rounded-2xl bg-transparent border-2 border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden"
                >
                  {/* Rotating border gradient for service cards */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div 
                      className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                        animation: 'spin 3s linear infinite'
                      }}
                    />
                  </div>
                  
                  {/* Inner content background */}
                  <div className="absolute inset-[2px] rounded-[14px] bg-black/90 backdrop-blur-xl" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-[2px] rounded-[14px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                  </div>
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <motion.span 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.05 + 0.4, 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl group-hover:scale-110 transition-transform duration-300 relative z-20"
                  >
                    {stat.value}
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.5, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="tracking-tight text-muted-foreground xl:text-lg group-hover:text-foreground transition-colors duration-300 relative z-20"
                  >
                    {stat.label}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                    initial={false}
                    whileHover={{ scale: 1.02 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-10 mx-auto flex w-full max-w-7xl flex-col justify-start space-y-8 px-4 sm:px-6 lg:px-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
              >
                💼 Experience
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
                className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl"
              >
                Professional Journey
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-3xl"
              >
                My experience working with industry leaders and contributing to cutting-edge technologies.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 w-full"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    rotateY: 2,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.05 + 0.3,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <Card className="group relative overflow-hidden bg-transparent border-2 border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 h-full hover:shadow-2xl hover:shadow-primary/20">
                    {/* Rotating border gradient - same as buttons */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div 
                        className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                          animation: 'spin 3s linear infinite'
                        }}
                      />
                    </div>
                    
                    {/* Inner content background - stable */}
                    <div className="absolute inset-[2px] rounded-[10px] bg-black/90 backdrop-blur-xl pointer-events-none" />
                    
                    {/* Single shimmer effect on hover */}
                    <div className="absolute inset-[2px] rounded-[10px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite] pointer-events-none" />
                    </div>
                    
                    {/* Hover background gradient */}
                    <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <CardContent className="p-6 relative z-20">
                      <div className="flex items-start space-x-4 w-full">
                        <motion.div 
                          whileHover={{ 
                            rotate: 360, 
                            scale: 1.2,
                            transition: { duration: 0.6 }
                          }}
                          className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-3 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
                        >
                          <Briefcase className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-300" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <motion.h3 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.4, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="text-lg font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-300"
                          >
                            {exp.role}
                          </motion.h3>
                          <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.45, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="text-sm font-medium text-primary mb-3 group-hover:text-secondary transition-colors duration-300"
                          >
                            {exp.company}
                          </motion.p>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 + 0.5, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm text-muted-foreground mb-4"
                          >
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 flex-shrink-0" />
                              <span>{exp.duration}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span>{exp.location}</span>
                          </motion.div>
                          <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 + 0.55, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="text-sm text-muted-foreground leading-relaxed mb-4 break-words group-hover:text-foreground transition-colors duration-300"
                          >
                            {exp.description}
                          </motion.p>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.6, duration: 0.4 }}
                            viewport={{ once: true }}
                            className="flex flex-wrap gap-2"
                          >
                            {exp.technologies.slice(0, 3).map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                initial={{ opacity: 0, scale: 0, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                whileHover={{ 
                                  scale: 1.15, 
                                  y: -4,
                                  rotateY: 5,
                                  transition: { duration: 0.15, ease: "easeOut" }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigateToRelatedContent(tech)}
                                transition={{ 
                                  delay: index * 0.02 + techIndex * 0.03 + 0.3, 
                                  duration: 0.25,
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 25
                                }}
                                viewport={{ once: true }}
                                className="group relative inline-block rounded-full bg-transparent border-2 border-blue-400/30 px-4 py-2 text-xs font-semibold text-blue-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-blue-400/60 hover:text-white overflow-hidden"
                                title={`Click to see related projects and certifications for ${tech}`}
                              >
                                {/* Rotating border gradient */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                      background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                                      animation: 'spin 3s linear infinite'
                                    }}
                                  />
                                </div>
                                
                                {/* Inner content background */}
                                <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                                
                                {/* Single shimmer effect on hover */}
                                <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                                </div>
                                
                                <span className="relative z-10">{tech}</span>
                              </motion.span>
                            ))}
                            {exp.technologies.length > 3 && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                whileHover={{ 
                                  scale: 1.1,
                                  transition: { duration: 0.15, ease: "easeOut" }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Experience more button clicked!');
                                  openExperienceDetail(exp);
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                transition={{ 
                                  delay: index * 0.05 + 0.8, 
                                  duration: 0.3
                                }}
                                viewport={{ once: true }}
                                className="group relative inline-block rounded-full bg-gradient-to-r from-muted/20 to-muted/10 px-3 py-1 text-xs font-medium text-muted-foreground whitespace-nowrap cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-200 border border-muted/30 hover:border-primary/40 z-[50] pointer-events-auto"
                                title="Click to see full experience details"
                                style={{ position: 'relative', zIndex: 50 }}
                              >
                                <span className="relative z-10">+{exp.technologies.length - 3} more</span>
                              </motion.button>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-scroll 
            data-scroll-speed=".4" 
            className="my-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
            >
              ✨ Projects
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl"
            >
              Streamlined digital experiences.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg"
            >
              I&apos;ve worked on a variety of innovative projects, from AI-powered applications to 
              custom operating systems. Here are some of my favorites:
            </motion.p>

            {/* Enhanced Carousel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                  // Get aggressive mobile optimized variants for this project card
                  const aggressiveVariants = getAggressiveMobileVariants();
                  const gestureSettings = getMobileGestureSettings();
                  
                  return (
                  <motion.div
                    key={project.title}
                    data-project-id={index}
                    initial={aggressiveVariants.item.hidden}
                    whileInView={aggressiveVariants.item.visible}
                    whileHover={isMobile ? {} : { 
                      y: -20, 
                      scale: 1.05,
                      rotateY: isTablet ? 0 : 8,
                      rotateX: 2,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.3 
                      }
                    }}
                    whileTap={gestureSettings.whileTap}
                    transition={{ 
                      duration: isMobile ? (mobileConfig?.animationDuration ?? 0.4) : 0.6, 
                      delay: index * (isMobile ? 0.03 : 0.08) + (isMobile ? 0.1 : 0.2),
                      type: "spring",
                      stiffness: 200,
                      damping: 25
                    }}
                    viewport={{ once: true }}
                    style={isMobile ? mobileCSSOptimizations.transform3d : undefined}
                    className="perspective-1000"
                  >
                        <Card 
                          id={isMobile ? undefined : "tilt"} 
                          className={`group relative h-full overflow-hidden bg-transparent border-2 border-white/10 transition-all duration-${isMobile ? '300' : '500'} hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/30 backdrop-blur-xl`}
                        >
                          {/* Enhanced Rotating border gradient with multiple layers */}
                          <div className="absolute inset-0 rounded-xl overflow-hidden">
                            {/* Primary gradient border */}
                            <div 
                              className="absolute inset-[-3px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                              style={{
                                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #10b981, #f59e0b, #3b82f6)',
                                animation: 'spin 4s linear infinite'
                              }}
                            />
                            {/* Secondary inner gradient border */}
                            <div 
                              className="absolute inset-[-1px] rounded-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 delay-200"
                              style={{
                                background: 'conic-gradient(from 180deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)',
                                animation: 'spin 6s linear infinite reverse'
                              }}
                            />
                          </div>
                          
                          {/* Enhanced inner content background with gradient */}
                          <div className="absolute inset-[3px] rounded-[10px] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-xl" />
                          
                          {/* Multiple shimmer effects */}
                          <div className="absolute inset-[3px] rounded-[10px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {/* Primary shimmer */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 group-hover:animate-[shimmer_2.5s_ease-in-out_infinite]" />
                            {/* Secondary shimmer with delay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent skew-x-12 group-hover:animate-[shimmer_3s_ease-in-out_infinite_0.5s]" />
                          </div>
                          
                          {/* Enhanced hover gradient overlay with animation */}
                          <div className="absolute inset-[3px] rounded-[10px] bg-gradient-to-br from-primary/15 via-purple-500/10 to-secondary/15 opacity-0 group-hover:opacity-80 transition-all duration-700 group-hover:animate-pulse" />
                          
                          {/* Floating particles effect */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary/60 rounded-full"
                                style={{
                                  left: `${20 + i * 15}%`,
                                  top: `${30 + i * 10}%`,
                                }}
                                animate={{
                                  y: [-10, -30, -10],
                                  opacity: [0, 1, 0],
                                  scale: [0.5, 1, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          </div>
                          
                          <CardHeader className="p-0 relative overflow-hidden">
                            <Link href={project.href} target="_blank" passHref>
                              <motion.div
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative overflow-hidden group/image"
                              >
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-gradient-to-br from-primary/20 to-secondary/20 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
                                />
                                
                                {/* Enhanced gradient overlays */}
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                                />
                                
                                {/* Animated corner accent */}
                                <motion.div
                                  initial={{ opacity: 0, scale: 0, rotate: 45 }}
                                  whileHover={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    rotate: 0,
                                    transition: { type: "spring", stiffness: 300, delay: 0.1 }
                                  }}
                                  className="absolute top-4 right-4"
                                >
                                  <div className="relative">
                                    {/* Pulsing background */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse opacity-50" />
                                    {/* Main button */}
                                    <div className="relative rounded-full bg-gradient-to-r from-primary/40 to-secondary/40 p-3 backdrop-blur-md border border-white/30 shadow-lg">
                                      <ExternalLink className="h-5 w-5 text-white drop-shadow-sm" />
                                    </div>
                                  </div>
                                </motion.div>
                                
                                {/* Enhanced project info overlay */}
                                <motion.div
                                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ duration: 0.3, delay: 0.05, type: "spring", stiffness: 300 }}
                                  className="absolute bottom-4 left-4 right-4"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-gradient-to-r from-primary/30 to-secondary/30 backdrop-blur-xl rounded-lg px-4 py-2 border border-white/20 shadow-xl"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-white font-medium text-sm">View Project</span>
                                      <motion.div
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                      >
                                        <ArrowUpRight className="h-4 w-4 text-white/80" />
                                      </motion.div>
                                    </div>
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            </Link>
                          </CardHeader>
                          
                          <CardContent className="p-6 relative z-20">
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 0.8, duration: 0.6, type: "spring" }}
                              viewport={{ once: true }}
                            >
                              <CardTitle className="text-lg font-bold tracking-tight text-foreground mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-500">
                                {project.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground leading-relaxed break-words line-clamp-3 group-hover:text-foreground/90 transition-colors duration-500">
                                {project.description}
                              </p>
                              
                              {/* Technology tags with enhanced styling */}
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 1.0, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-wrap gap-2 mt-4"
                              >
                                {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                                  <motion.span
                                    key={techIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ 
                                      scale: 1.1, 
                                      y: -2,
                                      transition: { type: "spring", stiffness: 400 }
                                    }}
                                    transition={{ 
                                      delay: index * 0.1 + techIndex * 0.05 + 1.1, 
                                      duration: 0.4,
                                      type: "spring"
                                    }}
                                    viewport={{ once: true }}
                                    className="relative inline-block px-3 py-1 text-xs font-medium text-primary/90 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer"
                                  >
                                    {/* Gradient border on hover */}
                                    <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                                         style={{
                                           background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))',
                                         }}
                                    />
                                    <span className="relative z-10">{tech}</span>
                                  </motion.span>
                                ))}
                                {project.technologies?.length > 3 && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      console.log('Project more button clicked!');
                                      openProjectTechPopup(project);
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    transition={{ 
                                      delay: index * 0.1 + 1.25, 
                                      duration: 0.4,
                                      type: "spring"
                                    }}
                                    viewport={{ once: true }}
                                    className="px-3 py-1 text-xs font-medium text-secondary/90 bg-secondary/10 border border-secondary/20 rounded-full backdrop-blur-sm hover:bg-secondary/20 transition-all duration-300 cursor-pointer z-[50] pointer-events-auto"
                                    title={`View all ${project.technologies.length} technologies`}
                                    style={{ position: 'relative', zIndex: 50 }}
                                  >
                                    +{project.technologies.length - 3} more
                                  </motion.span>
                                )}
                              </motion.div>
                            </motion.div>
                          </CardContent>
                          
                          {/* Enhanced bottom accent line */}
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={false}
                          />
                        </Card>
                  </motion.div>
                  );
                })}
                
                
                {/* Remove navigation controls completely */}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Certifications */}
        <section id="certifications" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-10 mx-auto flex w-full max-w-7xl flex-col justify-start space-y-8 px-4 sm:px-6 lg:px-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
              >
                🏆 Certifications
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl"
              >
                Professional Achievements
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-3xl"
              >
                Recognized certifications and achievements that validate my expertise in cutting-edge technologies.
              </motion.p>
            </motion.div>

            {/* Featured Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-foreground mb-6"
              >
                Featured Certifications
              </motion.h3>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                className="grid gap-6 md:grid-cols-2"
              >
                {certifications.filter(cert => cert.featured).map((cert, index) => (
                  <motion.div
                    key={index}
                    data-cert-id={index}
                    initial={{ opacity: 0, y: 50, rotateX: 45 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      rotateY: 3,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1 + 0.8,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <Card className="group relative overflow-hidden bg-transparent border-2 border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 h-full hover:shadow-2xl hover:shadow-primary/20">
                      {/* Rotating border gradient for certification cards */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div 
                          className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                            animation: 'spin 3s linear infinite'
                          }}
                        />
                      </div>
                      
                      {/* Inner content background */}
                      <div className="absolute inset-[2px] rounded-[10px] bg-black/90 backdrop-blur-xl" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-[2px] rounded-[10px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                      </div>
                      
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <CardContent className="p-6 relative z-20">
                        <div className="flex items-start space-x-4 w-full">
                          <motion.div 
                            whileHover={{ 
                              rotate: 360, 
                              scale: 1.2,
                              transition: { duration: 0.6 }
                            }}
                            className="rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 p-3 flex-shrink-0 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
                          >
                            <Award className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <motion.h3 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.9, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="text-lg font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-300"
                            >
                              {cert.title}
                            </motion.h3>
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 1.0, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-4"
                            >
                              <p className="text-sm font-medium text-primary group-hover:text-secondary transition-colors duration-300">
                                {cert.issuer}
                              </p>
                              <span className="hidden sm:inline text-muted-foreground">•</span>
                              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {cert.date}
                              </p>
                            </motion.div>
                            <motion.p 
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 1.1, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="text-sm text-muted-foreground leading-relaxed mb-4 break-words group-hover:text-foreground transition-colors duration-300"
                            >
                              {cert.description}
                            </motion.p>
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 1.2, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="flex flex-wrap gap-2"
                            >
                              {cert.technologies.map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  initial={{ opacity: 0, scale: 0, y: 20 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                  whileHover={{ 
                                    scale: 1.15, 
                                    y: -4,
                                    rotateY: 5,
                                    transition: { duration: 0.15, ease: "easeOut" }
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => navigateToRelatedContent(tech)}
                                  transition={{ 
                                    delay: index * 0.02 + techIndex * 0.03 + 0.5, 
                                    duration: 0.25,
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 25
                                  }}
                                  viewport={{ once: true }}
                                  className="group relative inline-block rounded-full bg-transparent border-2 border-emerald-400/30 px-4 py-2 text-xs font-semibold text-emerald-300 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-emerald-400/60 hover:text-white overflow-hidden"
                                  title={`Click to see related projects and certifications for ${tech}`}
                                >
                                  {/* Rotating border gradient */}
                                  <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div 
                                      className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                      style={{
                                        background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                                        animation: 'spin 3s linear infinite'
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Inner content background */}
                                  <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                                  
                                  {/* Single shimmer effect on hover */}
                                  <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                                  </div>
                                  
                                  <span className="relative z-10">{tech}</span>
                                </motion.span>
                              ))}
                            </motion.div>
                            
                            {/* View Details Button */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + 1.3, duration: 0.6 }}
                              viewport={{ once: true }}
                              className="mt-4"
                            >
                              <motion.button
                                whileHover={{ 
                                  scale: 1.05,
                                  transition: { duration: 0.15, ease: "easeOut" }
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openCertificationDetail(cert)}
                                className="group relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-emerald-300 bg-transparent border border-emerald-400/30 rounded-full backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-emerald-400/60 hover:text-white overflow-hidden"
                                title="View full certification details"
                              >
                                {/* Rotating border gradient */}
                                <div className="absolute inset-0 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                      background: 'conic-gradient(from 0deg, #10b981, #06b6d4, #8b5cf6, #10b981)',
                                      animation: 'spin 3s linear infinite'
                                    }}
                                  />
                                </div>
                                
                                {/* Inner content background */}
                                <div className="absolute inset-[1px] rounded-full bg-black/90 backdrop-blur-sm" />
                                
                                {/* Single shimmer effect on hover */}
                                <div className="absolute inset-[1px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                                </div>
                                
                                <span className="relative z-10 flex items-center gap-1">
                                  View Details
                                  <Eye className="h-3 w-3" />
                                </span>
                              </motion.button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Additional Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-foreground mb-4"
              >
                Additional Certifications
              </motion.h3>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {certifications.filter(cert => !cert.featured).map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.05 + 1.0,
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                  >
                    <Card className="group relative overflow-hidden bg-transparent border-2 border-white/5 backdrop-blur-sm transition-all duration-500 hover:border-primary/20 h-full hover:shadow-lg hover:shadow-primary/10">
                      {/* Rotating border gradient for compact certification cards */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div 
                          className="absolute inset-[-2px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: 'conic-gradient(from 0deg, #8b5cf6, #a855f7, #ec4899, #f97316, #8b5cf6)',
                            animation: 'spin 3s linear infinite'
                          }}
                        />
                      </div>
                      
                      {/* Inner content background */}
                      <div className="absolute inset-[2px] rounded-[10px] bg-black/90 backdrop-blur-xl" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-[2px] rounded-[10px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                      </div>
                      
                      {/* Hover gradient overlay */}
                      <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-violet-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      <CardContent className="p-4 relative z-20">
                        <div className="flex items-start space-x-3 w-full">
                          <motion.div 
                            whileHover={{ 
                              rotate: 180, 
                              scale: 1.1,
                              transition: { duration: 0.4 }
                            }}
                            className="rounded-md bg-gradient-to-br from-primary/15 to-primary/5 p-2 flex-shrink-0 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300"
                          >
                            <Award className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <motion.h4 
                              initial={{ opacity: 0, x: -15 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 + 1.1, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors duration-300"
                            >
                              {cert.title}
                            </motion.h4>
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 + 1.2, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex flex-col gap-1 mt-1"
                            >
                              <p className="text-xs text-primary group-hover:text-secondary transition-colors duration-300">
                                {cert.issuer}
                              </p>
                              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                                {cert.date}
                              </p>
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 + 1.3, duration: 0.5 }}
                              viewport={{ once: true }}
                              className="flex flex-wrap gap-1 mt-3"
                            >
                              {cert.technologies.slice(0, 2).map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  initial={{ opacity: 0, scale: 0, y: 15, rotateX: -45 }}
                                  whileInView={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                                  whileHover={{ 
                                    scale: 1.2, 
                                    y: -5,
                                    rotateY: 8,
                                    rotateX: 2,
                                    transition: { duration: 0.15, ease: "easeOut" }
                                  }}
                                  whileTap={{ scale: 0.95, rotateY: -2 }}
                                  transition={{ 
                                    delay: index * 0.02 + techIndex * 0.03 + 0.4, 
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20
                                  }}
                                  viewport={{ once: true }}
                                  className="group relative inline-block rounded-full bg-transparent border-2 border-violet-400/40 px-3 py-1.5 text-xs font-semibold text-violet-200 whitespace-nowrap backdrop-blur-sm cursor-pointer transition-all duration-200 hover:border-violet-300/80 hover:text-white overflow-hidden shadow-lg hover:shadow-violet-500/30"
                                >
                                  {/* Rotating border gradient */}
                                  <div className="absolute inset-0 rounded-full overflow-hidden">
                                    <div 
                                      className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                      style={{
                                        background: 'conic-gradient(from 0deg, #8b5cf6, #a855f7, #ec4899, #f97316, #8b5cf6)',
                                        animation: 'spin 3s linear infinite'
                                      }}
                                    />
                                  </div>
                                  
                                  {/* Inner content background */}
                                  <div className="absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-sm" />
                                  
                                  {/* Single shimmer effect on hover */}
                                  <div className="absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                                  </div>
                                  
                                  {/* Content with enhanced typography */}
                                  <span className="relative z-10 font-bold tracking-wide drop-shadow-sm">{tech}</span>
                                </motion.span>
                              ))}
                              {cert.technologies.length > 2 && (
                                <motion.button 
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Certification more button clicked!');
                                    openCertificationDetail(cert);
                                  }}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  transition={{ 
                                    delay: index * 0.05 + 1.6, 
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300
                                  }}
                                  viewport={{ once: true }}
                                  className="inline-block text-xs text-muted-foreground whitespace-nowrap hover:text-primary transition-colors duration-300 cursor-pointer bg-muted/10 hover:bg-primary/10 px-2 py-1 rounded-full border border-muted/20 hover:border-primary/30 z-[50] pointer-events-auto"
                                  title="Click to see all technologies and details"
                                  style={{ position: 'relative', zIndex: 50 }}
                                >
                                  +{cert.technologies.length - 2} more
                                </motion.button>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        initial={false}
                      />
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section className="my-16">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mx-auto max-w-7xl flex flex-col justify-start space-y-8 px-4 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter"
              >
                💡 Services
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl"
              >
                Need more info?
                <br />
                <motion.span 
                  initial={{ opacity: 0, rotateX: 90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-gradient clash-grotesk tracking-normal"
                >
                  I got you.
                </motion.span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-2 tracking-tighter text-secondary-foreground max-w-3xl"
              >
                Here are some of the services I offer. If you have any
                questions, feel free to reach out.
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.service}
                  initial={{ 
                    opacity: 0, 
                    y: 50, 
                    rotateY: 45,
                    scale: 0.8
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateY: 0,
                    scale: 1
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15 + 0.5,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col items-start rounded-2xl bg-transparent border-2 border-white/10 p-8 shadow-lg backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/20 h-full overflow-hidden"
                >
                  {/* Rotating border gradient for bottom service cards */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <div 
                      className="absolute inset-[-2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                        animation: 'spin 3s linear infinite'
                      }}
                    />
                  </div>
                  
                  {/* Inner content background */}
                  <div className="absolute inset-[2px] rounded-[14px] bg-black/90 backdrop-blur-xl" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-[2px] rounded-[14px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                  </div>
                  
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    whileHover={{ 
                      rotate: 360, 
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                    transition={{ 
                      delay: index * 0.15 + 0.7, 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    className="relative z-20 mb-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 p-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
                  >
                    <service.icon className="text-primary group-hover:text-white transition-colors duration-300" size={24} />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.15 + 0.9, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative z-20 text-lg tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 font-semibold mb-3"
                  >
                    {service.service}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 1.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative z-20 tracking-tighter text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed flex-1"
                  >
                    {service.description}
                  </motion.p>

                  {/* Animated Background Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: 45 }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    transition={{ 
                      delay: index * 0.15 + 1.3, 
                      duration: 0.8
                    }}
                    viewport={{ once: true }}
                  />
                  
                  <motion.div
                    className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    initial={{ scale: 0, rotate: 0 }}
                    whileInView={{ scale: 1, rotate: -45 }}
                    whileHover={{ scale: 1.3, rotate: -90 }}
                    transition={{ 
                      delay: index * 0.15 + 1.5, 
                      duration: 0.8
                    }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-24 w-full px-4 sm:px-6 lg:px-8 pb-24">
          <motion.div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-20 mx-auto max-w-5xl border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 180 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              viewport={{ once: true }}
            />
            
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
              initial={{ scale: 0, x: 100, y: -100 }}
              whileInView={{ scale: 1, x: 0, y: 0 }}
              transition={{ duration: 2, delay: 0.3, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            />
            
            <motion.div
              className="absolute -bottom-20 -left-20 w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-2xl"
              initial={{ scale: 0, x: -100, y: 100 }}
              whileInView={{ scale: 1, x: 0, y: 0 }}
              transition={{ duration: 2, delay: 0.5, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
            />

            <motion.h2 
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 text-4xl font-medium tracking-tighter xl:text-6xl text-foreground"
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Let&apos;s work{" "}
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 5,
                  textShadow: "0 0 20px rgba(var(--primary), 0.5)",
                  transition: { duration: 0.3 }
                }}
                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-gradient clash-grotesk inline-block cursor-pointer"
              >
                together.
              </motion.span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 mt-6 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl leading-relaxed"
            >
              I&apos;m currently available for freelance work and open to
              discussing new projects. Let&apos;s create something amazing together!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              viewport={{ once: true }}
              className="relative z-10 mt-8"
            >
              <Link href="mailto:mrhyperionai@gmail.com" passHref>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <Button className="group relative overflow-hidden px-8 py-3 text-lg">
                    <span className="relative z-10 flex items-center">
                      Get in touch
                      <motion.div
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Floating Decorative Elements */}
            <motion.div
              className="absolute top-10 left-10 w-6 h-6 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 360 }}
              viewport={{ once: true }}
              animate={{ 
                y: [0, -10, 0],
                rotate: [360, 720, 360]
              }}
              transition={{ 
                scale: { duration: 2, delay: 1.2 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 10, repeat: Infinity, ease: "linear" }
              }}
            />
            
            <motion.div
              className="absolute top-20 right-16 w-4 h-4 rounded-full bg-gradient-to-br from-secondary/40 to-primary/40"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: -360 }}
              viewport={{ once: true }}
              animate={{ 
                x: [0, 15, 0],
                rotate: [-360, -720, -360]
              }}
              transition={{ 
                scale: { duration: 2, delay: 1.4 },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            />
            
            <motion.div
              className="absolute bottom-16 left-20 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm"
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 180 }}
              viewport={{ once: true }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [180, 540, 180]
              }}
              transition={{ 
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
                rotate: { duration: 12, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.div>
        </section>
      </div>
      
      {/* Debug State Display */}
      <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-[10000]">
        <div>Experience Popup: {isExperiencePopupOpen ? 'OPEN' : 'CLOSED'}</div>
        <div>Certification Popup: {isCertificationPopupOpen ? 'OPEN' : 'CLOSED'}</div>
        <div>Project Tech Popup: {isProjectTechPopupOpen ? 'OPEN' : 'CLOSED'}</div>
        <div>Selected Experience: {selectedExperience?.company || 'None'}</div>
        <div>Selected Certification: {selectedCertification?.title || 'None'}</div>
        <div>Selected Project: {selectedProject?.title || 'None'}</div>
        <button 
          onClick={() => {
            console.log('Test button clicked');
            const firstExp = experiences[0];
            if (firstExp) {
              openExperienceDetail(firstExp);
            }
          }}
          className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
        >
          Test Experience
        </button>
        <button 
          onClick={() => {
            console.log('Test project button clicked');
            const firstProject = projects[0];
            if (firstProject) {
              openProjectTechPopup(firstProject);
            }
          }}
          className="mt-2 px-2 py-1 bg-blue-500 text-white rounded ml-2"
        >
          Test Project
        </button>
      </div>
      
      {/* Experience Detail Popup */}
      <AnimatePresence>
        {isExperiencePopupOpen && selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-[9999]"
            onClick={closePopups}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50, rotateX: 15 }}
              transition={{ type: "spring", damping: 20, stiffness: 300, duration: 0.6 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                perspective: '1000px'
              }}
            >
              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div 
                  className="absolute inset-[-3px] rounded-3xl"
                  style={{
                    background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #10b981, #f59e0b, #3b82f6)',
                    animation: 'spin 4s linear infinite'
                  }}
                />
              </div>
              
              {/* Main content container */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                {/* Floating particles background */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, -60, -20],
                        x: [-10, 10, -10],
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePopups}
                  className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-all duration-300 bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 rounded-full backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25 z-50"
                  title="Close"
                >
                  <X className="h-6 w-6" />
                </motion.button>

                {/* Header with enhanced styling */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30"
                    >
                      <Briefcase className="h-8 w-8 text-blue-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                        {selectedExperience.role}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-lg">{selectedExperience.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>{selectedExperience.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Description with enhanced typography */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-8"
                >
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                    About the Role
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">{selectedExperience.description}</p>
                </motion.div>

                {/* Technologies with enhanced grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-blue-400 rounded-full"></div>
                    Technologies Used
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedExperience.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative p-4 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-xl backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                        </div>
                        
                        <div className="relative z-10 text-center">
                          <span className="text-emerald-300 font-medium">{tech}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certification Detail Popup */}
      <AnimatePresence>
        {isCertificationPopupOpen && selectedCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-[9999]"
            onClick={closePopups}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Background with Floating Particles */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl animate-gradient-x p-[2px]">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl backdrop-blur-xl" />
                </div>
                
                {/* Floating Particles Background */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10 p-8 transform perspective-1000">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePopups}
                  className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-all duration-300 bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 rounded-full backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25 z-50"
                  title="Close"
                >
                  <X className="h-6 w-6" />
                </motion.button>

                {/* Header with enhanced styling */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-400/30"
                    >
                      <Award className="h-8 w-8 text-emerald-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent mb-2">
                        {selectedCertification.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="font-semibold text-lg">{selectedCertification.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>{selectedCertification.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Description with enhanced typography */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-8"
                >
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full"></div>
                    About the Certification
                  </h4>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">{selectedCertification.description}</p>
                </motion.div>

                {/* Technologies with enhanced grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mb-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full"></div>
                    Technologies Covered
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedCertification.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-400/20 rounded-xl backdrop-blur-sm hover:border-emerald-400/40 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                        </div>
                        
                        <div className="relative z-10 text-center">
                          <span className="text-emerald-300 font-medium">{tech}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Technologies Detail Popup */}
      <AnimatePresence>
        {isProjectTechPopupOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-[9999]"
            onClick={closePopups}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced Background with Floating Particles */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl animate-gradient-x p-[2px]">
                  <div className="w-full h-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl backdrop-blur-xl" />
                </div>
                
                {/* Floating Particles Background */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <div className="relative z-10 p-8 transform perspective-1000">
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePopups}
                  className="absolute top-6 right-6 p-3 text-gray-400 hover:text-white transition-all duration-300 bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/40 hover:to-red-600/40 rounded-full backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/25 z-50"
                  title="Close"
                >
                  <X className="h-6 w-6" />
                </motion.button>

                {/* Header with enhanced styling */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30"
                    >
                      <Code2 className="h-8 w-8 text-blue-400" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-2">
                        {selectedProject.title}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-400">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="font-semibold text-lg">Complete Technology Stack</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg font-light">{selectedProject.description}</p>
                </motion.div>

                {/* Technologies with enhanced grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-8"
                >
                  <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
                    All Technologies Used
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl backdrop-blur-sm hover:border-blue-400/40 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        {/* Rotating border gradient on hover */}
                        <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div 
                            className="absolute inset-[-1px] rounded-xl"
                            style={{
                              background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                              animation: 'spin 3s linear infinite'
                            }}
                          />
                        </div>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
                        </div>
                        
                        <div className="relative z-10 text-center">
                          <span className="text-blue-300 font-medium">{tech}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Button */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex justify-center"
                >
                  <motion.a
                    href={selectedProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 overflow-hidden"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating particles */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>
                    
                    <span className="relative z-10 flex items-center gap-2">
                      View Project
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
    </MobilePerformanceMonitor>
  );
}
