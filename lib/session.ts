const COOKIE_NAME = "hasSession";
const MAX_AGE = 7 * 24 * 60 * 60; // 7 días en segundos

function cookieAttributes() {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  return `path=/; max-age=${MAX_AGE}; SameSite=Lax${secure}`;
}

export const setSessionCookie = () => {
  document.cookie = `${COOKIE_NAME}=1; ${cookieAttributes()}`;
};

export const clearSessionCookie = () => {
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
};
