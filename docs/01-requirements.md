# 01 - Requirements Baseline

## 1. System overview
ArchiVerse is a web-based project management and client engagement system being developed for Asamoah Welbeck and Associates. It serves as a centralized platform where internal architects can create and manage projects, track design lifecycles, and securely upload official blueprint documents, while external property clients can transparently view real-time progress, download approved files, and securely message their assigned architectural team[cite: 1]. The system is engineered to eliminate version tracking errors and streamline administrative project lifecycles using a React frontend, Django REST Framework backend, and PostgreSQL database[cite: 1].

## 2. Stakeholders and user roles

| Role | Description | Needs/Goals |
|------|-------------|-------------|
| **Administrator** | Responsible for managing users, assigning system roles, monitoring platform activity, and maintaining core data stability[cite: 1]. | Needs an administrative interface to configure system roles, oversee platform access logs, and update the visible public corporate portfolio[cite: 1]. |
| **Architect** | A primary professional user responsible for updating design statuses and managing file assets[cite: 1]. | Needs to easily create project tracks, upload official PDF/DWG drawings, log upload timestamps, and respond to clients from a centralized dashboard[cite: 1]. |
| **Client** | An external property owner or customer tracking a real estate investment project[cite: 1]. | Needs to safely track project progress logs, download approved blueprints, request consultation dates, and message architects under a strict read-only profile[cite: 1]. |
| **Visitor** | An unauthenticated consumer exploring the public business homepage[cite: 1]. | Needs to browse completed projects in the public portfolio, learn about services, and submit initial inquiries via a web contact form[cite: 1]. |

## 3. Functional requirements

| ID | Requirement | Source | Priority | Acceptance evidence |
|----|-------------|--------|----------|---------------------|
| FR-001 | The system must allow authenticated Architects to create, edit, and update project tracking entities[cite: 1]. | UC-06[cite: 1] | High | Project entry displays correctly in the dashboard interface and updates rows in the database[cite: 1]. |
| FR-002 | The system must allow authenticated Architects to upload blueprint files explicitly formatted as PDF or DWG documents[cite: 1]. | UC-08[cite: 1] | High | File upload succeeds and records the exact timestamp and uploader identification metadata[cite: 1]. |
| FR-003 | The system must provide authenticated Clients a dashboard interface to track real-time project progress logs[cite: 1]. | UC-07[cite: 1] | High | Client UI correctly renders current phase, text logs, and milestones assigned to their specific Project ID[cite: 1]. |
| FR-004 | The system must allow authenticated Clients to download approved blueprint files attached to their project[cite: 1]. | UC-09[cite: 1] | High | The file downloads cleanly from secure storage without permitting the user to modify or delete the source asset[cite: 1]. |
| FR-005 | The system must allow Clients to select available dates/times and submit consultation requests[cite: 1]. | UC-10[cite: 1] | Medium | Request captures calendar details, saves to the database, and flags an alert notification for the assigned architect[cite: 1]. |
| FR-006 | The system must provide a secure internal messaging channel between architects and clients[cite: 1]. | UC-11[cite: 1] | Medium | Text transmissions are saved to the persistent database history and render inline in real time within the active chat pane[cite: 1]. |

## 4. Non-functional requirements

| ID | Quality attribute | Requirement | Measurement/acceptance evidence |
|----|-------------------|-------------|---------------------------------|
| NFR-001 | Security | The system must enforce strict Role-Based Access Control (RBAC), restricting Clients to read-only views and hiding all edit or delete triggers[cite: 1]. | Manual test confirms edit/delete UI buttons are missing for client accounts; direct HTTP deletion calls return a `403 Forbidden` error[cite: 1]. |
| NFR-002 | Performance | The system must load user interface pages within 3 seconds under normal network conditions[cite: 1]. | Network loading diagnostics run in standard web browsers show initial rendering times matching or scoring lower than the 3-second threshold[cite: 1]. |
| NFR-003 | Reliability | If network connectivity fails mid-upload during a blueprint transmission, the system must abort the save operation entirely[cite: 1]. | Database operations perform an atomic rollback on dropouts; no partial file fragments or orphaned records exist in the PostgreSQL table[cite: 1]. |
| NFR-004 | Portability | The system must support and render consistently on the latest versions of modern browsers including Chrome, Edge, Safari, and Firefox[cite: 1]. | Cross-browser automated interface test logs confirm layout alignment, layout text clarity, and reactive components pass across all target environments[cite: 1]. |

