# [Story] US-017: Request a Consultation Appointment

## User story

As a **client**, I want **to request a consultation appointment** so that **I can schedule time with a consultant to discuss my needs**.

## Source of requirement

- [x] Client interview
- [ ] User interview
- [ ] Observation
- [ ] Lecturer feedback
- [ ] Sprint review feedback
- [ ] Other:

## Acceptance criteria

Use Given-When-Then format.

1. **Given** a client is logged into the system, **When** they navigate to the appointment booking page and select an available time slot, **Then** a booking request should be created successfully.

2. **Given** a client submits a booking request, **When** the form is submitted, **Then** a confirmation message should be displayed with the appointment details (date, time, consultant name).

3. **Given** a client attempts to book a consultation, **When** they select a time slot that is already booked, **Then** the system should prevent double booking and display an error message "This time slot is unavailable".

4. **Given** a client is booking an appointment, **When** they submit the request, **Then** the system should send a confirmation email to the client's registered email address.

5. **Given** a client has an existing appointment, **When** they attempt to book another appointment at the same time, **Then** the system should display a warning and prevent the booking.

## Non-functional concerns

- [x] Security/privacy
- [x] Performance
- [x] Usability/accessibility
- [x] Reliability/availability
- [x] Maintainability
- [ ] Compatibility
- [ ] Other:

### Additional Notes

- **Frontend Implementation**: The appointment booking form should be intuitive and responsive
- **Concurrency Handling**: Implement database-level constraints to prevent double booking
- **User Account Integration**: Ensure appointment data is linked to the authenticated user account
- **Real-time Availability**: Display real-time consultant availability to prevent booking conflicts

## Test/validation evidence expected

- Verify that authenticated clients can access the appointment booking page.
- Verify that booking requests are successfully created in the database.
- Verify that confirmation messages display with accurate appointment details.
- Verify that clients cannot book the same time slot simultaneously (no double booking).
- Verify that clients receive confirmation emails after successful booking.
- Verify that clients cannot book conflicting appointments for their own account.
- Verify that the system handles concurrent booking requests correctly.
- Verify that only available time slots are displayed to clients.

## Related documents

- SRS Requirement Number: FR-17 (Request Consultation)
- Use Case Number: UC-08 Book Appointment
- Sprint Implementation Plan
