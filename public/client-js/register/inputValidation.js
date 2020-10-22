//const $ = require('jquery')

const verifyLength = (inputlength) => {
    return (inputlength <= 7) ? false : true
}


const confirmPassword = (password, confirmPassword) => (password === confirmPassword)? true : false

export {
    verifyLength,
    confirmPassword
}