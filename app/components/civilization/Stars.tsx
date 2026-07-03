const stars = Array.from({ length: 90 }, (_, index) => ({
  id: index,
  x: (index * 37) % 100,
  y: (index * 61) % 100,
  size: index % 5 === 0 ? 2 : index % 3 === 0 ? 1.4 : 1,
  delay: `${(index % 12) * 0.4}s`,
  duration: `${5 + (index % 8)}s`,
}));

export default function ConstellationStars() {
  return (
    <div className="constellation-stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="constellation-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}