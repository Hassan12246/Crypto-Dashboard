import { loadFromStorage, saveToStorage } from "./localStorage";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

const USERS_KEY = "crypto_dashboard_users";
const AUTH_USER_KEY = "crypto_dashboard_auth_user";
const DEMO_EMAIL = "demo@cryptodashboard.com";
const DEMO_PASSWORD = "Demo1234";

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function ensureDemoUser(): Promise<void> {
  const users = loadFromStorage<StoredUser[]>(USERS_KEY, []);

  if (users.some((user) => user.email === DEMO_EMAIL)) {
    return;
  }

  const demoUser: StoredUser = {
    id: "demo-user",
    name: "Demo User",
    email: DEMO_EMAIL,
    passwordHash: await hashPassword(DEMO_PASSWORD),
  };

  saveToStorage(USERS_KEY, [...users, demoUser]);
}

export async function signup(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; message: string }> {
  const users = loadFromStorage<StoredUser[]>(USERS_KEY, []);

  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const passwordHash = await hashPassword(password);

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
  };

  saveToStorage(USERS_KEY, [...users, newUser]);

  return {
    success: true,
    message: "Account created successfully.",
  };
}

export async function login(
  email: string,
  password: string,
  rememberMe: boolean,
): Promise<{ success: boolean; message: string }> {
  await ensureDemoUser();

  const users = loadFromStorage<StoredUser[]>(USERS_KEY, []);

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);

  const user = users.find(
    (item) =>
      item.email === normalizedEmail && item.passwordHash === passwordHash,
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const authUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));

  window.dispatchEvent(new Event("auth-change"));

  return {
    success: true,
    message: "Login successful.",
  };
}

export function getCurrentUser(): AuthUser | null {
  try {
    const localUser = localStorage.getItem(AUTH_USER_KEY);

    if (localUser) {
      return JSON.parse(localUser) as AuthUser;
    }

    const sessionUser = sessionStorage.getItem(AUTH_USER_KEY);

    if (sessionUser) {
      return JSON.parse(sessionUser) as AuthUser;
    }

    return null;
  } catch {
    return null;
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);

  window.dispatchEvent(new Event("auth-change"));
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
