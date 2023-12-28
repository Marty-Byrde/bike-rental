'use client'

import React from "react";

export default function Ticket() {
    return (
        <main className="w-screen h-screen flex flex-col">
            <section className="w-full flex-grow bg-blue flex items-center justify-center p-4">

                

                    {/* Trennlinie */}
                    <div
                        className="relative h-full flex flex-col items-center border-dashed justify-between border-2 bg-white border-zinc-900">
                        <div className="absolute rounded-full w-8 h-8 bg-zinc-900 -top-5"></div>
                        <div className="absolute rounded-full w-8 h-8 bg-zinc-900 -bottom-5"></div>
                    </div>

                    {/* Rechter Teil der Rückseite */}
                    <div className="h-full bg-white flex items-center justify-center px-8 rounded-r-3xl">
                        {/*QR-Code */}
                        <div className="qr-code-placeholder flex justify-center items-center">
                            <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-600">
                                QR-Code
                            </div>
                        </div>
                        {/* SVG-Logo oder Bild hier einfügen */}
                        {/* SVG-Code gekürzt für Übersichtlichkeit */}
                    </div>

                </div>
            </section>
        </main>
        // Hier endet die Haupt-Container-Komponente
    );
}