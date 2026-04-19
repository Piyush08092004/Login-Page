// Test script to check Gemini API
const API_KEY = 'AIzaSyC6qaOckLcAIEmGcQgLuBKaxTu1ycJZG_0';

// Test 1: List available models
async function listModels() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
        );
        const data = await response.json();
        console.log('Available models:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error listing models:', error);
    }
}

// Test 2: Try generating content with gemini-pro
async function testGenerate() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: 'Say hello' }]
                    }]
                })
            }
        );
        const data = await response.json();
        console.log('Generate test:');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error generating:', error);
    }
}

listModels();
setTimeout(() => testGenerate(), 2000);
