'use client'
import React, {useEffect, useState} from 'react';
import Ticket from '@/app/(components)/ticket/Ticket';
import {fetchTickets} from '@/app/(components)/ticket/ticketAPI';

export default function TicketsDashboard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchAndSetTickets = async () => {
            const fetchedTickets = await fetchTickets();
            setTickets(fetchedTickets);
        };

        fetchAndSetTickets();
    }, []);

    return (
        <div className="min-h-screen p-8">
            {/* Container für aktuelle Tickets */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Aktuelle Tickets</h2>
                <div className="flex flex-col items-stretch">
                    {/* Dieser Container wird dafür sorgen, dass die Tickets gestapelt angezeigt werden */}
                    <div className="bg-black shadow rounded-md p-6 mb-4">
                        {tickets.map((ticket, index) => (
                            <Ticket key={index} data={ticket} index={index}/>
                        ))}
                    </div>
                    {/* ...weitere Tickets */}
                </div>
            </div>

            {/* Container für Ticketverlauf */}
            <div>
                <h2 className="text-2xl font-bold mb-4 text-white">Ticketverlauf</h2>
                <div className="flex flex-col items-stretch">
                    {/* Auch dieser Container wird die Tickets untereinander stapeln */}
                    <div className="bg-black shadow rounded-md p-6 mb-4">
                        {tickets.map(ticket => (
                            <Ticket key={ticket.id} data={ticket}/>
                        ))}
                    </div>
                    {/* ...weitere Tickets für den Verlauf */}
                </div>
            </div>
        </div>
    );
}

//
// import React, {useContext} from 'react';
// import Ticket from "@/app/(components)/ticket/Ticket";
// import {TicketsContext} from "@/app/(components)/ticketContext/TicketsContex"; // Der Importpfad kann je nach Projektstruktur variieren
//
// export default function TicketsDashboard() {
//     const {tickets, ticketHistory} = useContext(TicketsContext);
//
//
//     return (
//         <div className="min-h-screen p-8">
//             {/* Container für aktuelle Tickets */}
//             <div className="mb-8">
//                 <h2 className="text-2xl font-bold mb-4 text-white">Aktuelle Tickets</h2>
//                 <div className="flex flex-col items-stretch">
//                     {/* Dieser Container wird dafür sorgen, dass die Tickets gestapelt angezeigt werden */}
//                     <div className="bg-black shadow rounded-md p-6 mb-4">
//                         {tickets.map((ticket, index) => (
//                             <Ticket key={index} data={ticket} index={index}/>
//                         ))}
//                     </div>
//                     {/* ...weitere Tickets */}
//                 </div>
//             </div>
//
//             {/* Container für Ticketverlauf */}
//             <div>
//                 <h2 className="text-2xl font-bold mb-4 text-white">Ticketverlauf</h2>
//                 <div className="flex flex-col items-stretch">
//                     {/* Auch dieser Container wird die Tickets untereinander stapeln */}
//                     <div className="bg-black shadow rounded-md p-6 mb-4">
//                         {ticketHistory.map((ticket, index) => (
//                             <Ticket key={index} data={ticket} index={index}/>
//                         ))}
//                     </div>
//                     {/* ...weitere Tickets für den Verlauf */}
//                 </div>
//             </div>
//         </div>
//     );
// }
