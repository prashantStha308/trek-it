# Custom Package

Custom package is for tourists who have explored options for a destination and wish to customize their travel experience. This allows tourists to customize not only their travel destinations but also align the experience with their preferred price range. It also enables access to options that may not be available in standard packages.

---

## How it works

There are two methods:

### 1. Tourist selects a guide

Tourist selects a guide and sends a custom package request with specific requirements. If the guide agrees to the requirements, they accept the request. After acceptance, both parties are connected to a chat room where they further discuss the details.

Note: Using a customPackageRequest is optional. The tourist may directly send a message to the guide, and the same negotiation flow continues.

---

### 2. Guide determination via system matching

The tourist submits a form containing their requirements. The system uses these fields to find matching guides.

- If matching guides are found, the request is sent to all eligible gudies.
    - If no guides are found, the system notifies the user and relaxes constraints to find the next best matches.
    - If this fallback is triggered, gender preference must still be respected, and age range must be tightly enforced.
- When one of the guides accepts the request, user is notified and further process takes place.

---

## Implementation details

### Data structures

- Update the `customRequest` model imported from `backend/src/models/index.js` to support the required workflow.
- Use `Package` imported from `backend/src/models/index.js` to create custom packages.
- User `Booking` imported from `backend/src/models/index.js` to create bookings.

---

## Action flow

### High-level flow

- User initiates a custom request via either method.
- Guide and tourist connect through chat and negotiate details.
- Once agreed, the guide creates a package with `type = "custom"`.

---

### Mid-level flow (Method 1: guide-selected flow)

- Tourist selects a guide.
- Tourist either:
    - sends a customRequest, or
    - sends a direct message

#### If customRequest is used:

- If the guide accepts:
    - request is moved to "accepted" state
    - process continues
    - a chat room is created or activated
- If the guide rejects:
    - request is moved to "rejected" state
    - tourist is notified
    - process ends
- If the guide is unresponsive for more than `ACCEPTANCE_PERIOD_HOUR` defined in `backend/src/constants/booking.constant.js`:
    - The process terminates and request is moved to "expired" state

#### If direct message is used:

- Negotiation happens directly in chat between tourist and guide
- Acceptance or rejection is handled manually within the conversation

---

### Package creation flow

- If the guide accepts in either case:
    - a new package is created with `type = "custom"`
    - the package includes both guide and tourist metadata

- After package creation:
    - both parties are notified using either `broadcastNotificationService` or `sendNotificationService` from `backend/src/features/notifications/notification.service.js`, depending on the use case

- The package details are shared with both guide and tourist

- Both parties must confirm the package details

- After confirmation from both sides:
    - a booking is created with status `confirmed`
    - payment is pending at this stage.
    - Tourists is sent a notification to submit payment within `ACCEPTANCE_PERIOD_HOUR`. Failure to do so will terminate the process and move the booking to "expired" stage.

---

### Mid-level flow (Method 2: system-matched guides)

- Tourist submits a form with custom requirements.
- The system processes the request and retrieves matching guides (vector search may be used if required).

#### If no matching guides are found:

- The system notifies the tourist.
- Constraints are relaxed to identify closest matches.
- Gender preference must remain strictly enforced.
- Age range must remain tightly enforced.

#### If matching guides are found:

- The request is sent to all matching guides.
- The tourist is notified that the request has been distributed.

- If no guide responds within `ACCEPTANCE_PERIOD_HOUR`:
    - request is moved to `expired` state
    - tourist is notified
    - process terminates

- If a guide accepts:
    - request is atomically moved to `accepted` state
    - `acceptedBy` is set to the guide's ID
    - all further acceptance attempts are rejected at database level

> NOTE: Acceptance must be handled using an atomic operation such as `findOneAndUpdate` with a status condition (`pending → accepted`) to prevent race conditions.

---

### After guide acceptance (Method 2)

- Tourist and selected guide are connected to a chat room.
- Further discussion and negotiation take place.
- The remaining flow (package creation, confirmation, booking, payment) follows Method 1.


## Booking State Transitions

pending → accepted (Guide)
pending → rejected (Guide)
pending → expired (System)

accepted → confirmed (Tourist)
accepted → expired (System)

confirmed → paid (Tourist)

paid → active (System / start date)
active → completed (System / manual trigger / endDate)

Any → cancelled (Tourist or Guide before active)

## Responsibility

- System:
    - handles expiration
    - finds matching guides
    - handles concurrent request
    - creates booking after confirmation

- Guide:
    - accepts/rejects request
    - creates package

- Tourist:
    - confirms package
    - completes payment