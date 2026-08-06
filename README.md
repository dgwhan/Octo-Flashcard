# Octo Flashcard Study

A full-stack flashcard learning application built with **ASP.NET Core Web API** and **Next.js**. The project follows **Clean Architecture** principles to provide a scalable, maintainable, and well-structured codebase.

## Features

* User Registration & Login
* JWT Authentication & Authorization
* Flashcard Deck Management
* Flashcard Management
* Public & Private Decks
* RESTful API
* Responsive Web Interface
* Scalar API Documentation

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* ASP.NET Core Web API (.NET 10)
* Entity Framework Core
* JWT Bearer Authentication
* Scalar API Reference

> **Note**
>
> The project uses Entity Framework Core. A sample SQL Server configuration may be used for local development, but you can configure any EF Core-supported database by updating your own connection string.

## Project Structure

```text
octo-flashcardstudy
│
├── frontend
│   ├── app
│   ├── components
│   └── public
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

> Before running the application, configure your own database connection string in `appsettings.json` or `appsettings.Development.json`.

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

**Duong Ngoc Han**

GitHub: https://github.com/dgwhan

Repository: https://github.com/dgwhan/Octo-Flashcard
