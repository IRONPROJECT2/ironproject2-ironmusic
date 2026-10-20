# Ironmusic (IronHack second project)
Ironmusic is the final project for Module 2 of the Ironhack web development bootcamp, created by Marta Bravo and Lucas Fajersztejn. Ironmusic is a blog for musicians and bands. Our goal was to create a meeting place for musicians, where they can connect with other bands and join them; post various job listings seeking musicians; promote a concert; or find other bands to organize a festival (bandjam).

## Challenges of this project:

- Integration of multiple APIs and Node.js modules: Proper integration and management of various APIs and Node.js modules.

- Secure and persistent user session management: Correctly implement and configure user session management using express-session and connect-mongo to ensure the security and persistence of session data in the MongoDB database.

- MongoDB database modeling and operations with Mongoose: Properly designing data models and performing both query and CRUD (create, read, update, delete) operations on the MongoDB database using Mongoose in an efficient and structured manner.

- HTTP error handling and server debugging: Ensure proper handling of HTTP errors using http-errors and facilitate server debugging by using Morgan to log HTTP requests and trace potential issues in the execution flow.

- Implementation of Advanced Features: Developing advanced features—such as creating a ranking of the top 10 bands based on user votes—may have been a technical challenge requiring careful design and efficient implementation.

## Features
- Log in / Sign up: Users can log in if they have an account or sign up on the website if they don’t
- Create a band: Once logged in, users can go to the “Create Band” form and create one; users who belong to a band then join it and must be accepted by the administrator (the user who created the band)
- Join a band / manage members: Once a band is created, it will appear in the list of bands. If another user views the band’s details, they have the option to join it. If they click “Join,” the administrator must go to their profile to accept or reject the request
- Search: In the center of the navigation bar, there is a search bar that can be used to search for users, bands, and posts.
- Post (Bandjam, Form a Band, and Announce Your Concert): In the community section, users can post in:
    - Bandjam: A space to find other bands to organize festivals or jam sessions.
    - Form a Band: a space to find a band or musicians for a band
    - Announce Your Concert: a space to promote a show (if the date is coming up soon, it will appear in the index)
- Send a message: Users can comment on any of the posts.
- Ranking: In each band's details page, users can rate the band on a scale of 1 to 5 stars; an average will be calculated based on all votes and displayed in the index ranking.
- Index: This section consists of a ranking showing the 10 highest-rated bands, the 5 most recently added bands to the website, a section for music news, an invitation to post in the community, and finally, a space to promote the 6 upcoming shows closest to the current date.

## link

https://ironproject2-ironmusic.fly.dev/

## Screenshots

Error 404

![Error 404](https://i.postimg.cc/pVq87tyB/404.png)

Error 500

![Error 505](https://i.postimg.cc/gJKRmCsm/Error-500.png)

error validation

![error validation](https://i.postimg.cc/nrcmz3S7/errorvalidation.png)

Uso de sweetalert2

![Uso de sweetalert2](https://i.postimg.cc/3RhmM8gt/Estas-Seguro.png)

Band Detail

![Band Detail](https://i.postimg.cc/yxQZS02G/Band.png)


### Thank you for reading this far. This was the IronHack second project.
