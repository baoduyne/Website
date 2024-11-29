# Booking Medical Schedule Website

## Introduction
This is a project to create a website for booking doctor appointments. The website is built using technologies such as React.js, Express, Bootstrap, and more.

## Features

- **Medical Appointment Booking**: Users can easily search and book appointments with doctors and medical facilities. Supports selecting location, specialty, and suitable time.
  
- **Appointment Management**: Users can view, edit, or cancel previously booked appointments.
  
- **Appointment Notifications**: Users will receive notifications via email or message about upcoming appointments, helping them not miss any meetings.
  
- **Doctor and Service Rating**: After the examination, users can rate the service quality and share their experience with the doctor.
  
- **Doctor Search and Comparison**: Users can easily search and compare information about doctors such as specialties, experience, prices, reviews...
  
- **Package Service Booking**: In addition to individual bookings, users can book complete medical service packages like general checkups, periodic health checks...
  
- **Doctor Information Management**:
  - **Doctor Accounts**: Doctors can self-register accounts and manage personal information and work schedules.
  - **Doctor Management (Admin Account)**: Administrators can add, edit, delete doctor information, and assign account permissions.
  - **Doctor Management (Hospital Account)**: Hospitals can manage the list of doctors working at the hospital, update information and work schedules.

## Installation and Usage

1. Clone the project to your machine
2. Install necessary dependencies:
   ```
   npm install
   ```
3. Create a .env file and customize it according to your needs (the .env file structure is in .env-example...)
4. Customize the docker-compose.yml file in the product folder
5. Use docker to control and check the server
6. (Optional: Download DBeaver to manage the Database and import DB port according to the docker-compose file you installed)

## Technologies Used
### Front-end
- **Framework**: React.js v17.0.2
- **UI Library**: Chakra UI, Material UI
- **Styling**: Styled Components
- **Routing**: React Router v5.2.0
- **State Management**: Redux, Redux Thunk
- **HTTP Client**: Axios
- **Internationalization**: React Intl
- **Date/Time Handling**: Moment.js, React Datepicker
- **Markdown Editor**: @uiw/react-markdown-editor
- **Carousel**: React Multi Carousel
- **Table/Filter**: React Bootstrap Table Next
- **Image Lightbox**: React Image Lightbox
- **Drawer**: React Modern Drawer
- **Toast Notification**: React Toastify

### Back-end
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MySQL, Sequelize ORM
- **Authentication**: bcrypt
- **Email Sending**: Nodemailer
- **Transpiler**: Babel
- **Dev Server**: Nodemon

With the technologies used on both frontend and backend, this project is built on a full-stack architecture, using React.js for the client-side and Node.js/Express.js for the server-side. Additionally, popular libraries like Redux, Axios, Moment.js, Sequelize... are used to support features such as state management, API calls, time processing, and database connection.
