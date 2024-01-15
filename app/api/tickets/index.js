// pages/api/tickets/index.js
import {MongoClient, ObjectId} from 'mongodb';

// Ersetzen Sie dies mit Ihren Datenbankverbindungsdetails
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = await client.connect().then(client => client.db(dbName));
    cachedDb = db;
    return db;
}

export default async function handler(req, res) {
    const db = await connectToDatabase();
    const collection = db.collection('tickets'); // Ersetzen Sie dies durch den Namen Ihrer Sammlung

    switch (req.method) {
        case 'GET':
            const tickets = await collection.find({}).toArray();
            res.status(200).json({tickets});
            break;

        case 'POST':
            const newTicket = req.body;
            const createdTicket = await collection.insertOne(newTicket);
            res.status(201).json(createdTicket.ops[0]);
            break;

        case 'PUT':
            const {_id, ...updateData} = req.body;
            const updatedTicket = await collection.findOneAndUpdate(
                {_id: new ObjectId(_id)},
                {$set: updateData},
                {returnOriginal: false}
            );
            res.status(200).json(updatedTicket.value);
            break;

        case 'DELETE':
            const {id} = req.query;
            await collection.deleteOne({_id: new ObjectId(id)});
            res.status(200).json({message: 'Ticket deleted successfully'});
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
