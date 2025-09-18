# Personal Portfolio Website

A modern, responsive portfolio website built with React (TypeScript) and Node.js (Express). This project showcases professional work, skills, and provides a contact form for potential clients or employers.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth page transitions and hover effects using Framer Motion
- **Contact Form**: Functional contact form with email integration
- **Project Showcase**: Filterable project gallery with detailed information
- **Skills Display**: Animated skill bars and technology categories
- **SEO Ready**: Optimized for search engines

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls
- **CSS3** for styling

### Backend
- **Node.js** with Express
- **CORS** for cross-origin requests
- **Nodemailer** for email functionality
- **dotenv** for environment variables

## Project Structure

```
personal-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app component
│   │   └── App.css         # Global styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js            # Server entry point
│   ├── package.json
│   └── env.example         # Environment variables example
├── package.json            # Root package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd personal-portfolio
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install all dependencies (client + server)
npm run install-all
```

### 3. Environment Setup

Create a `.env` file in the `server` directory:
```bash
cd server
cp env.example .env
```

Edit the `.env` file with your email configuration:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=development
```

**Note**: For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

### 4. Start the development servers

```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Customization

### 1. Personal Information
Edit the portfolio data in `server/index.js`:

```javascript
const portfolioData = {
  about: {
    name: "Your Name",
    title: "Your Title",
    description: "Your description",
    // ... other fields
  },
  // ... rest of the data
};
```

### 2. Styling
- Modify `client/src/App.css` for global styles
- Update individual page CSS files for specific styling
- Change the color scheme by updating CSS variables

### 3. Projects
Add your projects in the `projects` array in `server/index.js`:

```javascript
projects: [
  {
    id: 1,
    title: "Your Project",
    description: "Project description",
    technologies: ["React", "Node.js"],
    github: "https://github.com/yourusername/project",
    live: "https://your-project.com"
  }
]
```

### 4. Skills
Update the skills array in `server/index.js`:

```javascript
skills: [
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  // ... add your skills
]
```

## Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the `client/build` folder

### Backend (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the `server` directory
3. Update the API URL in the frontend code

### Full Stack (Vercel)
1. Add `vercel.json` configuration
2. Deploy the entire project

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run client` - Start React frontend only
- `npm run server` - Start Node.js backend only
- `npm run build` - Build frontend for production
- `npm run install-all` - Install all dependencies

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/portfolio` - Get portfolio data
- `POST /api/contact` - Send contact form email

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help customizing this portfolio, feel free to open an issue or contact me directly.

---

**Happy coding!** 🚀
