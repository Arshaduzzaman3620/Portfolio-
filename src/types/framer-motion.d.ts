declare module 'framer-motion' {
  import * as React from 'react'

  export interface MotionProps {
    initial?: any
    animate?: any
    exit?: any
    transition?: any
    whileHover?: any
    whileTap?: any
    whileInView?: any
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
    onSubmit?: (e: React.FormEvent) => void
    type?: string
    disabled?: boolean
    target?: string
    rel?: string
    href?: string
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLDivElement>>
    h2: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLHeadingElement>>
    form: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLFormElement>>
    button: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLButtonElement>>
    a: React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLAnchorElement>>
  }

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode
  }>
} 