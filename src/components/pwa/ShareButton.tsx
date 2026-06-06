"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
    const shareText = text ?? `Check out ${title} on CalcMaster`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share"
      className={`text-text-secondary hover:bg-surface hover:text-text flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check className="text-success h-4 w-4" /> Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" /> Share
        </>
      )}
    </button>
  );
}
