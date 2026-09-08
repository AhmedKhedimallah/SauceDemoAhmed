/** Small shared helpers used by page objects. */

/**
 * Convert a product name to the SauceDemo data-test slug.
 * e.g. "Sauce Labs Onesie" -> "sauce-labs-onesie".
 */
export const slugify = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");
