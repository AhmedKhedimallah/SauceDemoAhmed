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

export interface CheckoutInfo {
  firstname: string;
  lastname: string;
  zipcode: string;
}

/**
 * Shape of cypress/fixtures/information.data.json.
 * Same per-feature convention as LoginData (data / messages sections).
 */
export interface InformationData {
  /** Keys must match the "information" section of information.data.json */
  information: Record<string, CheckoutInfo>;
  /** Keys must match the "messages" section of information.data.json */
  messages: Record<string, string>;
}
