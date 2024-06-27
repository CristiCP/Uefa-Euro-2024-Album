# Uefa Euro 2024 Album

![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge)
![NODE.JS](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JS](https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square)

UEFA Euro 2024 Album is a full-stack web application designed for football enthusiasts to manage their sticker collections for the Euro 2024 Championship. This app provides an engaging and interactive experience for users to open packs of stickers, complete national team albums, and trade duplicates with others. It also includes a robust registration and login system to ensure a secure and personalized user experience.

![Screenshot](https://res.cloudinary.com/dotcom-prod/images/c_fill,f_auto,g_faces:center,q_auto,w_1920/v1/wt-cms-assets/2023/12/odw167z2g9nyx6vkh0k7/uefaeuro2024wt.jpg)

# Features

### Sticker Packs
- **Open Packs**: Users can open sticker packs of varying rarity to find new stickers for their collection.
- **Pack Rarities**: Different levels of pack rarities add excitement and unpredictability to the sticker-opening experience.

### Album Management
- **Complete Albums**: Users can aim to complete the sticker album for each national team participating in Euro 2024.
- **Album Progress**: View progress and see which stickers are missing to complete each team’s album.

### Transfer Market
- **Live Trading**: Users can trade duplicate stickers with other users in a live, dynamic transfer market.
- **Trade Management**: Manage offers and negotiate trades to optimize sticker collection.

### User Authentication
- **Registration**: New users can register to create an account, ensuring their collections and progress are saved.
- **Login System**: Existing users can securely log in to access their collections and continue their progress.

## Technology Stack

### Frontend
- **React**: For building a dynamic and responsive user interface.
- **Zustand**: To manage the application state.
- **CSS**: For styling the application.

### Backend
- **Node.js**: For the server-side logic.
- **Express.js**: To handle routing and API requests.
- **MySQL**: As the database to store user data and sticker collections.

### Authentication
- **JWT**: For secure authentication and session management.

### Additional Features
- **Socket.io**: For real-time updates and live trading features.
- **RESTful APIs**: To handle data interactions between the frontend and backend.

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/CristiCP/Uefa-Euro-2024-Album.git
   ```
2. Navigate to the project directory and install the dependencies:
   ```bash
   npm install / yarn install
   ```

Note: Before proceeding, ensure you have configured the database and the e-mail sender in `Backend/.env`.

## Running the Project

1. Fronend - Navigate to the 'Frontend' folder and use the command:
   ```bash
   npm run dev / yarn dev
   ```
2. Back-End - Navigate to the 'Backend' folder and use the command:
   ```bash
   npm start / yarn start
   ```
