# README
## Project: Express Todo Application
## By: Derek Tan

### Summary:
This repository contains code and other files for a to-do web application. I made this project to review and apply my JavaScript and SQL knowledge.

### Required Programs:
 - `npm`: A package manager for JS projects.
 - `git`: A popular version control system. This comes by default in MacOS XCode utilities and preinstalled for Linux. This must be installed on Windows.
 - `MySQL`: Install a MySQL platform to use an SQL database.

### Usage:
 1. After downloading the repo, run `npm install` locally.
 2. After installing all packages, run `npm start` to run the application.
 3. Create a `.env` file to store database credentials (see the `database.js` file for specific `.env` varialbe names). Create an SQL database according to the specification in the database notes.
 4. Run the MySQL server.
 5. Open `localhost` at port 3000.

### Notes: (Front-End)
 - Use material design for UI appearance.
 - Use this color palette for the webpage UI:
    - [Palette](https://colorpalettes.net/color-palette-3852/)
 - All pages should have a top navigation bar for other pages.
 - All pages should use semantic HTML as much as possible: no div spam.
 - Client side scripting, if any, should be used for simple form validation.

### Notes: (SQL Database)
 - The database used is called `test`.
 - The `tasks` table is the main table storing todo entry data.
   - The _primary_ key is `taskid`, an _INTEGER_ type that is _not_ `NULL`!
   - The associated fields with each distinct `taskid` are:
      - `title`: A `VARCHAR(72)` type that is never `NULL`.
      - `desc`: A `VARCHAR(104)` type that is never `NULL`.

### Other TO-DOs:
 1. Create all basic webpages. (DONE)
 2. Fix CSS. (DONE)
 3. Install NodeJS mySQL module. (DONE)
 4. Finish the adding, deleting, and reading tasks functionality. (DONE)
 5. Add a viewing page for _all_ entries!
 6. Test client side form script with ID entry or title entry.
