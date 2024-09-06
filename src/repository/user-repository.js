const { where } = require('sequelize');
const {User,Role} = require('../models/index');
const user = require('../models/user');

class UserRepository{
    async create(data){
        try{
            const user=await User.create(data);
            return user;
        }catch(error){
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
            }})
            return user;
        }catch(error){
            console.log("something went wrong at repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const user=await User.findByPk(userId);
            console.log("user at repostiry layerrrrrrrrrrr",user);
            const adminRole=await Role.findOne({
                where:{name:'ADMIN'}
            })
            return user.hasRole(adminRole);
        }catch(error){
            console.log("something went wrong at repository layer");
            throw error;
        }
    }
}

module.exports=UserRepository;