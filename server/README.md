# PV Travel Project
        
This is a backEnd educational Project for holidays. Problems, which we solve:
 - Register Users (We have 2 roles - admin (by default) and anothers are users);
 - Login User
 - Create Holiday
 - Search Holidays
 - Search Holiday by two criteria.
 - Book Holiday by Users

Our URL Routing:

| Routes                            |    Admin       |    User       |    Public    |     
| :---                              |     :---:      |         :---: |         ---: |
| auth/register                     |   ✔️           |    ✔️          |     ✔️        |
| auth/login                        |   ✔️           |    ✔️          |     ✔️        |
| /holidays                         |   ✔️           |    ✔️          |     ✘        |
| /holidays/id                      |   ✔️           |    ✔️          |     ✘        |
| /holidays/create                  |   ✔️           |    ✘          |     ✘        |
| /holidays?location=''&price=''    |   ✔️           |    ✔️          |     ✘        |
| /holidays/update/id               |   ✔️           |    ✘          |     ✘        |
| /holidays/book                    |   ✔️           |    ✔️          |     ✘        |
| /holidays/booked                  |   ✔️           |    ✔️          |     ✘        |
| /users                            |   ✔️           |    ✘          |     ✘        |
| /users?params                     |   ✔️           |    ✘          |     ✘        |
| /users/id                         |   ✔️           |    ✘          |     ✘        |
| /users/id (delete)                |   ✔️           |    ✘          |     ✘        |

Steps to run this project:

1. Run `npm install` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run start: dev` or `npm start` command
