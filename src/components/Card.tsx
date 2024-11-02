"use client"

import { motion } from "framer-motion"
import { Beer, Users, BarChart } from "lucide-react"
import { useState } from "react"

interface CardProps {
    card: string
    isRevealed: boolean
}

export function Card({ card, isRevealed }: CardProps) {
    if (!isRevealed) {
        return (
            <div className="w-[300px] h-[420px]">
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-xl flex items-center justify-center p-8">
                    <Beer className="w-20 h-20 text-white/90" />
                </div>
            </div>
        )
    }

    const randomBGColor = () => {
        const colors = [
            "bg-gradient-to-br from-red-500 to-pink-500",
            "bg-gradient-to-br from-yellow-500 to-amber-500",
            "bg-gradient-to-br from-green-500 to-emerald-500",
            "bg-gradient-to-br from-blue-500 to-cyan-500",
            "bg-gradient-to-br from-indigo-500 to-purple-500",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }
    const [r] = useState(randomBGColor())

    return (
        <div className="w-[300px] h-[420px]">
            <div
                className={`w-full h-full ${r} rounded-xl shadow-xl p-6 flex flex-col overflow-auto`}
            >
                <p className="text-white/90 text-lg flex-grow">{card}</p>

                <div className="text-white/75 text-sm mt-4 text-center">
                    Toca para continuar
                </div>
            </div>
        </div>
    )
}
