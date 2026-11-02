import { skills } from "../data";

export default function Marquee() {
  const row = [...skills, ...skills];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <div className="marquee-row" key={n}>
            {row.map((s, i) => (
              <span key={i}>
                {s}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
