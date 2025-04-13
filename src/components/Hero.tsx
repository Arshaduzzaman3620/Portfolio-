import { useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Background parallax effect
    const parallax = gsap.to(heroRef.current, {
      backgroundPosition: '50% 100%',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Floating elements animation
    floatingElementsRef.current.forEach((element, index) => {
      if (!element) return
      gsap.to(element, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2,
      })
    })

    return () => {
      parallax.kill()
    }
  }, [])

  // Text animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants: Variants = {
    hidden: { 
      y: 50,
      opacity: 0,
      filter: 'blur(10px)',
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  }

  const subtitleVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        delay: 1.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  }

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-sm" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              if (el) floatingElementsRef.current[index] = el
            }}
            className="absolute w-4 h-4 rounded-full bg-cyan-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Animated Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="overflow-hidden">
            <div className="text-6xl md:text-8xl font-bold tracking-tight">
              {["Hi,", "I'm", "Arshad."].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mx-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-gradient-x"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <motion.p 
            className="text-4xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1.2,
              delay: 1.5,
              ease: [0.2, 0.65, 0.3, 0.9]
            }}
          >
            Welcome to my portfolio
          </motion.p>
          <motion.div 
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
          >
            <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-full opacity-70"></div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <svg
            className="w-6 h-6 text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero 