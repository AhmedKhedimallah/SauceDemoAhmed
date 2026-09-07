#!/usr/bin/env bash
#
# One-shot WSL / Linux setup for this Cypress project.
# Run from the project root, inside your WSL terminal:
#
#   bash scripts/setup-wsl.sh
#
# It reinstalls dependencies for the CURRENT platform (Linux), so it also
# repairs the "esbuild installed for another platform" error that happens
# when node_modules was previously installed from Windows.
#
set -euo pipefail

echo "==> Checking you are running under Linux/WSL"
if [[ "$(uname -s)" != "Linux" ]]; then
  echo "!! This script must be run inside WSL/Linux, not Windows." >&2
  exit 1
fi

echo "==> Removing any cross-platform node_modules"
rm -rf node_modules

echo "==> Installing npm dependencies (Linux binaries)"
npm install

echo "==> Installing the Cypress binary"
npx cypress install

echo "==> Verifying Cypress"
npx cypress verify

echo "==> Type-checking"
npx tsc --noEmit

echo ""
echo "Setup complete. Run the suite with:"
echo "  npm run cy:run        # all specs"
echo "  npm run test:cart     # only @cart"
echo "  npm run test:filter   # only @filter"
