// src/components/Projects.js
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { styles } from "../styles";
import { translations, stefanProjects } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import useIsMobile from "../hooks/useIsMobile";

const Projects = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>{translations[language].projectsTitle} | Stefan Portfolio</title>
        <meta
          name="description"
          content="Explore my successful projects and professional experience in software development."
        />
        <meta
          name="keywords"
          content="IT projects, portfolio, software development, web development, React, JavaScript"
        />
      </Helmet>

      <section id="projects" style={styles.section(isMobile)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={styles.heading(theme, isMobile)}>{translations[language].projectsTitle}</h2>

          {/* My Projects and Experience */}
          <div style={styles.subSection}>
            {stefanProjects.length > 0 ? (
              <div style={styles.grid}>
                {stefanProjects.map((item, index) => (
                  <motion.div
                    key={index}
                    style={{
                      ...styles.card(theme, isMobile),
                      position: 'relative', // Dodato za pozicioniranje loga
                    }}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: theme === "dark" ? "#1a1a1a" : "#f0f0f0",
                      boxShadow:
                        theme === "dark"
                          ? "0 4px 14px rgba(0, 0, 0, 0.5)"
                          : "0 4px 14px rgba(0, 0, 0, 0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Bee IT Logo */}
                    {item.logo && (
                      <img 
                        src={item.logo} 
                        alt="Bee IT Logo"
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          width: '50px',
                          height: '50px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                          opacity: theme === "dark" ? 0.9 : 0.8,
                          filter: theme === "dark" ? 'brightness(1.1)' : 'none',
                        }}
                      />
                    )}

                    {item.type === "project" ? (
                      <>
                        <div style={styles.cardHeader(theme)}>
                          <FaGithub size={25} color={styles.link(theme).color} />
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.link(theme)}
                          >
                            {translations[language][item.title]}
                          </a>
                        </div>
                        <motion.a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={styles.arrowIcon(theme)}
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaArrowRight size={18} />
                        </motion.a>
                        <p style={styles.period(theme)}>{translations[language][item.period]}</p>
                        <p style={styles.description(theme)}>
                          {translations[language][item.description]}
                        </p>
                        <div style={styles.techStack}>
                          {item.tech.map((t, idx) => (
                            <span key={idx} style={styles.techBadge(theme)}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{
                          ...styles.cardHeader(theme),
                          paddingRight: item.logo ? '65px' : '0', // Dodatni prostor ako ima logo
                        }}>
                          <span style={styles.link(theme)}>
                            {translations[language][item.title]}
                          </span>
                        </div>
                        <p style={styles.period(theme)}>{translations[language][item.period]}</p>
                        <p style={styles.description(theme)}>
                          {translations[language][item.description]}
                        </p>
                        <div style={styles.techStack}>
                          {item.tech.map((t, idx) => (
                            <span key={idx} style={styles.techBadge(theme)}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={styles.emptyMessage(theme)}>{translations[language].comingSoon}</p>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Projects;