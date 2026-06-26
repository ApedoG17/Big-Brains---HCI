# IA1 — Personal System Request-Flow Diagram

**Name:** Kelly Kristine Donkor
**Student ID:** 22407052
**Team:** JASKON-Tech
**Project:** ArchiVerse — A Centralized Project Tracking and Client Engagement System for Asamoah Welbeck & Associates
**Chosen Feature Track:** Client Blueprint File Upload Pipeline

---

## Request Flow: Uploading a Blueprint

### Step 1: The User Starts the Upload

The process begins when an architect logs into the ArchiVerse website using a laptop or desktop computer. The architect opens the project dashboard, goes to the blueprint upload section, selects a file such as `ground_floor_plan.pdf`, and clicks the "Submit Upload" button. This action tells the system that the user wants to upload a blueprint to the server.

### Step 2: React Prepares the File

Once the user clicks the upload button, the React frontend receives the file. Since a blueprint is a large file, React packages it using `multipart/form-data`, which is the standard format for uploading files. React also includes the user's authentication token in the request so that the server can verify the user's identity.

### Step 3: Finding the Server

The browser sends the request to the server using the website address:

```
https://api.archiverse.com/api/v1/projects/blueprints/upload/
```

Before sending the request, the browser uses the Domain Name System (DNS) to convert the website address into an IP address so it can locate the correct server.

### Step 4: Sending the Request Securely

The request is sent over the internet using HTTPS, which encrypts the data while it is being transmitted. This protects the blueprint file and the user's login information from being viewed or intercepted by unauthorized people.

### Step 5: Nginx Receives the Request

When the request reaches the server, it first passes through Nginx. Nginx manages incoming requests and helps prevent the server from becoming overloaded, especially when many users are uploading files at the same time. It then forwards the request to the Django backend.

### Step 6: Django Processes the Request

Django REST Framework receives the request and checks the URL to determine which part of the application should handle it. The request is then sent to the `BlueprintUploadView`, which is responsible for processing blueprint uploads.

### Step 7: The File Is Validated

Before the file is saved, Django validates the request. It checks that:

- The user is logged in and authorized.
- The uploaded file is a valid PDF or DWG file.
- The file size does not exceed the allowed limit.
- The selected project exists.

If any of these checks fail, the upload is rejected and an error message is returned.

### Step 8: Saving the Blueprint

If the validation is successful, Django saves the blueprint file in the server's media folder, such as:

```
/media/project_blueprints/
```

This is where the actual file is stored.

### Step 9: Saving the File Information

After saving the file, Django stores information about it in the PostgreSQL database. Instead of saving the entire file in the database, it only stores details such as:

- Blueprint ID
- Project ID
- User who uploaded it
- File location
- Date and time of upload

This makes the database faster and easier to manage.

### Step 10: Sending a Success Response

After everything has been saved successfully, Django returns an HTTP 201 Created response together with a JSON success message. The React application receives this response, removes the loading indicator, and displays a message such as: "Blueprint uploaded successfully!" The architect can then see that the upload was completed successfully and continue working on the project.

---

## Engineering Failure, High-Concurrency Scale, and System Security Reasoning

### 1. Handling Validation Errors (What happens if validation fails?)

If the uploaded file does not meet the system's requirements, the request will fail. For example, if a user uploads an unsupported file type or if their login session has expired, Django will stop processing the request immediately. The file will not be saved, and no information will be stored in the database. Instead, the server returns an error such as HTTP 400 (Bad Request) or HTTP 401 (Unauthorized) with a message explaining the problem. React then displays the error message on the screen so the user knows what went wrong and can correct it before trying again.

### 2. What Happens if the Database is Down?

If the PostgreSQL database is unavailable when a user uploads a blueprint, the system will not be able to save the file information. To prevent incomplete or corrupted data, Django stops the upload process and cancels any changes that were in progress. The server then returns an HTTP 503 (Service Unavailable) error. React displays a message such as:

> "The system is currently unavailable. Your blueprint was not uploaded. Please try again later."

This lets the user know that the problem is with the system and not with their file.

### 3. What Happens if 500 Users Upload Files at the Same Time?

If many users upload files at the same time, the server may become slow or overloaded. To improve performance, our system uses Nginx to manage incoming requests and reduce the load on the Django server. We also plan to store uploaded files in cloud storage such as AWS S3 instead of sending every file through the backend. This helps the application remain fast, stable, and able to handle many users at once.

### 4. Security and Privacy Concerns

One major security risk is that someone could upload a harmful file while pretending it is a blueprint. For example, an attacker could rename a malicious file to make it look like a PDF. If the system accepts the file without checking it properly, it could put the server at risk.

To prevent this, our system checks the actual file type instead of only looking at the file extension. We also make sure that uploaded files cannot be executed as programs on the server. These security measures help protect both the application and the users' data.

---

## AI Disclosure Statement

I did not use AI assistance in writing the typed explanation, the request-flow reasoning, or the failure/scale/security analysis in this submission. The handwritten diagram was produced independently by hand, without the use of an AI diagram generator. I understand that I must be able to explain and defend every part of this submission.

I used Gemini to get ideas for the 10 system points. I then wrote all the detailed explanations and technical analysis myself. I am ready to explain and defend all parts of this submission.

| Date | Tool | Prompt Summary | Output Used | Output Rejected | Verification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 26/06/2026 | Gemini | Ideas for request-flow diagram points. | Used the names of the 10 architecture steps. | Rejected all pre-written text blocks. | Wrote out all explanations by hand. |