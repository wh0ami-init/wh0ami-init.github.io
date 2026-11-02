import { useState } from "react";
import { site } from "../data";

// Looks for your picture in the "public" folder.
// Save it as photo.jpg (or photo.jpeg / photo.png / photo.webp).
const candidates = ["photo.jpg", "photo.jpeg", "photo.png", "photo.webp"];

export default function Photo() {
  const [i, setI] = useState(0);
  const failed = i >= candidates.length;

  if (failed) {
    return (
      <div className="photo-placeholder">
        <span className="photo-initials">{site.initials}</span>
        <span className="photo-hint">
          Add your picture
          <br />
          public/photo.jpg
        </span>
      </div>
    );
  }

  return (
    <img
      src={`${import.meta.env.BASE_URL}${candidates[i]}`}
      alt={`${site.name}, ${site.role} in ${site.location}`}
      onError={() => setI(i + 1)}
      draggable="false"
    />
  );
}
