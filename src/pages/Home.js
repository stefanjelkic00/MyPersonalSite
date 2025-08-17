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

const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  // IntersectionObserver logika
  useEffect(() => {
    const setupObserver = () => {
      const sections = document.querySelectorAll("section");
      if (sections.length === 0) {
        console.error("No sections found!");
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          let mostVisibleSection = null;
          let maxRatio = 0;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
              mostVisibleSection = entry.target.id;
              maxRatio = entry.intersectionRatio;
            }
          });

          if (mostVisibleSection) {
            console.log(mostVisibleSection);
            setActiveSection(mostVisibleSection);
          }
        },
        {
          threshold: [0.1],
          rootMargin: "-10px 0px -10% 0px",
        }
      );

      sections.forEach((section) => observer.observe(section));

      return () => {
        sections.forEach((section) => observer.unobserve(section));
      };
    };

    const timeoutId = setTimeout(setupObserver, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 115;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
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
      name: language === "en" ? "NS Code Nest Portfolio" : "Portfolio NS Code Nest",
      url: "https://ns-code-nest.vercel.app",
      description:
        language === "en"
          ? "Portfolio of Stefan Jelkic and Nikola Matosic, showcasing full-stack web solutions at NS Code Nest."
          : "Portfolio Stefana Jelkića i Nikole Matosića, prikazuje full-stack web rešenja NS Code Nest-a.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Stefan Jelkić",
      jobTitle: "Web Developer",
      url: "https://ns-code-nest.vercel.app",
      sameAs: ["https://www.linkedin.com/in/stefan-jelkic/", "https://github.com/stefanjelkic00"],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Nikola Matosić",
      jobTitle: "Web Developer",
      url: "https://ns-code-nest.vercel.app",
      sameAs: ["https://github.com/NikolaMatosic00"],
    },
  ];

  return (
    <>
      <Helmet>
        <html lang={language === "en" ? "en" : "sr"} />
        <title>
          {language === "en"
            ? "NS Code Nest | Stefan & Nikola Portfolio"
            : "NS Code Nest | Portfolio Stefana i Nikole"}
        </title>
        <meta
          name="description"
          content={
            language === "en"
              ? "Portfolio of Stefan Jelkic and Nikola Matosic, showcasing full-stack web solutions, projects, and expertise in React, Spring Boot, .NET, and more at NS Code Nest."
              : "Portfolio Stefana Jelkića i Nikole Matosića, prikazuje full-stack web rešenja, projekte i stručnost u React-u, Spring Boot-u, .NET-u i više na NS Code Nest-u."
          }
        />
        <meta
          name="keywords"
          content="NS Code Nest, web development, React, Spring Boot, .NET, JavaScript, portfolio, Stefan Jelkic, Nikola Matosic, Novi Sad"
        />
        <meta name="author" content="Stefan Jelkic, Nikola Matosic" />
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <meta property="og:title" content={language === "en" ? "NS Code Nest | Stefan & Nikola Portfolio" : "NS Code Nest | Portfolio Stefana i Nikole"} />
        <meta
          property="og:description"
          content={
            language === "en"
              ? "Explore the portfolio of Stefan Jelkic and Nikola Matosic, featuring full-stack web development projects at NS Code Nest."
              : "Istražite portfolio Stefana Jelkića i Nikole Matosića, koji prikazuje full-stack web razvojne projekte na NS Code Nest-u."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ns-code-nest.vercel.app" />
        <meta property="og:image" content="https://ns-code-nest.vercel.app/images/nscodenest-logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={language === "en" ? "NS Code Nest | Stefan & Nikola Portfolio" : "NS Code Nest | Portfolio Stefana i Nikole"}
        />
        <meta
          name="twitter:description"
          content={
            language === "en"
              ? "Portfolio of Stefan Jelkic and Nikola Matosic, showcasing full-stack web solutions at NS Code Nest."
              : "Portfolio Stefana Jelkića i Nikole Matosića, prikazuje full-stack web rešenja na NS Code Nest-u."
          }
        />
        <meta name="twitter:image" content="https://ns-code-nest.vercel.app/images/nscodenest-logo.webp" />
        <link rel="canonical" href="https://ns-code-nest.vercel.app" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <div style={styles.container(theme, isMobile)}>
        <LeftSidebar scrollToSection={scrollToSection} activeSection={activeSection} />
        <div style={styles.rightSide(isMobile)}>
          <Suspense fallback={<div>Loading...</div>}>
            <About />
            <Technologies />
            <Projects />
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