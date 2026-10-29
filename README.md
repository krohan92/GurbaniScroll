# GurbaniScroll Expo MVP

An early iOS/Android prototype built with Expo Router and React Native.

## Features
- Vertical Gurbani discovery feed
- Passage details with Gurmukhi, transliteration, plain-language summary and reflection
- Local bookmarks (AsyncStorage)
- Topic search
- Offline passage-matching Ask Gurbani prototype (not generative AI)

## Run on Windows
1. Install Node.js LTS and Expo Go on your iPhone.
2. Clone or download this repository.
3. Run `npm install`.
4. Run `npx expo install --fix` if Expo reports version mismatches.
5. Run `npx expo start`, then scan the QR code with your iPhone camera.
6. If your phone cannot connect, run `npx expo start --tunnel`.

## Architecture
This repository currently contains **only the Expo mobile frontend**. There is no deployed backend or Railway service yet. The offline Ask tab uses a four-passage seed set from `src/data.ts`. A future Railway API can provide authenticated scripture retrieval and optional AI explanations; never put AI API secrets into the mobile app.

## Important
Seed Gurbani text, Ang references, transliteration and summaries need verification against authoritative sources and qualified review before public launch. Summaries are not authoritative translations. This project is not yet production-ready.

## Safety
Do not commit `.env` files, private credentials, or `node_modules`.
