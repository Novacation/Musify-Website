$('#btn-login').on("click", async () => {
    try {

        const login = $('#txt-username').val()
        const password = $('#txt-password').val()
        $('#error-container').empty()

        const result = await $.ajax({
            url: 'https://musify-login-api.herokuapp.com/Musify/user-authentication/login',
            method: 'POST',
            data: {
                txtUsername: login,
                txtPassword: password
            }
        })

        if(result.status){
            window.location.href = 'https://musify-login-api.herokuapp.com/Musify/main-page'
            window.localStorage.setItem("musify-token", JSON.stringify(result.token))
        } else{
            $('#error-container').append("<p>" + result.errorMsg + "</p>")    
        }
    } catch (error) {
        $('#error-container').append("<p>Error on data validation.</p>")
    }
})


$('#btn-join').on("click", ()=> {
    window.location.href = 'https://musify-login-api.herokuapp.com/Musify/register'    
})