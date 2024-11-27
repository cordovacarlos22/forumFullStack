# ForumFullStack

## Overview

**ForumFullStack** is a full-stack project inspired by platforms like Reddit, where registered users can:
- Create forums categorized by topics (e.g., Tech, Games, Lifestyle, Memes).
- Post in forums and interact through comments.
- Upload images to posts using **Amazon S3** for secure and scalable storage.
- React to posts with likes.
- Engage in real-time chats with forum members using Socket.IO.

This project leverages modern web development tools and libraries for scalability, real-time functionality, and a responsive design.

---

## Features

### **Frontend**
- **Frameworks & Libraries**:
  - **Vite**: Fast development server and build tool.
  - **Tailwind CSS**: Utility-first CSS framework for responsive design.
  - **Font Awesome** & **SVG Repo**: For icons and UI aesthetics.
  - **React Hook Forms**: Form management for user registration, forum creation, and post submission.
  - **Amazon S3**: For secure and scalable image storage.
  - **Socket.IO**: Real-time chat functionality.
  - **Vercel**: Deployment.

- **Categories**:
  - Tech
  - Games
  - Lifestyle
  - Memes

- **Design Goals**:
  - Responsive design for optimal user experience across devices.
  - Accessible and visually appealing UI.

---

### **Backend**
- **Frameworks & Tools**:
  - **Node.js**: JavaScript runtime.
  - **Express.js**: Backend framework.
  - **MongoDB**: Database for storing users, forums, posts, comments, and chats.
  - **Mongoose**: ODM for MongoDB.
  - **Socket.IO**: Real-time chat.
  - **Amazon S3**: Image storage using `@aws-sdk/client-s3`.
  - **Multer**: Middleware for handling file uploads and preparing them for S3.
  - Additional dependencies:
    - `dotenv`, `cors`, `morgan`, `uuid`.

---

## Environment Variables

The application requires the following environment variables to function correctly. Create a `.env` file in the root directory of your project and include the following:

```plaintext
# MongoDB connection string
DB_CONNECT_URL=<your-mongodb-connection-string>

# Application secret keys
SECRET_KEY=<your-secret-key>
PEPER_SECRET_KEY=<your-pepper-secret-key>

# AWS S3 configuration
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=<your-aws-region>
AWS_BUCKET_NAME=<your-s3-bucket-name>
```
---
## API Endpoints

### Users
- **POST** `/user/register`: Register a new user.
- **POST** `/user/login`: Login a user.
- **GET** `/user`: Get all users (admin-only).
- **GET** `/user/:userId`: Get user by ID (admin-only).
- **PATCH** `/user/:userId`: Update user by ID.
- **DELETE** `/user/:userId`: Delete user by ID (admin-only).

### Posts
- **POST** `/post`: Create a new post (with authentication and file upload).
- **GET** `/post`: Get all posts (admin-only).
- **GET** `/post/:postId`: Get post by ID.
- **PATCH** `/post/:postId`: Update post by ID.
- **DELETE** `/post/:postId`: Delete post by ID.

### Forums
- **POST** `/forum`: Create a new forum.
- **GET** `/forum`: Get all forums (admin-only).
- **GET** `/forum/:forumId`: Get forum by ID.
- **PATCH** `/forum/:forumId`: Update forum by ID.
- **DELETE** `/forum/:forumId`: Delete forum by ID.

### Likes
- **POST** `/posts/:postId/like`: Toggle like on a post.

### Comments
- **POST** `/comments/post/:postId`: Add a comment to a post.
--- 
## Amazon S3 Integration

### Setup

1. **Configure the AWS S3 bucket**:
   - Create a bucket in the AWS Management Console.
   - Set appropriate permissions for public access (or use signed URLs for private access).
   - Enable CORS for cross-origin requests.

2. **Add the following environment variables to your `.env` file** (as shown in the [Environment Variables](#environment-variables) section):
   ```plaintext
   AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
   AWS_REGION=<your-aws-region>
   AWS_BUCKET_NAME=<your-s3-bucket-name>

---
### File Upload Workflow

- Files are uploaded using **Multer** middleware.
- `@aws-sdk/client-s3` is used to upload files from the server to S3.
- File URLs are stored in the database and referenced in the frontend.

---
## Recommendations

1. Use **Multer** to handle file uploads efficiently.
2. Plan the **likes model** carefully to avoid performance bottlenecks.
3. Leverage **Socket.IO rooms** to separate chat by forums.
---


## Authors

- [@carloscordova.dev](https://github.com/cordovacarlos22)
- [@Raidrex101](https://github.com/Raidrex101)
- [@juliagomezg](https://github.com/juliagomezg)
- [@ErickPonceLIV](https://github.com/ErickPonceLIV)
- [@kirito-astumaku](https://github.com/kirito-astumaku)
- [@Rogelio1480](https://github.com/Rogelio1480)
