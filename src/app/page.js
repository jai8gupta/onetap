"use client"
import Image from 'next/image'
import Game from './Game.js'
export default function Home() {
  return (
    <div className="h-screen w-screen overflow-x-hidden overflow-y-hidden sticky bg-white">
      <Game gravitySpeed={0.2} fps={5} />
    </div>
  )
}
