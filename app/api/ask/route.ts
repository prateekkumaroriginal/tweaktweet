import model from "@/lib/gemini";
import { NextResponse } from "next/server";
import { BASIC_CONTEXT, ADVANCED_CONTEXT } from "@/lib/geminiContext";
import { advancedAskProps, askProps, formType } from "@/lib/zod-props";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const askType = searchParams.get('formType') || formType.Values.BASIC;
        console.log(searchParams.get('formType'));

        const body = await req.json();
        console.log(body);

        if (askType === formType.Values.BASIC) {
            const parsedInput = askProps.safeParse(body);
            if (!parsedInput.success) {
                return NextResponse.json(
                    { error: parsedInput.error },
                    { status: 400 }
                );
            }

            const result = await model.generateContent(BASIC_CONTEXT + parsedInput.data.text);
            const jsonText = result.response.text();
            console.log("Text", jsonText);

            const jsonResult = JSON.parse(jsonText);
            console.log("json", jsonResult);
            return NextResponse.json(jsonResult);
        } else {
            const parsedInput = advancedAskProps.safeParse(body);
            if (!parsedInput.success) {
                return NextResponse.json(
                    { error: parsedInput.error },
                    { status: 400 }
                );
            }

            const result = await model.generateContent(ADVANCED_CONTEXT + JSON.stringify(parsedInput.data));
            const jsonText = result.response.text();
            console.log("Text", jsonText);

            const jsonResult = JSON.parse(jsonText);
            console.log("json", jsonResult);
            return NextResponse.json(jsonResult);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

}