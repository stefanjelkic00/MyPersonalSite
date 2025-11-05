import React, { useEffect, useState, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { styles } from "../styles";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";
import LeftSidebar from "../components/LeftSidebar";
import useIsMobile from "../hooks/useIsMobile";
import About from "../components/About";
import Technologies from "../components/Technologies";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";

const Home = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // Scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "technologies", "projects", "certificates"];
      const scrollPosition = window.scrollY + 200; // offset od vrha

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Pozovi odmah pri učitavanju
    handleScroll();

    // Dodaj scroll listener
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 100;
      const sectionPosition = section.offsetTop;
      window.scrollTo({
        top: sectionPosition - offset,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Structured data za SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: language === "en" ? "Stefan Jelkić Portfolio" : "Portfolio Stefan Jelkić",
      url: "https://stefanjelkic.com",
      description:
        language === "en"
          ? "Portfolio of Stefan Jelkić, showcasing full-stack web development projects and expertise."
          : "Portfolio Stefana Jelkića, prikazuje full-stack web razvojne projekte i stručnost.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Stefan Jelkić",
      jobTitle: "Full-Stack Developer",
      url: "https://stefanjelkic.com",
      sameAs: ["https://www.linkedin.com/in/stefanjelkic", "https://github.com/stefanjelkic00"],
    },
  ];

  return (
    <>
      <Helmet>
        <html lang={language === "en" ? "en" : "sr"} />
        <title>
          {language === "en"
            ? "Stefan Jelkić | Full-Stack Developer Portfolio"
            : "Stefan Jelkić | Full-Stack Developer Portfolio"}
        </title>
        <meta
          name="description"
          content={
            language === "en"
              ? "Portfolio of Stefan Jelkić, showcasing full-stack web solutions, projects, and expertise in React, Spring Boot, .NET, Salesforce Commerce Cloud and more."
              : "Portfolio Stefana Jelkića, prikazuje full-stack web rešenja, projekte i stručnost u React-u, Spring Boot-u, .NET-u, Salesforce Commerce Cloud-u i više."
          }
        />
        <meta
          name="keywords"
          content="Stefan Jelkić, web development, React, Spring Boot, .NET, JavaScript, portfolio, Salesforce Commerce Cloud, Full-Stack Developer"
        />
        <meta name="author" content="Stefan Jelkić" />
        <meta property="og:title" content={language === "en" ? "Stefan Jelkić | Full-Stack Developer Portfolio" : "Stefan Jelkić | Full-Stack Developer Portfolio"} />
        <meta
          property="og:description"
          content={
            language === "en"
              ? "Explore the portfolio of Stefan Jelkić, featuring full-stack web development projects."
              : "Istražite portfolio Stefana Jelkića, koji prikazuje full-stack web razvojne projekte."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://stefanjelkic.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={language === "en" ? "Stefan Jelkić | Full-Stack Developer Portfolio" : "Stefan Jelkić | Full-Stack Developer Portfolio"}
        />
        <meta
          name="twitter:description"
          content={
            language === "en"
              ? "Portfolio of Stefan Jelkić, showcasing full-stack web solutions."
              : "Portfolio Stefana Jelkića, prikazuje full-stack web rešenja."
          }
        />
        <link rel="canonical" href="https://stefanjelkic.com" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div style={styles.container(theme, isMobile)}>
        <LeftSidebar scrollToSection={scrollToSection} activeSection={activeSection} />
        <div style={styles.rightSide(isMobile)}>
          <Suspense fallback={<div>Loading...</div>}>
            <About />
            <Technologies />
            <Projects />
            <Certificates />
          </Suspense>
        </div>
      </div>
    </>
  );
};

const WrappedHome = () => (
  <ThemeProvider>
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  </ThemeProvider>
);

export default WrappedHome;