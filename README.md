<h1 align="center">Octo Flashcard</h1>

<p align="center">
A modern flashcard learning platform built with ASP.NET Core and Next.js.
</p>

<p align="center">

<img src="https://img.shields.io/badge/.NET-10-512BD4?style=for-the-badge&logo=dotnet" />
<img src="https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp" />
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs" />
<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/Entity_Framework_Core-512BD4?style=for-the-badge" />

</p>

---

## Overview

Octo Flashcard is a modern flashcard learning platform designed to help learners study more effectively and improve long-term knowledge retention.

The platform enables users to create, organize, and review flashcards in a structured way, making learning more efficient and accessible for a wide range of subjects. It is designed to support active learning and build consistent study habits through an intuitive and user-friendly experience.

Built as a full-stack application, Octo Flashcard uses ASP.NET Core Web API for the backend and Next.js for the frontend, following a scalable and maintainable architecture suitable for future expansion.

---

## Tech Stack

### Backend

- ASP.NET Core (.NET 10)
- C#
- Entity Framework Core
- RESTful API
- JWT Authentication

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Database

- Entity Framework Core Migrations
- SQL Server (Current Provider)

> The database provider is configurable and can be replaced with any provider supported by Entity Framework Core.

---

## Prerequisites

Before running the project, install:

- .NET SDK 10
- Node.js (LTS)
- Entity Framework Core CLI
- A database provider supported by Entity Framework Core

Install EF Core CLI if not already installed:

```bash
dotnet tool install --global dotnet-ef
```

---

## Project Structure

```text
Octo-Flashcard/
│
├── backend/
│   └── OctoFlashcardStudy.API/
│       ├── Configurations/
│       ├── Contracts/
│       ├── Controllers/
│       ├── Data/
│       ├── Domain/
│       ├── Exceptions/
│       ├── Extensions/
│       ├── Middlewares/
│       ├── Migrations/
│       ├── Services/
│       ├── Validators/
│       ├── Program.cs
│       └── appsettings.json
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── styles/
│   │   ├── types/
│   │   └── utils/
│   └── package.json
│
├── docs/
│
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dgwhan/Octo-Flashcard.git

cd Octo-Flashcard
```

### 2. Configure the Database

Update your connection string in one of the following files:

```text
backend/OctoFlashcardStudy.API/appsettings.json
```

or

```text
backend/OctoFlashcardStudy.API/appsettings.Development.json
```

### 3. Run the Backend

```bash
cd backend/OctoFlashcardStudy.API

dotnet restore

dotnet ef database update

dotnet run
```

The backend URLs will be displayed in the terminal after the application starts.

API documentation is available at:

```text
https://<backend-url>/scalar/v1
```

where `<backend-url>` is the HTTPS address shown by `dotnet run`.

### 4. Run the Frontend

```bash
cd frontend

npm install

npm run dev
```

The frontend URL will be displayed in the terminal after the development server starts.

---

## Documentation

Project documentation is located in the `docs/` directory.

- `architecture.md` — System architecture and design decisions
- `roadmap.md` — Development roadmap and MVP scope
- `context.md` — Product vision, principles, and constraints

---

## Notes

- Database schema is managed using Entity Framework Core Migrations.
- SQL Server is the current database provider but can be replaced with any EF Core-supported provider.
- Backend and frontend are developed independently and communicate through RESTful APIs.
- The project is designed with scalability and maintainability in mind.

---

## License

This project is licensed under the MIT License.

---

## Author

**Duong Ngoc Han**

GitHub: [dgwhan](https://github.com/dgwhan)

Repository: [Octo-Flashcard](https://github.com/dgwhan/Octo-Flashcard)
