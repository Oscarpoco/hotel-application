# Hotel Application

This project is the client-side application for a hotel booking platform. It provides a user interface for browsing hotels, making bookings, viewing reviews, and processing payments, among other features. The application is built using React and utilizes various third-party libraries and APIs to enhance its functionality.

Getting Started
This project was bootstrapped with Create React App.

Prerequisites
Make sure you have Node.js and npm installed on your machine. You can download them from Node.js official website.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

Project Overview
The client-side application includes various features for hotel booking and management. Below is an overview of the key functionalities:

1. Hotel Booking and Management
Users can browse hotels and make bookings.
Integration with Firebase for data storage and user authentication.
User authentication implemented using Google and email sign-in via Firebase.

2. Payment Processing
Integrated Stripe for secure online payments.
Utilizes @stripe/react-stripe-js and react-stripe-checkout for handling Stripe payments.

3. Interactive Maps and Location Services
Integrated Google Maps for displaying hotel locations.
Utilizes @react-google-maps/api for Google Maps.


4. User Reviews
Users can view and leave reviews for hotels they have stayed in.
Fetches and displays accommodations with reviews, ensuring no duplicates by fetching unique accommodation documents and counting them for likes.

5. Redux State Management
Utilizes react-redux for global state management.
Uses redux-thunk middleware for handling asynchronous operations.
redux-persist is used to persist the Redux state across sessions.

6. Responsive Design
The user interface is fully responsive and optimized for both desktop and mobile devices.

Utilizes CSS Grid and Flexbox for flexible and responsive layouts.
7. Custom Alerts and Notifications
A custom alert component is created for notifying users about various actions and errors.
Alert state is managed globally using Redux.

8. Testing
The application includes testing utilities with @testing-library/react, @testing-library/jest-dom, and @testing-library/user-event.
Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Dependencies
Below is a list of the key dependencies used in this project:

React: ^18.3.1
Redux: ^5.0.1
React-Redux: ^9.1.2
Redux Thunk: ^3.1.0
Redux Persist: ^6.0.0
Firebase: ^10.13.0
react-paypal-js
Google Maps: @react-google-maps/api
Testing libraries: @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
Axios for HTTP requests: ^1.7.7
React Icons for icons: ^5.3.0
Code Splitting
This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size
This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App
This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration
This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment
This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

npm run build fails to minify
This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
