export const getLocalDetails = (key) => {
  return localStorage.getItem(key);
}

export const setLocalDetails = (key, val) => {
  localStorage.setItem(key, val);
}

export const clearLocalDetails = (key) => {
  localStorage.removeItem(key);
}