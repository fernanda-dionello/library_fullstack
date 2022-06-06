exports.returnError = (error, response) => {
    error.status 
        ? response.status(error.status).json(error.message)
        : response.status(500).json({message: "Err not indetified"});  
}