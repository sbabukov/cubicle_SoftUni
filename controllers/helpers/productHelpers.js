
// middleware за валидиране на инпут данните
// функцията се експортва като name exports
exports.validateProduct = function (req, res, next) {
    let isValid = true;
    
    if (req.body.name.trim().length < 2) {
        isValid = false;
    } else if(!req.body.imageUrl){
        isValid = false;
    }

    if (isValid) {
        next();
    }
}