# README
## Project: Express Todo Application
## By: Derek Tan

### Summary:
This repository contains code and other files for a to-do web application. I made this project to review and apply my JavaScript and SQL knowledge.

### Notes: (Front-End)
 - Use material design for UI appearance.
 - Use this color palette for the webpage UI:
    - [Palette](https://colorpalettes.net/color-palette-3852/)
 - All pages should have a top navigation bar for other pages and a side navigation bar for jumping around the current page.
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
 1. Create all basic webpages.
 2. Fix CSS.
 3. Install NodeJS mySQL module.
 4. Integrate and test JS to SQL code.
