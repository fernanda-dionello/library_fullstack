let err = {message:"", status:400};

exports.validateRentsFounded = (rents) => {
    if(rents.rowCount == 0){
        err = {message:"No rents found.", status: 404};
        throw err;
    }
}