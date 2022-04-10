/*FUNCTIONS FOR THE SIGNUP THEN LOGIN SUBMISSIONS - ADD ASYNCHRONOUS FUNCTIONALITY*/
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    /*VERIFY CONTENT WITH A CONDITIONAL STATEMENT*/
    if (username && email && password) {
        /*ASSIGN RESULT OF PROMISE TO A CONST VARIABLE EQUAL TO AWAIT TO MAKE ASYNCHRONOUS*/
        const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //NO NEED FOR .THEN STATEMENT- MAKE THE VALIDATION CONDITIONAL WITH AN .OK PROPERTY
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}

/*FUNCTION FOR LOGIN - SAME EXCEPT LOGINFORMHANDLER NAME, NO USERNAME REQ., AND URL PATH*/
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    /*VERIFY CONTENT WITH A CONDITIONAL STATEMENT*/
    if (email && password) {
        /*ASSIGN RESULT OF PROMISE TO A CONST VARIABLE EQUAL TO AWAIT TO MAKE ASYNCHRONOUS*/
        const response = await fetch('api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //NO NEED FOR .THEN STATEMENT- MAKE THE VALIDATION CONDITIONAL WITH AN .OK PROPERTY
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}



/*ADD LLISTENER FOR THE CLICK EVENT SUBMIT BUTTONS*/
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);