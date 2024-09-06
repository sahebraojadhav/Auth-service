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

******************* M:N association ************ 
1. static associate(models) {
      // define association here
      this.belongsToMany(models.User,{
        through:'User_Roles'
      })
    }

and same in other model do same thing opposite through another table *through table* automatically creted by sequelize 

//npx sequelize db:migrate 

use this command to migration

and one time sync the database


*******************
how to create seed files 
*********************

1.sequelize-cli seed:generate --name demo-user
go to seed file and then add seed data by given format else u will get error 

wait queryInterface.bulkInsert('Roles', [{
         name: 'ADMIN',
         createdAt:new Date(),
         updatedAt:new Date()
       },
      {
        name:"CUSTOMER",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        name:'AIRLINE_BUSINESS',
        createdAt:new Date(),
        updatedAt:new Date()
      }
      
      ], {});
  }

2.npx sequelize-cli db:seed:all
3. npx sequelize db:seed --seed  20240906043747-add-roles.js   for perticular sedd file