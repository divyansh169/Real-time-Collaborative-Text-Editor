# Real-time-Collaborative-Text-Editor

## Features

### User Management
- **User Registration and Authentication**: Users can register and log in to their accounts securely.
  
### Document Management
- **File Management**: Users can create, open, rename, and delete files.
- **Access Control**: Share documents with different permissions (viewer or editor) and ensure that only the owner can delete the file.
- **List Documents**: View a list of both owned and shared documents.

### Real-time Collaborative Editing
- **Support File Editing**: Users can edit document text with basic formatting options like bold and italic.
- **Support Concurrent Edits**: Multiple users can edit a document at the same time, with conflicts managed effectively.
- **Real-time Updates**: Edits are tracked in real-time, showing other users' cursors and active sessions.

### UI
- **Simple UI**: Includes login and signup pages, an intuitive file management interface (for creating, listing, deleting, renaming, sharing, and opening files), and text editing capabilities.

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

