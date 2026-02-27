import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'framer-motion'
import './App.css'

const personalInfo = {
  name: 'Juvaid Ahmad',
  title: 'Full Stack Developer',
  email: 'juvaidahmad4@gmail.com',
  phone: '+91-7906370605',
  location: 'India',
  linkedin: 'https://linkedin.com/in/juvaid-ahmad-927a18215'
}

const projects = [
  {
    title: 'Truniform NFC Tag Platform',
    description: 'NFC-based uniform authentication and social matching platform with location-based matching, real-time notifications, and chat functionality.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io']
  },
  {
    title: 'Tip App – Digital Tipping Platform',
    description: 'Secure cashless tipping system with payment gateway integration and transaction validation.',
    tech: ['Angular', 'Node.js', 'MongoDB']
  },
  {
    title: 'Music Competition Platform',
    description: 'Music battle and voting system with leaderboard, challenge features, and real-time chat.',
    tech: ['React.js', 'Node.js', 'MongoDB']
  },
  {
    title: 'Drivo – Car Configuration & Booking',
    description: 'Dynamic car customization module with booking and order management system.',
    tech: ['Angular', 'Node.js', 'MongoDB']
  },
  {
    title: 'Product Management System',
    description: 'E-commerce platform with authentication, cart, order processing, and product CRUD operations.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB']
  }
]

const experience = [
  {
    company: 'Smartdata Enterprises',
    location: 'Dehradun, India',
    role: 'Associate Software Engineer 2',
    period: 'Mar 2023 – Present',
    points: [
      'Developed and maintained full-stack web applications using React.js, Angular, Node.js, and MongoDB',
      'Designed and implemented scalable RESTful APIs with authentication and authorization',
      'Optimized MongoDB queries and indexing for performance improvement',
      'Integrated third-party services including payment gateways and real-time chat systems',
      'Participated in agile development, sprint planning, and code reviews'
    ]
  }
]

const skills = {
  'Frontend': ['React.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  'Backend': ['Node.js', 'Express.js', 'MongoDB', 'MySQL'],
  'Tools': ['Git', 'Jenkins', 'Jira', 'Postman'],
  'Concepts': ['REST APIs', 'JWT Auth', 'Real-time Systems', 'MVC Architecture']
}

const education = [
  { degree: 'Master of Computer Applications', institution: 'Dev Bhoomi Uttarakhand University', period: '2021 – 2023' },
  { degree: 'Bachelor of Computer Applications', institution: 'Kumaun University', period: '2017 – 2020' }
]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

function AnimatedSection({ id, children, className }) {
  const ref = useScroll()
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  )
}

