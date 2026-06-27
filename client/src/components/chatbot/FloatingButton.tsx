import { motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

interface FloatingButtonProps {
  isOpen: boolean
  toggle: () => void
}

export default function FloatingButton({ isOpen, toggle }: FloatingButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="bg-gold-400 text-green-950 rounded-full p-4 shadow-card flex items-center justify-center hover:bg-gold-600 transition-colors"
      aria-label="Toggle chat"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.div>
    </motion.button>
  )
}
