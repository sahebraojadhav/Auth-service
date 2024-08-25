---------------1----------------------
npx sequelize init in root folder then move the folder to src

hide config folder

"development": {
    "username": "root",
    "password": "password",
    "database": "AUTH_DB_DEV",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

----------------2--------------------------
npx sequelize db:create 

------------------3-----------------------
npx sequelize model:generate --name User --attributes email:string,password:string

----------------------4----------------------
make changes in the models and migrations then do

npx sequelize db:migrate



hashed function for password encryption is written inside model and json web toekn generation will be written inside the service layer