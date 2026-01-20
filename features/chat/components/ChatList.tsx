import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Avatar } from '@/shared/ui/Avatar';
import { CHAT_FILTERS } from '../constants';
import { MOCK_CHATS } from '../mockData';
import { ROUTES } from '@/shared/constants/routes';

export const ChatList: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    return (
        <div className="pb-24 bg-white min-h-screen">
            <PageHeader title="채팅" />

            {/* Filters */}
            <div className="px-5 mb-4 pt-4 flex gap-2 overflow-x-auto no-scrollbar">
                {CHAT_FILTERS.map(f => (
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
                        onClick={() => navigate(ROUTES.CHAT_DETAIL(chat.id))}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <Avatar src={chat.partner.avatar} alt={chat.partner.name} size="md" />
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
