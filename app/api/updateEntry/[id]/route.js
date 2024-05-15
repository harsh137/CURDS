import { connectToDB } from '@/utils/db';
import Entry from '@/models/Entry';

const ObjectId = require('mongodb').ObjectId;

export const PUT = async (request, { params }) => {
    try {
        await connectToDB();
        const { id } = params;
        const body = await request.json();
        
        const updatedData = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            hobbies: body.hobbies,
        };

        const result = await Entry.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return new Response("Entry not found", { status: 404 });
        }

        return new Response("Entry updated successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error updating entry", { status: 500 });
    }
};
