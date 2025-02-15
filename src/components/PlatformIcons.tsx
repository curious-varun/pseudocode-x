import Image from "next/image"
import { motion } from "framer-motion"

const platforms = [
  { name: "LeetCode", icon: "/leetcode-icon.png" },
  { name: "HackerRank", icon: "/hackerrank-icon.png" },
  { name: "CodeForces", icon: "/codeforces-icon.png" },
  { name: "CodeChef", icon: "/codechef-icon.png" },
]

export default function PlatformIcons() {
  return (
    <div className="flex justify-center space-x-8">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Image
            src={platform.icon || "/placeholder.svg"}
            alt={platform.name}
            width={64}
            height={64}
            className="rounded-full bg-gray-700 p-2"
          />
          <p className="text-sm mt-2">{platform.name}</p>
        </motion.div>
      ))}
    </div>
  )
}


