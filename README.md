# Real-time-Collaborative-Text-Editor - Divyansh Bansal

## Features

### Text Editor
- Basic text editing capabilities: Add, delete, and modify text.
- Cursor position tracking for individual users.
- Edits are tracked in real-time.
- Real-time updates visible to all connected users.
- Plain-text editing with Bold and Italic formatting.

### Real-Time Collaboration
- Multiple users can edit the document simultaneously.
- Minimal delay in syncing changes across clients.
- Displays list of active users who are currently editing the document.
- Basic conflict resolution to handle simultaneous edits.

### Persistence
- All changes are saved to a database.
- Documents can be retrieved when the application is reopened.

### User Management
- **User Registration and Authentication**: Users can register and log in to their accounts securely.
  
### Document Management
- **File Management**: Users can create, open, rename, and delete files.
- **Access Control**: Share documents with different permissions (viewer or editor) and ensure that only the owner can delete the file.
- **List Documents**: View a list of both owned and shared documents.

## Tech Stack

### Backend:
- Java
- Spring Boot
- Spring Security
- STOMP Web Sockets
- SQL Database

### Frontend:
- React.js
- Quill.js
- HTML
- CSS

## Installation & Setup

### Run Backend:
- Clone the repository
- Navigate to the backend directory : cd backend
- Build and run the backend : gradlew.bat bootRun
- Backend running at localhost:3000
- Alternatively, use IntelliJ, postman, etc.

### Run Frontend:
- Navigate to the frontend directory : cd frontend
- Install dependencies : npm install
- Install Vite : npm install -g vite
- Start the development server : npm run dev
- Frontend runnning at localhost:5173
- Open browser at http://localhost:5173

## Technical Decisions

### 1. Data Structure: Conflict-Free Replicated Data Types (CRDTs)
- **Reason**: CRDTs is chosen to resolve conflicts during concurrent edits from multiple users. This ensures the same document state across all clients without the need for a central server to mediate conflicts.
- **Implementation**: A CRDT-like structure is implemented, inspired by a doubly linked list. Each node in the list represents a character or formatting information in the document.
- **Node Properties**:
    - **Node ID**: Unique identifier (operationNumber@username), e.g., 3@divyansh.
    - **Left ID** and **Right ID**: Act as pointers to the nodes on either side.
    - **Character, Bold, Italic, and Deleted**: Store the character and its formatting or deletion state.
- **Advantages**:
    - Ensures convergence of the document state across all users.
    - Handles edits and formatting independently for each node.
    - Decentralized conflict resolution reduces server load.
 
### 2. Real-Time Communication: WebSocket
- **Reason**: Enables low-latency, bidirectional communication between the client and the server.
- **Implementation**: WebSocket broadcasts all user edits, including insertions, deletions, and formatting changes, to all connected clients in real-time.
- The server processes each update, applies it to the shared CRDT structure, and synchronizes it with all clients.

### 3. Database
- **Reason**: Provides in-memory and persistent storage capabilities, ensuring document changes are saved for later retrieval.
- **Implementation**:
    - Each node of the CRDT structure is stored in the database.
    - Node data includes its unique ID, content, formatting, and position relative to other nodes.
- **Advantages**: Fast and efficient storage, ideal for development and testing.

### 4. Conflict Resolution
- **Reason**: Ensures consistency when users concurrently edit the same part of the document.
- **Implementation**: Conflicts are resolved using:
    - Node IDs: Based on operation number and username, ensuring globally unique and comparable identifiers.
    - Priority Rules: Nodes with lexicographically higher IDs (e.g., 3@user2 > 3@user1) are prioritized and inserted to the left.
 
## How It Works
- Editing Process:
    - Each character or formatting operation is represented by a node in the CRDT structure.
    - When a user inserts text, a new node is created with:
          - Node ID: Unique identifier combining operation number and username.
          - Left ID and Right ID: Positioning relative to other nodes.
    - The node is inserted into the CRDT and broadcast to all clients.
- Deletion:
    - Instead of removing a node, its Deleted property is marked as true.
    - This ensures the document history remains intact and consistent across clients.
- Formatting:
    - When text is bolded or italicized, the Bold or Italic property of relevant nodes is updated.
    - For ranges, a loop updates these properties for all nodes in the selection.
- Real-Time Collaboration:
    - WebSocket ensures all changes are sent to and received by all clients instantly.
    - The server maintains the CRDT structure and database to persist changes.
- Conflict Resolution:
    - Conflicting edits are resolved using node priorities based on IDs.
    - Nodes with higher lexicographical priority are positioned to the left in the CRDT structure.
Persistence:
    - The CRDT structure is saved in the database after every change.
    - When the document is reopened, the CRDT is reconstructed from the database.
 
## Assumptions
- Plain Text Document: The editor assumes no advanced formatting (e.g., tables or images) is required, focusing solely on plain text with basic bold and italic styles.
- Simultaneous Edits: Users are expected to edit different parts of the document most of the time, reducing the likelihood of frequent conflicts.
- Server Connection: A stable connection to the server is required for real-time collaboration. Offline edits are not handled.
- User Identification: Each user has a unique identifier, ensuring no overlap in node IDs.
- Database Integrity: The database remains consistent and synchronized with the CRDT structure.

## Limitations
- Cloud Deployment: Currently application could run locally and will be deployed on GCP afterwards.

## Potential Improvements
- Cloud Deployment:
    - Deploying the application backend to a cloud platform like AWS, Azure, or Google Cloud.
    - This will allow users to access the application without needing to run the backend locally.
    - Configuring the backend with an exposed public API, ensuring it securely handles requests from any connected client.
    - Using a managed database service for persistent storage, ensuring high availability and scalability.
- Advanced Formatting Options:
    - Adding support for underlining, highlighting, and custom fonts.
    - Implementing formatting for selected text ranges more intuitively.
- Offline Editing:
    - Developing offline mode with automatic syncing once the connection is restored.
    - Using LocalStorage or IndexedDB for temporary storage of offline changes.
- Scalability Enhancements:
    - Implementing optimized data structures like distributed CRDTs (e.g., Yjs, Automerge).
    - Enabling horizontal scaling for handling a larger user base.
    - Introducing more sophisticated conflict resolution algorithms like Operational Transformation (OT).
