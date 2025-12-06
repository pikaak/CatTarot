import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdBannerProps {
  className?: string;
}

/**
 * 구글 애드센스 배너 컴포넌트
 */
export default function GoogleAdBanner({ className = "" }: GoogleAdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: "block",
        width: "100%",
        minHeight: "120px",   // ★ 반드시 필요: 광고 로딩 전 height:0 방지
      }}
      data-ad-client="ca-pub-5508808494020679"
      data-ad-slot="1864776239"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
