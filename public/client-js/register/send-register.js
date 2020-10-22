import {
    verifyLength,
    confirmPassword
} from './inputValidation.js'



$('#btn-join').on("click", async () => {

    
    try {
        const login = $('#txt-username').val()
        const password = $('#txt-password').val()
        const confPassword = $('#txt-confirm-password').val()

        if (verifyLength(login.length) && verifyLength(password.length)) {

            if (confirmPassword(password, confPassword)) {
                const result = await $.ajax({
                    url: 'https://musify-login-api.herokuapp.com/Musify/user-authentication/register',
                    method: 'POST',
                    data: {
                        userLogin: login,
                        userPassword: password
                    }
                })
                if (result.status) {
                    window.localStorage.setItem('musify-token', JSON.stringify(result.token))

                    window.location.href = "https://musify-login-api.herokuapp.com/Musify/main-page"
                } else {
                    $('#error-container').empty()
                    $('#error-container').append("<p>" + result.errorMsg + "</p>") 
                }

            } else{
                $('#error-container').empty()
                $('#error-container').append("<p>Password fields must be the same.</p>") 
            }
        } else{
            $('#error-container').empty()
            $('#error-container').append("<p>Fields must contain at least 8 characters.</p>") 
        }
    } catch (error) {
        $('#error-container').empty()
        $('#error-container').append("<p>Error when validating credentials.</p>") 
    }
})


$('#btn-login').on("click", ()=> {
    window.location.href = 'https://musify-login-api.herokuapp.com/Musify/login'    
})