"use client"

import { motion } from "motion/react"
import { useState } from "react"

export default function LayoutAnimation() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => setIsOn(!isOn)

    return (
        <button
            className="toggle-container"
            style={{
                width: 100,
                height: 50,
                backgroundColor: "rgba(80, 153, 225, 0.2)",
                borderRadius: 50,
                cursor: "pointer",
                display: "flex",
                padding: 10,
                justifyContent: "flex-end",
            }}
            onClick={toggleSwitch}
        >
            <div
                className="toggle-handle"
                style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "rgb(66, 153, 225)",
                    borderRadius: "50%",
                }}
            />
        </button>
    )
}