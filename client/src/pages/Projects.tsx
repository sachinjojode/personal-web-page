import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Filter } from 'lucide-react';
import axios from 'axios';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
}

interface ProjectsData {
  projects: Project[];
}

const Projects: React.FC = () => {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/portfolio');
        setData(response.data);
        setFilteredProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback data
        const fallbackData = {
          projects: [
            {
              id: 1,
              title: "E-commerce Platform",
              description: "Full-stack e-commerce application with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
              image: "/images/project1.jpg",
              technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
              github: "https://github.com/yourusername/ecommerce",
              live: "https://your-ecommerce-site.com"
            },
            {
              id: 2,
              title: "Task Management App",
              description: "Collaborative task management tool with real-time updates using Socket.io. Features drag-and-drop functionality and team collaboration tools.",
              image: "/images/project2.jpg",
              technologies: ["React", "Socket.io", "Express", "PostgreSQL", "TypeScript"],
              github: "https://github.com/yourusername/taskmanager",
              live: "https://your-task-app.com"
            },
            {
              id: 3,
              title: "Weather Dashboard",
              description: "Real-time weather dashboard with location-based forecasts and interactive charts. Includes weather alerts and historical data visualization.",
              image: "/images/project3.jpg",
              technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
              github: "https://github.com/yourusername/weather-dashboard",
              live: "https://your-weather-app.com"
            },
            {
              id: 4,
              title: "Social Media Dashboard",
              description: "Analytics dashboard for social media management with real-time metrics, post scheduling, and engagement tracking.",
              image: "/images/project4.jpg",
              technologies: ["React", "Node.js", "MongoDB", "Chart.js", "REST API"],
              github: "https://github.com/yourusername/social-dashboard",
              live: "https://your-social-dashboard.com"
            },
            {
              id: 5,
              title: "Portfolio Website",
              description: "Modern responsive portfolio website built with React and TypeScript. Features smooth animations and optimized performance.",
              image: "/images/project5.jpg",
              technologies: ["React", "TypeScript", "Framer Motion", "CSS3"],
              github: "https://github.com/yourusername/portfolio",
              live: "https://your-portfolio.com"
            },
            {
              id: 6,
              title: "Chat Application",
              description: "Real-time chat application with private messaging, group chats, and file sharing capabilities.",
              image: "/images/project6.jpg",
              technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
              github: "https://github.com/yourusername/chat-app",
              live: "https://your-chat-app.com"
            }
          ]
        };
        setData(fallbackData);
        setFilteredProjects(fallbackData.projects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      if (filter === 'all') {
        setFilteredProjects(data.projects);
      } else {
        setFilteredProjects(
          data.projects.filter(project =>
            project.technologies.some(tech =>
              tech.toLowerCase().includes(filter.toLowerCase())
            )
          )
        );
      }
    }
  }, [filter, data]);

  const allTechnologies = data ? 
    Array.from(new Set(data.projects.flatMap(project => project.technologies))) : [];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <motion.div 
            className="projects-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>My Projects</h1>
            <p>Explore my portfolio of web applications and digital solutions</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <motion.div 
            className="filter-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="filter-header">
              <Filter size={20} />
              <span>Filter by Technology</span>
            </div>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Projects
              </button>
              {allTechnologies.map(tech => (
                <button 
                  key={tech}
                  className={`filter-btn ${filter === tech.toLowerCase() ? 'active' : ''}`}
                  onClick={() => setFilter(tech.toLowerCase())}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-section">
        <div className="container">
          <motion.div 
            className="projects-grid"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                layout
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <div className="image-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                  <div className="project-overlay">
                    <div className="project-links">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        title="View Code"
                      >
                        <Github size={20} />
                      </a>
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        title="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-actions">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3>No projects found</h3>
              <p>Try selecting a different technology filter</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Interested in working together?</h2>
            <p>Let's discuss your next project and bring your ideas to life</p>
            <a href="/contact" className="btn btn-primary">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
