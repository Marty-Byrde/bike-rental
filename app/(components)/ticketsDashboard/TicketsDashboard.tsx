import React from 'react';
import Ticket from "@/app/(components)/ticket/Ticket"; // Der Importpfad kann je nach Projektstruktur variieren

export default function TicketsDashboard() {
    return (
        <div className="min-h-screen p-8">
            {/* Container für aktuelle Tickets */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Aktuelle Tickets</h2>
                <div className="flex flex-col items-stretch">
                    {/* Dieser Container wird dafür sorgen, dass die Tickets gestapelt angezeigt werden */}
                    <div className="bg-black shadow rounded-md p-6 mb-4">
                        <Ticket/>
                        <Ticket/>
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
                        <Ticket/>
                        <Ticket/>
                    </div>
                    {/* ...weitere Tickets für den Verlauf */}
                </div>
            </div>
        </div>
    );
}
