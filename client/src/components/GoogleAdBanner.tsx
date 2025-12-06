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
 * - data-ad-client, data-ad-slot 은 애드센스에서 발급받은 값으로 교체할 것
 */
export default function GoogleAdBanner({ className = "" }: GoogleAdBannerProps) {
  useEffect(() => {
    try {
      // 광고 로드
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // 개발 중 중복 호출 등으로 에러가 날 수 있음 → 무시해도 됨
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block", width: "100%" }} // 부모 div 가로폭에 맞춤
      data-ad-client="ca-pub-5508808494020679"
      data-ad-slot="1864776239"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
