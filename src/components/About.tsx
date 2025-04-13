import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate the morphing blob
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        scale: 1.2,
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    }

    // Text reveal animation
    if (textRef.current) {
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })
    }

    // Image reveal animation
    if (imageRef.current) {
      gsap.from(imageRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })
    }
  }, [])

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative overflow-hidden py-20 bg-[#0f172a]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Blob */}
        <div
          ref={blobRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-30"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-500/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Profile Picture */}
          <motion.div
            ref={imageRef}
            className="relative group flex-shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{
              y: [0, -10, 0],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
                repeat: 0
              }
            }}
          >
            {/* Glowing Border */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/50 to-blue-500/50 blur-xl group-hover:blur-2xl transition-all duration-300"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
                  "linear-gradient(225deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
                  "linear-gradient(315deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
                  "linear-gradient(45deg, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.5))",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Profile Picture Container */}
            <motion.div
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500/50 group-hover:border-cyan-500 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
              whileHover={{
                scale: 1.05,
                rotate: 5,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="Arshad"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* About Text Content */}
          <motion.div
            ref={textRef}
            className="flex-1 text-left space-y-8 text-[#e2e8f0]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold uppercase tracking-wider group"
              whileHover={{
                textShadow: "2px 2px 10px rgba(0, 255, 255, 0.7)",
                transition: { duration: 0.3 }
              }}
            >
              About <span className="text-cyan-500">Me</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg leading-relaxed"
            >
              Hi, I'm <span className="text-cyan-500 font-semibold">Arshad</span>, a{' '}
              <span className="relative inline-block group">
                <span className="text-cyan-500">Backend Developer</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>{' '}
              based in Tokyo, Japan. I specialize in building robust, scalable server-side applications that power modern web experiences.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg leading-relaxed"
            >
              My expertise lies in{' '}
              <span className="relative inline-block group">
                <span className="text-cyan-500">Django</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
              ,{' '}
              <span className="relative inline-block group">
                <span className="text-cyan-500">API development</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
              , and{' '}
              <span className="relative inline-block group">
                <span className="text-cyan-500">SQL</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>{' '}
              database design. I'm passionate about creating efficient backend systems that ensure performance, security, and maintainability.
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex gap-8 mt-8"
            >
              {/* GitHub Icon */}
              <motion.a
                href="https://github.com/Arshaduzzaman3620"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  y: -5
                }}
                style={{
                  background: 'rgba(24, 23, 23, 0.2)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/30 to-gray-900/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-900/10"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(24, 23, 23, 0.2), rgba(24, 23, 23, 0.1))",
                      "linear-gradient(135deg, rgba(24, 23, 23, 0.2), rgba(24, 23, 23, 0.1))",
                      "linear-gradient(225deg, rgba(24, 23, 23, 0.2), rgba(24, 23, 23, 0.1))",
                      "linear-gradient(315deg, rgba(24, 23, 23, 0.2), rgba(24, 23, 23, 0.1))",
                      "linear-gradient(45deg, rgba(24, 23, 23, 0.2), rgba(24, 23, 23, 0.1))",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <svg
                  className="w-8 h-8 relative z-10 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>

              {/* LinkedIn Icon */}
              <motion.a
                href="https://www.linkedin.com/in/arshaduzzaman-sm/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-full transition-all duration-300"
                whileHover={{ 
                  scale: 1.1,
                  rotate: -5,
                  y: -5
                }}
                style={{
                  background: 'rgba(0, 119, 181, 0.2)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(0, 119, 181, 0.2)'
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-500/10"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.1))",
                      "linear-gradient(135deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.1))",
                      "linear-gradient(225deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.1))",
                      "linear-gradient(315deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.1))",
                      "linear-gradient(45deg, rgba(0, 119, 181, 0.2), rgba(0, 119, 181, 0.1))",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <svg
                  className="w-8 h-8 relative z-10 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 