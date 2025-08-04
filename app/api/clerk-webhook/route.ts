import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(request:NextRequest){
    try{
        const body = await request.json();
        const {id  , email_addresses , first_name , image_url} = body;
        const email = email_addresses[0].email_address;

        console.log('✅',body);

        await db.user.upsert({
            where:{
                clerkId:id
            },
            update:{
                email,
                name:first_name,
                profileImage:image_url
            },
            create:{
                clerkId:id,
                email,
                name:first_name || '',
                profileImage:image_url || ''
            }
        });
        return new NextResponse( 'User updated in database successfully', {status:200});
    }catch(error){
        console.log('Error updating user in database' , error);
        return new NextResponse('Error updating the user in database' , {status:500});
    }

}