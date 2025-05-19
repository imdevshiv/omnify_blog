
---

# Omnify Blog

A full-stack blogging platform built with a Java Spring Boot backend and a React frontend. This application allows users to create, read, update, and delete blog posts, offering a seamless and responsive user experience.

🔗 **Live Demo**: [omnify-blog.vercel.app](https://omnify-blog.vercel.app)

---



## 🛠 Tech Stack

* **Frontend**: React, JavaScript, **Tailwind CSS**, HTML
* **State Management**: React Context API
* **Routing**: React Router DOM
* **Backend**: Java, Spring Boot
* **Authentication**: JWT (JSON Web Token)
* **API**: RESTful APIs with Spring MVC
* **Database**: [PostgreSQL]
* **Deployment**:

  * Frontend: [Vercel]
  * Backend: [ Render]((via Docker))

---


## 📦 Project Structure

```
omnify_blog/
├── client/         # React frontend
│   ├── public/
│   └── src/
├── server/         # Spring Boot backend
│   └── src/
│       └── main/
│           ├── java/
│           └── resources/
└── README.md
```

---

## 🚀 Features

* **User Authentication**: Secure login and registration system.
* **Blog Management**: Create, edit, delete, and view blog posts.
* **Responsive Design**: Optimized for various devices and screen sizes.
* **RESTful API**: Efficient communication between frontend and backend.

---

## ⚙️ Getting Started

### Prerequisites

* **Frontend**:

  * Node.js (v14 or above)
  * npm or yarn

* **Backend**:

  * Java (JDK 11 or above)
  * Maven or Gradle
  * [PostgreSQL]

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/imdevshiv/omnify_blog.git
   cd omnify_blog
   ```

2. **Setup Backend**:

   ```bash
   cd server
   # Configure your database settings in application.properties
   mvn clean install
   mvn spring-boot:run
   ```

3. **Setup Frontend**:

   ```bash
   cd client
   npm install
   npm run dev
   ```

   The frontend will run on `http://localhost:5173` and the backend on `http://localhost:8080`.

---

## 📄 API Endpoints

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/blogs`       | Get paginated blog list |
| GET    | `/api/blogs/{id}`  | Get blog details        |
| POST   | `/api/blogs`       | Create a blog (auth)    |
| PUT    | `/api/blogs/{id}`  | Update blog (auth)      |
| DELETE | `/api/blogs/{id}`  | Delete blog (auth)      |
| POST   | `/api/auth/signup` | Register user           |
| POST   | `/api/auth/login`  | Login user              |


*Note: Please ensure proper authentication headers are included where necessary.*

---

## 🧪 Testing

* **Frontend**: Utilize tools like Jest and React Testing Library.
* **Backend**: Use JUnit and Mockito for unit and integration tests.

---

## 📌 Deployment

* **Frontend**: Deployed on Vercel at [omnify-blog.vercel.app](https://omnify-blog.vercel.app)
* **Backend**: Deployed on Google Cloud Platform [GCP](https://cloud.google.com/?hl=en)

---

## 📧 Contact

For any inquiries or feedback:

* **GitHub**: [imdevshiv](https://github.com/imdevshiv)
* **Email**: [shiv404050@gmail.com]

---

