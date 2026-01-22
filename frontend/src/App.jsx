import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Download, Code, Award, ChevronLeft, ChevronRight, Camera, MessageCircle } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentCertificate, setCurrentCertificate] = useState(0);
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [heroImage, setHeroImage] = useState(null);
  const [aboutImage, setAboutImage] = useState(null);
  const [educationImages, setEducationImages] = useState({});
  const [projectImages, setProjectImages] = useState({});
  const [skillImage, setSkillImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [projects, setProjects] = useState([
    {
      title: 'E-Commerce Website',
      description: 'Built a responsive e-commerce platform with product listings, cart functionality, and checkout process.',
      tech: ['React', 'CSS', 'JavaScript'],
      link: '#',
      code: `// Sample E-Commerce Product Component
import React, { useState } from 'react';

function ProductCard({ product }) {
  const [cart, setCart] = useState([]);
  
  const addToCart = (item) => {
    setCart([...cart, item]);
    alert('Added to cart!');
  };
  
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">$\{product.price}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;`
    },
    {
      title: 'Task Management App',
      description: 'Created a to-do application with CRUD operations, priority levels, and due date tracking.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      link: '#',
      code: `// Task Manager JavaScript
class TaskManager {
  constructor() {
    this.tasks = [];
  }
  
  addTask(title, priority, dueDate) {
    const task = {
      id: Date.now(),
      title,
      priority,
      dueDate,
      completed: false
    };
    this.tasks.push(task);
    this.renderTasks();
  }
  
  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.renderTasks();
  }
  
  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    this.renderTasks();
  }
  
  renderTasks() {
    console.log(this.tasks);
  }
}

const manager = new TaskManager();`
    },
    {
      title: 'Weather Dashboard',
      description: 'Developed a weather application using API integration to display real-time weather data.',
      tech: ['React', 'API Integration', 'CSS'],
      link: '#',
      code: `// Weather API Integration
import React, { useState, useEffect } from 'react';

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');
  
  useEffect(() => {
    fetchWeather();
  }, [city]);
  
  const fetchWeather = async () => {
    const API_KEY = 'your_api_key';
    const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}\`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };
  
  return (
    <div className="weather-dashboard">
      <h2>Weather in {city}</h2>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}`
    }
  ]);
  const [certificates, setCertificates] = useState([
    {
      title: 'Web Development Certificate',
      issuer: 'Online Learning Platform',
      date: 'December 2024',
      image: 'https://via.placeholder.com/600x400/4f46e5/ffffff?text=Web+Development+Certificate'
    },
    {
      title: 'Python Programming',
      issuer: 'Tech Institute',
      date: 'October 2024',
      image: 'https://via.placeholder.com/600x400/7c3aed/ffffff?text=Python+Programming+Certificate'
    },
    {
      title: 'Data Structures & Algorithms',
      issuer: 'Code Academy',
      date: 'August 2024',
      image: 'https://via.placeholder.com/600x400/2563eb/ffffff?text=DSA+Certificate'
    }
  ]);
  const [technicalSkills, setTechnicalSkills] = useState([
    { name: 'HTML/CSS', image: null },
    { name: 'JavaScript', image: null },
    { name: 'React', image: null },
    { name: 'Python', image: null },
    { name: 'Git/GitHub', image: null },
    { name: 'SQL', image: null }
  ]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', link: '', code: '' });
  const [newCertificate, setNewCertificate] = useState({ title: '', issuer: '', date: '', image: '' });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
        50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8), 0 0 60px rgba(139, 92, 246, 0.6); }
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out;
      }
      
      .animate-slideInLeft {
        animation: slideInLeft 0.6s ease-out;
      }
      
      .animate-slideInRight {
        animation: slideInRight 0.6s ease-out;
      }
      
      .animate-pulse-slow {
        animation: pulse 2s ease-in-out infinite;
      }
      
      .animate-glow {
        animation: glow 2s ease-in-out infinite;
      }
      
      .hover\\:scale-110:hover {
        transform: scale(1.1);
      }
      
      .hover\\:scale-105:hover {
        transform: scale(1.05);
      }
      
      .transition-all {
        transition: all 0.3s ease;
      }
      
      .max-h-\\[80vh\\] {
        max-height: 80vh;
      }
      
      .max-h-\\[calc\\(80vh-80px\\)\\] {
        max-height: calc(80vh - 80px);
      }
      
      .bg-clip-text {
        -webkit-background-clip: text;
        background-clip: text;
      }
      
      .text-transparent {
        color: transparent;
      }
      
      .backdrop-blur-sm {
        backdrop-filter: blur(4px);
      }
      
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
      }
      
      html {
        overflow-x: hidden;
        width: 100%;
        scroll-behavior: smooth;
        max-width: 100vw;
      }
      
      section {
        position: relative;
        width: 100%;
        max-width: 100vw;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (link.parentNode) {
        document.head.removeChild(link);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const education = [
    {
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'University Name',
      year: '2021 - 2025',
      grade: 'CGPA: 8.5/10'
    },
    {
      degree: 'Higher Secondary Certificate (HSC) - Class XII',
      institution: 'School/College Name',
      year: '2019 - 2021',
      grade: 'Percentage: 85%'
    },
    {
      degree: 'Secondary School Certificate (SSC) - Class X',
      institution: 'School Name',
      year: '2019',
      grade: 'Percentage: 90%'
    }
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const nextCertificate = () => {
    setCurrentCertificate((prev) => (prev + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setCurrentCertificate((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const handleImageUpload = (e, section, index = null) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (section === 'hero') {
          setHeroImage(event.target.result);
        } else if (section === 'about') {
          setAboutImage(event.target.result);
        } else if (section === 'education') {
          setEducationImages(prev => ({
            ...prev,
            [index]: event.target.result
          }));
        } else if (section === 'project') {
          setProjectImages(prev => ({
            ...prev,
            [index]: event.target.result
          }));
        } else if (section === 'skill') {
          setSkillImage(event.target.result);
        } else if (section === 'skillItem') {
          setTechnicalSkills(prev => prev.map((skill, i) => 
            i === index ? { ...skill, image: event.target.result } : skill
          ));
        } else if (section === 'newCertificate') {
          setNewCertificate(prev => ({ ...prev, image: event.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeFile(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleResumeDownload = () => {
    if (resumeFile) {
      const link = document.createElement('a');
      link.href = resumeFile;
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Please upload your resume first by clicking the camera icon on your profile picture');
    }
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const techArray = newProject.tech ? newProject.tech.split(',').map(t => t.trim()) : [];
      setProjects([...projects, { 
        ...newProject, 
        tech: techArray,
        link: newProject.link || '#'
      }]);
      setNewProject({ title: '', description: '', tech: '', link: '', code: '' });
      setShowAddProject(false);
    }
  };

  const deleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
    const newProjectImages = { ...projectImages };
    delete newProjectImages[index];
    setProjectImages(newProjectImages);
  };

  const addCertificate = () => {
    if (newCertificate.title && newCertificate.issuer) {
      const certificateToAdd = {
        ...newCertificate,
        image: newCertificate.image || 'https://via.placeholder.com/600x400/4f46e5/ffffff?text=' + encodeURIComponent(newCertificate.title),
        date: newCertificate.date || 'No date provided'
      };
      setCertificates([...certificates, certificateToAdd]);
      setNewCertificate({ title: '', issuer: '', date: '', image: '' });
      setShowAddCertificate(false);
      setCurrentCertificate(certificates.length);
    }
  };

  const deleteCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
    if (currentCertificate >= certificates.length - 1) {
      setCurrentCertificate(Math.max(0, certificates.length - 2));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !technicalSkills.find(s => s.name === newSkill.trim())) {
      setTechnicalSkills([...technicalSkills, { name: newSkill.trim(), image: null }]);
      setNewSkill('');
      setShowAddSkill(false);
    }
  };

  const deleteSkill = (index) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-full max-w-full overflow-x-hidden" style={{ width: '100%', maxWidth: '100vw' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-gray-800 bg-opacity-95 backdrop-blur-sm shadow-lg z-50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">Portfolio</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-gray-300 hover:text-indigo-400 transition ${
                    activeSection === item.toLowerCase() ? 'text-indigo-400 font-semibold' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'About', 'Skills', 'Projects', 'Education', 'Certificates', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-indigo-400 rounded"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 opacity-20"></div>
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center py-8 sm:py-16">
            <div className="relative inline-block mb-6">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="Profile" 
                  className="w-40 h-40 rounded-full object-cover shadow-2xl border-4 border-indigo-500 animate-float animate-glow"
                />
              ) : (
                <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl animate-float animate-glow">
                  YN
                </div>
              )}
              <label className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 cursor-pointer shadow-lg hover:scale-110 transition-all" title="Upload profile picture">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(e, 'hero')}
                  className="hidden"
                />
                <Camera size={20} />
              </label>
            </div>
            <h1 
              onClick={() => setShowNamePopup(true)}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 cursor-pointer hover:text-indigo-400 transition px-4 animate-fadeInUp"
            >
              Your Name
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-6 px-4 animate-fadeInUp">Computer Science Student | Aspiring Developer</p>
            <div className="flex justify-center gap-4 mb-8 animate-fadeInUp">
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-all hover:scale-110 transform">
                <Linkedin size={28} />
              </a>
              <a href="https://github.com/Rutuja6105" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-400 transition-all hover:scale-110 transform">
                <Github size={28} />
              </a>
              <a href="mailto:rutujadhav6105@gmail.com" className="text-gray-400 hover:text-indigo-400 transition-all hover:scale-110 transform">
                <Mail size={28} />
              </a>
            </div>
            <button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform animate-fadeInUp">
              <Download size={20} />
              Download Resume
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-transparent to-purple-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fadeInUp">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-gray-300 leading-relaxed mb-6 animate-slideInLeft">
                  I'm a passionate Computer Science student with a strong foundation in software development and web technologies. 
                  I love building projects that solve real-world problems and am always eager to learn new technologies.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed animate-slideInRight">
                  Currently seeking opportunities to apply my skills in a professional environment and contribute to innovative projects 
                  while continuing to grow as a developer.
                </p>
              </div>
              <div className="order-1 md:order-2 relative animate-fadeInUp">
                <div className="relative group">
                  {aboutImage ? (
                    <img 
                      src={aboutImage} 
                      alt="About Me" 
                      className="w-full h-80 object-cover rounded-xl shadow-2xl border-4 border-indigo-500 group-hover:scale-105 transition-all"
                    />
                  ) : (
                    <div className="w-full h-80 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-2xl flex items-center justify-center border-4 border-indigo-500 group-hover:scale-105 transition-all">
                      <Camera size={80} className="text-white opacity-50" />
                    </div>
                  )}
                  <label className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 cursor-pointer shadow-lg hover:scale-110 transition-all">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'about')}
                      className="hidden"
                    />
                    <Camera size={24} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-900 via-transparent to-indigo-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fadeInUp">Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-2xl hover:scale-105 transform animate-slideInLeft relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-all"></div>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-400 relative z-10">Technical Skills</h3>
              
              {/* Skill Image Section */}
              <div className="flex flex-wrap gap-3 relative z-10">
                {technicalSkills.map((skill, idx) => (
                  <div key={idx} className="relative group">
                    <div className="bg-indigo-900 border border-indigo-700 rounded-lg p-3 hover:bg-indigo-800 transition-all transform cursor-default flex flex-col items-center w-28">
                      {skill.image ? (
                        <img 
                          src={skill.image} 
                          alt={skill.name} 
                          className="w-16 h-16 object-cover rounded-md mb-2"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-indigo-700 rounded-md flex items-center justify-center mb-2">
                          <Code size={32} className="text-indigo-300" />
                        </div>
                      )}
                      <span className="text-indigo-300 text-xs font-medium text-center">{skill.name}</span>
                      <label className="absolute top-1 right-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full p-1 cursor-pointer shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleImageUpload(e, 'skillItem', idx)}
                          className="hidden"
                        />
                        <Camera size={12} />
                      </label>
                    </div>
                    <button
                      onClick={() => deleteSkill(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all z-10"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setShowAddSkill(true)}
                  className="bg-indigo-700 hover:bg-indigo-600 text-indigo-200 rounded-lg p-3 border border-indigo-500 transition-all transform hover:scale-110 cursor-pointer flex flex-col items-center justify-center w-28 h-28"
                >
                  <span className="text-2xl mb-1">+</span>
                  <span className="text-xs">Add Skill</span>
                </button>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all hover:shadow-2xl hover:scale-105 transform animate-slideInRight">
              <h3 className="text-2xl font-semibold mb-6 text-purple-400">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['Team Collaboration', 'Problem Solving', 'Communication', 'Time Management', 'Quick Learner'].map((skill, idx) => (
                  <span key={idx} className="bg-purple-900 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-700 hover:bg-purple-800 hover:scale-110 transition-all transform cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-900 via-transparent to-indigo-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white animate-fadeInUp">Projects</h2>
            <button
              onClick={() => setShowAddProject(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform"
            >
              + Add Project
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-700 hover:border-indigo-500 transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-all"></div>
                
                <button
                  onClick={() => deleteProject(idx)}
                  className="absolute top-2 left-2 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <X size={18} />
                </button>
                
                {/* Project Image */}
                <div className="relative">
                  {projectImages[idx] ? (
                    <img 
                      src={projectImages[idx]} 
                      alt={project.title} 
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                      <Code size={60} className="text-white opacity-50" />
                    </div>
                  )}
                  <label className="absolute top-2 right-2 bg-gray-900 bg-opacity-75 hover:bg-opacity-100 text-white rounded-full p-2 cursor-pointer shadow-lg hover:scale-110 transition-all">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleImageUpload(e, 'project', idx)}
                      className="hidden"
                    />
                    <Camera size={18} />
                  </label>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white relative z-10">{project.title}</h3>
                  <p className="text-gray-400 mb-4 relative z-10">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600 hover:border-indigo-500 transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 relative z-10">
                    <a href={project.link} className="text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 font-medium transition-all hover:scale-110 transform">
                      View Project <ExternalLink size={16} />
                    </a>
                    {project.code && (
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 font-medium border-0 bg-transparent cursor-pointer transition-all hover:scale-110 transform"
                      >
                        View Code <Code size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">{selectedProject.title} - Code</h3>
              <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white border-0 bg-transparent cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-auto max-h-[calc(80vh-80px)]">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-700">
                <code className="text-green-400 text-sm">{selectedProject.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Name Popup Modal */}
      {showNamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowNamePopup(false)}>
          <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">About My Name</h3>
              <button onClick={() => setShowNamePopup(false)} className="text-gray-400 hover:text-white border-0 bg-transparent cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  YN
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">Your Full Name</h4>
                <p className="text-indigo-400 text-lg">Computer Science Student</p>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">
                  Hello! I'm a passionate developer with a love for creating innovative solutions and learning new technologies.
                </p>
                <p className="leading-relaxed">
                  My name represents my commitment to excellence in software development and my journey in the tech world.
                </p>
                <p className="text-sm text-gray-400 italic mt-4">
                  Click anywhere outside this box to close
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Section */}
      <section id="education" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-transparent to-purple-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fadeInUp">Education</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-2xl transform hover:scale-105 animate-slideInLeft relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-all"></div>
                <div className="grid md:grid-cols-3 gap-6 p-8">
                  <div className="md:col-span-2 relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-lg text-indigo-400 mb-2">{edu.institution}</p>
                    <p className="text-gray-400 mb-1">{edu.year}</p>
                    <p className="text-gray-300 font-medium">{edu.grade}</p>
                  </div>
                  <div className="relative">
                    {educationImages[idx] ? (
                      <img 
                        src={educationImages[idx]} 
                        alt={`${edu.degree} certificate`} 
                        className="w-full h-40 object-cover rounded-lg shadow-lg border-2 border-indigo-500"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg flex items-center justify-center border-2 border-indigo-500">
                        <Camera size={40} className="text-white opacity-50" />
                      </div>
                    )}
                    <label className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 cursor-pointer shadow-lg hover:scale-110 transition-all">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'education', idx)}
                        className="hidden"
                      />
                      <Camera size={16} />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900 via-transparent to-pink-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3 animate-fadeInUp">
              <Award className="text-indigo-400 animate-pulse-slow" size={40} />
              Certificates
            </h2>
            <button
              onClick={() => setShowAddCertificate(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform"
            >
              + Add Certificate
            </button>
          </div>
          {certificates.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-all"></div>
                
                <button
                  onClick={() => deleteCertificate(currentCertificate)}
                  className="absolute top-4 left-4 z-20 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-lg hover:scale-110"
                >
                  <X size={20} />
                </button>
                
                <img 
                  src={certificates[currentCertificate].image} 
                  alt={certificates[currentCertificate].title}
                  className="w-full h-96 object-cover transition-all group-hover:scale-105 transform"
                />
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{certificates[currentCertificate].title}</h3>
                  <p className="text-indigo-400 mb-1">{certificates[currentCertificate].issuer}</p>
                  <p className="text-gray-400">{certificates[currentCertificate].date}</p>
                </div>
                
                {certificates.length > 1 && (
                  <>
                    <button 
                      onClick={prevCertificate}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-white p-3 rounded-full transition-all border-0 cursor-pointer hover:scale-110 hover:shadow-lg"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextCertificate}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 hover:bg-opacity-100 text-white p-3 rounded-full transition-all border-0 cursor-pointer hover:scale-110 hover:shadow-lg"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2">
                      {certificates.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentCertificate(idx)}
                          className={`w-3 h-3 rounded-full transition-all border-0 cursor-pointer hover:scale-125 ${
                            idx === currentCertificate ? 'bg-indigo-400 scale-125' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Award size={60} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">No certificates added yet. Click "Add Certificate" to get started!</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-transparent to-purple-900 opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-white animate-fadeInUp">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 rounded-xl transition-all"></div>
                <Mail className="mx-auto mb-3 text-indigo-400 group-hover:scale-110 transition-all transform" size={32} />
                <p className="text-gray-300 font-medium relative z-10">Email</p>
                <p className="text-sm text-gray-500 relative z-10">your.email@example.com</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 rounded-xl transition-all"></div>
                <Phone className="mx-auto mb-3 text-indigo-400 group-hover:scale-110 transition-all transform" size={32} />
                <p className="text-gray-300 font-medium relative z-10">Phone</p>
                <p className="text-sm text-gray-500 relative z-10">+91 XXXXX XXXXX</p>
              </div>
              <div className="text-center p-6 bg-gray-800 rounded-xl border border-gray-700 hover:border-pink-500 transition-all hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-indigo-500 opacity-0 group-hover:opacity-10 rounded-xl transition-all"></div>
                <MapPin className="mx-auto mb-3 text-indigo-400 group-hover:scale-110 transition-all transform" size={32} />
                <p className="text-gray-300 font-medium relative z-10">Location</p>
                <p className="text-sm text-gray-500 relative z-10">City, Country</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>

      {/* Add Project Modal */}
      {showAddProject && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowAddProject(false)}>
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Add New Project</h3>
              <button onClick={() => setShowAddProject(false)} className="text-gray-400 hover:text-white border-0 bg-transparent cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Project Title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <textarea
                placeholder="Project Description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none h-24"
              />
              <input
                type="text"
                placeholder="Technologies (comma-separated, e.g., React, Node.js, MongoDB)"
                value={newProject.tech}
                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <input
                type="text"
                placeholder="Project Link (optional)"
                value={newProject.link}
                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <textarea
                placeholder="Code Snippet (optional)"
                value={newProject.code}
                onChange={(e) => setNewProject({ ...newProject, code: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none h-32 font-mono text-sm"
              />
              <button
                onClick={addProject}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-2xl"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Certificate Modal */}
      {showAddCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowAddCertificate(false)}>
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border border-gray-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Add New Certificate</h3>
              <button onClick={() => setShowAddCertificate(false)} className="text-gray-400 hover:text-white border-0 bg-transparent cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Certificate Title"
                value={newCertificate.title}
                onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <input
                type="text"
                placeholder="Issuing Organization"
                value={newCertificate.issuer}
                onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <input
                type="text"
                placeholder="Date (e.g., December 2024)"
                value={newCertificate.date}
                onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                {newCertificate.image ? (
                  <img src={newCertificate.image} alt="Certificate preview" className="max-h-48 mx-auto rounded" />
                ) : (
                  <div className="text-gray-400">
                    <Camera size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Upload certificate image</p>
                  </div>
                )}
                <label className="mt-4 inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e, 'newCertificate')}
                    className="hidden"
                  />
                  Choose Image
                </label>
              </div>
              <button
                onClick={addCertificate}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-2xl"
              >
                Add Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setShowAddSkill(false)}>
          <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Add New Skill</h3>
              <button onClick={() => setShowAddSkill(false)} className="text-gray-400 hover:text-white border-0 bg-transparent cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Skill Name (e.g., TypeScript)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={addSkill}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-2xl"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}