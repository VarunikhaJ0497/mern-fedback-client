export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => setRating(star)}
        >★</span>
      ))}
    </div>
  );
}
