const AppError=require('./error-handler');
const {StatusCodes}=require('http-status-codes');

class ValidationError extends AppError{
    constructor(error){
            let errorName=error.name;
            let expalantion=[];
            error.errors.forEach((err)=>{
                expalantion.push(err.message);
            });
        super(
        errorName,
        'Not able to validate the data sent in the request',
        expalantion,
        StatusCodes.BAD_REQUEST
        )
    }
    
} 

module.exports=ValidationError;