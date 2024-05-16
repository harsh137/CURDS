import {connectToDB} from '@/utils/db';
import Entry from '@/models/Entry';


  export const POST = async (req,res) => {
    // res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    

    try {
        await connectToDB();
        const oldEntry = await Entry.find(); 
        console.log(oldEntry)

        
        return new Response(JSON.stringify(oldEntry), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response(error, { status: 500 });
    }
}

