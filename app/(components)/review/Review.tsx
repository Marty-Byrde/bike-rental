'use client'

import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
// Importiere die SVG-Dateien
import StarEmpty from '@/public/starWhite.svg'
import StarFull from '@/public/starWhiteFull.svg'
import SendButton from '@/public/sendButton.svg'
import { useSession } from 'next-auth/react'

export default function Review() {
  const { data } = useSession()

  const starCount = 5
  const [selectedStar, setSelectedStar] = useState<number>(-1)
  const [hoveredStar, setHoveredStar] = useState<number>(-1)
  const [isClicked, setIsClicked] = useState(false)
  const [comment, setComment] = useState('')

  const handleStarClick = (index: number) => {
    if (!isClicked) {
      setSelectedStar(index)
    }
  }
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isClicked) {
      setComment(event.target.value)
    }
  }
  const handleSendButtonClick = () => {
    setIsClicked(true)
  }
  //logik Stärne zählen und hovern
  const stars = Array.from({ length: starCount }, (_, index) => (
    <div key={index} onMouseEnter={() => setHoveredStar(index)} onMouseLeave={() => setHoveredStar(-1)} onClick={() => handleStarClick(index)} className='cursor-pointer'>
      <Image width={256} height={256} src={(hoveredStar !== null && hoveredStar >= index) || (selectedStar !== null && selectedStar >= index) ? StarFull : StarEmpty} alt='Stern' className='h-6 w-6' />
    </div>
  ))

  return (
    <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-neutral-800 shadow-md ring-1 ring-gray-300 dark:bg-neutral-800 dark:shadow-neutral-600 dark:ring-gray-600'>
      <div className='flex items-center justify-between p-4'>
        {/* Profilbild */}
        <Image className='h-16 w-16 rounded-full' width={256} height={256} src={data?.user?.image ?? StarEmpty} alt='Profilbild von Esther Howard' />

        {/* Name, Sterne und Bewertung */}
        <div className='ml-4 flex flex-grow flex-col'>
          <span className='mb-2 text-base font-normal text-white'>{data?.user?.name ?? 'Max Mustermann'}</span>
          <div className='flex items-center'>
            {/* Sterne */}
            <div className='flex gap-1'>{stars}</div>
            {/* Ausgewählte Sterne-Anzahl */}
            {selectedStar !== null && <span className='ml-10 text-base font-normal text-white dark:text-gray-100'>{selectedStar + 1}</span>}
          </div>
        </div>

        {/* Senden */}
        <button
          onClick={handleSendButtonClick}
          disabled={selectedStar === null || isClicked}
          className={`rounded-full p-2 focus:outline-none ${selectedStar === null || isClicked ? 'cursor-not-allowed opacity-50' : 'hover:border hover:border-white'}`}>
          <Image src={SendButton} alt='Senden' width={40} height={40} />
        </button>
      </div>

      {/* Kommentarbereich */}
      <div className='border-t border-black bg-white p-4 text-black dark:bg-neutral-700'>
        <textarea
          className='w-full rounded-md border border-gray-300 bg-transparent p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-400 dark:text-gray-200 dark:placeholder-gray-400'
          placeholder='Schreibe einen Kommentar...'
          rows={4}
          disabled={isClicked}></textarea>
      </div>
    </div>
  )
}
