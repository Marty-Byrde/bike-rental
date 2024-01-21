'use client'

// TicketContext.js
import React, {createContext, useState} from 'react';

export const TicketsContext = createContext();

export const TicketsProvider = ({children}) => {
    const [tickets, setTickets] = useState([]);
    const [ticketHistory, setTicketHistory] = useState([]);

    const addTicket = (newTicket) => {
        setTickets(prevTickets => [newTicket, ...prevTickets]);
    };

    const moveTicketToHistory = (ticketIndex) => {
        setTicketHistory(prevHistory => [tickets[ticketIndex], ...prevHistory]);
        setTickets(prevTickets => prevTickets.filter((_, index) => index !== ticketIndex));
    };

    const returnTicket = (ticketIndex) => {
        const ticketToReturn = tickets[ticketIndex];
        const rentalStartTime = new Date(ticketToReturn.date + ' ' + ticketToReturn.time);
        const oneHourBeforeRental = new Date(rentalStartTime.getTime() - 60 * 60 * 1000);
        const currentTime = new Date();

        //if (currentTime >= oneHourBeforeRental && currentTime < rentalStartTime) {
        const updatedTickets = tickets.filter((_, index) => index !== ticketIndex);
        setTickets(updatedTickets);
        // Optional: Rückerstattungslogik implementieren
        //} else {
        // Optional: Fehlerbehandlung, falls das Ticket nicht zurückgegeben werden kann
        console.log('Ticket kann nicht zurückgegeben werden');
        // }
    };

    return (
        <TicketsContext.Provider value={{tickets, ticketHistory, addTicket, moveTicketToHistory, returnTicket}}>
            {children}
        </TicketsContext.Provider>
    );
};