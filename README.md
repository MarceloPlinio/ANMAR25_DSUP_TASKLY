# 📝 To-Do Compass API

This project involves the development of RESTful APIs for task management, encompassing the creation, reading, updating, and deletion of task cards and associated observations. The APIs will enable functionalities such as categorization, prioritization, advanced filters, and status control of tasks (Todo, In Progress, Done).

---

## 🚀 Technologies & Versions

| Technology         | Version    |
|--------------------|------------|
| Node.js            | v20+       |
| npm                | v10+       |
| TypeScript         | ^5.8.3     |
| Express            | ^5.1.0     |
| SQLite3            | ^5.1.7     |
| Prisma             | ^6.6.0     |
| @prisma/client     | ^6.6.0     |
| Zod                | ^3.24.3    |
| ts-node-dev        | ^2.0.0     |
| cors               | ^2.8.5     |
| dotenv             | ^16.5.0    |
| @types/node        | ^22.14.1   |
| @types/cors        | ^2.8.17    |
| @types/express     | ^5.0.1     |

> **Note:** This project was built using Node.js v20. It's recommended to use the same version or newer to ensure compatibility.

## Use Postman or Insomnia to test and observe the API's functionality. ✅
---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/MarceloPlinio/ANMAR25_DSUP_TASKLY
cd ANMAR25_DSUP_TASKLY
```
### 2. Install the dependencies
```
npm install express cors dotenv zod sqlite3 prisma @prisma/client
```
#### 2.1 Dev dependencies (For development only!)
```
npm install -D typescript ts-node-dev @types/node @types/express @types/cors
```
## 🚀 Initialization setup

package.json scripts:


![image](https://github.com/user-attachments/assets/468de429-362c-42aa-81f4-a5fc4e5503ad)


### 1. Initializes Prisma (via package script)
```
npm run prepare
```
### 2. Compile 
```
npm run build
```
### 2. Start server
```
npm start
```
![image](https://github.com/user-attachments/assets/0cb4e424-02e2-41ed-a6f3-3064dcde7761)

#### 2.1 Dev Server Start (For developer only!)
```
npm run dev
```
![image](https://github.com/user-attachments/assets/d5d6db6b-4413-4d49-a2c3-f9cb7a622068)


⚙️ Environment Setup
Create a .env file in the root directory with the following content:

```
DATABASE_URL="file:./dev.db"
/dist/
```

# API Development 

## 🪧 Task Cards API

- Base URL: [http://localhost:3000](http://localhost:3000)

### Create new task card

```http
POST /tasks
```
This endpoint allows you to add a new task.

## Request Body

- title (string, required): The title of the task. (Protection against malicious scripts such as SQL injection and XSS.) 
    
- description (string, optional): The description of the task. (Protection against malicious scripts such as SQL injection and XSS.) (Allows emojis.)
    
- category (string, required): The category of the task.
    
- status (string, required): The status of the task. (The allowed task statuses are: to_do, in_progress, and done. Ensure you use an underscore in place of any spaces.)
    
- priority (string, required): The priority of the task.
    

### Example

``` json
{
  "title": "Buy groceries snacks!",
  "description": "Milk 🥛 , bread 🥖, eggs 🥚, chips 🥔",
  "category": "Personal",
  "status": "in_progress",
  "priority": "high"
}

 ```

## Response

- id (number): The unique identifier of the created task.
    
- title (string): The title of the task.
    
- description (string): The description of the task.
    
- category (string): The category of the task.
    
- priority (string): The priority of the task.
    
- status (string): The status of the task. 
    
- createdAt (string): The timestamp when the task was created.
    
- updatedAt (string): The timestamp when the task was last updated.
    

### Example


 ![image](https://github.com/user-attachments/assets/5b8c9b3b-bd99-474e-b45a-1d519344b7b1)



### List all task cards

```http
GET /tasks 
```
### Retrieve Tasks

This endpoint retrieves a list of tasks.

#### Request

No request body is required for this request.

- HTTP Method: GET
    
- Base URL: [http://localhost:3000/tasks](http://localhost:3000/tasks)
    

#### Response

The response will be in JSON format and will have the following schema:
![image](https://github.com/user-attachments/assets/3c661306-af2f-4e4e-ab56-8540b75dcd5f)

### Fetch specific task card
```http
GET /tasks/:id 
```

- HTTP Method: GET
    
- Base URL: [http://localhost:3000/tasks/id](http://localhost:3000/tasks/1)

This endpoint makes an HTTP GET request to retrieve the details of a specific task with the ID. The response will be in JSON format and will include the task's ID, title, description, category, priority, status, creation and update timestamps, as well as any associated notes with their respective IDs, content, and timestamps.

### Request Body

This request does not require a request body.

### Response Body
![image](https://github.com/user-attachments/assets/f82a3393-412a-463f-832c-67c751212bce)


### Fetch tasks by status

```http
GET /tasks/status/:status 
```

### Get Tasks by Status

This endpoint retrieves tasks with the specified status. (TO_DO, IN_PROGRESS AND DONE)

#### Request

- Method: GET
    
- Endpoint: `http://localhost:3000/tasks/status/TO_DO`
    

#### Response

