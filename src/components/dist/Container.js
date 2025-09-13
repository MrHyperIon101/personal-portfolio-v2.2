"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var head_1 = require("next/head");
var link_1 = require("next/link");
var framer_motion_1 = require("framer-motion");
var utils_1 = require("@/lib/utils");
var Footer_1 = require("@/components/Footer");
var router_1 = require("next/router");
var Preloader_1 = require("@/components/Preloader");
// Ultra-smooth scroll handler
function ultraSmoothScrollTo(element) {
    if (!element)
        return;
    var elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    var offsetPosition = elementPosition - 80; // Account for fixed header
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}
var navLinks = [
    { href: "#home", text: "Home" },
    { href: "#about", text: "About" },
    { href: "#experience", text: "Experience" },
    { href: "#projects", text: "Projects" },
    { href: "#certifications", text: "Certifications" },
    { href: "#services", text: "Services" },
];
function GlitchText(_a) {
    var children = _a.children, className = _a.className, href = _a.href, onClick = _a.onClick;
    var _b = react_1.useState(false), isHovered = _b[0], setIsHovered = _b[1];
    if (href) {
        return (React.createElement(link_1["default"], { href: href, onClick: onClick, className: utils_1.cn("relative overflow-hidden inline-block", className), onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () { return setIsHovered(false); } },
            React.createElement("span", { className: "relative z-10" }, children),
            isHovered && (React.createElement(React.Fragment, null,
                React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-red-500 opacity-80", initial: { x: 0, y: 0 }, animate: {
                        x: [-1, 1, -2, 1, 0],
                        y: [0, -1, 1, -1, 0]
                    }, transition: {
                        duration: 0.15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }, style: {
                        clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
                        zIndex: 5
                    } }, children),
                React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-cyan-400 opacity-80", initial: { x: 0, y: 0 }, animate: {
                        x: [1, -1, 2, -1, 0],
                        y: [1, 0, -1, 1, 0]
                    }, transition: {
                        duration: 0.12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.03
                    }, style: {
                        clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
                        zIndex: 5
                    } }, children),
                React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-yellow-300 opacity-60", initial: { x: 0, y: 0 }, animate: {
                        x: [-1.5, 1.5, -1, 1, 0],
                        y: [-0.5, 0.5, -1.5, 1.5, 0]
                    }, transition: {
                        duration: 0.18,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.06
                    }, style: {
                        clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
                        zIndex: 5
                    } }, children)))));
    }
    return (React.createElement("span", { className: utils_1.cn("relative overflow-hidden inline-block", className), onMouseEnter: function () { return setIsHovered(true); }, onMouseLeave: function () { return setIsHovered(false); } },
        React.createElement("span", { className: "relative z-10" }, children),
        isHovered && (React.createElement(React.Fragment, null,
            React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-red-500 opacity-80", initial: { x: 0, y: 0 }, animate: {
                    x: [-1, 1, -2, 1, 0],
                    y: [0, -1, 1, -1, 0]
                }, transition: {
                    duration: 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }, style: {
                    clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)',
                    zIndex: 5
                } }, children),
            React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-cyan-400 opacity-80", initial: { x: 0, y: 0 }, animate: {
                    x: [1, -1, 2, -1, 0],
                    y: [1, 0, -1, 1, 0]
                }, transition: {
                    duration: 0.12,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.03
                }, style: {
                    clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
                    zIndex: 5
                } }, children),
            React.createElement(framer_motion_1.motion.span, { className: "absolute inset-0 text-yellow-300 opacity-60", initial: { x: 0, y: 0 }, animate: {
                    x: [-1.5, 1.5, -1, 1, 0],
                    y: [-0.5, 0.5, -1.5, 1.5, 0]
                }, transition: {
                    duration: 0.18,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.06
                }, style: {
                    clipPath: 'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
                    zIndex: 5
                } }, children)))));
}
function handleClick(e) {
    var href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
        e.preventDefault();
        var section = document.querySelector(href);
        ultraSmoothScrollTo(section);
    }
}
function NavItem(props) {
    return (React.createElement(framer_motion_1.motion.a, { href: props.href, onClick: handleClick, className: utils_1.cn("relative px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-300 hover:text-white", props.isActive && "text-white"), whileHover: {
            scale: 1.05,
            transition: { duration: 0.2 }
        }, whileTap: { scale: 0.95 } },
        React.createElement(GlitchText, { className: "text-sm font-medium" }, props.text),
        props.isActive && (React.createElement(framer_motion_1.motion.div, { className: "absolute inset-0 bg-white/10 rounded-full -z-10", layoutId: "activeNav", initial: false, transition: {
                type: "spring",
                stiffness: 380,
                damping: 30
            } }))));
}
function Container(props) {
    var _a = react_1.useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    var _b = react_1.useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState("#home"), activeSection = _c[0], setActiveSection = _c[1];
    var children = props.children, customMeta = __rest(props, ["children"]);
    var router = router_1.useRouter();
    var meta = __assign({ title: "Souvik Bagchi", description: "Aspiring Data Scientist and Software Engineer pursuing B.Tech CSE (Data Science). Remote Lab Tester at Samsung Electronics. Member of NVIDIA & GitHub Developer Programs.", image: "/assets/logo.webp", type: "website" }, customMeta);
    // Check if we're on the main page
    var isMainPage = router.pathname === '/';
    // Handle scroll for navbar background and active section detection
    react_1.useEffect(function () {
        var ticking = false;
        var handleScroll = function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var currentScrollTop = window.scrollY;
                    setIsScrolled(currentScrollTop > 50);
                    // Detect active section
                    var sections = navLinks.map(function (link) { return link.href; });
                    var currentSection = sections.find(function (section) {
                        var element = document.querySelector(section);
                        if (element) {
                            var rect = element.getBoundingClientRect();
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
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    // preloader effect
    react_1.useEffect(function () {
        setTimeout(function () {
            setIsLoading(false);
            document.body.style.cursor = "default";
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 2000);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, meta.title),
            React.createElement("meta", { name: "robots", content: "follow, index" }),
            React.createElement("meta", { name: "theme-color", content: "#7B82FE" }),
            React.createElement("meta", { content: meta.description, name: "description" }),
            React.createElement("meta", { property: "og:url", content: "https://www.souvikbagchi.social" + router.asPath }),
            React.createElement("link", { rel: "canonical", href: "https://www.souvikbagchi.social" + router.asPath }),
            React.createElement("meta", { property: "og:type", content: meta.type }),
            React.createElement("meta", { property: "og:site_name", content: "Souvik Bagchi" }),
            React.createElement("meta", { property: "og:description", content: meta.description }),
            React.createElement("meta", { property: "og:title", content: meta.title }),
            React.createElement("meta", { property: "og:image", content: meta.image }),
            React.createElement("meta", { name: "twitter:card", content: "summary_large_image" }),
            React.createElement("meta", { name: "twitter:site", content: "Souvik Bagchi" }),
            React.createElement("meta", { name: "twitter:title", content: meta.title }),
            React.createElement("meta", { name: "twitter:description", content: meta.description }),
            React.createElement("meta", { name: "twitter:image", content: meta.image }),
            React.createElement("link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" }),
            React.createElement("link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" }),
            React.createElement("link", { rel: "shortcut icon", href: "/favicon.ico?v=2" }),
            React.createElement("link", { rel: "manifest", href: "/manifest.json" }),
            React.createElement("link", { rel: "apple-touch-icon", href: "/icon-192x192.png" })),
        isMainPage && !isLoading && (React.createElement(framer_motion_1.motion.div, { "data-navbar": "true", className: "z-[9998] hidden sm:block pointer-events-none", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: 0.1
            }, style: {
                position: 'fixed',
                top: '1.5rem',
                left: '0',
                right: '0',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden'
            } },
            React.createElement("div", { className: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" },
                React.createElement(framer_motion_1.motion.div, { className: utils_1.cn("group inline-block px-5 py-3 rounded-full bg-transparent border-2 relative overflow-hidden", "transition-all duration-500 ease-out pointer-events-auto", "shadow-lg shadow-black/20 backdrop-blur-sm", isScrolled
                        ? "border-white/40 shadow-2xl shadow-black/50"
                        : "border-white/20 shadow-lg shadow-black/20"), initial: { x: -100, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        delay: 0.2
                    }, whileHover: {
                        scale: 1.05,
                        transition: { duration: 0.15, ease: "easeOut" }
                    }, style: {
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                    } },
                    React.createElement("div", { className: "absolute inset-0 rounded-full overflow-hidden" },
                        React.createElement("div", { className: "absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500", style: {
                                background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                                animation: 'spin 3s linear infinite'
                            } })),
                    React.createElement("div", { className: "absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" }),
                    React.createElement("div", { className: "absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" })),
                    React.createElement(GlitchText, { href: "/", className: "relative z-10 text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300" }, "Souvik Bagchi"))))),
        isMainPage && !isLoading && (React.createElement(framer_motion_1.motion.nav, { "data-navbar": "true", className: utils_1.cn("z-[9999] hidden sm:flex relative overflow-hidden group", "px-6 py-3 rounded-full bg-transparent border-2", "transition-all duration-500 ease-out items-center", "shadow-lg shadow-black/20 backdrop-blur-sm", isScrolled
                ? "border-white/40 shadow-2xl shadow-black/50"
                : "border-white/20 shadow-lg shadow-black/20"), initial: { y: -100, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                delay: 0.05
            }, style: {
                position: 'fixed',
                top: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden'
            }, whileHover: {
                scale: 1.02,
                transition: { duration: 0.15, ease: "easeOut" }
            } },
            React.createElement("div", { className: "absolute inset-0 rounded-full overflow-hidden" },
                React.createElement("div", { className: "absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500", style: {
                        background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4, #3b82f6)',
                        animation: 'spin 3s linear infinite'
                    } })),
            React.createElement("div", { className: "absolute inset-[2px] rounded-full bg-black/90 backdrop-blur-xl" }),
            React.createElement("div", { className: "absolute inset-[2px] rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300" },
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" })),
            React.createElement("div", { className: "flex items-center space-x-1 relative z-10" }, navLinks.map(function (link, i) { return (React.createElement(NavItem, { key: link.href, href: link.href, text: link.text, i: i, isActive: activeSection === link.href })); })))),
        React.createElement(framer_motion_1.AnimatePresence, { mode: "wait" }, isLoading && React.createElement(Preloader_1["default"], null)),
        React.createElement("main", { className: utils_1.cn("w-full", props.className) }, children),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = Container;
