import React, { useEffect, useState } from 'react';
import { HiHeart } from 'react-icons/hi';
import SideNav from '../components/dashboard/SideNav';
import TopBar from '../components/dashboard/TopBar';
import PropertyCard from '../components/dashboard/PropertyCard';
import { getProperties, getFavourites, addFavourite, removeFavourite } from '../api';

const DashboardPage: React.FC = () => {
    const [view, setView] = useState<'all' | 'favourites'>('all');
    const [properties, setProperties] = useState<any[]>([]);
    const [favourites, setFavourites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [props, favs] = await Promise.all([getProperties(), getFavourites()]);
            setProperties(props);
            setFavourites(favs);
        } catch (err) {
            console.error("Error fetching dashboard data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleViewChange = async (newView: 'all' | 'favourites') => {
        setView(newView);
        // User asked to "fetch" on button click
        if (newView === 'all') {
            const props = await getProperties();
            setProperties(props);
        } else {
            const favs = await getFavourites();
            setFavourites(favs);
        }
    };

    const handleToggleFavourite = async (propertyId: number) => {
        const isFavourite = favourites.some((f: any) => f.property.id === propertyId);
        try {
            if (isFavourite) {
                await removeFavourite(propertyId);
            } else {
                await addFavourite(propertyId);
            }
            // Refresh favourites list after toggle
            const favs = await getFavourites();
            setFavourites(favs);
        } catch (err) {
            console.error("Error toggling favorite", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="animate-pulse text-2xl font-bold text-primary tracking-tighter">The Estate is preparing your portfolio...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            <SideNav 
                currentView={view} 
                onViewChange={handleViewChange} 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <main className="md:ml-72 min-h-screen bg-surface">
                <TopBar onMenuClick={() => setIsSidebarOpen(true)} />
                
                <div className="px-8 pb-12">
                    {/* Dynamic Section based on current View */}
                    <section className="mt-8 mb-10 transition-all duration-500">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-outline-variant/30 pb-8">
                            <div>
                                <h2 className="text-3xl font-black text-on-surface font-headline tracking-tighter mb-2">
                                    {view === 'all' ? 'Featured Estates' : 'Your Private Collection'}
                                </h2>
                                <p className="text-sm text-on-surface-variant font-body max-w-lg">
                                    {view === 'all' 
                                        ? 'Discover the pinnacle of architectural authority and exclusive curated listings.' 
                                        : 'A handpicked selection of properties curated for your consideration.'}
                                </p>
                            </div>
                        </div>
                        
                        {view === 'all' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {properties.map((prop) => (
                                    <PropertyCard 
                                        key={prop.id} 
                                        property={prop} 
                                        isFavourite={favourites.some((f: any) => f.property.id === prop.id)}
                                        onToggleFavourite={handleToggleFavourite}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {favourites.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {favourites.map((fav) => (
                                            <PropertyCard 
                                                key={`fav-${fav.id}`} 
                                                property={fav.property} 
                                                isFavourite={true}
                                                onToggleFavourite={handleToggleFavourite}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-3xl bg-surface-container-lowest min-h-[400px] text-center p-12 shadow-sm">
                                        <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-6 shadow-inner">
                                            <HiHeart className="text-primary text-4xl" />
                                        </div>
                                        <h4 className="font-headline font-black text-on-surface text-xl mb-2">Your private gallery is currently empty</h4>
                                        <p className="text-sm text-on-surface-variant mb-8 max-w-[280px]">Begin your journey by exploring the Featured Estates and saving your initial picks.</p>
                                        <button 
                                            onClick={() => setView('all')}
                                            className="px-8 py-4 bg-primary text-on-primary rounded-xl text-xs font-bold uppercase tracking-widest hover:shadow-primary/40 hover:shadow-2xl transition-all active:scale-95"
                                        >
                                            Explore Modern Estates
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </section>

                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
