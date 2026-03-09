# Models
To keep data predictable, Mongoose ORM is used to define data structures.
This folder is divided into three sub-folders, each responsible for a certain category of model.

## Folder Structure
```
├── models
│ ├── chat
│ │   ├── conversation.js
│ │   └── message.js
│ ├── core
│ │   ├── booking.js
│ │   ├── package.js
│ │   └── payment.js
│ │	  └── review.js
│ ├── model.js
│ ├── README.md
│ ├── requests
│ │   ├── collabRequest.js
│ │   └── customRequest.js
│ └── user
│     ├── admin.js
│     ├── guide.js
│     ├── tourist.js
│     └── user.js
```

## chat
Models required for the conversation and messaging functionality.

## core
The core business models of the application.

## requests
Models for custom package request and collaboration request.

## user
Models for all user roles. Built using Mongoose discriminators, all roles share a base schema defined in `user.js`, with role-specific fields extended in `admin.js`, `guide.js`, and `tourist.js`. All documents are stored in a single `users` collection, identified by a `role` field.

## model.js
Acts as a barrel file at the root of this folder. Imports all models and exports them through a single source, so the rest of the codebase imports from one place rather than individual files.