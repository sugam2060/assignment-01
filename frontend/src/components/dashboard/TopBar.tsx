import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { HiMenu } from 'react-icons/hi';

interface TopBarProps {
    onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
    const { user } = useAuthStore();

    return (
        <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex justify-between items-center px-8 py-6">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-blue-950 md:hidden hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <HiMenu className="text-2xl" />
                </button>
                <div className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-blue-950 dark:text-white font-headline">Welcome, {user?.fullname.split(' ')[0]}!</h1>
                </div>
            </div>
            <div className="flex items-center space-x-6">
                {/* Search and Bell removed */}
            </div>
        </header>
    );
};

export default TopBar;
