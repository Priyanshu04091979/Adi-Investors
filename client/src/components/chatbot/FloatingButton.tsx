import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface FloatingButtonProps {
  isOpen: boolean
  toggle: () => void
}

export default function FloatingButton({ isOpen, toggle }: FloatingButtonProps) {
  return (
    <div className="relative">
      {/* Pulsing Outer Ring (Only when closed) */}
      {!isOpen && (
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-gold-400/40 z-0 pointer-events-none"
        />
      )}

      {/* Main Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={!isOpen ? {
          y: [0, -6, 0]
        } : { y: 0 }}
        transition={!isOpen ? {
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        } : {}}
        onClick={toggle}
        className="relative z-10 bg-gold-400 text-green-950 rounded-full p-4 shadow-[0_8px_30px_rgba(202,138,4,0.3)] flex items-center justify-center hover:bg-gold-500 transition-colors"
        aria-label="Toggle chat"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.85 : 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 15 }}
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </motion.div>
      </motion.button>
    </div>
  )
}
