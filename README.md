# Real-time-Collaborative-Text-Editor

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

