import { Star } from "lucide-react";

function RatingStars({ rating }: { rating: number }) {
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(filledStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ))}
      {halfStar && <Star className="w-5 h-5 text-yellow-400 fill-yellow-200" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
}
export default RatingStars