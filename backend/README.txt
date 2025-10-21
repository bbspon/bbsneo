# BBS NEO — Backend Monorepo (Complete Skeleton)

This zip contains 10 NestJS microservices + API Gateway + infra scaffolding.

## Services (ports)
- api-gateway (3101) → routes /v1/<service>/* to each service locally
- identity (3102)
- ott (3103)
- messenger (3104)
- social (3105)
- wallet (3106)
- revenue-cms (3107)
- moderation (3108)
- search-rec (3109)
- admin (3110)

## Infra
- MongoDB, Redis, MinIO, Qdrant via docker-compose (infra/docker-compose.yml)

## Quick Start
1) Install: Node.js 20+, Docker Desktop
2) Extract this zip
3) In a terminal, run:
   npm install
   npm run compose:up
4) Start any service in separate terminals, e.g.:
   npm run dev:gateway
   npm run dev:identity
   # ...and so on

## Test
- GET http://localhost:3101/v1/identity/  → { service: 'identity', status: 'ok' }
- GET http://localhost:3102/              → direct health of identity

## Notes
- This is a skeleton. Add your modules/controllers per service.
- Environment samples are in each service's .env.example.