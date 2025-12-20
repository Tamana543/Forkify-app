# Forkify App 🍽️

A modern **recipe search and bookmarking web application** built with vanilla JavaScript using the **MVC architecture**. The app allows users to search for recipes, view detailed cooking instructions, adjust servings dynamically, bookmark favorite recipes, and upload their own custom recipes.

This project is focused on **clean architecture, real-world JavaScript patterns, and API-based data handling**.

---

##  Features

- 🔍 Search recipes using an external API
- 📄 View detailed recipe information (ingredients, cooking time, servings)
- ➕ Adjust ingredient quantities based on servings
- ⭐ Bookmark and manage favorite recipes (saved in local storage)
- ⬆️ Upload your own custom recipes
- ⚡ Fast performance with Parcel bundler
- 🧠 Structured using MVC (Model–View–Controller) pattern

There are some surprises too 😉, Open the code in your code editor and FIND THEM

---

## 🛠️ Tech Stack

- **HTML5**
- **SCSS (Sass)**
- **JavaScript (ES6+)**
- **Parcel** (bundler)
- **Forkify API**
- **LocalStorage** (for bookmarks persistence)

---

## 🧩 Project Structure

```
Forkify-app-main/
│
├── src/
│   ├── js/
│   │   ├── controller.js   # App controller (application logic)
│   │   ├── module.js       # State management & API interaction
│   │   ├── helper.js       # Reusable helper functions
│   │   └── config.js       # Configuration & constants
│   │
│   ├── sass/               # SCSS styles
│   └── img/                # Images & icons
│
├── dist/                   # Production build
├── Guide Lines/            # Architecture & flow diagrams
├── package.json
└── README.md
```

---

## ▶️ Getting Started

### Prerequisites

Make sure you have **Node.js** installed.

### Installation

```bash
git clone https://github.com/your-username/forkify-app.git
cd forkify-app
npm install
```

### Run the App (Development)

```bash
npm start
```

The app will run on:
```
http://localhost:1234
```

### Build for Production

```bash
npm run build
```

---

## 🧠 Architecture Overview

This project follows the **MVC (Model–View–Controller)** architecture:

- **Model** → Handles state, API calls, and business logic
- **View** → Manages UI rendering and DOM updates
- **Controller** → Connects user interactions with the model and views

This separation keeps the codebase **scalable, maintainable, and readable**.

---

## 📸 Preview


![Website overview](<website overview.png>)

---

## 📌 Learning Outcomes

- Advanced JavaScript (ES6+)
- Working with REST APIs
- State management without frameworks
- MVC architecture in real projects
- Clean code and modular design

---

## 📄 License

This project is for **educational purposes**.

---


## 👤 Author

**Tamana\<ReginaJS/\>**  
Front-End Developer | JavaScript Enthusiast

---

If you like this project, feel free to ⭐ the repository.



