export const COOKIE_CONSENT_KEY = "proteinlab_cookie_consent";
export const COOKIE_CONSENT_EVENT = "proteinlab:cookie-consent-changed";

export type CookieConsent = {
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
};

const DEFAULT_CONSENT: CookieConsent = {
  functional: true,
  analytics: false,
  advertising: false,
  timestamp: 0,
};

export function readCookieConsent(): CookieConsent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    return {
      functional: true,
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : 0,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function hasStoredCookieConsent() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
}

export function hasAnalyticsConsent() {
  return readCookieConsent().analytics;
}

export function saveCookieConsent(consent: Omit<CookieConsent, "timestamp">) {
  if (typeof window === "undefined") return;
  const value: CookieConsent = { ...consent, functional: true, timestamp: Date.now() };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent<CookieConsent>(COOKIE_CONSENT_EVENT, { detail: value }));
}
