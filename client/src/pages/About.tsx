import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Code, Palette, Database } from 'lucide-react';
import axios from 'axios';
import './About.css';

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
}

interface AboutData {
  about: {
    name: string;
    title: string;
    description: string;
    image: string;
    resume: string;
  };
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}

const About: React.FC = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data
        setData({
          about: {
            name: "Your Name",
            title: "Full Stack Developer",
            description: "Passionate developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.",
            image: "/images/profile.jpg",
            resume: "/files/resume.pdf"
          },
          skills: [
            { name: "JavaScript", level: 90 },
            { name: "React", level: 85 },
            { name: "Node.js", level: 80 },
            { name: "Python", level: 75 },
            { name: "MongoDB", level: 70 },
            { name: "AWS", level: 65 }
          ],
          experience: [
            {
              id: 1,
              company: "Tech Company Inc.",
              position: "Senior Developer",
              duration: "2022 - Present",
              description: "Led development of scalable web applications using modern technologies"
            },
            {
              id: 2,
              company: "StartupXYZ",
              position: "Full Stack Developer",
              duration: "2020 - 2022",
              description: "Developed and maintained multiple client projects with React and Node.js"
            }
          ],
          education: [
            {
              id: 1,
              institution: "University of Technology",
              degree: "Bachelor of Computer Science",
              year: "2018 - 2022"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About Me</h1>
            <p>Get to know me better</p>
          </motion.div>
        </div>
      </section>

      {/* About Content */}
      <section className="about-content-section">
        <div className="container">
          <div className="about-content">
            <motion.div 
              className="profile-section"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="profile-image-container">
                <div className="profile-image">
                  <div className="image-placeholder">
                    <span>{data?.about.name.charAt(0)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="about-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>{data?.about.name}</h2>
              <h3>{data?.about.title}</h3>
              <p>{data?.about.description}</p>
              
              <div className="about-actions">
                <a href={data?.about.resume} className="btn btn-primary" download>
                  <Download size={20} />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="skills-grid">
            {data?.skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="skill-header">
                  <h4>{skill.name}</h4>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="skill-categories">
            <motion.div 
              className="category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Code size={40} />
              <h3>Frontend</h3>
              <p>React, TypeScript, HTML5, CSS3, Tailwind</p>
            </motion.div>
            
            <motion.div 
              className="category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Database size={40} />
              <h3>Backend</h3>
              <p>Node.js, Express, MongoDB, PostgreSQL</p>
            </motion.div>
            
            <motion.div 
              className="category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Palette size={40} />
              <h3>Design</h3>
              <p>Figma, Adobe Creative Suite, UI/UX</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>
          
          <div className="timeline">
            {data?.experience.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="timeline-item"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="timeline-content">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                  <span className="duration">{exp.duration}</span>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="education-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>
          
          <div className="education-grid">
            {data?.education.map((edu, index) => (
              <motion.div 
                key={edu.id}
                className="education-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <span className="year">{edu.year}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
