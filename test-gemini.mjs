import fs from 'fs';

// Test script to check Gemini API
const API_KEY = 'AIzaSyC6qaOckLcAIEmGcQgLuBKaxTu1ycJZG_0';

// Test: List available models
async function listModels() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );
        const data = await response.json();

        // Extract just model names for easier reading
        const modelNames = data.models?.map(m => m.name) || [];

        fs.writeFileSync('models-list.json', JSON.stringify(data, null, 2));
        console.log('Available models:', modelNames.join(', '));

        // Try the first model that supports generateContent
        const textModel = data.models?.find(m =>
            m.supportedGenerationMethods?.includes('generateContent')
        );

        if (textModel) {
            console.log('\\nFound text generation model:', textModel.name);
            await testGenerate(textModel.name);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function testGenerate(modelName) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: 'Say hello in one sentence' }]
                    }]
                })
            }
        );
        const data = await response.json();

        if (data.error) {
            console.log('Error:', data.error.message);
        } else {
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            console.log('Generated text:', text);
            console.log('✅ API is working!');
        }

        fs.writeFileSync('generate-test.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error generating:', error.message);
    }
}

listModels();
