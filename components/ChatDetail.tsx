import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Phone, Send, Smile, Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_MESSAGES = [
    { id: 1, sender: 'PARTNER', text: '저용', time: '6:06 PM' },
    { id: 2, sender: 'PARTNER', text: '다른 이웃과 거래 예약 중이에요.', time: '6:06 PM' },
    { id: 3, sender: 'ME', text: '연락주셨는데 죄송해요 앞에 먼저 연락주신 분이 가져가기로 했습니다', time: '6:11 PM' },
    { id: 4, sender: 'PARTNER', text: '넵 감사합니다\n혹시라도 취소 되면 알려주세용!', time: '6:13 PM' },
    { id: 5, sender: 'ME', text: '네 알겠습니당~', time: '6:15 PM' },
];

export const ChatDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = {
            id: Date.now(),
            sender: 'ME',
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMsg]);
        setInput('');
    };

    const handleBack = () => {
        // Return to Chat List in Home
        navigate('/', { state: { activeTab: 'CHAT' } });
    };

    return (
        <div className="max-w-[430px] mx-auto bg-white min-h-screen flex flex-col shadow-2xl relative">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-100 flex items-center justify-between px-4 h-[54px]">
                <div className="flex items-center gap-3">
                    <button onClick={handleBack} className="text-ink p-1 -ml-1">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <h1 className="font-bold text-[16px] text-ink">싸게싸게</h1>
                            <span className="text-[12px] font-bold text-orange-400 bg-orange-50 px-1.5 rounded">46.6°C</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-ink">
                    <Phone size={22} />
                    <MoreVertical size={22} />
                </div>
            </header>

            {/* Product Summary */}
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3 bg-white">
                <img src="https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=100&q=80" alt="product" className="w-10 h-10 rounded-md object-cover" />
                <div className="flex-1">
                    <p className="text-[14px] font-bold text-ink truncate">LG 전자레인지 나눔</p>
                    <p className="text-[13px] font-bold text-ink">Given away</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-[#1A1A1A] px-4 py-4 flex flex-col gap-3 overflow-y-auto">
                <div className="flex justify-center my-4">
                    <span className="text-[12px] text-gray-500 font-medium">Oct 8, 2024</span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'ME' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                        {msg.sender === 'PARTNER' && (
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&q=80" alt="avatar" className="w-8 h-8 rounded-full mb-1" />
                        )}
                        <div className={`px-4 py-2.5 rounded-[20px] text-[14px] whitespace-pre-wrap leading-snug ${msg.sender === 'ME'
                            ? 'bg-[#FF6B35] text-white rounded-br-none' // Matching Karrot orange bubble
                            : 'bg-[#2C2C2C] text-gray-100 rounded-bl-none'
                            }`}>
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-500 mb-0.5 flex-shrink-0">{msg.time}</span>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 bg-[#2C2C2C] px-3 py-2 flex items-center gap-3 pb-safe w-full border-t border-gray-700">
                <button className="text-gray-400 p-1">
                    <Plus size={24} />
                </button>
                <div className="flex-1 bg-[#3A3A3A] rounded-full flex items-center px-4 py-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="메시지 보내기"
                        className="flex-1 bg-transparent text-white placeholder:text-gray-500 text-sm outline-none"
                    />
                    <Smile size={20} className="text-gray-500 ml-2" />
                </div>
                <button onClick={handleSend} className={`p-2 transition-colors ${input.trim() ? 'text-cherry' : 'text-gray-600'}`}>
                    <Send size={24} />
                </button>
            </div>

            <style>{`
                .pb-safe {
                    padding-bottom: max(8px, env(safe-area-inset-bottom));
                }
             `}</style>
        </div>
    );
};
