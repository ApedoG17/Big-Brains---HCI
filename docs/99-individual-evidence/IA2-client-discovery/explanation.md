# IA2 — Client Interview Evidence and Requirement Transformation Memo
**Individual Evidence Submission**

* **Student Name:** Kelly Kristine Donkor
* **Student ID:** 22407052
* **Team:** JASKON-Tech (Group D2)
* **Project Title:** ArchiVerse: A Centralized Project Tracking and Client Engagement System for Asamoah Welbeck & Associates

---

## 1. AI Disclosure Statement
I used AI assistance for formatting and document structure support. The tool usage details are logged below as required. I am fully prepared to defend and explain all parts of this submission during my viva verification.

| Date | Tool | Prompt Summary | What Output Was Used | What Was Rejected | How I Verified the Final Work |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 02/07/2026 | Claude | Help format the interview write-up and requirement transformation into a clean document. | Document layout and formatting. | Rejected any AI-written interview content or requirements. | Reviewed the full document against my interview notes before submission. |

---

## 2. Evidence Pointer (Deliverable Location)
The complete, comprehensive PDF memo containing my personal discovery question set, interview records from the University of Ghana Law School meeting, requirement transformation tables, and individual engineering reflections has been uploaded to Sakai and committed to my portfolio repository.

* **Sakai Submission File:** `IA2_22407052_ClientDiscoveryMemo.pdf`
* **Individual Portfolio Repository Path:** `assignments/ia2-client_interview_evidence_and_requirement_transformation_memo/IA2_22407052_ClientDiscoveryMemo.pdf`
* **Direct Repository Link:** https://classroom.github.com/a/1-l9xPxY

---

## 3. Core Requirement Summary
As part of my individual contribution to the team's requirements elicitation phase, I extracted and transformed the following high-priority requirement based on the primary bottlenecks reported by the managing partner:

* **Raw Client Input:** The client stated that their biggest workflow roadblock is when external clients look at old blueprint versions from mixed-up email threads instead of the active structural plans.
* **Functional Target:** The system must implement an interface restricted to authenticated Architects to upload official `.pdf` blueprints directly to a dedicated Project ID, automatically stamping the upload date and the user ID.
* **Security & Access Control Constraints:** A strict Role-Based Access Control (RBAC) mechanism must be applied to users holding the Client role, rendering all edit, update, or delete routes programmatically inaccessible (`403 Forbidden`).
* **System-Design Implication:** The Django REST Framework backend will process files via a secure `/api/blueprints/upload/` endpoint using JSON Web Tokens (JWT) for session authentication, updating the `Blueprint` schema table in our PostgreSQL database.