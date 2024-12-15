# InipodPokemonAngularFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# inipod-pokemon-angular-frontend

# Pokémon Application User Guide

## Introduction

Welcome to the Pokémon Application! This guide will help you navigate through the application's features and make the most of your Pokémon exploration experience.

## Getting Started

### Account Creation

1. **Sign Up**

    - Navigate to the registration page
    - Enter a unique username
    - Create a strong password
    - Click "Sign Up" to create your account

2. **Log In**
    - Go to the login page
    - Enter your username and password
    - Click "Log In" to access your account

## Home Page

### Overview

The home page provides a quick introduction to the world of Pokémon:

-   **Video Carousel**: Watch 4 exciting Pokémon-related video trailers
-   **Initial Pokémon Display**: View the first 10 Pokémon in the database
    -   Displayed in a 5x2 grid
    -   Shows Pokémon images and names

## Pokémon List Page

### Importing Pokémon Data

1. Click the "Import CSV" button
2. Select the Pokémon CSV file from your computer
3. Wait for the import process to complete

### Searching and Filtering

#### Basic Search

-   Use the search bar to find Pokémon by name
-   Search is automatically triggered after 300ms of typing
-   Results update dynamically as you type

#### Advanced Search

Utilize multiple filters to narrow down your Pokémon search:

-   **Type Filter**: Select specific Pokémon types
-   **Legendary Status**: Filter legendary or non-legendary Pokémon
-   **Speed Range**: Set minimum and maximum speed values

### Pagination

-   Default view shows 10 Pokémon per page
-   Use the dropdown to change the number of Pokémon displayed:
    -   10 Pokémon per page (default)
    -   20 Pokémon per page 
    -   50 Pokémon per page
    -   100 Pokémon per page
-   Navigate through pages using page navigation buttons

### URL Query Parameters

-   Search and filter results are reflected in the URL
-   You can share or bookmark specific search results

## Pokémon Details

### Accessing Details

-   Click on any Pokémon in the list to open the details modal
-   Modal displays:
    -   Pokémon image
    -   Comprehensive information
    -   Detailed statistics

### Favorite Pokémon

1. In the details modal, click the heart icon
2. Toggle to mark/unmark as a favorite
3. Favorited Pokémon can be easily accessed later

## Favorite Pokémon Management

-   View your list of favorite Pokémon
-   Remove Pokémon from favorites by clicking the heart icon again

## Responsive Design

The application is designed to work seamlessly across:

-   Desktop computers
-   Tablets
-   Mobile phones

## Troubleshooting

### Common Issues

1. **Cannot Import CSV**

    - Ensure the file is in the correct format
    - Check file size and permissions
    - Verify internet connection

2. **Login Problems**

    - Double-check username and password
    - Reset password if necessary
    - Clear browser cache and cookies

3. **No Pokémon Showing**
    - Ensure CSV has been imported
    - Check internet connection
    - Refresh the page

## System Requirements

-   Modern web browser (Chrome, Firefox, Safari, Edge)
-   JavaScript enabled
-   Stable internet connection

## Privacy and Security

-   Passwords are securely encrypted
-   JWT authentication protects your account
-   Personal data is kept confidential

## Tips and Tricks

-   Use advanced filters to find rare Pokémon
-   Bookmark interesting search results
-   Explore the full range of Pokémon in the database

## Contact Support

For any additional questions or support:
