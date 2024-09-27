const AppError=require('./error-handler');
const {StatusCodes}=require('http-status-codes');

class ClientError extends AppError{
    constructor(name,message,expalantion,StatusCode){  
        super(
            name,
            message,
            expalantion,
            StatusCode
        )
        
    }
    
} 

module.exports=ClientError;