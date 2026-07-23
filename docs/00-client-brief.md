# 00 - Client Brief and Problem Statement

## 1. Project title
ArchiVerse: A Centralized Project Tracking and Client Engagement System for Asamoah Welbeck & Associates[cite: 1]

## 2. Client background
Our client is Asamoah Welbeck & Associates, a professional architectural firm that manages design, structural planning, and construction lifecycles[cite: 1]. Their main users are the firm's internal architects who create and manage building designs, and their external property clients who hire the firm to design and oversee their construction projects[cite: 1].

## 3. Problem statement
The main issue the firm faces is a breakdown in project communication and file tracking between architects and their clients[cite: 1]. Right now, there is no single source of truth for project files, which causes major version confusion[cite: 1]. Clients frequently pull up old, outdated blueprint plans from chaotic email chains or WhatsApp chats and mistakenly assume that is what is actively being built on the physical site[cite: 1]. This version mix-up leads to construction mistakes, wasted project hours, and costly misunderstandings during design reviews[cite: 1].

## 4. Current process
Currently, the firm manages everything manually using scattered channels[cite: 1]. When architects finish a new design drawing, they send it over to the client as a direct email attachment or a WhatsApp file share[cite: 1]. Consultations are booked back and forth via phone calls or unstructured messages, and progress tracking relies entirely on architects manually updating the client through phone conversations or custom message updates[cite: 1]. There is no central log showing who uploaded what or when a design was updated[cite: 1].

## 5. Intended users
* **Architects:** They need to create new project instances, upload official PDF blueprints, track timestamps, check active project statuses, and message clients from a single secure dashboard[cite: 1].
* **Clients:** They need to view their specific project timeline, safely download approved design assets, message their assigned architect, and request consultation dates in a strict read-only environment[cite: 1].
* **Administrators:** They need to manage system accounts, assign proper system roles, monitor overall platform activity logs, and update the public company portfolio[cite: 1].
* **Visitors:** They need to browse the public company portfolio, look at available design services, and send initial project inquiries through a standard contact form[cite: 1].

## 6. Proposed solution summary
ArchiVerse is a secure, web-based project management portal[cite: 1]. It provides a single platform where architects can safely upload their latest `.pdf` drawings directly to a dedicated project dashboard, and clients can securely log in to check real-time progress timelines, message their architect, and download the correct files[cite: 1]. The frontend is built with React, connecting to a secure Django REST Framework backend and a PostgreSQL database to manage system data safely[cite: 1].

## 7. Client value
* **Accuracy & Safety:** Eliminates construction errors by ensuring clients and builders always work from the absolute latest blueprint version[cite: 1].
* **Time Efficiency:** Centralizes communication, cutting down hours spent tracking down scattered email attachments or manual follow-ups[cite: 1].
* **Better Record Keeping:** Automatically logs file uploads with precise user tracking and dates, providing an unalterable history of project changes[cite: 1].
* **Customer Experience:** Provides property clients a high-end, transparent dashboard to securely monitor their investments[cite: 1].

## 8. Constraints
* **Timeline:** The entire application must be designed, implemented, tested, and fully deployed within the single academic semester limit[cite: 1].
* **Tech Stack:** The development team must build the software using React for the interface, Django REST Framework for API backend routing, and PostgreSQL for database schemas[cite: 1].
* **Connectivity:** The system relies on steady internet connectivity for handling blueprint file uploads and real-time message syncing[cite: 1].
* **Scope Boundary:** Advanced features like online payment processing and real-time CAD editing modules are completely out of scope for this semester[cite: 1].

## 9. Risks
* **Network Failures:** Interrupted internet access during large blueprint uploads could corrupt files or cause database write errors[cite: 1]. *Fallback:* The backend will run strict validation check constraints to cancel partial file blocks and alert the user immediately[cite: 1].
* **Credential Compromise:** If an unauthorized user guesses login credentials, sensitive blueprints could be leaked[cite: 1]. *Fallback:* Enforcing encrypted password storage and strict role-based access tokens (JWT) on every single endpoint[cite: 1].

## 10. Evidence
All collected client discovery insights, initial functional requirements, and meeting minutes from our face-to-face review session at the University of Ghana Law School are tracked inside the `docs/00-client-brief.md` history and further verified in our comprehensive individual `explanation.md` logs[cite: 1].