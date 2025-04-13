import { useState } from 'react'
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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const contactRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

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

    // Form elements animation
    if (formRef.current) {
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form
    setFormData({ name: '', email: '', message: '' })

    // Reset success message after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false)
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section
      ref={contactRef}
      id="contact"
      className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden bg-[#0f172a]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={blobRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl opacity-30"
        />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-2xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-2xl opacity-20 animate-pulse" />
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Glowing Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-poppins font-bold text-center mb-6 text-white text-glow"
        >
          Get in <span className="text-cyan-500">Touch</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 text-center mb-12 font-medium italic"
        >
          Let's build something together.
        </motion.p>

        {/* Contact Form */}
        <motion.form
          ref={formRef}
          className="max-w-[600px] mx-auto space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <div className="relative group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </div>

          {/* Message Input */}
          <div className="relative group">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your message"
              className="w-full px-6 py-4 bg-transparent border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              required
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="relative w-full px-8 py-4 bg-transparent text-cyan-500 rounded-full font-medium group overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            {/* Glowing Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
            
            {/* Button Content */}
            <div className="relative flex items-center justify-center gap-2">
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </motion.button>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-green-400"
            >
              Message sent successfully!
            </motion.div>
          )}
        </motion.form>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-orbitron font-bold text-white mb-6">
            Connect with me
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span className="text-2xl">{link.icon}</span>
                <span className="text-white">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 