import React, { useState } from 'react';
import { generateEmailDraft } from '../services/geminiService';
import { StorageService } from '../services/storageService';
// import { ListmonkService } from '../services/listmonkService';
import { Sparkles, Copy, Send, Check } from 'lucide-react';

export const MailBot: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [details, setDetails] = useState('');
    const [generatedDraft, setGeneratedDraft] = useState('');
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState<string[]>([]);

    React.useEffect(() => {
        const fetchStudents = async () => {
            const s = await StorageService.getStudents();
            setStudents(s.map(st => st.email));
        };
        fetchStudents();
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const draft = await generateEmailDraft(topic, details);
            setGeneratedDraft(draft);
        } catch (e) {
            setGeneratedDraft("Error: Ensure Gemini API Key is set and valid.");
        }
        setLoading(false);
    };

    const getMailtoLink = () => {
        if (!generatedDraft) return '#';

        const lines = generatedDraft.split('\n');
        let subject = `Important Notification: ${topic}`;
        let body = generatedDraft;

        // Try to extract subject from the generated text
        const subjectLine = lines.find(l => l.trim().toLowerCase().startsWith('subject:'));
        if (subjectLine) {
            subject = subjectLine.replace(/subject:/i, '').trim();
            // Remove the subject line from the body to avoid duplication in body, but mailto body usually needs it if we want distinct.
            // Actually, keep it in body optionally, or remove. Let's remove to be clean.
            body = lines.filter(l => l !== subjectLine).join('\n').trim();
        }

        return `mailto:?bcc=${students.join(',')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Sparkles className="text-purple-600" />
                    AI Assistant Mail Bot
                </h1>
                <p className="text-gray-500">Generate professional placement notifications and general announcements.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Subject Context</label>
                        <input
                            className="w-full border p-2 rounded mb-3"
                            placeholder="e.g. Exam Schedule Change, New Internship Opportunity"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />

                        <label className="block text-sm font-medium text-gray-700 mb-1">Key Details & Instructions</label>
                        <textarea
                            className="w-full border p-2 rounded h-40 text-sm"
                            placeholder="Describe what needs to be communicated. Include dates, names, or specific points to mention."
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                        ></textarea>

                        <button
                            onClick={handleGenerate}
                            disabled={loading}
                            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition flex justify-center items-center gap-2"
                        >
                            {loading ? 'Thinking...' : <><Sparkles size={16} /> Generate Draft</>}
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col h-full">
                    <h3 className="font-semibold text-slate-700 mb-2">Preview</h3>
                    <div className="flex-1 bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap text-sm text-gray-700 overflow-y-auto font-mono">
                        {generatedDraft || <span className="text-gray-400 italic">Draft will appear here...</span>}
                    </div>
                    {generatedDraft && (
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(generatedDraft);
                                    alert('Copied to clipboard!');
                                }}
                                className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 rounded text-sm hover:bg-gray-50"
                            >
                                <Copy size={16} /> Copy Text
                            </button>
                            <a
                                href={getMailtoLink()}
                                className="mail-btn flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition font-bold"
                            >
                                <Send size={16} /> Open Mail Client
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};