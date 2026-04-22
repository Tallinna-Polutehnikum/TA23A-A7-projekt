# Server
### How to setup back-end & database dev environment
```bash
cd server
```
Install required packages:
```bash
npm i
```
Open mysql workbench and create a new sql connection. Put the username as **root** and password as **mysql**, make sure you use port **3306**. Inside server/ directory create a **.env** file and copy & paste there content from **.env.example**. <br>
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
Download images directory from [drive](https://drive.google.com/drive/folders/1XZkrBAFWPOiPnGyCzdSgVqBkMQe510GP?usp=drive_link) and put it in public directory. <br>
<br>
Seed the database:
```bash
npm run seed
```
Run localhost server:
```bash
npm run dev
```