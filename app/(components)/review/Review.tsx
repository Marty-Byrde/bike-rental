'use client'

import React, { useState } from 'react';
import Image from 'next/image';
// Importiere die SVG-Dateien
import StarEmpty from '@/public/starWhite.svg';
import StarFull from '@/public/starWhiteFull.svg';
import SendButton from '@/public/sendButton.svg';

export default function Review() {
    const starCount = 5;
    const [selectedStar, setSelectedStar] = useState(null);
    const [hoveredStar, setHoveredStar] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const [comment, setComment] = useState('');


    const handleStarClick = (index) => {
        if (!isClicked) {
            setSelectedStar(index);
        }
    };
    const handleCommentChange = (event) => {
        if (!isClicked) {
            setComment(event.target.value);
        }
    };
    const handleSendButtonClick = () => {
        setIsClicked(true);
        console.log("Senden-Button geklickt mit Bewertung: ", selectedStar + 1);
    };
    //logik Stärne zählen und hovern
    const stars = Array.from({ length: starCount }, (_, index) => (
        <div
            key={index}
            onMouseEnter={() => setHoveredStar(index)}
            onMouseLeave={() => setHoveredStar(null)}
            onClick={() => handleStarClick(index)}
            className="cursor-pointer"
        >
            <Image
                width={256}
                height={256}
                src={(hoveredStar !== null && hoveredStar >= index) || (selectedStar !== null && selectedStar >= index) ? StarFull : StarEmpty}
                alt="Stern"
                className="w-6 h-6"
            />
        </div>
    ));

    return (
        <div className="max-w-md mx-auto bg-neutral-800 shadow-xl shadow-red-200 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-4">
                {/* Profilbild */}
                <img className="w-16 h-16 rounded-full" src="https://via.placeholder.com/64x64" alt="Profilbild von Esther Howard" />

                {/* Name, Sterne und Bewertung */}
                <div className="flex flex-col flex-grow ml-4">
                    <span className="text-white font-normal text-base mb-2">Max Mustermann</span>
                    <div className="flex items-center">
                        {/* Sterne */}
                        <div className="flex gap-1">
                            {stars}
                        </div>
                        {/* Ausgewählte Sterne-Anzahl */}
                        {selectedStar !== null && (
                            <span className="text-white font-normal text-base ml-10">{selectedStar + 1}</span>

                        )}
                    </div>
                </div>

                {/* Senden */}
                <button
                    onClick={handleSendButtonClick}
                    disabled={selectedStar === null || isClicked}
                    className={`focus:outline-none p-2 rounded-full ${selectedStar === null || isClicked ? 'opacity-50 cursor-not-allowed' : 'hover:border hover:border-white'}`}
                >
                    <Image
                        src={SendButton}
                        alt="Senden"
                        width={40}
                        height={40}
                    />
                </button>
            </div>

            {/* Kommentarbereich */}
            <div className="bg-white p-4 border-t border-black text-black">
                <textarea
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Schreibe einen Kommentar..."
                    rows="4"
                    disabled={isClicked}
                ></textarea>
            </div>
        </div>
    );
}
