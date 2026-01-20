import React, { useState } from 'react';
import { Plus, PenLine, Sparkles, X, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

export const ProductWriteButton: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleNavigate = (path: string) => {
        setIsOpen(false);
        navigate(path);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] flex justify-center pointer-events-none">
            <div className="w-full max-w-[430px] relative">
                <div className="absolute bottom-[calc(4rem+1.2rem+env(safe-area-inset-bottom))] right-5 flex flex-col items-end gap-3 pointer-events-none">
                    {/* Options Menu */}
                    <div className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-75 translate-y-10 pointer-events-none'}`}>
                        {/* AI Write Option */}
                        <button
                            onClick={() => handleNavigate(ROUTES.PRODUCT_WRITE_AI)}
                            className="flex items-center gap-3 bg-cherry text-white font-bold py-2.5 px-5 rounded-full shadow-[0_4px_20px_rgba(255,47,110,0.3)] border border-white/20 hover:brightness-110 transition-transform active:scale-95"
                        >
                            <span className="text-sm">AI로 글 작성</span>
                            <div className="w-8 h-8 rounded-full bg-white text-cherry flex items-center justify-center shadow-sm">
                                <Bot size={18} />
                            </div>
                        </button>

                        {/* Normal Write Option */}
                        <button
                            onClick={() => handleNavigate(ROUTES.PRODUCT_WRITE)}
                            className="flex items-center gap-3 bg-white text-ink font-bold py-2.5 px-5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100 hover:bg-gray-50 transition-transform active:scale-95"
                        >
                            <span className="text-sm">내 물건 팔기</span>
                            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                                <PenLine size={16} />
                            </div>
                        </button>
                    </div>

                    {/* Main FAB */}
                    <button
                        onClick={toggleOpen}
                        className={`pointer-events-auto w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(255,47,110,0.4)] flex items-center justify-center transition-all duration-300 relative overflow-hidden group active:scale-90 ${isOpen ? 'bg-white text-ink rotate-45' : 'bg-cherry text-white rotate-0'}`}
                    >
                        {/* Ripple Effect Background (simple CSS based on state) */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                        {isOpen ? (
                            <Plus size={32} className="transition-transform duration-300 text-gray-500" />
                        ) : (
                            <Plus size={32} className="transition-transform duration-300" />
                        )}
                    </button>

                    {/* Backdrop for closing */}
                    {isOpen && (
                        <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] -z-10 pointer-events-auto w-screen h-screen left-0 top-0"
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
