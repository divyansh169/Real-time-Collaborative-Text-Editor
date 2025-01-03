# Real-time-Collaborative-Text-Editor - Divyansh Bansal

## Features

### Text Editor
- Basic text editing capabilities: Add, delete, and modify text.
- Cursor position tracking with names.
- Real-time updates visible to all connected users.
- Plain-text editing.

### Real-Time Collaboration
- Multiple users can edit the document simultaneously.
- Minimal delay in syncing changes across clients.
- Displays cursors of active users who are currently editing the document.
- Basic conflict resolution to handle simultaneous edits.

### Persistence
- All changes are saved to a database.
- Document can be retrieved when the application is reopened.

## Tech Stack
- Python
- TypeScript
- Django
- React.js
- CSS
- HTML

## Installation & Setup

### Run Backend:
- Clone the repository
- Navigate to the backend directory : cd backend
- Backend running at localhost: python manage.py runserver

### Run Frontend:
- Navigate to the frontend directory : cd frontend
- Install dependencies : npm install
- Start the development server : npm run dev
- Frontend runnning at localhost:5173
- Open browser tabs at http://localhost:5173

## Technical Decisions

### 1. Data Structure: Conflict-Free Replicated Data Types (CRDTs) + Yjs (CRDT library)
- **Reason**: Yjs CRDTs is chosen to resolve conflicts during concurrent edits from multiple users. This ensures the same document state across all clients without the need for a central server to mediate conflicts without data loss.
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
- **Reason**: **Django Channels** extends Django to support **WebSockets** for real-time communication. **Redis** is used for managing WebSocket connections in Django Channels.
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
- Single Document : Currently supports only a single document for real-time collaborative editing.
- Server Connection: A stable connection to the server is required for real-time collaboration. Offline edits are not handled.
- User Identification: Each user has a unique identifier name, ensuring no overlap in node IDs.

## Limitations
- Single Document Availability: Currently supports only a single document for real-time collaborative editing.
- Cloud Deployment: Currently application could run locally and will be deployed on GCP afterwards.

## Potential Improvements
- Document Management and Features:
    - Multiple document support.
    - Document sharing and permissions (like viewer or editor).
    - User authentication.
    - Edit history.
- Advanced Formatting Options:
    - Adding support for underlining, highlighting, and custom fonts.
    - Implementing formatting for selected text ranges more intuitively.
- Cloud Deployment:
    - Deploying the application backend to a cloud platform like AWS, Azure, or Google Cloud.
    - This will allow users to access the application without needing to run the backend locally.
- Scalability Enhancements:
    - Implementing optimized data structures like distributed CRDTs (e.g., Automerge).
    - Implementing WebRTC (Web Real-Time Communication) to reduce server load and improving performance.
