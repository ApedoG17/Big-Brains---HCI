# 02 - Product Backlog

## Backlog summary

| Story ID | User story | Priority | Size | Sprint target | Status | Issue |
|----------|------------|----------|------|---------------|--------|-------|
| US-001 | As a visitor, I want to register an account so that I can access the system. | Must | 5 | Sprint 1 | To do | #1 |
| US-002 | As a registered user, I want to log into my account securely. | Must | 3 | Sprint 1 | To do | #2 |
| US-003 | As a user, I want to log out securely. | Must | 1 | Sprint 1 | To do | #3 |
| US-004 | As a user, I want to reset my forgotten password. | Should | 5 | Sprint 2 | To do | #4 |
| US-005 | As an administrator, I want to assign user roles. | Must | 3 | Sprint 1 | To do | #5 |
| US-006 | As an administrator, I want to add new users. | Must | 3 | Sprint 2 | To do | #6 |
| US-007 | As an administrator, I want to edit user information. | Must | 2 | Sprint 2 | To do | #7 |
| US-008 | As an administrator, I want to deactivate user accounts. | Should | 2 | Sprint 3 | To do | #8 |
| US-009 | As an administrator, I want to search for users. | Could | 2 | Sprint 3 | To do | #9 |
| US-010 | As an architect, I want to create a new project. | Must | 5 | Sprint 1 | To do | #10 |
| US-011 | As an architect, I want to edit project details. | Must | 3 | Sprint 2 | To do | #11 |
| US-012 | As a project manager, I want to update project status. | Must | 3 | Sprint 2 | To do | #12 |
| US-013 | As a client, I want to view project progress. | Must | 5 | Sprint 2 | To do | #13 |
| US-014 | As an architect, I want to upload blueprint files. | Must | 8 | Sprint 1 | To do | #14 |
| US-015 | As an architect, I want to replace an existing blueprint. | Should | 3 | Sprint 2 | To do | #15 |
| US-016 | As a client, I want to download approved blueprints. | Must | 3 | Sprint 2 | To do | #16 |
| US-017 | As a client, I want to request a consultation appointment. | Must | 5 | Sprint 3 | To do | #17 |
| US-018 | As an architect, I want to approve consultation requests. | Must | 3 | Sprint 3 | To do | #18 |
| US-019 | As a client, I want to receive booking confirmations. | Should | 2 | Sprint 3 | To do | #19 |
| US-020 | As a client, I want to send messages to architects. | Should | 5 | Sprint 4 | To do | #20 |
| US-021 | As an architect, I want to reply to client messages. | Should | 5 | Sprint 4 | To do | #21 |
| US-022 | As a user, I want to receive project notifications. | Should | 3 | Sprint 3 | To do | #22 |
| US-023 | As a user, I want to receive consultation reminders. | Could | 2 | Sprint 4 | To do | #23 |
| US-024 | As a visitor, I want to browse completed projects. | Must | 3 | Sprint 1 | To do | #24 |
| US-025 | As a visitor, I want to view company services. | Must | 2 | Sprint 1 | To do | #25 |
| US-026 | As a visitor, I want to contact the company through a contact form. | Must | 3 | Sprint 2 | To do | #26 |
| US-027 | As an administrator, I want to update the website portfolio. | Should | 5 | Sprint 4 | To do | #27 |
| US-028 | As an administrator, I want to view system statistics. | Could | 5 | Sprint 4 | To do | #28 |
| US-029 | As an administrator, I want to generate reports. | Could | 8 | Sprint 4 | To do | #29 |

## Epic breakdown

### Epic 1: User Authentication & Account Management
Allows users to create accounts, log into the system securely, manage passwords, and access features based on their assigned roles.
* **US-001**: Register account (5 SP / Must) - *Acceptance Criteria:* User successfully registers and account is created.
* **US-002**: Secure Login (3 SP / Must) - *Acceptance Criteria:* Valid credentials allow login and dashboard access.
* **US-003**: Secure Logout (1 SP / Must) - *Acceptance Criteria:* User session ends successfully.
* **US-004**: Password Reset (5 SP / Should) - *Acceptance Criteria:* Password reset email is sent successfully.
* **US-005**: Role Assignment (3 SP / Must) - *Acceptance Criteria:* Roles are updated correctly.

