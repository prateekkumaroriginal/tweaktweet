import model from "@/lib/gemini";
import { NextResponse } from "next/server";
import CONTEXT from "@/lib/geminiContext";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const text = searchParams.get('text');
        console.log(text);

        if (!text) {
            return NextResponse.json(
                { error: "Please provide \"text\"" },
                { status: 400 }
            );
        }

        const result = await model.generateContent(CONTEXT + text);
        const jsonText = result.response.text(); 
        console.log("Text", jsonText);
        
        const jsonResult = JSON.parse(jsonText);
        console.log("json", jsonResult);
        return NextResponse.json(jsonResult);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}