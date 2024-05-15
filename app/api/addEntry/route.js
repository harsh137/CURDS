import {connectToDB} from '@/utils/db';
import Entry from '@/models/Entry';


  export const POST = async (request) => {
    const { name, phone,email,hobbies } = await request.json();
    console.log(name,"hello i am ")

    try {
        await connectToDB();
        const newEntry = new Entry({ name , phone,email,hobbies });
        // console.log(newEntry)

        await newEntry.save();
        return new Response(JSON.stringify(newEntry), { status: 201 })
    } catch (error) {
        // console.log(error);
        return new Response(error, { status: 500 });
    }
}
