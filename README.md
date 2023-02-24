# README
## Project: Express Todo Application
## By: Derek Tan

### Summary:
This repository contains code and other files for a to-do web application. I made this project to review and apply my JavaScript and SQL knowledge from classes, and I may work on this from time to time.

### Required Programs:
 - `npm`: A package manager for JS projects.
 - `git`: A popular version control system. This comes by default in MacOS XCode utilities and preinstalled for Linux. This must be installed on Windows.
 - `MySQL`: Install a MySQL platform to use an SQL database.

### Usage:
 1. After downloading the repo, run `npm install` locally.
 2. After installing all packages, create the `tasks` SQL database according to the database notes. You may use XAMPP or mySQL alone as the database technology.
 3. Run the MySQL server. If you have XAMPP, you must use the control panel and start MySQL.
 4. Create a `.env` file to store database credentials (see the `database.js` file for specific `.env` variable names).
   - Make sure that the username, password, and database host along with name match with the actual credentials on your MySQL records.
 5. Run `npm start`. 
 6. Open `localhost` at port 3000.

### Notes: (Front-End)
 - Uses material design for UI appearance.
 - Uses this color palette for the webpage UI:
    - [Palette](https://colorpalettes.net/color-palette-3852/)
 - All pages have a top navigation bar for other pages.
 - All pages use semantic HTML as much as possible: no div spam.
 - Client side scripting, if any, should be used for simple form interactivity.

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
 5. Add a feature to view _all_ tasks! (DONE)
 6. Test client side form script with ID entry or title entry. (DONE)
 7. Add description updating page / feature for a task?
 8. Show task list as a grid of separate tiles in a future version?
