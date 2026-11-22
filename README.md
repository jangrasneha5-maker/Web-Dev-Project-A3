# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
# Modern Musician 🎵

A modern and responsive music artist website that brings music, discography, tour updates, and artist information together in one place. The platform also includes an administrative dashboard for managing website content and user messages.

## ✨ Features

- **Home Page:** Introduces the artist and highlights important updates.
- **Discography:** Displays music releases and album information.
- **Tour Page:** Showcases upcoming tour events.
- **Gallery:** Presents artist-related images.
- **About Page:** Provides information about the artist.
- **Contact Page:** Allows visitors to send messages through a contact form.
- **Admin Dashboard:** Displays and manages music releases, tour events, and contact messages.
- **External Music API Integration:** Retrieves music-related information from an external API.
- **Dynamic Content Management:** Supports creating, viewing, updating, and deleting records through backend APIs.
- **Announcements:** Manages homepage updates using a local JSON file.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- RESTful APIs
- EJS (Embedded JavaScript Templates)

### Database and Storage
- MongoDB Atlas
- Mongoose
- Local JSON file storage

### Development Tools
- Visual Studio Code
- Git and GitHub
- Postman
- npm

## 📁 Project Structure

```text
modern_musician/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   ├── index.html
│   ├── music.html
│   ├── tour.html
│   ├── gallery.html
│   ├── about.html
│   ├── contact.html
│   └── thank-you.html
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── releaseController.js
│   │   ├── tourController.js
│   │   ├── messageController.js
│   │   ├── updateController.js
│   │   └── externalController.js
│   │
│   ├── models/
│   │   ├── Release.js
│   │   ├── TourEvent.js
│   │   └── ContactMessage.js
│   │
│   └── routes/
│       ├── releaseRoutes.js
│       ├── tourRoutes.js
│       ├── messageRoutes.js
│       ├── updateRoutes.js
│       └── externalRoutes.js
│
├── views/
│   └── admin.ejs
│
├── data/
│   └── updates.json
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── .env
```

*Note: The directory tree represents the project's main organization. Adjust individual filenames or folders if your local project structure differs.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd modern_musician
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace the MongoDB connection string with your own MongoDB Atlas connection string.

### 5. Start the Server

For normal execution:

```bash
npm start
```

For development:

```bash
npm run dev
```

### 6. Open the Website

Visit:

```text
http://localhost:3000
```

Admin dashboard:

```text
http://localhost:3000/admin
```

## 🔗 Backend API Routes

The application uses RESTful API routes to handle communication between the frontend and backend.

| Route | Purpose |
|---|---|
| `/api/releases` | Manage music releases |
| `/api/tour` | Manage tour events |
| `/api/messages` | Handle contact messages |
| `/api/updates` | Manage homepage announcements |
| `/api/external` | Handle external music API integration |
| `/api/test` | Check server availability |

### Release API Operations

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/releases` | Retrieve all releases |
| GET | `/api/releases/:id` | Retrieve a specific release |
| POST | `/api/releases` | Create a new release |
| PUT | `/api/releases/:id` | Update a release |
| DELETE | `/api/releases/:id` | Delete a release |

## 🗄️ Database

MongoDB Atlas is used as the cloud database, with Mongoose handling database connections and data operations.

The application stores:
- Music release information
- Tour event details
- Contact form submissions

Homepage announcements are managed separately using local JSON file storage.

## 🧩 Application Architecture

The application follows a structured backend architecture:

- **server.js:** Initializes the application, connects to MongoDB, and starts the server.
- **app.js:** Configures Express, middleware, template rendering, and API routes.
- **Routes:** Define API endpoints and connect them to controllers.
- **Controllers:** Handle incoming requests, application logic, and responses.
- **Models:** Define MongoDB document structures using Mongoose.
- **Views:** Use EJS to render dynamic content, including the admin dashboard.
- **Middleware:** Processes incoming JSON and form data and serves static frontend files.

## 🔒 Environment and Security

- Environment variables are managed using `dotenv`.
- Database credentials are stored in the `.env` file.
- The `.env` file should not be committed to a public repository.
- MongoDB Atlas provides cloud database hosting.

## 🚀 Future Enhancements

- User authentication and role-based access control.
- Improved admin dashboard functionality.
- Enhanced search and filtering.
- Better mobile responsiveness.
- Additional music discovery and streaming integrations.

## 👩‍💻 Development

Built using modern frontend and backend technologies, with a focus on clean design, modular code organization, and dynamic content management.
