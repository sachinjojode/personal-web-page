const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
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
    projects: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Full-stack e-commerce application with React, Node.js, and MongoDB",
        image: "/images/project1.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com/yourusername/ecommerce",
        live: "https://your-ecommerce-site.com"
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        image: "/images/project2.jpg",
        technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
        github: "https://github.com/yourusername/taskmanager",
        live: "https://your-task-app.com"
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "Real-time weather dashboard with location-based forecasts",
        image: "/images/project3.jpg",
        technologies: ["React", "OpenWeather API", "Chart.js"],
        github: "https://github.com/yourusername/weather-dashboard",
        live: "https://your-weather-app.com"
      }
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
    ],
    contact: {
      email: "your.email@example.com",
      phone: "+1 (555) 123-4567",
      location: "Your City, Country",
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourusername"
    }
  };
  
  res.json(portfolioData);
});

// Send contact email
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New contact form submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
