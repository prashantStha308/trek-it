# Trek-It - Features

This folder is a repository to all the features that have been or are to be impleted in the Trek-It project.

## Feature-Based folder structure
A feature-based folder structure was selected to enforce SRP, this also makes it possible for contributors to take on one feature and work on it without affecting other features, possibly avoiding unnecessary merge conflicts.

## Folder Contents
Each feature folder contains the following files:

- `[feature].routes.js` — defines the API endpoints for the feature
- `[feature].controller.js` — handles incoming requests and sends responses
- `[feature].service.js` — contains the core business logic
- May also include helpers or additinal content depending on the feature.

# Folder Structure
```
features
├── auth
│    ├── auth.controller.js
│    ├── auth.routes.js
│    └── auth.service.js
├── availability
│    ├── availability.controller.js
│    ├── availability.routes.js
│    └── availability.service.js
├── bookings
│    ├── bookings.controller.js
│    ├── bookings.routes.js
│    └── bookings.service.js
├── chat
│    ├── chat.controller.js
│    ├── chat.gateway.js
│    ├── chat.routes.js
│    └── chat.service.js
├── guides
│    ├── guides.controller.js
│    ├── guides.routes.js
│    └── guides.service.js
├── notifications
│    ├── notifications.controller.js
│    ├── notifications.routes.js
│    └── notifications.service.js
├── payments
│    ├── payments.controller.js
│    ├── payments.routes.js
│    └── payments.service.js
├── README.md
├── recommendations
│    ├── recommendations.controller.js
│    ├── recommendations.routes.js
│    └── recommendations.service.js
├── reviews
│    ├── reviews.controller.js
│    ├── reviews.routes.js
│    └── reviews.service.js
└── users
    ├── users.controller.js
    ├── users.routes.js
    └── users.service.js
```