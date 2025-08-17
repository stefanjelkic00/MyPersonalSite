import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaViber, FaWhatsapp, FaSun, FaMoon, FaBars } from "react-icons/fa";
import { styles } from "../styles";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations, navItems } from "../data";
import useIsMobile from "../hooks/useIsMobile";

const LeftSidebar = ({ scrollToSection, activeSection }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, height: 0, y: -20 },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -20,
      transition: {
        duration: 0.1,
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <div style={styles.leftSide(theme, isMobile)} data-theme={theme}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        style={styles.leftContent(isMobile)}
      >
        {/* Hamburger icon on mobile */}
        <div
          style={{
            display: isMobile ? "block" : "none",
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={toggleMenu}
        >
          <FaBars size={30} color={theme === "dark" ? "#ccc" : "#666"} />
        </div>

        <div style={styles.logoSpotlightContainer}>
          <img
            src={process.env.PUBLIC_URL + "/SiteProfile.png"}
            alt="IT Solutions"
            style={styles.logo(theme, isMobile)}
          />
          <div style={styles.logoSpotlight(theme)} />
        </div>
        <h1 style={styles.name(theme, isMobile)}>Stefan Jelkić</h1>
        <h2 style={styles.subtitle(theme, isMobile)}>{translations[language].subtitle}</h2>

        {/* Navigation */}
        <motion.nav
          style={{ ...styles.nav(isMobile), display: isMobile && !isMenuOpen ? "none" : "block" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul style={styles.navList(isMobile)}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    scrollToSection(item.id);
                    if (isMobile) setIsMenuOpen(false);
                  }}
                  className="nav-link"
                  style={{
                    ...styles.navLink(theme, isMobile),
                    color: activeSection === item.id ? styles.navLinkHover(theme).color : styles.navLink(theme, isMobile).color,
                    fontWeight: activeSection === item.id ? "bold" : "normal",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = styles.navLinkHover(theme).color;
                      e.currentTarget.style.fontWeight = "bold";
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.querySelector("span").style.width = "40px";
                      e.currentTarget.querySelector("span").style.backgroundColor =
                        styles.navLinkHoverBefore(theme).backgroundColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color =
                        activeSection === item.id
                          ? styles.navLinkHover(theme).color
                          : styles.navLink(theme, isMobile).color;
                      e.currentTarget.style.fontWeight = activeSection === item.id ? "bold" : "normal";
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.querySelector("span").style.width = activeSection === item.id ? "40px" : "20px";
                      e.currentTarget.querySelector("span").style.backgroundColor =
                        activeSection === item.id
                          ? styles.navLinkHoverBefore(theme).backgroundColor
                          : styles.navLinkBefore(theme).backgroundColor;
                    }
                  }}
                  aria-label={`Navigate to ${translations[language][item.label]} section`}
                >
                  <span
                    style={{
                      ...styles.navLinkBefore(theme),
                      width: activeSection === item.id ? "40px" : "20px",
                      backgroundColor: activeSection === item.id
                        ? styles.navLinkHoverBefore(theme).backgroundColor
                        : styles.navLinkBefore(theme).backgroundColor,
                    }}
                  ></span>
                  {translations[language][item.label]}
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Socials, theme, and language */}
        <div style={styles.socials(isMobile)}>
          <div style={styles.socialIcons(isMobile)}>
            <a
              href="https://github.com/stefanjelkic00"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink(theme, isMobile)}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLink(theme).color;
              }}
            >
              <FaGithub size={25} />
            </a>
            <a
              href="https://www.linkedin.com/in/stefanjelkic"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialLink(theme, isMobile)}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLink(theme).color;
              }}
            >
              <FaLinkedin size={25} />
            </a>
            <div
              style={styles.socialLink(theme, isMobile)}
              onClick={() => setShowEmail(!showEmail)}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLink(theme).color;
              }}
            >
              <FaEnvelope size={25} />
            </div>
            <div
              style={styles.socialLink(theme, isMobile)}
              onClick={() => setShowContact(!showContact)}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLink(theme).color;
              }}
            >
              <FaPhone size={25} />
            </div>
            <div
              style={styles.themeToggle(theme, isMobile)}
              onClick={toggleTheme}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.themeToggle(theme).color;
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <FaSun size={25} /> : <FaMoon size={25} />}
            </div>
            <div
              style={styles.socialLink(theme, isMobile)}
              onClick={toggleLanguage}
              onMouseEnter={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLinkHover(theme).color;
              }}
              onMouseLeave={(e) => {
                if (!isMobile) e.currentTarget.style.color = styles.socialLink(theme).color;
              }}
              aria-label={`Switch to ${language === "en" ? "Serbian" : "English"} language`}
            >
              <span style={styles.languageText(isMobile)}>{language === "en" ? "SR" : "EN"}</span>
            </div>
          </div>

          {/* Email address */}
          <AnimatePresence>
            {showEmail && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={styles.emailList(isMobile)}
              >
                <motion.a
                  variants={itemVariants}
                  href="mailto:stefanjelkic@gmail.com"
                  style={styles.emailLink(theme, isMobile)}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = styles.emailLinkHover(theme).color;
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.color = styles.emailLink(theme, isMobile).color;
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                >
                  stefanjelkic@gmail.com
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact information */}
          <AnimatePresence>
            {showContact && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={styles.contactList(isMobile)}
              >
                <motion.div variants={itemVariants} style={styles.contactItem(isMobile)}>
                  <p style={styles.contactText(theme, isMobile)}>+381 69 5590 320</p>
                  <div style={styles.contactIcons}>
                    <a
                      href="viber://chat?number=%2B381695590320"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.contactIcon(theme)}
                      onMouseEnter={(e) => {
                        if (!isMobile) e.currentTarget.style.color = styles.githubLinkHover(theme).color;
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) e.currentTarget.style.color = styles.contactIcon(theme).color;
                      }}
                    >
                      <FaViber size={18} />
                    </a>
                    <a
                      href="https://wa.me/+381695590320"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.contactIcon(theme)}
                      onMouseEnter={(e) => {
                        if (!isMobile) e.currentTarget.style.color = styles.githubLinkHover(theme).color;
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) e.currentTarget.style.color = styles.contactIcon(theme).color;
                      }}
                    >
                      <FaWhatsapp size={18} />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default LeftSidebar;