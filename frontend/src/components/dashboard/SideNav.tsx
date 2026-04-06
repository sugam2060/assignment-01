import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { HiHome, HiHeart, HiLogout, HiX } from 'react-icons/hi';

interface SideNavProps {
    currentView: 'all' | 'favourites';
    onViewChange: (view: 'all' | 'favourites') => void;
    isOpen: boolean;
    onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ currentView, onViewChange, isOpen, onClose }) => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-blue-950/20 backdrop-blur-sm z-[55] md:hidden transition-all duration-300"
                    onClick={onClose}
                ></div>
            )}

            <aside className={`fixed inset-y-0 left-0 z-[60] h-screen w-72 bg-white flex flex-col p-6 space-y-4 border-r border-slate-100 shadow-2xl md:shadow-sm transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="flex justify-between items-center mb-10 px-2">
                    <div>
                        <div className="text-2xl font-black text-blue-950 tracking-tighter">The Estate</div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1">Architectural Authority</div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-blue-950 md:hidden"
                        title="Close Menu"
                    >
                        <HiX className="text-2xl" />
                    </button>
                </div>
            
            <nav className="flex-1 space-y-2">
                <button 
                    onClick={() => onViewChange('all')}
                    className={`w-full group flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${currentView === 'all' ? 'bg-blue-950 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-950'}`}
                >
                    <HiHome className={`mr-3 text-xl ${currentView === 'all' ? 'text-white' : 'text-slate-400 group-hover:text-blue-950'}`} />
                    <span>Home</span>
                </button>
                <button 
                    onClick={() => onViewChange('favourites')}
                    className={`w-full group flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${currentView === 'favourites' ? 'bg-blue-950 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-950'}`}
                >
                    <HiHeart className={`mr-3 text-xl ${currentView === 'favourites' ? 'text-white' : 'text-slate-400 group-hover:text-blue-950'}`} />
                    <span>Favourite</span>
                </button>
            </nav>

            <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-4 px-2 mb-8">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-blue-950 font-black text-lg border-2 border-white shadow-sm">
                        {user?.fullname.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-blue-950 truncate leading-none mb-1">{user?.fullname}</p>
                        <div className="flex items-center gap-1.5 shadow-sm bg-slate-100 w-fit px-2 py-0.5 rounded-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black">{user?.role} Access</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleLogout}
                    className="w-full group flex items-center justify-center space-x-2 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-600 transition-all duration-300 active:scale-95"
                >
                    <HiLogout className="text-lg" />
                    <span>Secure Logout</span>
                </button>
            </div>
        </aside>
      </>
    );
};

export default SideNav;
