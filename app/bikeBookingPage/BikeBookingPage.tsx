'use client'

import React, {useContext, useState} from 'react';
import {TicketsContext} from "@/app/(components)/ticketContext/TicketsContex"; // Der Importpfad kann je nach Projektstruktur variieren

// Importieren Sie zusätzliche Komponenten und Hilfsfunktionen nach Bedarf
export default function BikeBookingPage() {
    const [model, setModel] = useState('');
    const [category, setCategory] = useState('City-Bike');
    const [station, setStation] = useState('');
    const [purpose, setPurpose] = useState('');
    const [rentingTime, setRentingTime] = useState('');
    const [size, setSize] = useState('Standard');
    const [rentingOption, setRentingOption] = useState('immediate');
    const [adultTicket, setAdultTicket] = useState(false); // Zustand für Erwachsenenticket
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [childrenDetails, setChildrenDetails] = useState([]);

    const {addTicket} = useContext(TicketsContext);

    const handleNumberOfChildrenChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setNumberOfChildren(count);
        setChildrenDetails(Array(count).fill({model: '', size: 'Standard', category: 'City-Bike'}));
    };

    const handleChildDetailChange = (index, key, value) => {
        const updatedDetails = childrenDetails.map((child, i) => {
            if (i === index) {
                return {...child, [key]: value};
            }
            return child;
        });
        setChildrenDetails(updatedDetails);
    };

    const updateRentingTime = (option) => {
        setRentingOption(option);
        if (option === 'immediate') {
            const now = new Date();
            const dateStr = now.toISOString().split('T')[0];
            const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
            setRentingTime(`${dateStr}T${timeStr}`);
        }
    };

    // Preisberechnungsfunktion
    const calculatePrice = (model, category, date, time, station) => {
        let price = 10.00; // Basispreis

        if (model === "Mountainbike") price += 5.00;
        if (category === "High-End") price += 10.00;
        if (station === "Stadtzentrum") price += 3.00;

        // Berechnung der Dauer in Stunden
        let duration = 1; // Standarddauer
        if (rentingOption === 'future') {
            const rentalStart = new Date(date + ' ' + time);
            const rentalEnd = new Date(rentalStart.getTime() + 60 * 60 * 1000); // +1 Stunde
            duration = (rentalEnd - rentalStart) / (1000 * 60 * 60);
        }

        price *= duration; // Preis basierend auf Dauer anpassen
        return price.toFixed(2);
    };

    const handleBooking = () => {
        let bookingDate, bookingTime;
        if (rentingOption === 'immediate') {
            const now = new Date();
            bookingDate = now.toISOString().split('T')[0];
            bookingTime = now.toTimeString().split(' ')[0].substr(0, 5);
        } else {
            [bookingDate, bookingTime] = rentingTime.split('T');
        }
        if (model === "Kinderfahrrad" && !adultTicket) {
            alert("Kinderfahrradtickets können nur zusammen mit einem Erwachsenenticket gebucht werden.");
            return;
        }
        const price = calculatePrice(model, category, bookingDate, bookingTime, station);

        const newTicket = {
            station,
            category,
            bikeType: model,
            date: bookingDate,
            time: bookingTime,
            price,
            place: "3"
        };
        addTicket(newTicket);

        childrenDetails.forEach(child => {
            const childPrice = (calculatePrice(child.model, child.category, bookingDate, bookingTime, station) * 0.5).toFixed(2);
            const childTicket = {
                ...newTicket, // Grundlegende Ticketinformationen
                category: child.category,
                bikeType: child.model,
                size: child.size,
                price: childPrice,
                isChildTicket: true
            };
            addTicket(childTicket);
        });
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Fahrrad-Tickets buchen</h1>
            <div className="bg-white shadow-lg rounded-xl p-6">

                {/* Station */}
                <div className="mb-4">
                    <label htmlFor="station" className="block text-lg font-semibold">Station:</label>
                    <input
                        type="text"
                        id="station"
                        value={station}
                        onChange={(e) => setStation(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>

                {/* Buttons für die Mietoptionen */}
                <div className="flex mb-4">
                    <button
                        onClick={() => updateRentingTime('immediate')}
                        className={`flex-1 p-2 ${rentingOption === 'immediate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Sofortiges Mieten
                    </button>
                    <button
                        onClick={() => updateRentingTime('future')}
                        className={`flex-1 p-2 ${rentingOption === 'future' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        Zukünftiges Mieten
                    </button>
                </div>

                {/* Mietzeitpunkt */}
                <div className="mb-4">
                    <label htmlFor="rentingTime" className="block text-lg font-semibold">Mietzeitpunkt:</label>
                    <input
                        type="datetime-local"
                        id="rentingTime"
                        value={rentingTime}
                        onChange={(e) => setRentingTime(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        disabled={rentingOption === 'immediate'}
                    />
                </div>
                {/* Zweck */}
                <div className="mb-4">
                    <label htmlFor="purpose" className="block text-lg font-semibold">Zweck:</label>
                    <select
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    >
                        <option value="Freizeit">Freizeit</option>
                        <option value="Arbeit">Arbeit</option>
                        <option value="Sport">Sport</option>
                        {/* Weitere Optionen nach Bedarf */}
                    </select>
                </div>
                {/* Größe */}
                <div className="mb-4">
                    <label htmlFor="size" className="block text-lg font-semibold">Größe:</label>
                    <select
                        id="size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    >
                        <option value="Standard">Standard</option>
                        <option value="Klein">Klein</option>
                        <option value="Groß">Groß</option>
                        {/* Weitere Optionen nach Bedarf */}
                    </select>
                </div>
                {/* Fahrradmodell */}
                <div className="mb-4">
                    <label htmlFor="model" className="block text-lg font-semibold">Fahrradmodell:</label>
                    <input
                        type="text"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                {/* Vorgegebene Informationen */}
                {/* Diese Informationen können je nach Bedarf angepasst werden */}
                <div className="mb-4">
                    <p className="text-lg"><strong>Kategorie:</strong> City-Bike</p>
                    <p className="text-lg"><strong>Größe:</strong> Standard</p>
                </div>
                {/* Anzahl der Kinder */}
                <div className="mb-4">
                    <label htmlFor="numberOfChildren" className="block text-lg font-semibold">Anzahl der Kinder:</label>
                    <input
                        type="number"
                        id="numberOfChildren"
                        value={numberOfChildren}
                        onChange={handleNumberOfChildrenChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </div>
                {/* Details für jedes Kind */}
                {childrenDetails.map((child, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-lg font-semibold">Details für Kind {index + 1}</label>
                        <input
                            type="text"
                            value={child.model}
                            onChange={(e) => handleChildDetailChange(index, 'model', e.target.value)}
                            placeholder="Fahrradmodell"
                        />
                        <select
                            value={child.size}
                            onChange={(e) => handleChildDetailChange(index, 'size', e.target.value)}
                        >
                            <option value="Standard">Standard</option>
                            <option value="Klein">Klein</option>
                            <option value="Groß">Groß</option>
                        </select>
                        <select
                            value={child.category}
                            onChange={(e) => handleChildDetailChange(index, 'category', e.target.value)}
                        >
                            <option value="City-Bike">City-Bike</option>
                            // Weitere Kategorien...
                        </select>
                    </div>
                ))}

                {/* Buchungsknopf */}
                <div className="text-center">
                    <button onClick={handleBooking} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Jetzt buchen
                    </button>
                </div>
            </div>
        </div>
    );
}