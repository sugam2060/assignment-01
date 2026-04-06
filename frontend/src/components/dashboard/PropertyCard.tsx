import { HiThumbUp, HiThumbDown } from 'react-icons/hi';
import React from 'react';

interface Property {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

interface PropertyCardProps {
  property: Property;
  isFavourite: boolean;
  onToggleFavourite: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavourite, onToggleFavourite }) => {
  const formattedDate = new Date(property.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full border border-slate-100">
      <div className="relative h-64 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          src={property.image_url} 
          alt={property.title} 
        />
        
        <div className="absolute bottom-4 left-4 bg-blue-950/80 backdrop-blur-sm text-white text-[9px] px-2 py-1 font-bold uppercase tracking-widest rounded-sm">
          {formattedDate}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-blue-950 leading-snug group-hover:text-blue-800 transition-colors uppercase tracking-tight">{property.title}</h3>
        </div>
        <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1 italic font-light leading-relaxed">"{property.description}"</p>
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest font-black text-slate-400">Architectural Status</span>
              <span className="text-[10px] font-bold text-blue-950">{isFavourite ? 'FAVOURED' : 'PENDING'}</span>
           </div>
           
           <button 
                onClick={() => onToggleFavourite(property.id)}
                className={`p-2.5 rounded-full transition-all duration-300 active:scale-90 flex items-center justify-center border-2 ${
                    isFavourite 
                    ? 'bg-blue-950 border-blue-950 text-white shadow-lg' 
                    : 'bg-white border-slate-200 text-blue-950 hover:border-blue-950 shadow-sm'
                }`}
                title={isFavourite ? "Dislike" : "Like"}
           >
                {isFavourite 
                    ? <HiThumbDown className="text-lg" /> 
                    : <HiThumbUp className="text-lg" />
                }
           </button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