function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const navItems = ['about', 'experience', 'projects', 'skills', 'education', 'contact']

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-container">
        <motion.a href="#" className="logo" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
          <span className="logo-text">J</span><span className="logo-accent">A</span>
        </motion.a>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, i) => (
            <motion.li key={item} variants={fadeInUp} custom={i}>
              <a 
                href={`#${item}`} 
                className={activeSection === item ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(item); }}
              >
                <span className="nav-number">0{i + 1}.</span> {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </motion.li>
          ))}
        </ul>

        <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </motion.nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const titleVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -45 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>
      
      <motion.div className="hero-content" style={{ y: y1, opacity }}>
        <motion.span 
          className="hero-label"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="label-line"></span>
          Hi, my name is
        </motion.span>
        
        <motion.h1 
          className="hero-name"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <motion.span key={i} className="name-word" variants={titleVariants}>
              {word}{' '}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.h2 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="title-accent">{personalInfo.title}</span>
        </motion.h2>
        
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          I build exceptional digital experiences with modern technologies. 
          Specialized in scalable web applications using MERN/MEAN stack.
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <a href="#projects" className="cta-primary">View My Work</a>
          <a href="#contact" className="cta-secondary">Get In Touch</a>
        </motion.div>

        <motion.div 
          className="hero-contact-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a href={`mailto:${personalInfo.email}`} whileHover={{ y: -3, scale: 1.02 }}>
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            {personalInfo.email}
          </motion.a>
          <motion.a href={`tel:${personalInfo.phone}`} whileHover={{ y: -3, scale: 1.02 }}>
            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            {personalInfo.phone}
          </motion.a>
          <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, scale: 1.02 }}>
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-hint"
        style={{ y: y2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          Scroll to explore
          <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </motion.span>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <AnimatedSection id="about" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">01.</span> About Me
            <span className="title-underline"></span>
          </h2>
        </motion.div>
        
        <div className="about-grid">
          <motion.div className="about-text" variants={staggerContainer}>
            <p>
              Hello! I'm <span className="highlight">Juvaid Ahmad</span>, a Full Stack Developer with 3+ years of experience building scalable web applications using the MERN/MEAN stack.
            </p>
            <p>
              I specialize in developing <span className="highlight">secure RESTful APIs</span>, responsive front-end interfaces, real-time systems, and optimized database architectures. My work spans across fintech, eCommerce, entertainment, and enterprise domains.
            </p>
            <p>
              Currently, I'm working at <span className="highlight">Smartdata Enterprises</span> as an Associate Software Engineer 2, where I continue to build innovative solutions.
            </p>
          </motion.div>
          
          <motion.div className="about-stats" variants={staggerContainer}>
            <div className="stat-card">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">5+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">MERN</span>
              <span className="stat-label">Primary Stack</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Experience() {
  return (
    <AnimatedSection id="experience" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">02.</span> Experience
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="timeline">
          {experience.map((exp, index) => (
            <motion.div 
              key={index} 
              className="timeline-item"
              variants={cardVariants}
              custom={index}
            >
              <div className="timeline-marker">
                <span className="marker-dot"></span>
                <span className="marker-line"></span>
              </div>
              <div className="timeline-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company} <span className="exp-location">• {exp.location}</span></p>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-points">
                  {exp.points.map((point, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Projects() {
  return (
    <AnimatedSection id="projects" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">03.</span> Projects
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="projects-masonry">
          {projects.map((project, index) => (
            <motion.article 
              key={index} 
              className="project-card"
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -12, transition: { duration: 0.4 } }}
            >
              <div className="project-icon">
                <svg viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-arrow">
                <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Skills() {
  return (
    <AnimatedSection id="skills" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">04.</span> Skills & Technologies
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="skills-showcase">
          {Object.entries(skills).map(([category, skillList], catIndex) => (
            <motion.div 
              key={category}
              className="skill-group"
              variants={cardVariants}
              custom={catIndex}
            >
              <h3 className="skill-category">
                <span className="category-icon">
                  {catIndex === 0 && '◈'}
                  {catIndex === 1 && '◇'}
                  {catIndex === 2 && '◆'}
                  {catIndex === 3 && '◉'}
                </span>
                {category}
              </h3>
              <div className="skill-tags">
                {skillList.map((skill, i) => (
                  <motion.span 
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Education() {
  return (
    <AnimatedSection id="education" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">05.</span> Education
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="education-grid">
          {education.map((edu, index) => (
            <motion.div 
              key={index}
              className="education-card"
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="edu-badge">
                <svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
              </div>
              <div className="edu-content">
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <span className="edu-period">{edu.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }) }, 3000)
  }

  return (
    <AnimatedSection id="contact" className="section">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">06.</span> Get In Touch
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="contact-wrapper">
          <motion.div className="contact-info" variants={staggerContainer}>
            <p className="contact-intro">
              I'm currently <span className="highlight-accent">looking for new opportunities</span>. 
              Whether you have a question or just want to connect, feel free to reach out!
            </p>
            <div className="contact-links">
              <motion.a href={`mailto:${personalInfo.email}`} variants={fadeInUp}>
                <span className="contact-icon"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></span>
                {personalInfo.email}
              </motion.a>
              <motion.a href={`tel:${personalInfo.phone}`} variants={fadeInUp}>
                <span className="contact-icon"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></span>
                {personalInfo.phone}
              </motion.a>
              <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" variants={fadeInUp}>
                <span className="contact-icon"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></span>
                LinkedIn Profile
              </motion.a>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            variants={staggerContainer}
          >
            <motion.div className="form-row" variants={fadeInUp}>
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Your Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </motion.div>
            <motion.textarea placeholder="Your Message" rows="5" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} variants={fadeInUp}></motion.textarea>
            <motion.button type="submit" className="submit-btn" variants={fadeInUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <span>Send Message</span>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </motion.button>
            <AnimatePresence>
              {submitted && (
                <motion.p className="success-msg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  ✓ Message sent successfully!
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Footer() {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="footer-content">
        <p>Designed & Built by <span className="footer-name">Juvaid Ahmad</span></p>
        <p className="copyright">© {new Date().getFullYear()} All Rights Reserved</p>
      </div>
    </motion.footer>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact']
      const scrollPos = window.scrollY + 150
      
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
