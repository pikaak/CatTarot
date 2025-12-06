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
 * 구글 애드센스 반응형 배너 컴포넌트
 * - 광고 자체의 최소 높이만 이 컴포넌트에서 관리
 * - 위치/여백/노출 조건은 상위(ca-tarot.tsx 등)에서 결정
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
        // 광고 “자체”가 차지하는 최소 높이
        minHeight: "60px",
      }}
      data-ad-client="ca-pub-5508808494020679"
      data-ad-slot="1864776239"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