### Epic 2: User Management
Allows administrators to manage all users of the system.
* **US-006**: Add new users (3 SP / Must)
* **US-007**: Edit user info (2 SP / Must)
* **US-008**: Deactivate accounts (2 SP / Should)
* **US-009**: Search users (2 SP / Could)

### Epic 3: Project Management
Allows architects and project managers to create, monitor, and manage architectural projects.
* **US-010**: Create project (5 SP / Must)
* **US-011**: Edit project details (3 SP / Must)
* **US-012**: Update project status (3 SP / Must)
* **US-013**: View project progress (5 SP / Must)

### Epic 4: Blueprint Management
Manages architectural blueprint uploads, downloads, and tracking.
* **US-014**: Upload blueprint files (8 SP / Must)
* **US-015**: Replace existing blueprint (3 SP / Should)
* **US-016**: Download blueprints (3 SP / Must)

### Epic 5: Consultation Booking
Enables clients to book consultations with architects.
* **US-017**: Request appointment (5 SP / Must)
* **US-018**: Approve requests (3 SP / Must)
* **US-019**: Booking confirmations (2 SP / Should)

### Epic 6: Messaging & Notifications
Allows communication between clients and architects while keeping users informed.
* **US-020**: Send messages (5 SP / Should)
* **US-021**: Reply to messages (5 SP / Should)
* **US-022**: Project notifications (3 SP / Should)
* **US-023**: Consultation reminders (2 SP / Could)

### Epic 7: Portfolio & Website Content
Allows visitors to learn about the company and view completed projects.
* **US-024**: Browse completed projects (3 SP / Must)
* **US-025**: View company services (2 SP / Must)
* **US-026**: Submit contact form (3 SP / Must)
* **US-027**: Update website portfolio (5 SP / Should)

### Epic 8: Reports & Administration
Provides administrators with reports and analytics about system activities.
* **US-028**: View system statistics (5 SP / Could)
* **US-029**: Generate reports (8 SP / Could)

---

## Sprint 1 backlog
*Targeting core setup, authentication, basic project initialization, and public landing features.*

| Story ID | Task | Owner | Estimate | Status |
|----------|------|-------|----------|--------|
| US-001 | Create Custom User model and registration API endpoint | Developer A | 3 SP | To do |
| US-001 | Build frontend registration form with role selection | Developer B | 2 SP | To do |
| US-002 | Set up backend JWT session login token authentication | Developer A | 2 SP | To do |
| US-002 | Build frontend Login view component and tie context token storage | Developer B | 1 SP | To do |
| US-003 | Implement client-side token clearance logout function | Developer B | 1 SP | To do |
| US-005 | Establish role-based permission view decorators on backend route endpoints | Developer A | 3 SP | To do |
| US-010 | Design and run PostgreSQL base migration for project workspace database schemas | Developer A | 2 SP | To do |
| US-024 | Build public layout container displaying static company portfolios | Developer C | 3 SP | To do |
| US-025 | Put together main informational responsive services landing grid | Developer C | 2 SP | To do |

## Sprint 2 backlog
*Targeting blueprint processing core pipelines and administrative CRUD features.*

| Story ID | Task | Owner | Estimate | Status |
|----------|------|-------|----------|--------|
| US-014 | Setup multi-part parser form handling for binary file streams in Django | Developer A | 4 SP | To do |
| US-014 | Code drag-and-drop file dashboard dropzone in React view dashboards | Developer B | 4 SP | To do |

## Sprint 3 backlog
*Targeting secondary features including scheduling actions and event flags.*

| Story ID | Task | Owner | Estimate | Status |
|----------|------|-------|----------|--------|
| US-017 | Set up reservation calendar backend schedule matrix arrays | Developer A | 3 SP | To do |

## Sprint 4 backlog
*Polishing, cross-user asynchronous messaging channels, and metrics panels.*

| Story ID | Task | Owner | Estimate | Status |
|----------|------|-------|----------|--------|
| US-020 | Set up direct user-to-user model schemas for persistent record chains | Developer A | 3 SP | To do |

## Burndown/velocity notes
* **Planned Sprint 1 Target Capacity:** 19 Story Points.
* **Velocity Tracking:** Team status registers task points on a weekly cadence during standup sync alignments.

---
### Future Scope (Out of Scope for Current Semester)
* **US-030**: Export generated administrative data records natively as custom PDF files (5 SP / Won't).