The response is in JSON format and will have the following schema:
![image](https://github.com/user-attachments/assets/2be37786-f636-42e9-baac-14b32f1b1cbb)


### Update task card
```http
PUT /tasks/:id 
```
### PUT /tasks/id

This endpoint is used to update the details of a specific task identified by the ID.

#### Request Body

- Type: JSON
    
    - title (string, required): The updated title of the task.
        
    - status (string, required): The updated status of the task.
        

#### Response

The response will be in JSON format with the following schema:

![image](https://github.com/user-attachments/assets/497304ce-d073-4b7d-a1ed-4867d96db90a)


### Delete task card

```http
DELETE /tasks/:id 
```
### Delete Task

This endpoint is used to delete a specific task with the given ID.

#### Request

- Method: DELETE
    
- URL: `http://localhost:3000/tasks/id`
    

#### Response

The response for this request is a 204 status code with no content. As per the user's request, the response can be documented as a JSON schema:

![image](https://github.com/user-attachments/assets/49be6420-168f-43bf-b868-301c756f23a0)

## 🗒️ Notes API

### Create new note
```http
POST /tasks/:taskId/notes 
```
This endpoint allows the user to create a new note for a specific task. The request should be sent as an HTTP POST to [http://localhost:3000/tasks/id/notes](http://localhost:3000/tasks/1/notes) with the note content provided in the raw request body.

### Request Body

- content (text, required): The content of the note.
    

### Response

The response will be in JSON format with the following schema:

![image](https://github.com/user-attachments/assets/630c5f3e-f5ab-499e-a59b-951986915a1b)


### List task notes

```http
GET /tasks/:taskId/notes 
```

### GET /tasks/id/notes

This endpoint retrieves the notes associated with the task with ID.

#### Request

No request body is required for this endpoint.

#### Response

The response will be a JSON array containing objects with the following properties:

- `id` (number): The unique identifier for the note.
    
- `content` (string): The content of the note.
    
- `createdAt` (string): The timestamp when the note was created.
    
- `updatedAt` (string): The timestamp when the note was last updated.
    
- `taskId` (number): The ID of the task associated with the note.

![image](https://github.com/user-attachments/assets/60f24595-b364-40c9-be9b-57f60728bf7e)



### Fetch specific note
```http
GET /notes/:id  
```

# Get Note by ID

This endpoint retrieves a specific note by its ID.

### /notes/id

## Request

### Request Body

This endpoint does not require a request body.

### Request Parameters

- ID: The ID of the note to be retrieved.
    

## Response

### Response Body
![image](https://github.com/user-attachments/assets/70a8aede-750a-4cf0-8f4d-671de3c2a1b8)


### Update note

```http
PUT /notes/:id 
```
### Update Note

This endpoint is used to update a specific note identified by its ID.

#### Request Body

- content (text): The updated content of the note.
    

#### Response

Upon a successful update, the endpoint returns a status code of 200 and a JSON object containing the updated note's details, including its ID, content, creation and update timestamps, and associated task ID.

![image](https://github.com/user-attachments/assets/846c8858-67d7-4709-a30b-b98ebc5b00f6)


### Delete note
```http
DELETE /notes/:id 
```
### Delete Note

This endpoint is used to delete a specific note identified by its ID.

#### Request Body

This request does not require a request body.

#### Response

- Status: 204
    
- Content-Type: text/xml
    
- The response body is empty.
  
![image](https://github.com/user-attachments/assets/71599976-21f4-4a4d-bdef-650c4055e13d)


### Errors 

# ⚠️ Common HTTP Errors 

This document lists the most common HTTP errors you might encounter while using the  API, along with possible causes and suggestions for resolution.

---

## 400 - Bad Request

### 🔸 Invalid Data Format

**When:** Trying to create or update a task or note with missing or invalid fields.

**Example Response:**
```json
{
    "errors": [
        {
            "field": "title",
            "message": "Title must be at most 30 characters"
        },
        {
            "field": "title",
            "message": "Title contains forbidden words"
        },
        {
            "field": "title",
            "message": "Title must contain valid characters"
        },
       {
            "field": "description",
            "message": "Description contains forbidden words"
        },
        {
            "field": "priority",
            "message": "Priority must be at least 3 characters"
        },
        {
            "field": "status",
            "message": "Status must be one of the predefined values: TO_DO, IN_PROGRESS, DONE"
        }
    ]
}
```

404 - Not Found
🔸 Task or Note not found
**When:** Trying to access, update, or delete a task or note by ID and it does not exist.

**Example Response:**

```json
{
  "error": "Task not found" , "Note not found" 
}
```
> Fix: Make sure the id provided in the request URL exists in the database.

500 - Internal Server Error
🔸 Unexpected Server Error
**When:** Something goes wrong on the server that wasn't caught by validation or checks.

**Example Response:**
```json
{
  "error": "Error deleting note" , "Error deleting task" 
}
```
> Fix: Check if the note or task exists before deleting or updating. Make sure the database is properly migrated and connections are established.
>

## ✒️ Author

### All Status information

* **Marcelo Plinio** - *Desafio Compass* - [Marcelo Plinio Linkedin](https://www.linkedin.com/in/marceloplinio/)

## 📄 License

This project is under the license (compass Uol - Marcelo Plinio)

## 🎁 "Expressions of gratitude

* This challenge was extremely valuable;
* I gave my best to deliver the project, thank you to everyone at Compass;
  
---
### Attention! I left all branches and commits to show the progress of everything, without deleting anything, that's why it's 'polluted'.

