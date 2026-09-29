#  MatchUp

**MatchUp** is a full-stack web application for organizing and managing amateur football matches.

Players can create or join teams, participate in matches, manage invitations, and follow player and team rankings.

##  Main Features

- Authentication (Register / Login / Logout)
- Player profile management
- Create, join and leave teams
- Team member management
- Captain / Second Captain / Member roles
- Team invitations and join requests
- Create and join football matches
- Match result management
- Player and team rankings
- Points and Trustworthy system

##  Technologies

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Axios

**Backend**
- Laravel
- Laravel Sanctum
- REST API

**Database**
- MySQL / MariaDB

**Tools**
- Git & GitHub
- Docker
- Postman
- Jira
- Figma
- StarUML

##  Project Diagrams

### Use Case Diagram
[use case](docs/diagrams/usecasematchup.png)

### Class Diagram
[class](docs/diagrams/classmatchUp.png)

### ERD
[ERD](docs/diagrams/erdMatchUp.png)


##  Installation

Clone the project:

```bash
git clone https://github.com/Salah-mobile/matchUp.git
cd matchUp
```

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

##  Docker

The project can also be started using Docker:

```bash
docker compose up --build
```

## 👨‍💻 Author

**Salah Tabit**

Full-Stack Web Developer