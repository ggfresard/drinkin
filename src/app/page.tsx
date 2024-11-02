"use client"
import React, { useState, useCallback } from "react"
import useSound from "use-sound"
import { motion, AnimatePresence } from "framer-motion"
import { Beer } from "lucide-react"
import { Card } from "@/components/Card"

const cards = [""]

function App() {
    const [currentCard, setCurrentCard] = useState(cards[0])
    const [isFirstCard, setIsFirstCard] = useState(true)
    const [isGeneratingCard, setIsGeneratingCard] = useState(false)
    // const [playCardFlip] = useSound(
    //     "https://assets.coderrocketfuel.com/zaps/sound-effects/flip-card.mp3"
    // )

    const drawCard = useCallback(async () => {
        // playCardFlip()
        setIsGeneratingCard(true)
        isFirstCard && setIsFirstCard(false)

        const newCard = await fetch("/api/generate-card")
            .then((res) => res.json())
            .then((data) => data.card)
            .catch(() => null)
        if (newCard) {
            setCurrentCard(newCard)
        }
        setIsGeneratingCard(false)
    }, [currentCard, isFirstCard])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-8 text-center"
            >
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                    <Beer className="w-8 h-8" />
                    Chupilca reloaded
                </h1>
                <p className="text-purple-200">
                    {isFirstCard
                        ? "¡Bienvenido! Toca la carta para comenzar."
                        : "Toca la carta para continuar."}
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentCard}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={drawCard}
                    className="cursor-pointer"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <Card
                        card={currentCard}
                        isRevealed={!isGeneratingCard || !isFirstCard}
                    />
                </motion.div>
            </AnimatePresence>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-8 text-purple-200 text-sm"
            >
                Juego de beber creado por Le Gab
            </motion.div>
        </div>
    )
}

export default App
