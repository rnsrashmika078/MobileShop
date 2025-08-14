import React, { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Product, LoadBody } from "@/types";

const genAI = new GoogleGenerativeAI("AIzaSyCWoGfvkQq8lsNPWQYeTuYDDzRN2x4AVOs");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const CustomBot: React.FC<{
    prompt?: string | null;
    customPrompt: string | null;
    turn: boolean;
    products: Product[] | Product;
    setLoading: React.Dispatch<React.SetStateAction<LoadBody | undefined>>;
    setAIResponse: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setAIResponse, turn, prompt, setLoading, products, customPrompt }) => {
    console.log("PROMOT", customPrompt);
    useEffect(() => {
        const customizePrompt = `
You are an assistant for a mobile accessories shop.

Your task is to:
1. Understand the user's question: "${prompt}"
2. Extract any relevant model names and categories from the question.
3. Search the product list for all products that match both model and category mentioned in the user prompt.

Return:
- If no matches are found, return: 
- A **pure JSON array** of only the matching product "_id" values, like:
 {'_id':'12142dfsdf'},{'_id': 'sdfs34'}
- Do NOT prepend anything like "json" or "\`\`\`json". Just return the raw JSON array.
- If no matches are found, return an empty array: []

Here is the product list:
${JSON.stringify(products)}
`;

        if (turn && (prompt || customPrompt)) {
            const generateContent = async () => {
                setLoading({ type: "AI", loading: true });
                try {
                    const result = await model.generateContent(
                        customPrompt ? customPrompt : customizePrompt
                    );
                    const responseText = await result.response.text();
                    if (responseText.length > 0) {
                        setLoading({ type: "AI", loading: false });

                        setAIResponse(responseText);
                    }
                } catch (err) {
                    // alert(
                    //     `Failed to generate content. Please try again. ${err}`
                    // );
                } finally {
                }
            };
            generateContent();
        }
    }, [customPrompt, products, prompt, setAIResponse, setLoading, turn]);
    return null;
};

export default CustomBot;
