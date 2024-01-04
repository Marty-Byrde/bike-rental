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

   
}