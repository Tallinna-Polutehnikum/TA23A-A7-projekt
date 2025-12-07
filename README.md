# Cinema-project-TA-23A
Clone repository:
```bash
git clone https://github.com/Tallinna-Polutehnikum/TA23A-A7-projekt.git
```
## Frontend & backend
Change directory either to server or client:
```bash
cd client
```
```bash
cd server
```
Install required node modules:
```bash
npm i
```
Run live server:
```bash
npm run dev
```
## Database
Open MySQL and create an user if haven't already, set the username as **root** and the password as **mysql**, make sure the port is **3306** <br>
Go to server directory and create a file **.env** and copy contents from **.env.example** file to it. <br>
<br>
If you have created a schema in MySQL then you can skip to the push part, if you haven't then do so:
```bash
CREATE DATABASE cinema;
```
```bash
USE cinema;
```
Push the prisma schema into MySQL:
```bash
npx prisma db push
```
Generate Prisma Client:
```bash
npx prisma generate
```
### Some other useful commands for development
After changing the schema.prisma create a migration (basically acts as git):
```bash
npx prisma migrate dev --name descriptive_name
```
Deploy the changes into mysql:
```bash
npx prisma migrate deploy
```
