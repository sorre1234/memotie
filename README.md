
# Memories
Memories is a social media application that allows users to **Create**, **Edit**, **Like**, and **Delete** their memories. The built-in authentication system permits users to remain logged in for up to an hour before requiring them to re-enter their credentials for login. **Memories** facilitates searching by tags, titles, or content. With pagination support, allowing for up to 8 posts per page, it enhances user accessibility.
Equipped with an integrated **profanity filter**, the application ensures the filtration of explicit content by flagging such memories and subsequently deleting them if not edited within a specified **timeframe**, typically the **following day**.



## Table of Contents    
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [Hosting](#hosting)
- [Usage](#usage)
- [Links](#links)

## Installation and setup
[![Static Badge](https://img.shields.io/badge/Node-white?style=for-the-badge&logo=nodedotjs&logoColor=White&labelColor=White&link=https%3A%2F%2Fnodejs.org%2Fen%2Fdownload)
](https://nodejs.org/en/download) [![Static Badge](https://img.shields.io/badge/npm-black?style=for-the-badge&logo=npm&logoColor=White&labelColor=White&link=https%3A%2F%2Fdocs.npmjs.com%2Fdownloading-and-installing-node-js-and-npm)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)




**Note** : Make sure that you have the latest version of **node** and **npm** installed. Clone the repository using the given methods under the code dropdown using any of the protocols.

Now, under the memotie directory, open VScode and then in the **bash** terminal,
```bash
  cd client
  npm install --legacy-peer-deps
```
Then doing the same in the server directory,

```bash
  cd server
  npm install --legacy-peer-deps
```
This ensures that all npm packages, along with their specified versions from the project's package.json file, are installed in your local machine.


## Deployment

**Initiate** the Deployment by separating the VScode terminal into **server-side** and **client-side** sessions.
In each of the terminals, run the following command:
```bash
  npm start
```
This shall initiate the front-end and back-end of the application.

## Hosting

The front end of Memories has been deployed on **Netlify**, while the backend is hosted on **Render**.

The live application can be accessed by clicking [here](https://memotie.netlify.app/).

## Usage

* **Logging in**: If you're not already logged in, start by clicking on the *"Sign In"* option on the homepage.Memories offers two sign-in options: using a *username* and *password* or via *Google* login.
* Signing up: If you don't have an account, sign up using the provided option on the login page.
* **Creating a Memory**: After logging in, you can create a new memory by entering a title and message. Separate tags with commas. Additionally, you can upload a supporting image for your memory by selecting a file from your device.
* **Editing a memory**: To edit any of your memories, click on the three-dot icon located in the top-right corner of the post card. Then, select *"Submit"* to update the post.
* **Searching for a memory**: To search for a memory, you have two options: either enter text in the *"search memories"* section to search by title or message, or input tags in the *"search tags"* section to search by tags associated with the memory.
* **Profanity Filtering**: Memories upholds decorum within the application by actively filtering out explicit language. Users whose memories contain profanity are flagged temporarily, and if the content remains unchanged within the specified timeframe, typically within a day, it is automatically removed.
*Please note that this filtering functionality relies on the continuous operation of the server. Consequently, it may not function reliably in live deployments across various hosting services.*
## Links

[![linkedin](https://img.shields.io/badge/Linkedin-%230A66C2?style=for-the-badge&logo=linkedin&labelColor=%230A66C2&link=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fsourab-mayya-531719236%2F
)](https://www.linkedin.com/in/sourab-mayya-531719236/)
[![Static Badge](https://img.shields.io/badge/Github-red?style=for-the-badge&logo=github&logoColor=%23181717&labelColor=White&color=green&link=https%3A%2F%2Fgithub.com%2Fsorre1234)](https://github.com/sorre1234)

