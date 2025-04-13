import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    title: 'Project Nebula',
    description: 'A real-time data visualization platform with interactive 3D graphs and AI-powered analytics.',
    tags: ['React', 'Three.js', 'TensorFlow.js', 'WebGL'],
    image: '/images/projects/project1.jpg',
    link: '#',
  },
  {
    title: 'EcoTrack',
    description: 'Smart IoT dashboard for monitoring and optimizing energy consumption in real-time.',
    tags: ['Next.js', 'IoT', 'WebSockets', 'Chart.js'],
    image: '/images/projects/project2.jpg',
    link: '#',
  },
  {
    title: 'CryptoVault',
    description: 'Secure cryptocurrency wallet with biometric authentication and real-time market analysis.',
    tags: ['React Native', 'Blockchain', 'Biometrics', 'API'],
    image: '/images/projects/project3.jpg',
    link: '#',
  },
]

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: projectsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, projectsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-12 px-4 md:px-8 lg:px-16 relative z-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-8 text-white"
      >
        Featured <span className="text-electric-blue">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el
            }}
            className="project-card group"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-xl glassmorphism p-4 h-full">
              {/* Project Image */}
              <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-electric-blue/20 rounded-lg mb-4 overflow-hidden relative">
                <div 
                  className="project-image w-full h-full bg-gray-800/50 backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-105" 
                  style={{ 
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.link}
                    className="text-white bg-electric-blue/80 hover:bg-electric-blue px-4 py-2 rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.a>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-electric-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 text-xs bg-neon-purple/20 text-neon-purple rounded-full hover:scale-105 hover:bg-neon-purple/30 transition-all duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 border border-electric-blue/0 group-hover:border-electric-blue/50 rounded-xl transition-colors duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/0 to-neon-purple/0 group-hover:from-electric-blue/10 group-hover:to-neon-purple/10 rounded-xl transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects 