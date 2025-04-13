import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const skills = [
  {
    name: 'JavaScript',
    level: 95,
    icon: '⚡',
    color: '#F7DF1E',
  },
  {
    name: 'React',
    level: 90,
    icon: '⚛️',
    color: '#61DAFB',
  },
  {
    name: 'Vue.js',
    level: 85,
    icon: '🟢',
    color: '#4FC08D',
  },
  {
    name: 'GSAP',
    level: 90,
    icon: '🎬',
    color: '#88CE02',
  },
  {
    name: 'CSS/SCSS',
    level: 95,
    icon: '🎨',
    color: '#264DE4',
  },
  {
    name: 'TypeScript',
    level: 85,
    icon: '📘',
    color: '#3178C6',
  },
]

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null)
  const progressBarsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Progress bars animation
      progressBarsRef.current.forEach((bar, index) => {
        if (!bar) return

        const skill = skills[index]
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${skill.level}%`,
            scrollTrigger: {
              trigger: bar,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse',
            },
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        )
      })

      // Skills cards animation
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={skillsRef}
      id="skills"
      className="py-20 px-4 md:px-8 lg:px-16 relative z-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-16 text-white"
      >
        My <span className="text-electric-blue">Skills</span>
      </motion.h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-card glassmorphism p-6 rounded-xl"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{skill.icon}</span>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {skill.name}
                </h3>
              </div>
              <span className="text-electric-blue font-bold">{skill.level}%</span>
            </div>

            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                ref={(el) => {
                  if (el) progressBarsRef.current[index] = el
                }}
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills 