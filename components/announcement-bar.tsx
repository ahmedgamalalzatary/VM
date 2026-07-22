import type { CSSProperties } from "react";
import { NOTICES } from "@/lib/offers";

/**
 * Standing notices, running past rather than stacking up.
 *
 * Pure CSS — the second pass is a duplicate the track scrolls onto so the loop
 * has no seam. Speed matters more than it looks: the four notices come to
 * roughly 1,100px, so 16s puts them past at about 70px/s, which reads as
 * moving. Much slower and the bar looks like it is simply sitting there.
 */
export function AnnouncementBar() {
  return (
    <div className="ticker overflow-hidden bg-ink py-2 text-paper">
      <div
        className="ticker-track"
        style={{ "--ticker-duration": "16s" } as CSSProperties}
      >
        {[0, 1].map((pass) => (
          <ul
            key={pass}
            className={`ticker-pass flex shrink-0${
              pass === 1 ? " ticker-pass-clone" : ""
            }`}
            aria-hidden={pass === 1}
          >
            {NOTICES.map((notice) => (
              <li key={notice} className="t-spec flex items-center px-6">
                <span className="mr-6 text-azure" aria-hidden>
                  /
                </span>
                {notice}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
