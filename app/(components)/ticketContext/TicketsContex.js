'use client'

import React, {createContext, useEffect, useState} from 'react';
import {createTicket, deleteTicket, fetchTickets, updateTicket} from '@/app/(components)/ticket/ticketAPI';

export const TicketsContext = createContext();

export const TicketsProvider = ({children}) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const loadTickets = async () => {
            const loadedTickets = await fetchTickets();
            setTickets(loadedTickets);
        };

        loadTickets();
    }, []);

    const addTicket = async (newTicket) => {
        await createTicket(newTicket);
        await loadTickets();
    };

    const removeTicket = async (ticketId) => {
        await deleteTicket(ticketId);
        await loadTickets();
    };

    const modifyTicket = async (ticketId, ticketData) => {
        await updateTicket(ticketId, ticketData);
        await loadTickets();
    };

    return (
        <TicketsContext.Provider value={{tickets, addTicket, removeTicket, modifyTicket}}>
            {children}
        </TicketsContext.Provider>
    );
};

// TicketContext.js
// import React, {createContext, useState} from 'react';
//
// export const TicketsContext = createContext();
//
// export const TicketsProvider = ({children}) => {
//     const [tickets, setTickets] = useState([]);
//     const [ticketHistory, setTicketHistory] = useState([]);
//
//     const addTicket = (newTicket) => {
//         setTickets(prevTickets => [newTicket, ...prevTickets]);
//     };
//
//     const moveTicketToHistory = (ticketIndex) => {
//         setTicketHistory(prevHistory => [tickets[ticketIndex], ...prevHistory]);
//         setTickets(prevTickets => prevTickets.filter((_, index) => index !== ticketIndex));
//     };
//
//     const returnTicket = (ticketIndex) => {
//         const ticketToReturn = tickets[ticketIndex];
//         const rentalStartTime = new Date(ticketToReturn.date + ' ' + ticketToReturn.time);
//         const oneHourBeforeRental = new Date(rentalStartTime.getTime() - 60 * 60 * 1000);
//         const currentTime = new Date();
//
//         //if (currentTime >= oneHourBeforeRental && currentTime < rentalStartTime) {
//         const updatedTickets = tickets.filter((_, index) => index !== ticketIndex);
//         setTickets(updatedTickets);
//         // Optional: Rückerstattungslogik implementieren
//         //} else {
//         // Optional: Fehlerbehandlung, falls das Ticket nicht zurückgegeben werden kann
//         console.log('Ticket kann nicht zurückgegeben werden');
//         // }
//     };
//
//     return (
//         <TicketsContext.Provider value={{tickets, ticketHistory, addTicket, moveTicketToHistory, returnTicket}}>
//             {children}
//         </TicketsContext.Provider>
//     );
// };