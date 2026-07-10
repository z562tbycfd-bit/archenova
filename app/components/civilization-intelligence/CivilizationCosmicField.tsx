import type { CSSProperties } from "react";

const stars = Array.from({ length: 72 }, (_, index) => ({
  id: index,
  left: (index * 37 + 11) % 100,
  top: (index * 53 + 7) % 100,
  size: 1 + ((index * 7) % 3),
  delay: -((index * 0.43) % 8),
  duration: 5 + ((index * 11) % 7),
}));

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: (index * 29 + 8) % 100,
  top: (index * 41 + 13) % 100,
  delay: -((index * 1.7) % 18),
  duration: 20 + ((index * 7) % 16),
  drift: -28 + ((index * 13) % 56),
}));

export default function CivilizationCosmicField() {
  return (
    <div className="ci2-cosmos" aria-hidden="true">
      <div className="ci2-nebula ci2-nebula-blue" />
      <div className="ci2-nebula ci2-nebula-gold" />
      <div className="ci2-nebula ci2-nebula-violet" />

      <div className="ci2-star-field">
        {stars.map((star) => (
          <span
            key={star.id}
            className="ci2-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="ci2-particle-field">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="ci2-particle"
            style={
              {
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                "--ci-particle-drift": `${particle.drift}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}