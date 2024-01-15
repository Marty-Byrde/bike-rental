async function fetchTickets() {
    try {
        const response = await fetch('/api/tickets');
        if (!response.ok) throw new Error('Failed to fetch tickets');
        const data = await response.json();
        return data.tickets;
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
}

async function createTicket(newTicket) {
    try {
        const response = await fetch('/api/tickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTicket),
        });
        if (!response.ok) throw new Error('Failed to create ticket');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating ticket:', error);
    }
}

// Funktion zum Aktualisieren eines Tickets
async function updateTicket(ticketId, updateData) {
    try {
        const response = await fetch(`${API_BASE_URL}/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        if (!response.ok) throw new Error('Failed to update ticket');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating ticket:', error);
        throw error;
    }
}

// Funktion zum Löschen eines Tickets
async function deleteTicket(ticketId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${ticketId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete ticket');
        return true;
    } catch (error) {
        console.error('Error deleting ticket:', error);
        throw error;
    }
}

export {fetchTickets, createTicket, updateTicket, deleteTicket};
