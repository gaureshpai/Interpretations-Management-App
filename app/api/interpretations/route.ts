import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// Create interpretation
async function createInterpretation(data: {
    term: string,
    interpretation: string // Corrected property name
}) {
    try {
        const response = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
            "interpretations",
            ID.unique(),
            data
        );

        return response;
    } catch (error) {
        console.error('Error creating interpretations', error);
        throw new Error("Failed to create interpretations");
    }
}

// Fetch interpretations
async function fetchInterpretations() {
    try {
        const response = await database.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DB_ID as string,
            "interpretations",
            [Query.orderDesc("$createdAt")],
        );
        return response.documents;
    } catch (error) {
        console.error('Error fetching interpretations', error);
        throw new Error("Failed to fetch interpretations");
    }
}

export async function POST(req: Request) {
    try {
        const { term, interpretation } = await req.json();
        const data = { term, interpretation};
        const response = await createInterpretation(data);
        return NextResponse.json({ message: "Interpretation created" });
    } catch (error) {
        return NextResponse.json({
            error: "Failed to create interpretation"
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const interpretation = await fetchInterpretations();
        return NextResponse.json(interpretation);
    } catch (error) {
        return NextResponse.json({
            error: "Failed to fetch interpretation"
        }, { status: 500 });
    }
}
