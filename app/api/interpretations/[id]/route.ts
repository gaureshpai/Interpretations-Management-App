import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Fetch a specific interpretation
async function fetchInterpretation(id: string) {
    try {
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
            "interpretations",
            id
        );
        return interpretation;
    } catch (error) {
        console.error('Error fetching interpretation:', error);
        throw new Error("Failed to fetch interpretation");
    }
}

// Delete a specific interpretation
async function deleteInterpretation(id: string) {
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
            "interpretations",
            id
        );
        return response;
    } catch (error) {
        console.error('Error deleting interpretation:', error);
        throw new Error("Failed to delete interpretation");
    }
}

// Update a specific interpretation
async function updateInterpretation(id: string, data: { term: string, interpretation: string }) {
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
            "interpretations",
            id,
            data
        );
        return response;
    } catch (error) {
        console.error('Error updating interpretation:', error);
        throw new Error("Failed to update interpretation");
    }
}

// Handle GET request
export async function GET(
    req: Request,
     { params }: { params: { id: string } }
    ) {
    try {
        const  id  = params.id; // Destructure id from params
        const interpretation = await fetchInterpretation(id);
        return NextResponse.json({interpretation});
    } catch (error) {
        return NextResponse.json({ 
            error: "Failed to fetch interpretation"
        },{status: 500});
    }
}

//handle delete 
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id; // Destructure id from params
        const interpretation = await deleteInterpretation(id);
        return NextResponse.json({ message:" Interpretation deleted" });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to delete interpretation"
        }, { status: 500 });
    }
}

//handle update
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id; // Destructure id from params
        const interpretation = await req.json();
        await updateInterpretation(id, interpretation);
        return NextResponse.json({ message: "Interpretation updated" });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to update interpretation"
        }, { status: 500 });
    }
}