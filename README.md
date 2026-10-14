# Dynamic Personal Portfolio Website — Udacity Front-End Nanodegree

A JavaScript-driven portfolio website developed as part of the Udacity Front-End Nanodegree curriculum. This project focuses on **DOM manipulation, asynchronous data fetching, interactive UI updates, event handling, and client-side form validation**.

The website simulates a personal portfolio using sample profile information and project data supplied with the starter project. My implementation focuses on using JavaScript to dynamically populate the page and make its components interactive.

## Project Overview

The objective of this project was to build a dynamic portfolio experience without modifying the provided HTML, CSS, or JSON data files.

Using vanilla JavaScript, I implemented the functionality that retrieves profile and project data from JSON files, generates project cards, updates a project spotlight based on user selection, enables responsive project-list scrolling, and validates contact-form input.

The supplied datasets intentionally contain incomplete information, providing an opportunity to practise handling missing values gracefully.

## Features

### Dynamic About Me Section
- Fetches profile information from `aboutMeData.json` using the Fetch API.
- Dynamically creates the biography and headshot elements.
- Uses fallback text and a placeholder image when profile information is missing.
- Handles data-fetching errors with `try...catch`.

### Dynamic Project Gallery
- Retrieves project information from `projectsData.json`.
- Generates project cards dynamically using JavaScript and `forEach()`.
- Uses `DocumentFragment` to assemble the cards before inserting them into the DOM.
- Displays project titles, short descriptions, and background images.
- Provides fallback titles, descriptions, and images when project data is incomplete.

### Interactive Project Spotlight
- Displays the first project as the default spotlight when the page loads.
- Updates the spotlight title, description, link, and background image when a project card is clicked.
- Uses event delegation to handle clicks on dynamically generated cards.
- Hides the project link when the selected project does not have a URL.

### Responsive Project Navigation
- Implements left and right arrow controls for navigating the project list.
- Scrolls horizontally on smaller screens and vertically on desktop layouts.
- Uses pointer events to start and stop continuous scrolling while an arrow is held.
- Adjusts scrolling behavior according to the viewport width.

### Contact Form Validation
- Prevents the browser's default form submission behavior using `preventDefault()`.
- Checks whether the email field and message field have been completed.
- Performs basic email-format and allowed-character validation.
- Displays field-specific error messages for invalid input.
- Updates a live character counter for the message field.
- Applies an error class when the message exceeds the 300-character limit.
- Displays a success alert when validation passes.

The contact form demonstrates client-side validation; it does not send messages to a backend service.

## Technologies Used

- **HTML5** — Provided page structure
- **CSS3** — Provided styling and responsive layouts
- **JavaScript (ES6+)** — Dynamic content generation and application logic
- **JSON** — Profile and project data
- **Fetch API** — Asynchronous data retrieval
- **DOM API** — Creating, updating, and inserting page elements
- **Regular expressions** — Basic input validation

## JavaScript Concepts Demonstrated

| Concept | Application |
|---|---|
| `fetch()` and `async/await` | Retrieving profile and project data |
| `try...catch` | Handling errors during data retrieval |
| `document.createElement()` | Creating elements dynamically |
| `DocumentFragment` | Preparing multiple project cards for DOM insertion |
| `append()` and `replaceChildren()` | Inserting and replacing DOM content |
| `textContent` | Setting element text |
| `forEach()` | Iterating over project data |
| Event delegation and `.closest()` | Handling project-card clicks |
| `addEventListener()` | Registering click, pointer, input, and submit handlers |
| `classList` | Managing validation error styles |
| `matchMedia()` | Detecting viewport width for responsive scrolling |
| `scrollBy()` | Moving through the project gallery |
| `setInterval()` and `clearInterval()` | Controlling continuous scrolling |
| Regular expressions | Validating email format and permitted characters |
| `preventDefault()` | Preventing a standard form submission and page refresh |

## Handling Incomplete Data

The original JSON datasets were intentionally left unchanged.

Where information is unavailable, the JavaScript supplies fallback values for profile text, project titles, descriptions, and background images. Project links are hidden when a URL is missing.

This approach demonstrates how a frontend application can accommodate incomplete data without editing the source datasets or displaying missing values directly in the interface.

## Project Structure

```text
Udacity-Front-End-Nanodegree-Project-3-A-Personal-Portfolio-Website/
├── index.html
├── css/
│   ├── normalize.css
│   └── styles.css
├── data/
│   ├── aboutMeData.json
│   └── projectsData.json
├── images/
│   ├── headshot.webp
│   ├── card_placeholder_bg.webp
│   ├── spotlight_placeholder_bg.webp
│   └── ... project card and spotlight images
└── js/
    └── scripts.js
```

## Running the Project Locally

1. Clone or download this repository.
2. Open the project folder in a code editor.
3. Start a local development server, such as the VS Code Live Server extension.
4. Open the served `index.html` page in your browser.
5. Explore the project gallery, select different cards, test the navigation arrows, and experiment with the contact form validation.

A local development server is recommended because the application retrieves JSON files using `fetch()`.

## Project Constraints

- The HTML, CSS, and JSON data files supplied with the starter project were left unchanged.
- The JavaScript implementation is contained in `js/scripts.js`.
- The existing stylesheet provides the layout and responsive design.
- The portfolio content is sample content supplied with the project, rather than a representation of my own professional portfolio.

## Learning Outcomes

Through this project, I practised:

- Working with asynchronous JavaScript and JSON data.
- Creating and updating DOM elements programmatically.
- Using `DocumentFragment` to prepare DOM content before insertion.
- Implementing event delegation for dynamically generated elements.
- Handling missing data with conditional logic and fallback values.
- Creating responsive interactions using viewport detection and scrolling methods.
- Managing pointer events and repeated actions.
- Validating form input and providing immediate feedback to users.
- Working within an existing HTML and CSS framework without modifying its source files.

## Acknowledgements

This project was completed as part of the **Udacity Front-End Nanodegree curriculum**. The starter project provided the HTML structure, CSS styling, JSON datasets, and image assets. The JavaScript functionality was implemented as the focus of the assignment.
