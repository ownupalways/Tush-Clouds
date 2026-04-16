import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheck, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Testimonial, Review } from "@/types/admin";

interface CardProps {
  item: Testimonial | Review;
  isActionLoading: boolean;
  // FIX: Use Partial to allow only valid keys for updates
  onUpdate: (id: string, updates: Partial<Testimonial | Review>) => void;
  onDelete: (id: string) => void;
}

export const DashboardCard = ({ item, isActionLoading, onUpdate, onDelete }: CardProps) => {
  // Type Guard: Check if it's a Testimonial to safely access .featured
  const isTestimonial = "featured" in item;
  
  return (
    <div className="card flex flex-col justify-between p-4 border rounded-xl shadow-sm">
      <div>
        <div className="flex justify-between gap-2">
          <h3 className="text-lg font-bold truncate">{item.name}</h3>
          <div className="flex gap-2 shrink-0">
            {/* Approval Toggle */}
            <button
              disabled={isActionLoading}
              onClick={() => onUpdate(item._id, { approved: !item.approved })}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                item.approved 
                  ? "bg-brand-lemon/20 text-brand-lemon-700" 
                  : "bg-brand-green/10 text-brand-green"
              }`}
              title={item.approved ? "Unapprove" : "Approve"}
            >
              <FontAwesomeIcon icon={item.approved ? faTimes : faCheck} />
            </button>

            {/* Featured Toggle (Only for Testimonials) */}
            {isTestimonial && (
              <button
                disabled={isActionLoading}
                onClick={() => onUpdate(item._id, { featured: !item.featured })}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                  item.featured ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-400"
                }`}
                title={item.featured ? "Remove Featured" : "Make Featured"}
              >
                <FontAwesomeIcon icon={faStar} />
              </button>
            )}

            {/* Delete Action */}
            <button 
              onClick={() => onDelete(item._id)} 
              className="w-10 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              title="Delete Item"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>

        {/* Rating Display (Only for Reviews) */}
        {"rating" in item && (
          <div className="flex text-brand-lemon mt-1">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon 
                key={i} 
                icon={faStar} 
                className={i < item.rating ? "opacity-100" : "opacity-20"} 
              />
            ))}
          </div>
        )}

        {/* Content Display */}
        <p className="mt-3 text-text-secondary text-sm italic line-clamp-3">
          &quot;{"message" in item ? item.message : item.comment}&quot;
        </p>
      </div>
    </div>
  );
};
