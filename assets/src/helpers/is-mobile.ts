export type MobilePlatform =
  | "Android"
  | "BlackBerry"
  | "iOS"
  | "Opera"
  | "Windows"
  | "unknown";

const isMobile = {
  Android: function (): RegExpMatchArray | null {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function (): RegExpMatchArray | null {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function (): RegExpMatchArray | null {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function (): RegExpMatchArray | null {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function (): RegExpMatchArray | null {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function (): MobilePlatform {
    if (isMobile.Android()) return "Android";
    if (isMobile.BlackBerry()) return "BlackBerry";
    if (isMobile.iOS()) return "iOS";
    if (isMobile.Opera()) return "Opera";
    if (isMobile.Windows()) return "Windows";
    return "unknown";
  },
};

export default function getMobilePlatform(): MobilePlatform {
  return isMobile.any();
}
