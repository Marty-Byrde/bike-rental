import BikeBookingPage from "@/app/bikeBookingPage/BikeBookingPage";
import {TicketsProvider} from "@/app/(components)/ticketContext/TicketsContex";
import TicketsDashboard from "@/app/(components)/ticketsDashboard/TicketsDashboard";

export default function Home() {
    return (
        <TicketsProvider> {/* TicketProvider umschließt die Komponenten, die Zugriff auf den Ticket-Kontext benötigen */}
            <div>
                <h1>This is some content...</h1>
                <BikeBookingPage/>
                <TicketsDashboard/>

                {/* Weitere Komponenten, die den Ticket-Kontext nutzen */}
            </div>
        </TicketsProvider>
    )
}
