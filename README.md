# TA23A-A7-projekt
Clone repository:
```bash
git clone https://github.com/Tallinna-Polutehnikum/TA23A-A7-projekt.git
```
## How to setup front-end dev environment
```bash
cd client
```
Install required packages:
```bash
npm i
```
Run localhost server:
```bash
npm run dev
```
## How to setup back-end & database dev environment
```bash
cd server
```
Install required packages:
```bash
npm i
```
Open mysql workbench and create a new sql connection. Put the username as **root** and password as **mysql**, make sure you use port **3306**. <br>
Also inside server/ directory create a **.env** file and paste there content from **.env.example**. <br>
<br>
Make a new sql file in mysql workbench and create a database:
```bash
CREATE DATABASE cinema;
```
Push the schema into mysql:
```bash
npx prisma db push
```
Generate prisma client:
```bash
npx prisma generate
```
Seed the database:
```bash
npm run seed
```
Run localhost server:
```bash
npm run dev
```
## Some other useful commands for development
After changing schema.prisma create a migration:
```bash
npx prisma migrate dev --name descriptive_name
```
Deploy the changes into mysql:
```bash
npx prisma migrate deploy
```
