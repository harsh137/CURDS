
import {connectToDB} from '@/utils/db';
import Entry from '@/models/Entry';

const ObjectId = require('mongodb').ObjectId



export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        console.log(params.id,"id")
        

        // Find the prompt by ID and remove it
        await Entry.deleteOne({_id: new ObjectId(params.id)});

        return new Response("Entries deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Entries deleting prompt", { status: 500 });
    }
};