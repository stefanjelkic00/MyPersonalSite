// src/components/Technologies.js
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations, techStack } from "../data";
import { styles } from "../styles";
import useIsMobile from "../hooks/useIsMobile";


const Technologies = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();


  return (
    <section id="technologies" style={styles.section(isMobile)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.heading(theme, isMobile)}>{translations[language].technologies}</h2>
        {techStack.length > 0 ? (
          <div style={styles.techGrid}>
            {techStack.map((tech, index) => (
              <span key={index} style={styles.techBadge(theme)}>
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <p style={styles.emptyMessage(theme)}>{translations[language].noTechnologies}</p>
        )}
      </motion.div>
    </section>
  );
};

export default Technologies;