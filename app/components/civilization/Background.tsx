import ConstellationStars from "./Stars";
import ConstellationNebula from "./Nebula";

export default function ConstellationBackground() {
  return (
    <div className="constellation-background" aria-hidden="true">
      <div className="constellation-bg-gloss" />

      <ConstellationNebula />
      <ConstellationStars />

      <div className="constellation-bg-horizon" />
    </div>
  );
}