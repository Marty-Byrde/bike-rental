'use client'
import React, {useContext, useEffect, useState} from 'react';
import {TicketsContext} from "@/app/(components)/ticketContext/TicketsContex";


export default function Ticket({data, index}) {
    const {tickets} = useContext(TicketsContext); // oder was auch immer Ihr Kontext bereitstellt
    const lastTicket = tickets[tickets.length - 1]; // Beispiel, um das letzte Ticket zu bekommen
    const {moveTicketToHistory, returnTicket} = useContext(TicketsContext);
    const [finalizedPrice, setFinalizedPrice] = useState(data.price);
    const [isPriceFinalized, setIsPriceFinalized] = useState(false);
    const qrCodeData = `Ticket-ID: ${data.id}`;

    useEffect(() => {
        let interval = setInterval(null);
        if (!isPriceFinalized) {
            interval = setInterval(() => {
                const now = new Date();
                const rentalStart = new Date(data.date + ' ' + data.time);
                let minutesPassed = Math.floor((now - rentalStart) / 60000);
                minutesPassed = Math.max(minutesPassed, 0); // Verhindert negative Werte
                const newPrice = (parseFloat(data.price) + 0.10 * minutesPassed).toFixed(2);
                setFinalizedPrice(newPrice);
            }, 60000); // Aktualisiert den Preis jede Minute

            return () => clearInterval(interval);
        } else {
            //  clearInterval(interval);
        }
    }, [isPriceFinalized, data]);

    const handleQRCodeClick = () => {
        // Logik für das Klicken auf den QR-Code
        moveTicketToHistory(index);
        setIsPriceFinalized(true);
        console.log("QR-Code geklickt!");
    };

    const handleReturnClick = () => {
        returnTicket(index);
    };

    // Überprüfen, ob das Ticket ein zukünftiges Ticket ist
    const isFutureTicket = () => {
        const rentalStartTime = new Date(data.date + ' ' + data.time);
        const currentTime = new Date();
        return currentTime < rentalStartTime;
    };

    return (
        <main className="flex flex-col h-full">
            <section className="w-full flex-grow bg-blue flex items-center justify-center p-4">
                <div className="flex w-full max-w-3xl text-zinc-900 h-64">
                    <div className="h-full py-8 px-10 bg-white flex-grow rounded-l-3xl flex flex-col justify-between">
                        {/* Hier der obere Abschnitt (Station, Endstation, etc.) */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Station: {data?.station}</h3>
                            {/* Pfeilsymbol */}
                            <svg className="h-6 w-6 text-zinc-900 mx-2" fill="none" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 12h16m0 0l-4-4m4 4l-4 4"></path>
                            </svg>
                            <h3 className="text-lg font-semibold">Endstation</h3>
                        </div>
                        {/* Mittlerer Abschnitt für Kinder-Tickets */}
                        <div className="grid grid-rows-3 h-full mt-4">
                            {data?.isChildTicket && (
                                <h3 className="text-lg font-semibold">Für Kinder</h3>
                            )}
                            <h3 className="text-lg font-semibold">Categorie: {data?.category}</h3>
                            <h3 className="text-lg font-semibold">Fahrradtyp: {data?.bikeType}</h3>
                        </div>
                        {/* Unterer Abschnitt für Datum, Zeit, Preis, Platz */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-lg font-semibold">Date</h3>
                                <p className="text-md">{data?.date}</p>
                            </div>
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-lg font-semibold">Time</h3>
                                <p className="text-center text-md">{data?.time}</p>
                            </div>
                            <div className="mb-2 sm:mb-0">
                                <h3 className="text-lg font-semibold">Price</h3>
                                <p className="text-center text-md">{finalizedPrice}€</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Place</h3>
                                <p className="text-center text-md">{data?.place}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-white border-zinc-900">
                        <div className="absolute rounded-full w-8 h-8 bg-zinc-900 -top-5"></div>
                        <div className="absolute rounded-full w-8 h-8 bg-zinc-900 -bottom-5"></div>
                    </div>
                    <div className="h-full bg-white flex items-center justify-center px-8 rounded-r-3xl">
                        <button onClick={handleQRCodeClick}
                                className="qr-code-placeholder flex justify-center items-center">
                            <div
                                className="w-32 h-32 bg-gray-300 flex items-center justify-center px-8 rounded">QRCode
                                {//<QRCode value={qrCodeData} size={128}/>
                                }
                            </div>
                        </button>
                    </div>
                </div>
            </section>
            {isFutureTicket() && (
                <button onClick={handleReturnClick} className="bg-red-500 text-white px-4 py-2 rounded">Ticket
                    zurückgeben</button>
            )}
        </main>
    );
}