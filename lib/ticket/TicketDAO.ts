// TicketDAO.ts
import {createTicket, deleteTicket, fetchTickets, updateTicket} from '@/app/(components)/ticket/ticketAPI';

export async function getTicketsFromAPI() {
    try {
        return await fetchTickets();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
}

export async function createNewTicket(ticket) {
    try {
        return await createTicket(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error);
    }
}

export async function updateExistingTicket(ticketId, updatedTicket) {
    try {
        return await updateTicket(ticketId, updatedTicket);
    } catch (error) {
        console.error('Error updating ticket:', error);
    }
}

export async function deleteExistingTicket(ticketId) {
    try {
        return await deleteTicket(ticketId);
    } catch (error) {
        console.error('Error deleting ticket:', error);
    }
}


// // TicketDao.ts
// 'use client'
// import {getCollection} from '@/lib/Shared/Database';
// import {Ticket} from '@/typings/Ticket'; // Angenommen, Ticket ist eine definierte Klasse
//
// const {COLLECTION_TICKETS} = process.env;
// if (!COLLECTION_TICKETS) throw new Error('Missing Ticket Collection Name, check .env variables.');
//
// export async function createTicket(ticket: Ticket) {
//     const collection = await getCollection(COLLECTION_TICKETS!);
//
//     const exists = await collection.findOne({_id: new ObjectId(ticket._id.toString())});
//     if (exists) return console.log(`Ticket has not been added, because it already exists... _id: ${exists._id.toString()}`);
//
//     await collection.insertOne(ticket);
// }
//
// const COLLECTION_TICKET_HISTORY = 'ticketHistory'; // Beispiel für den Namen der Historiensammlung
// export async function getTickets() {
//     const collection = await getCollection(COLLECTION_TICKETS!);
//     const historyCollection = await getCollection(COLLECTION_TICKET_HISTORY);
//
//     const currentTickets = (await collection.find({}).toArray()) as unknown as WithId<Ticket>[];
//     const ticketHistory = (await historyCollection.find({}).toArray()) as unknown as WithId<Ticket>[];
//
//     return {current: currentTickets, history: ticketHistory};
// }
//
// export async function deleteTicket(id: ObjectId) {
//     const collection = await getCollection(COLLECTION_TICKETS!);
//     await collection.deleteOne({_id: id});
// }
//
// export async function updateTicket(id: string | ObjectId, update: WithId<Ticket> | Ticket) {
//     if (update?._id) delete update._id;
//
//     const collection = await getCollection(COLLECTION_TICKETS!);
//     await collection.updateOne({_id: new ObjectId(id.toString())}, {$set: update});
// }
//
// export async function moveTicketToHistory(id: string | ObjectId) {
//     const collection = await getCollection(COLLECTION_TICKETS!);
//     const historyCollection = await getCollection('COLLECTION_TICKET_HISTORY'); // Angenommen, es gibt eine separate Kollektion für die Historie
//
//     // Finde das Ticket, das verschoben werden soll
//     const ticketToMove = await collection.findOne({_id: new ObjectId(id.toString())});
//     if (!ticketToMove) {
//         console.log('Ticket not found');
//         return;
//     }
//
//     // Füge das Ticket zur Historie hinzu und entferne es aus der aktuellen Sammlung
//     await historyCollection.insertOne(ticketToMove);
//     await collection.deleteOne({_id: new ObjectId(id.toString())});
// }