// Ye 2 generic functions poore app mein reuse ho sakti hain —
// kisi bhi data ko localStorage mein save/load karne ke liye.

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Agar localStorage disabled ho (kuch private browsers mein),
    // app crash nahi honi chahiye — bas chup-chap ignore karo
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    // Agar kuch save nahi hua, ya JSON.parse fail ho, fallback do
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}
