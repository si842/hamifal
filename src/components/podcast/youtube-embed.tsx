"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
  autoplayOnView?: boolean;
};

function commandPlayer(
  iframe: HTMLIFrameElement,
  func: "playVideo" | "pauseVideo",
) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "*",
  );
}

export function YouTubeEmbed({
  videoId,
  title,
  className,
  autoplayOnView = false,
}: YouTubeEmbedProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const startedRef = useRef(false);
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (!autoplayOnView) return;

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const iframe = iframeRef.current;
        if (!entry || !iframe) return;

        if (entry.isIntersecting) {
          if (!startedRef.current) {
            startedRef.current = true;
            setAutoplay(true);
            return;
          }
          commandPlayer(iframe, "playVideo");
          return;
        }

        if (startedRef.current) {
          commandPlayer(iframe, "pauseVideo");
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [autoplayOnView, videoId]);

  const src = new URL(`https://www.youtube.com/embed/${videoId}`);
  src.searchParams.set("playsinline", "1");
  src.searchParams.set("rel", "0");
  if (autoplayOnView) {
    src.searchParams.set("enablejsapi", "1");
    src.searchParams.set("mute", "1");
  }
  if (autoplay) {
    src.searchParams.set("autoplay", "1");
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative aspect-video w-full overflow-hidden border border-border bg-background",
        className,
      )}
    >
      <iframe
        ref={iframeRef}
        src={src.toString()}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
