'use client'

import React from "react";

export default function Ticket() {
    return (
        <main className="w-screen h-screen flex flex-col">
            <section className="w-full flex-grow bg-blue flex items-center justify-center p-4">

                <div className="flex w-full max-w-3xl text-zinc-900 h-64">
                    {/* Linker Teil der Rückseite */}
                    <div className="h-full py-8 px-10 bg-white flex-grow rounded-l-3xl flex flex-col">
                        {/* Alle anderen Elemente und Inhalte der Rückseite */}
                        {/* Weitere Elemente gekürzt für Übersichtlichkeit */}

                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Startstation</h3>
                            </div>
                            {/* Pfeilsymbol */}
                            <div>
                                <svg className="h-6 w-6 text-zinc-900 mx-2" fill="none" strokeLinecap="round"
                                     strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M4 12h16m0 0l-4-4m4 4l-4 4"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">Endstation</h3>
                            </div>
                        </div>

                        {/* Fahrradart */}
                        <div className="items-center justify-between mt-8">
                            <h3 className="text-lg font-semibold">Fahrradart</h3>
                        </div>
                        {/* Fahrradtyp */}
                        <div>
                            <h3 className="text-lg font-semibold">Fahrradtyp</h3>
                        </div>
                        {/* Datum, Zeit, Preis und Platz in derselben Reihe */}
                        <div className="flex items-center justify-between mt-8">
                            {/* Datum */}
                            <div>
                                <h3 className="text-lg font-semibold">Datum</h3>
                                <p className="text-md">[Datum]</p>
                            </div>

                            {/* Zeit */}
                            <div>
                                <h3 className="text-lg font-semibold">Zeit</h3>
                                <p className="text-md">[Zeit]</p>
                            </div>

                            {/* Preis */}
                            <div>
                                <h3 className="text-lg font-semibold">Preis</h3>
                                <p className="text-md">[Preis]</p>
                            </div>

                            {/* Platz */}
                            <div>
                                <h3 className="text-lg font-semibold">Platz</h3>
                                <p className="text-md">[Platz]</p>
                            </div>
                        </div>
                    </div>

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