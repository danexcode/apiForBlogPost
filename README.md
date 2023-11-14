<h1 align="center" id="title">myCommerce</h1>

<p align="center"><img src="https://socialify.git.ci/danexcode/apiForBlogPost/image?language=1&name=1&owner=1&pattern=Brick%20Wall&stargazers=1&theme=Light" alt="project-image"></p>

<p id="description">Our Blogpost API, developed with NestJS and TypeScript, is a powerful tool that allows users to perform CRUD (Create, Read, Update and Delete) operations on our blog articles. Using TypeORM, our API ensures efficient and secure data persistence. In addition, user authentication is performed using JWT and PassportJS, which ensures the protection of sensitive information. With this API, our users can enjoy a smooth and reliable experience when interacting with our blog.</p>
  
<h2>🧐 Features</h2>

Here're some of the project's best features:

*   1\. CRUD Functions
*   2\. Build with NestJS and Typescript
*   3\. TypeORM-Migrations
*   4\. Implements Clean Architecture
*   5\. Authorization with JWT

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository</p>

```
git clone https://github.com/danexcode/apiForBlogPost
```

<p>2. Go into folder and install dependencies</p>

```
npm install
```

<p>3. Create .env file and configure it using .env.example for help</p>

<p>4. Raise a postgres image using docker-compose</p>

```
docker-compose up -d postgres
```

<p>5. Create database tables using command:</p>

```
npm run migrations:run
```

<p>6. Finally run server</p>

```
npm run start
```
  
  
<h2>💻 Built with</h2>

Technologies used in the project:

*   NestJS and TypeScript
*   TypeORM
*   JWT and Passport
*   PostgreSQL
