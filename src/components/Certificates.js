import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data";
import { styles } from "../styles";
import useIsMobile from "../hooks/useIsMobile";

const Certificates = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <section id="certificates" style={styles.section(isMobile)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.heading(theme, isMobile)}>{translations[language].certificatesTitle}</h2>
        <div style={styles.subSection}>
          <p style={styles.emptyMessage(theme)}>{translations[language].certificatesComingSoon}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Certificates;