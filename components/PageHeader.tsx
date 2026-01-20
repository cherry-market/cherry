import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { Button } from './Button';

interface PageHeaderProps {
    title: string;
    rightAction?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, rightAction }) => {
    return (
        <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="px-4 py-3 w-full h-[60px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-cherry tracking-tight">{title}</h1>
                </div>

                <div className="flex items-center justify-end gap-2">
                    {rightAction}
                    <Button
                        variant="icon"
                        className="w-10 h-10 border-none bg-transparent hover:bg-gray-50 shadow-none text-ink p-2"
                    >
                        <Bell size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
