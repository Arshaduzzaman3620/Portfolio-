import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: '💻',
    url: 'https://github.com/yourusername',
  },
  {
    name: 'LinkedIn',
    icon: '🔗',
    url: 'https://linkedin.com/in/yourusername',
  },
  {
    name: 'Twitter',
    icon: '🐦',
    url: 'https://twitter.com/yourusername',
  },
  {
    name: 'Email',
    icon: '📧',
    url: 'mailto:your.email@example.com',
  },
]

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="py-12 px-4 md:px-8 lg:px-16 relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="footer-content">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-electric-blue transition-colors"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="sr-only">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400">
            <p className="text-sm">
              © {new Date().getFullYear()} Arshad. All rights reserved.
            </p>
            <p className="text-xs mt-2">
              Built with ❤️ using React, TypeScript, and GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 