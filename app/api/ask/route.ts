import model from "@/lib/gemini";
import axios from "axios";
import { NextResponse } from "next/server";
import CONTEXT from "@/lib/geminiContext";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const id = searchParams.get('id');
        let text = searchParams.get('text');
        console.log(id, text);

        if (id) {
            const response = await axios.get(`https://api.twitter.com/2/tweets/${id}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_APP_X_API_BEARER_TOKEN}`
                }
            });
            const data = response.data;

            if (data.errors && data.errors[0]?.title === "Not Found Error") {
                console.log(data);
                return NextResponse.json({ error: "Tweet not found!" }, { status: 404 });
            }

            text = data?.data?.text;
        }

        if (!text) {
            return NextResponse.json(
                { error: "Provide either \"id\" or \"text\"" },
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