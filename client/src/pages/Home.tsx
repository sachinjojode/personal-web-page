import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import axios from 'axios';
import './Home.css';

interface PortfolioData {
  about: {
    name: string;
    title: string;
    description: string;
  };
  contact: {
    github: string;
    linkedin: string;
    email: string;
  };
}

const Home: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        // Fallback data
        setPortfolioData({
          about: {
            name: "Your Name",
            title: "Full Stack Developer",
            description: "Passionate developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code."
          },
          contact: {
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourprofile",
            email: "your.email@example.com"
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToAbout = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background"></div>
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hi, I'm {portfolioData?.about.name}
          </motion.h1>
          
          <motion.p 
            className="subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {portfolioData?.about.title}
          </motion.p>
          
          <motion.p 
            className="description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {portfolioData?.about.description}
          </motion.p>
          
          <motion.div 
            className="cta-buttons"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get In Touch
            </a>
          </motion.div>
          
          <motion.div 
            className="social-links"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a href={portfolioData?.contact.github} target="_blank" rel="noopener noreferrer">
              <Github size={24} />
            </a>
            <a href={portfolioData?.contact.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${portfolioData?.contact.email}`}>
              <Mail size={24} />
            </a>
          </motion.div>
        </div>
        
        <motion.button 
          className="scroll-indicator"
          onClick={scrollToAbout}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </motion.section>

      {/* Quick About Preview */}
      <section className="quick-about">
        <div className="container">
          <motion.div 
            className="quick-about-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>About Me</h2>
            <p>
              I'm a passionate developer who loves creating amazing web experiences. 
              With expertise in modern technologies and a keen eye for design, 
              I bring ideas to life through clean, efficient code.
            </p>
            <div className="quick-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>3+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
