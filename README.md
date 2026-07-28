# Redis Cache with NestJS, PostgreSQL, Prisma & Docker

> A hands-on learning project focused on mastering **Redis caching** in **NestJS**, using **Docker** for both development and production-ready environments.

## About

This repository documents my journey of learning how to integrate Redis into a real NestJS application.

Instead of only learning the theory, every concept is implemented in code, starting from a basic REST API and gradually evolving into a production-style architecture.

The project also serves as a reference for working with Docker, Docker Compose, PostgreSQL, Prisma ORM, and Redis together.

---

## Learning Goals

The main objective is to understand:

- How Redis works
- Why caching exists
- Cache-aside pattern
- Cache invalidation
- TTL (Time To Live)
- Automatic and manual caching in NestJS
- Redis data structures
- Sessions
- Rate limiting
- Pub/Sub
- Background jobs with BullMQ
- Production Redis architecture

The final goal is to build a production-ready NestJS application that uses Redis effectively.

---

## Technologies

- NestJS
- Prisma ORM 7
- PostgreSQL
- Redis
- Docker
- Docker Compose
- TypeScript

---

## Architecture

### Current Architecture

```text
Client
   │
   ▼
NestJS API
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

### Target Architecture

```text
             Client
                │
                ▼
          NestJS API
           │      │
           │      ▼
           │    Redis
           │      │
           └──────┘
                │
                ▼
           PostgreSQL
```

Redis will act as a cache layer while PostgreSQL remains the source of truth.

---

## Docker Setup

The project is fully containerized using Docker Compose.

Containers:

- NestJS API
- PostgreSQL
- Redis

Benefits:

- Consistent development environment
- Easy setup
- Isolated services
- Simple networking between containers

Run everything with:

```bash
docker compose up --build
```

---

## Development Workflow

The project is developed using Docker.

Typical workflow:

1. Edit code on the host machine.
2. Docker synchronizes the changes into the NestJS container using mounted volumes.
3. NestJS reloads automatically in development mode.
4. Prisma migrations are executed inside the NestJS container because it has direct access to the PostgreSQL container through the Docker network.

---

## Learning Roadmap

- Docker & Docker Compose
- PostgreSQL
- Prisma ORM 7
- Prisma Migrations
- Prisma Studio
- NestJS REST API
- DTO Validation
- Product Module
- Redis Installation
- Cache-Aside Pattern
- Redis Cache Service
- Product Caching
- Cache Invalidation
- TTL (Time To Live)
- CacheInterceptor
- Redis Data Structures
- Sessions
- Rate Limiting
- Pub/Sub
- BullMQ
- Production Docker Configuration
- Production Redis Best Practices

---

## Repository Purpose

This repository is both:

- A personal learning journal.
- A practical reference for building Redis-powered NestJS applications using modern backend technologies.

Every feature is implemented incrementally to understand not only **how** it works, but also **why** it is designed that way.