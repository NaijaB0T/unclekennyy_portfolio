#!/bin/bash
# Build script for Cloudflare Pages

# Install dependencies
npm ci

# Build the site
npm run build

# Output success message
echo "Build completed successfully!"