## 5. Use cases

### UC-008: Upload Blueprint

- **Primary actor:** Architect[cite: 1]
- **Goal:** Upload a new structural drawing asset securely to a project dashboard so clients work off the correct version[cite: 1].
- **Preconditions:** The architect is authenticated, an active project target already exists, and the file is formatted as a PDF or DWG under size limits[cite: 1].
- **Main flow:**
  1. The architect opens the specific project panel.
  2. The architect selects the file upload control tool.
  3. The architect selects the blueprint asset from local storage and confirms.
  4. The system validates the extension formatting, logs metadata, and writes the asset safely to storage[cite: 1].
  5. The system saves records to the database and displays a visual success notification[cite: 1].
- **Alternative flows:**
  - *Extension Validation Failure:* If the file format violates rules, the system blocks the upload route and presents an error warning[cite: 1].
  - *Network Interruption:* If the internet disconnects during processing, the database performs a transaction rollback to maintain storage integrity[cite: 1].
- **Postconditions:** The target blueprint record is attached to the project and made available for read-only view tracking[cite: 1].

## 6. User stories

| Story ID | User story | Priority | Size | Source | Related use case |
|----------|------------|----------|------|--------|------------------|
| US-005 | As an architect, I want to create and manage projects so that I can keep project information up to date[cite: 1]. | High | 3 | SRS Sec. C[cite: 1] | UC-06[cite: 1] |
| US-006 | As a client, I want to view the progress of my project so that I know its current status[cite: 1]. | High | 2 | SRS Sec. C[cite: 1] | UC-07[cite: 1] |
| US-007 | As an architect, I want to upload blueprint files so that clients can access the latest drawings[cite: 1]. | High | 3 | SRS Sec. C[cite: 1] | UC-08[cite: 1] |
| US-008 | As a client, I want to download blueprint files so that I can review the designs[cite: 1]. | High | 1 | SRS Sec. C[cite: 1] | UC-09[cite: 1] |
| US-009 | As a client, I want to book a consultation so that I can discuss my project with an architect[cite: 1]. | Medium | 5 | SRS Sec. C[cite: 1] | UC-10[cite: 1] |
| US-010 | As a client, I want to send messages to architects so that I can ask questions about my project[cite: 1]. | Medium | 3 | SRS Sec. C[cite: 1] | UC-11[cite: 1] |

## 7. Acceptance criteria

| Story ID | Acceptance criteria |
|----------|---------------------|
| US-007 | **Given** an authenticated Architect is on a specific project track page,<br>**When** they select and upload a valid `.pdf` blueprint document,<br>**Then** the file saves securely, its timestamp and creator ID log in the database, and a success banner displays[cite: 1]. |
| US-008 | **Given** an authenticated Client is viewing their custom project panel,<br>**When** they click the download icon next to an approved drawing name,<br>**Then** the blueprint file downloads safely to local machine storage without displaying any edit or change tools[cite: 1]. |

## 8. Traceability matrix

| Requirement ID | User story | Issue link | Test link/evidence | Status |
|----------------|------------|------------|--------------------|--------|
| FR-001 | US-005 | # | Project rendering test suite | In progress |
| FR-002 | US-007 | # | Upload extension automated assertion | In progress |
| FR-003 | US-006 | # | Access filter manual evaluation verification | In progress |
| FR-004 | US-008 | # | Endpoint authorization validation assertion | In progress |

## 9. Glossary

| Term | Meaning |
|------|---------|
| **API** | Application Programming Interface used for communication between the frontend and backend[cite: 1]. |
| **Blueprint** | A digital architectural drawing or design file uploaded to the system[cite: 1]. |
| **DRF (Django REST Framework)** | The backend framework used to build the system's RESTful APIs[cite: 1]. |
| **PostgreSQL** | The relational database management system used to store application data[cite: 1]. |
| **RBAC (Role-Based Access Control)** | An access governance technique where software permissions are bound tightly to verified user roles[cite: 1]. |