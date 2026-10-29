# GurbaniScroll Railway backend

A minimal Node.js HTTP API with no third-party dependencies.

## Railway setup
1. Create a Railway service from the GitHub repository.
2. In the service Settings, set **Root Directory** to `/backend`.
3. Railway should detect Node.js and run `npm start`. If necessary, set Start Command to `npm start`.
4. Generate a public Railway domain under Networking.
5. Visit `https://YOUR-DOMAIN/health` and check for `{"status":"ok"}`.

## Routes
- `GET /health`
- `GET /api/verses`
- `POST /api/ask` with JSON `{"question":"How do I handle worry?"}`

## Limitations
This is a demonstration backend with a small seed dataset and **no live OpenAI integration**. The Expo frontend currently uses its own local data and is not connected to this API. The service is publicly reachable if you generate a Railway domain. Before exposing AI endpoints or storing user information, add authentication, rate limiting, abuse protection, verified content, and privacy controls. Do not store API keys in GitHub.
