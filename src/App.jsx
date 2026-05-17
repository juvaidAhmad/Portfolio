import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import './App.css'

const personalInfo = {
  name: 'Juvaid Ahmad',
  title: 'Full Stack Developer',
  titlesForTypewriter: ['Full Stack Developer', 'MERN/MEAN Engineer', 'Problem Solver', 'Tech Enthusiast'],
  email: 'juvaidahmad4@gmail.com',
  phone: '+91-7906370605',
  location: 'India',
  linkedin: 'https://linkedin.com/in/juvaid-ahmad-927a18215',
  github: 'https://github.com/juvaidahmad',
  resume: '#'
}

const projects = [
  {
    title: 'SoulPath – AI-Powered Wellness App',
    description: 'AI-powered mobile wellness application with mood tracking, journaling, AI-based insights, and the Auric Feel image analysis feature.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'AI'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
    links: { github: '#', live: '#' }
  },
  {
    title: 'Truniform NFC Tag Platform',
    description: 'NFC-based uniform authentication and social matching platform with location-based matching and real-time chat.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Socket.io'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
    links: { github: '#', live: '#' }
  },
  {
    title: 'Tip App – Digital Tipping',
    description: 'Secure cashless tipping system with payment gateway integration and transaction validation.',
    tech: ['Angular', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
    links: { github: '#', live: '#' }
  },
  {
    title: 'Music Competition Platform',
    description: 'Music battle and voting system with leaderboard, challenge features, and real-time chat.',
    tech: ['React.js', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#43e97b',
    links: { github: '#', live: '#' }
  },
  {
    title: 'Drivo – Car Config & Booking',
    description: 'Dynamic car customization module with booking and order management system.',
    tech: ['Angular', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
    links: { github: '#', live: '#' }
  },
  {
    title: 'Product Management System',
    description: 'E-commerce platform with authentication, cart, order processing, and product CRUD.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    color: '#a18cd1',
    links: { github: '#', live: '#' }
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

const categoryColors = {
  Frontend: { bg: 'rgba(59, 130, 246, 0.12)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.25)' },
  Backend: { bg: 'rgba(16, 185, 129, 0.12)', text: '#34d399', border: 'rgba(16, 185, 129, 0.25)' },
  Tools: { bg: 'rgba(251, 146, 60, 0.12)', text: '#fb923c', border: 'rgba(251, 146, 60, 0.25)' },
  Concepts: { bg: 'rgba(168, 85, 247, 0.12)', text: '#c084fc', border: 'rgba(168, 85, 247, 0.25)' }
}

const skills = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'HTML5/CSS3', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'Git', category: 'Tools' },
  { name: 'Jenkins', category: 'Tools' },
  { name: 'Jira', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'JWT Auth', category: 'Concepts' },
  { name: 'Real-time Systems', category: 'Concepts' },
  { name: 'AI Integration', category: 'Concepts' },
  { name: 'MVC Architecture', category: 'Concepts' }
]

const techIcons = {
  'React.js': '⚛️', 'Angular': '🅰️', 'JavaScript': '🟨', 'TypeScript': '🔷',
  'HTML5/CSS3': '🌐', 'Node.js': '🟢', 'Express.js': '⚡', 'MongoDB': '🍃',
  'MySQL': '🗄️', 'REST APIs': '🔗', 'Git': '📦', 'Jenkins': '🔧',
  'Jira': '📋', 'Postman': '📮', 'JWT Auth': '🔐', 'Real-time Systems': '⚡',
  'AI Integration': '🤖', 'MVC Architecture': '🏗️', 'Socket.io': '🔌',
  'AI': '🧠'
}

const education = [
  { degree: 'Master of Computer Applications', institution: 'Dev Bhoomi Uttarakhand University', period: '2021 – 2023' },
  { degree: 'Bachelor of Computer Applications', institution: 'Kumaun University', period: '2017 – 2020' }
]

const achievements = [
  { icon: '🏆', title: 'Top Performer', subtitle: 'Smartdata Enterprises 2024' },
  { icon: '🚀', title: '6+ Projects Delivered', subtitle: 'End-to-end development' },
  { icon: '⚡', title: 'Performance Optimization', subtitle: 'MongoDB query tuning' },
  { icon: '🤝', title: 'Team Leadership', subtitle: 'Agile sprint mentorship' }
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

function useMousePosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])
  return pos
}

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(60, Math.floor(window.innerWidth * 0.03))
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 212, 170, 0.3)'
        ctx.fill()

        for (const other of particles) {
          const dx = p.x - other.x
          const dy = p.y - other.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

function AmbientGlow() {
  const pos = useMousePosition()

  return (
    <div
      className="ambient-glow"
      style={{
        background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(0, 212, 170, 0.06), transparent 40%)`
      }}
    />
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function CursorFollower() {
  const pos = useMousePosition()

  return (
    <motion.div
      className="cursor-follower"
      animate={{ x: pos.x - 150, y: pos.y - 150 }}
      transition={{ type: 'spring', stiffness: 50, damping: 30, mass: 0.5 }}
    />
  )
}

function TypewriterText({ texts, className }) {
  const [display, setDisplay] = useState('')
  const idxRef = useRef(0)
  const charRef = useRef(0)
  const delRef = useRef(false)

  useEffect(() => {
    const tick = () => {
      const currentText = texts[idxRef.current]
      if (!delRef.current && charRef.current < currentText.length) {
        charRef.current += 1
        setDisplay(currentText.slice(0, charRef.current))
      } else if (!delRef.current && charRef.current >= currentText.length) {
        delRef.current = true
      } else if (delRef.current && charRef.current > 0) {
        charRef.current -= 1
        setDisplay(currentText.slice(0, charRef.current))
      } else if (delRef.current && charRef.current <= 0) {
        delRef.current = false
        idxRef.current = (idxRef.current + 1) % texts.length
      }
    }

    const interval = setInterval(tick, delRef.current ? 40 : 80)
    return () => clearInterval(interval)
  }, [texts])

  return (
    <span className={className}>
      {display}
      <span className="typewriter-cursor">|</span>
    </span>
  )
}

function Counter({ from, to, suffix, duration = 2 }) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start
    const step = (ts) => {
      if (!start) start = ts
      const elapsed = (ts - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(from + (to - from) * eased))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, from, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }, [])

  const handleLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 1000 }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

function SkillTag({ name, category, index }) {
  const colors = categoryColors[category] || categoryColors.Frontend

  return (
    <motion.span
      className="skill-tag"
      style={{
        background: colors.bg,
        color: colors.text,
        borderColor: colors.border
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.08, y: -4, boxShadow: `0 4px 20px ${colors.bg}` }}
    >
      {techIcons[name] && <span className="skill-icon">{techIcons[name]}</span>}
      {name}
    </motion.span>
  )
}

function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen, activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const navItems = ['about', 'experience', 'projects', 'skills', 'education', 'contact']

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-container">
          <motion.a href="#" className="logo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="logo-bracket">&lt;</span>
            <span className="logo-accent">JA</span>
            <span className="logo-bracket"> /&gt;</span>
          </motion.a>

          <ul className="nav-links-desktop">
            {navItems.map((item, i) => (
              <motion.li key={item} variants={fadeInUp} custom={i}>
                <a
                  href={`#${item}`}
                  className={activeSection === item ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo(item) }}
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <div className="mobile-menu-content">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    className={`mobile-link ${activeSection === item ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(item) }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="nav-number">0{i + 1}.</span> {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <motion.a href={`mailto:${personalInfo.email}`} whileHover={{ y: -3, color: '#00d4aa' }} className="social-link">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
      </motion.a>
      <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3, color: '#00d4aa' }} className="social-link">
        <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
      </motion.a>
      <motion.a href={`tel:${personalInfo.phone}`} whileHover={{ y: -3, color: '#00d4aa' }} className="social-link">
        <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
      </motion.a>
      <div className="social-sidebar-line" />
    </div>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="hero" className="hero">
      <ParticleBackground />
      <div className="hero-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <motion.div className="hero-content" style={{ y: y1, opacity }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="hero-badge-dot" />
          Open to opportunities
        </motion.div>

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
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="name-word"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <TypewriterText texts={personalInfo.titlesForTypewriter} className="title-accent" />
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          I build exceptional digital experiences with modern technologies.
          Specialized in scalable web applications using MERN/MEAN stack.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <a href="#projects" className="cta-primary">
            <span>View My Work</span>
            <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
          </a>
          <a href="#contact" className="cta-secondary">
            <span>Get In Touch</span>
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
          </a>
        </motion.div>

        <motion.div
          className="hero-contact-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.a href={`mailto:${personalInfo.email}`} whileHover={{ y: -3 }}>
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            {personalInfo.email}
          </motion.a>
          <motion.a href={`tel:${personalInfo.phone}`} whileHover={{ y: -3 }}>
            <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            {personalInfo.phone}
          </motion.a>
          <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }}>
            <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          Scroll to explore
          <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" /></svg>
        </motion.span>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <AnimatedSection id="about" className="section">
      <div className="section-divider top">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="var(--bg-secondary)" /></svg>
      </div>
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

            <motion.div className="about-cta" variants={fadeInUp}>
              <a href={personalInfo.resume} className="resume-link">
                <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" /></svg>
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="about-stats" variants={staggerContainer}>
            <div className="stat-card">
              <span className="stat-number"><Counter from={0} to={3} suffix="+" /></span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-card">
              <span className="stat-number"><Counter from={0} to={6} suffix="+" /></span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">MERN</span>
              <span className="stat-label">Primary Stack</span>
            </div>
            <div className="stat-card">
              <span className="stat-number"><Counter from={0} to={18} suffix="+" /></span>
              <span className="stat-label">Skills Mastered</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function Experience() {
  return (
    <AnimatedSection id="experience" className="section section-alt">
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
                <span className="marker-dot">
                  <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </span>
                <span className="marker-line"></span>
              </div>
              <TiltCard className="timeline-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">
                      {exp.company}
                      <span className="exp-location"> • {exp.location}</span>
                    </p>
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
              </TiltCard>
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
      <div className="section-divider bottom">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,50 C360,0 1080,100 1440,50 L1440,100 L0,100 Z" fill="var(--bg-secondary)" /></svg>
      </div>
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">03.</span> Projects
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <TiltCard key={index} className="project-card">
              <div className="project-top-bar" style={{ background: project.gradient }} />
              <div className="project-card-inner">
                <div className="project-icon-wrap" style={{ background: `${project.color}20` }}>
                  <svg viewBox="0 0 24 24" style={{ color: project.color }}><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" /></svg>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="tech-pill">
                      {techIcons[tech] && <span className="tech-icon">{techIcons[tech]}</span>}
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function Skills() {
  return (
    <AnimatedSection id="skills" className="section section-alt">
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">04.</span> Skills & Technologies
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="skills-container">
          {['Frontend', 'Backend', 'Tools', 'Concepts'].map((category) => (
            <motion.div key={category} className="skill-category-group" variants={cardVariants}>
              <h3 className="skill-category-title">
                <span className="category-badge" style={{
                  background: `${categoryColors[category].bg}`,
                  color: categoryColors[category].text,
                  borderColor: categoryColors[category].border
                }}>
                  {category}
                </span>
              </h3>
              <div className="skill-tags">
                {skills.filter(s => s.category === category).map((skill, i) => (
                  <SkillTag key={skill.name} name={skill.name} category={skill.category} index={i} />
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
      <div className="section-divider top">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M0,50 C360,100 1080,0 1440,50 L1440,100 L0,100 Z" fill="var(--bg-secondary)" /></svg>
      </div>
      <div className="container">
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">
            <span className="section-number">05.</span> Education
            <span className="title-underline"></span>
          </h2>
        </motion.div>

        <div className="education-grid">
          {education.map((edu, index) => (
            <TiltCard key={index} className="education-card">
              <div className="edu-badge">
                <svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>
              </div>
              <div className="edu-content">
                <h3 className="edu-degree">{edu.degree}</h3>
                <p className="edu-institution">{edu.institution}</p>
                <span className="edu-period">{edu.period}</span>
              </div>
            </TiltCard>
          ))}
        </div>

        <motion.div className="achievements-section" variants={fadeInUp}>
          <h3 className="achievements-title">
            <span className="section-number">✦</span> Highlights
          </h3>
          <div className="achievements-grid">
            {achievements.map((ach, i) => (
              <motion.div
                key={i}
                className="achievement-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                <span className="achievement-icon">{ach.icon}</span>
                <div>
                  <strong>{ach.title}</strong>
                  <p>{ach.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

function Contact() {
  return (
    <AnimatedSection id="contact" className="section section-alt">
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
              <motion.a href={`mailto:${personalInfo.email}`} variants={fadeInUp} whileHover={{ x: 6 }}>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                </span>
                <span className="contact-text">
                  <small>Email</small>
                  {personalInfo.email}
                </span>
              </motion.a>
              <motion.a href={`tel:${personalInfo.phone}`} variants={fadeInUp} whileHover={{ x: 6 }}>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                </span>
                <span className="contact-text">
                  <small>Phone</small>
                  {personalInfo.phone}
                </span>
              </motion.a>
              <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" variants={fadeInUp} whileHover={{ x: 6 }}>
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                </span>
                <span className="contact-text">
                  <small>LinkedIn</small>
                  Connect with me
                </span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="contact-illustration" variants={fadeInUp}>
            <div className="contact-card-prompt">
              <div className="prompt-dots">
                <span /><span /><span />
              </div>
              <div className="prompt-line">
                <span className="prompt-dollar">$</span> Say hello!
              </div>
              <div className="prompt-response">
                <span className="prompt-arrow">→</span> juvaidahmad4@gmail.com
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handle = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
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
        <div className="footer-social">
          <a href={`mailto:${personalInfo.email}`}><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg></a>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
        </div>
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
      <AmbientGlow />
      <ScrollProgress />
      <CursorFollower />
      <Navbar scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} activeSection={activeSection} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <BackToTop />
      <SocialSidebar />
      <Footer />
    </div>
  )
}

export default App
