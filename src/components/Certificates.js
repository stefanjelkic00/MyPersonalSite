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
          <motion.img
            src={process.env.PUBLIC_URL + "/SfccCertificate.png"}
            alt="SFCC Certificate"
            style={{
              width: "100%",
              maxWidth: "800px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: theme === "dark" 
                ? "0 4px 12px rgba(0, 0, 0, 0.5)" 
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
              margin: "0 auto",
              display: "block"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Certificates;