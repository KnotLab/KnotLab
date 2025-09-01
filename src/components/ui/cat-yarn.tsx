import * as React from "react";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

type Props = {
  catSrc: string;
  catWidth?: number;        // px
  ballStart?: number;       // px diameter at top
  ballEnd?: number;         // px diameter near bottom
  color?: string;           // string/ball color
  topOffset?: number;       // px from top (clear your sticky header)
  rightOffset?: number;     // px from right
  hideBelow?: "md" | "lg" | "xl";
  ballOffsetX?: number;
};

export function CatYarn({
  catSrc,
  catWidth = 180,
  ballStart = 64,
  ballEnd = 28,
  color = "#b45f41",
  topOffset = 96,
  rightOffset = 16,
  hideBelow = "lg",
}: Props) {
  const [progress, setProgress] = React.useState(0);
  const [vh, setVh] = React.useState<number>(typeof window !== "undefined" ? window.innerHeight : 800);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => setVh(window.innerHeight);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(clamp01(max > 0 ? window.scrollY / max : 0));
    };

    onResize(); onScroll();
    window.addEventListener("resize", onResize);
    if (!reduce) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll as any);
    };
  }, []);

  // Box size for our mini scene
  const boxW = Math.max(catWidth + 40, 260);
  const boxH = vh - topOffset - 24; // leave a bit of breathing room

  // Vertical rope: from near the cat's paw downwards
  const pawX = boxW - Math.round(catWidth * 0.45) - 35.51;
  const pawY = Math.round(catWidth * 0.5);
  const maxRope = Math.max(140, boxH - pawY - 80);
  const ropeLen = Math.round(lerp(100, maxRope, progress));

  const minLen = 100;
  const ropeT = clamp01((ropeLen - minLen) / Math.max(1, maxRope - minLen)); // 0..1
  const bounceImpulse = -lerp(300, 1100, ropeT); // px/s (more negative = higher bounce)


  const ballSize = Math.max(12, Math.round(lerp(ballStart, ballEnd, progress)));
  const ballX = pawX;
  const ballY = pawY + ropeLen;

  // Path control point for a cute curve
  const cx = Math.round((pawX + ballX) / 2);
  const cy = Math.round((pawY + ballY) / 2 - 40);

  const hideCls =
    hideBelow === "xl" ? "hidden xl:block" :
    hideBelow === "lg" ? "hidden lg:block" :
    hideBelow === "md" ? "hidden md:block" : "";

  // ========= Bounce State & Physics =========
  const [bounceY, setBounceY] = React.useState(0); // negative = up
  const rafRef = React.useRef<number | null>(null);
  const phys = React.useRef({ running: false, v: 0, y: 0, last: 0 });

  const startBounce = React.useCallback((impulse = -900) => {
    const p = phys.current;
    if (p.running) return;
    p.running = true;
    p.v = impulse;             // upward kick
    p.y = 0;                   // offset from rest (0 = at ballY)
    p.last = performance.now();

    const gravity = 2000;      // px/s^2
    const restitution = 0.55;  // bounciness (0.3 = thud, 0.8 = springy)
    const stopV = 60;          // stop thresholds
    const stopY = 2;

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - p.last) / 1000);
      p.last = now;

      p.v += gravity * dt;
      p.y += p.v * dt;

      // floor at rest position (y >= 0)
      if (p.y > 0) {
        p.y = 0;
        p.v = -p.v * restitution;
      }

      setBounceY(p.y);

      if (Math.abs(p.v) < stopV && Math.abs(p.y) < stopY) {
        p.running = false;
        setBounceY(0);
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  React.useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const ballYBounce = ballY + bounceY;

  return (
    <div
      aria-hidden
      className={[
        hideCls,
        "fixed z-30 pointer-events-none select-none",
        "border-0 rounded-none shadow-none",
      ].join(" ")}
      style={{
        top: topOffset,
        right: rightOffset,
        width: boxW,
        height: boxH,
      }}
    >
      {/* Rope + ball */}
      <svg viewBox={`0 0 ${boxW} ${boxH}`} width={boxW} height={boxH} className="block absolute inset-0 z-10">
        <path
          d={`M ${pawX} ${pawY} Q ${cx} ${cy} ${ballX} ${ballYBounce}`}   // CHANGED: ballY → ballYBounce
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: "none" }}       // rope is not interactive
        />
        <g
          transform={`translate(${ballX}, ${ballYBounce})`}
          onClick={() => startBounce(bounceImpulse)}   // ← was startBounce()
          style={{ pointerEvents: "auto", cursor: phys.current.running ? "default" : "pointer", touchAction: "manipulation" }}
        >
          <circle r={ballSize / 2} fill={color} />
          <path d={`M ${-ballSize/3} ${-ballSize/2.5} q ${ballSize/3} ${ballSize/3} 0 ${ballSize/1.6}`}
                fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
          <path d={`M ${-ballSize/6} ${-ballSize/2.5} q ${ballSize/3} ${ballSize/3} 0 ${ballSize/1.6}`}
                fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" />
          {/* slightly bigger hit area for easy clicks */}
          <circle r={Math.max(ballSize / 2 + 12, 24)} fill="transparent" />
        </g>
      </svg>

      {/* Cat at top-right */}
      <img
        src={catSrc}
        alt=""
        draggable={false}
        className="absolute right-0 top-0 z-0 block object-contain border-0 rounded-none shadow-none"
        style={{ width: catWidth, height: "auto" }}
      />
    </div>
  );
}
