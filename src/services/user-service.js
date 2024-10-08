const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const UserRepository=require('../repository/user-repository');
const {JWT_KEY}=require('../config/serverConfig');
const user = require('../models/user');
const { response } = require('express');
const AppErrors = require('../utils/error-handler');
class UserService{
    constructor(){
        this.userRepository=new UserRepository();
    }

    async create(data){
        try{
            const user=await this.userRepository.create(data);
            return user;
        }catch(error){
            if(error.name=== 'SequelizeValidationError')
            {
                throw error; 
            }
            console.log("something went wrong in token creation ");
            throw new AppErrors(
                'ServerError',
                'Something went wrong in service',
                'Logical Issue Found',
                500
            )
        }
    }

    async signIn(email,palinPassword){
        try{
            //step 1-> fetch the user using the email
            const user=await this.userRepository.getByEmail(email);
            //step 2->compare incommit plai password with stores encrypted password
            const passwordMatch=this.checkPassword(palinPassword,user.password);
            if(!passwordMatch){
                console.log("password doesn't matach");
                throw {error:'Incorrect password'}
            }

            console.log('this inside service layer',this);
            const newJWT=this.createToken({email:user.email,id:user.id});
            return newJWT;

        }catch(error){
            if(error.name === 'AttributeNotFound'){
                throw error
            }
            console.log("something went wrong in token creation ");
            throw error;
        }
    }

    async isAuthenticated(token){
        try{
            const response=this.verifyToken(token);
            if(!response){
                throw {error:'Invalid token'}
            }

            const user=await this.userRepository.getById(response.id)
            if(!user){
                throw {error:'No user with the corresponding token exists'};
            }

            return user.id;
            
        }catch(error){
            console.log("something went wrong in token verification");
            throw error;
        }
    }

    createToken(user){
        try{
            const result=jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        }catch(error){
            console.log("something went wrong in token creation ");
            throw error;
        }
    }

    verifyToken(token){
        try{
            console.log("------------------------------")
            console.log(token,JWT_KEY)
            const response=jwt.verify(token,JWT_KEY);
            return response;
        }catch(error){   
            console.log("Something went wrong in token validation",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }catch(error){
            console.log("Something wrong in password comparison ");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            return this.userRepository.isAdmin(userId);
        }
        catch(error){
            console.log("Something wrong in checking is Admin");
            throw error;
        }
    }
}

module.exports=UserService;