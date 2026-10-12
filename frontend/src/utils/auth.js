// Auth utility helpers
export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("placement_user") || "null");
  } catch {
    return null;
  }
};

export function saveSession(data) {
  localStorage.setItem("placement_token", data.token);
  localStorage.setItem("placement_user", JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem("placement_token");
  localStorage.removeItem("placement_user");
}
