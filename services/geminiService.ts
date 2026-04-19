// Using direct REST API instead of @google/genai SDK due to compatibility issues

const API_KEY = process.env.API_KEY;

export const generateEmailDraft = async (topic: string, details: string): Promise<string> => {
    try {
        if (!API_KEY) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }

        const prompt = `
        You are the Smart AI Assistant for the Placement Cell at National Forensic Sciences University (NFSU).
        Draft a formal, concise, and professional email based on the user's input.

        Topic / Subject Context: ${topic}
        Key Details & Instructions:
        "${details}"

        Guidelines:
        1. Create a compelling Subject Line (start it with "Subject:").
        2. Tone: Professional, clear, and encouraging.
        3. Structure: Salutation -> Context -> Key Information -> Call to Action -> Sign-off.
        4. Sign off as "Placement Cell, NFSU".
        `;

        // Using the correct Gemini REST API endpoint with the latest stable model
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();

        // Extract the text from the response
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No text generated from the API");
        }

        return text;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Error: " + (error instanceof Error ? error.message : String(error));
    }
};