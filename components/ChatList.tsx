import React, { useState } from 'react';
import { Bell, SlidersHorizontal, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_CHATS = [
    {
        id: '1',
        partner: { name: '싸게싸게', location: '신림동', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' },
        lastMessage: 'Sticker sent',
        time: '2y',
        unread: 0,
        productImg: 'https://images.unsplash.com/photo-1555445054-8488d05c9584?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: '2',
        partner: { name: '바르샤맨', location: '신림동', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
        lastMessage: 'Sticker sent',
        time: '1y',
        unread: 0,
        productImg: 'https://images.unsplash.com/photo-1563245372-f21724e3a80d?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: '3',
        partner: { name: 'realslow', location: '팽성읍', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80' },
        lastMessage: '00:12',
        time: '1y',
        unread: 0,
        productImg: 'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: '4',
        partner: { name: '젊은이', location: '청담동', avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=100&q=80' },
        lastMessage: '안녕하세요. 사진상으로는 클릭 사망이 16이라고...',
        time: '5mo',
        unread: 1,
        productImg: 'https://images.unsplash.com/photo-1526045612212-70fad8114247?auto=format&fit=crop&w=100&q=80'
    },
    {
        id: '5',
        partner: { name: '체리페이', location: '', avatar: 'https://images.unsplash.com/vector-1757783035399-179f77597c15?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=100&q=80' },
        lastMessage: '개인정보 이용 · 제공내역 및 수집출처 통지 안내',
        time: '2mo',
        unread: 0,
        productImg: null,
        isOfficial: true
    }
];

export const ChatList: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const filters = ['All', 'Selling', 'Buying', 'Unread'];

    return (
        <div className="pb-24 pt-2">
            {/* Header */}
            <div className="px-5 mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-cherry">채팅</h1>
                <div className="flex gap-4 text-ink">
                    <SlidersHorizontal size={20} />
                    <Bell size={20} />
                </div>
            </div>

            {/* Filters */}
            <div className="px-5 mb-4 flex gap-2 overflow-x-auto no-scrollbar">
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3.5 py-1.5 rounded-full text-[13px] font-bold border transition-colors ${filter === f ? 'bg-cherry text-white border-cherry' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="flex flex-col">
                {MOCK_CHATS.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => navigate(`/chat/${chat.id}`)}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <img src={chat.partner.avatar} alt={chat.partner.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                            {chat.isOfficial && (
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                                    <div className="bg-cherry rounded-full p-0.5">
                                        <Check size={8} className="text-white" strokeWidth={4} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="font-bold text-[15px] text-ink">{chat.partner.name}</span>
                                {chat.partner.location && (
                                    <span className="text-[12px] text-gray-400 font-medium">{chat.partner.location}</span>
                                )}
                                <span className="text-[12px] text-gray-400 font-medium ml-auto">{chat.time}</span>
                            </div>
                            <p className={`text-[13px] truncate ${chat.unread > 0 ? 'font-bold text-ink' : 'text-gray-500'}`}>
                                {chat.lastMessage}
                            </p>
                        </div>

                        {/* Product Thumb */}
                        {chat.productImg && (
                            <img src={chat.productImg} alt="product" className="w-10 h-10 rounded-[8px] object-cover bg-gray-100 flex-shrink-0" />
                        )}
                    </div>
                ))}

                {/* Empty State Mock for Bottom */}
                <div className="h-20" />
            </div>
        </div>
    );
};
