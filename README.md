# Octo Flashcard Study

Octo Flashcard Study is a full-stack web application that enables users to create, organize, and study flashcards. The project is built with a modern technology stack and follows Clean Architecture principles to ensure scalability, maintainability, and a clear separation of concerns.

## Features

- User Registration and Login
- JWT Authentication and Authorization
- Flashcard Deck Management
- Flashcard Management
- Public and Private Decks
- Responsive Web Interface
- RESTful API
- Scalar API Documentation

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- ASP.NET Core Web API (.NET 10)
- Entity Framework Core
- SQL Server
- JWT Bearer Authentication
- Scalar API Reference

## Project Structure

```text
octo-flashcardstudy
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── package.json
│
├── backend
│   ├── Controllers
│   ├── Contracts
│   ├── Domain
│   ├── Infrastructure
│   ├── Migrations
│   └── Program.cs
│
└── README.md
```

## Getting Started

### Clone the repository

```bash
git clone https://github.com/dgwhan/Octo-Flashcard.git

cd Octo-Flashcard
```

### Backend

```bash
cd backend

dotnet restore

dotnet ef database update

dotnet run
```

API Documentation

```
https://localhost:7012/scalar/v1
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Application

```
http://localhost:3000
```

## License

This project is licensed under the MIT License.

## Author

DuongNgocHan

GitHub: https://github.com/dgwhan

Repository: https://github.com/dgwhan/Octo-Flashcard
