import model from "@/lib/gemini";
import { NextResponse } from "next/server";
import { BASIC_CONTEXT, ADVANCED_CONTEXT } from "@/lib/geminiContext";
import { advancedAskProps, askProps, formType } from "@/lib/zod-props";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const askType = searchParams.get('formType') || formType.Values.BASIC;

        if (askType === formType.Values.BASIC) {
            const body = await req.json();

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
            const formData = await req.formData();
            const body = Object.fromEntries(formData.entries());

            console.log(body);

            const parsedInput = advancedAskProps.safeParse(body);
            if (!parsedInput.success) {
                return NextResponse.json(
                    { error: parsedInput.error },
                    { status: 400 }
                );
            }

            let result;
            if (body.image) {
                const imageFile = body.image as File;
                const arrayBuffer = await imageFile.arrayBuffer();
                const base64String = Buffer.from(arrayBuffer).toString('base64');

                const imageAnalysisResult = await model.generateContent([
                    {
                        inlineData: {
                            data: base64String,
                            mimeType: imageFile.type,
                        },
                    },
                    'Caption this image.',
                ]);

                result = await model.generateContent(
                    ADVANCED_CONTEXT +
                    JSON.stringify({
                        ...parsedInput.data,
                        imageCaption: imageAnalysisResult.response.text()
                    })
                );
            } else {
                result = await model.generateContent(ADVANCED_CONTEXT + JSON.stringify(parsedInput.data));
            }

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