const { where } = require('sequelize');
const {User,Role} = require('../models/index');
const user = require('../models/user');
const ValidationError=require('../utils/validation-error');
const ClientError = require('../utils/client-error');
const { StatusCodes } = require('http-status-codes');
class UserRepository{
    async create(data){
        try{
            const user=await User.create(data);
            return user;
        }catch(error){
            if(error.name==='SequelizeValidationError')
            {   
                console.log("Creating new Validation error");
                let validationError=new ValidationError(error);
                console.log(validationError);
            }
            console.log("something went wrong at repository layer");
            throw error;
        }
    }

    async destroy(userId){
        try{
            await User.destroy({
                where:{
                    id:userId
                }
            })
        }catch(error){
            console.log("something went wrong at reposity layer");
            throw error;
        }
    }

    async getById(userId){
        try{
            const user=await User.findByPk(userId,
                {attributes:['email','id','password']}
            );
            return user;
        }catch(error){
            console.log("something went wrong at repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try{
            const user=await User.findOne({where:{
                email:userEmail
            }});
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'please check the email, as there is no record found',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        }catch(error){
            console.log("something went wrong at repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const user=await User.findByPk(userId);
            //console.log("user at repostiry layerrrrrrrrrrr",user);
            const adminRole=await Role.findOne({
                where:{name:'ADMIN'}
            })
            //console.log("user form user Repository&&&&&&&&&&&&",user);
            return user.hasRole(adminRole);
        }catch(error){
            console.log("something went wrong at repository layer");
            throw error;
        }
    }
}

module.exports=UserRepository;