# Scoreboard API Service Specification

## Overview

This document specifies a backend API module responsible for managing a **real-time scoreboard** that displays the **top 10 users by score**.

Users earn points by completing actions on the website. Upon action completion, the frontend dispatches an API request to the application server to update the user’s score. The system must ensure **secure, authorized, and tamper-resistant score updates**, while supporting **live scoreboard updates**.

This document is intended to be used by a **backend engineering team** for implementation.

---

## Goals

- Maintain an accurate, persistent scoreboard
- Support real-time updates to connected clients
- Prevent unauthorized or malicious score manipulation
- Ensure scalability and clear separation of responsibilities

---

## Non-Goals (Out of Scope)

- User authentication UI (login, signup)
- Frontend implementation
- Definition of the user “action” logic
- Anti-cheat heuristics beyond basic authorization and validation

---

## Actors

| Actor            | Description                                        |
| ---------------- | -------------------------------------------------- |
| User             | Performs actions on the website                    |
| Frontend Client  | Sends API requests to update score                 |
| API Server       | Validates, authorizes, and processes score updates |
| Database         | Stores user scores                                 |
| Realtime Channel | Pushes live leaderboard updates                    |

---

## High-Level System Responsibilities

### API Server

- Authenticate incoming requests
- Authorize score updates
- Validate action completion
- Update user scores
- Compute top 10 leaderboard
- Broadcast real-time updates

### Database

- Persist user score state
- Support leaderboard queries

### Realtime Layer

- Push updated leaderboard to connected clients
- Keep clients synchronized without polling

---

## Core Execution Flow

1. User completes an action on the website
2. Frontend sends a score update request to the API server
3. API server authenticates the request
4. API server validates the action
5. API server updates the user’s score
6. API server recalculates the top 10 leaderboard
7. API server broadcasts the updated leaderboard to clients

---

## Execution Flow Diagram

```
flowchart TD
    User --> Frontend["Frontend Client"]
    Frontend --> |POST /scores/increment| APIServer["API Server"]
    APIServer --> Auth["Authorization Middleware"]
    Auth --> ScoreService["Score Service"]
    ScoreService --> DB["Database"]
    ScoreService --> Cache["Leaderboard Cache"]
    Cache --> Realtime["Realtime Channel (WebSocket / SSE)"]
```

---

## API Endpoints

1. ### Increment User Score

#### Endpoint:

```
POST /scores/increment
```

#### Description:

Triggered when a user completes an action. Increases the user’s score by a server-defined amount.

#### Request Headers:

Authorization: Bearer <token>

#### Request Body:

```
{
  "actionId": "string"
}
```

Note: The client must not send score values. All score calculations are performed server-side.

#### Response:

```
{
  "userId": "string",
  "newScore": 120
}
```

2. ### Get Top 10 Leaderboard

#### Endpoint:

```
GET /leaderboard/top
```

#### Description:

Returns the current top 10 users by score. Used for initial page load or fallback if realtime connection fails.

#### Response

```
[
  { "userId": "u1", "score": 300 },
  { "userId": "u2", "score": 280 }
]
```

---

## Security Model

### Authentication

All score mutation endpoints require authenticated requests

Authentication mechanism (JWT, session, API gateway) is assumed to exist externally

### Authorization

Only authenticated users can update their own scores

Authorization is enforced at the API boundary via middleware

### Abuse Prevention

Server-side score calculation only

Action validation before score update

Rate limiting on score update endpoint

No client-provided score values

---

## Data Model

```
User
- id
- score
- updatedAt
```

Leaderboard is derived from user scores and does not require a separate table.

---

## Real-Time Update Strategy

- API server broadcasts leaderboard updates after score changes

- Realtime transport may be:

- WebSockets

- Server-Sent Events (SSE)

- Clients subscribe on page load

- Only top 10 leaderboard is broadcast to reduce payload size

---

## Failure Handling

- Unauthorized requests return 401 / 403

- Invalid action attempts return 400

- Database failures return 500

- Realtime failures do not block score updates

---

## Assumptions

- Users are already authenticated before performing actions

- Each action completion maps to a single score increment

- Score increment value is fixed or configurable server-side

- Leaderboard size is limited to top 10

- Realtime infrastructure is available

---

## Future Improvements

- Redis-based leaderboard for faster ranking

- Idempotency keys to prevent duplicate score updates

- Distributed locking for high-concurrency updates

- Advanced cheat detection heuristics

- Horizontal scaling with message queues

- Per-action scoring rules

---

## Summary

This module provides a secure, scalable, and real-time capable backend service for managing a live scoreboard. It enforces strict authorization, avoids trusting client input, and is designed to be extensible for future enhancements.
