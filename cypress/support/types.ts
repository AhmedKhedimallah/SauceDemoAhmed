/** Shared types for fixtures, keeping step definitions type-safe. */

export interface User {
  username: string;
  password: string;
}

/**
 * Shape of cypress/fixtures/login.data.json.
 * One fixture file per feature, with internal sections (users / messages).
 */
export interface LoginData {
  /** Keys must match the "users" section of login.data.json */
  users: Record<string, User>;
  /** Keys must match the "messages" section of login.data.json */
  messages: Record<string, string>;
}
