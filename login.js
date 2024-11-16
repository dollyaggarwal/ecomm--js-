function validateForm(event){
    const form = event.target;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;

    if(form.id === 'signup-form'){
        if(password !== confirmPassword){
          alert('Passwords do not match');
            event.preventDefault();
            return false;
        }
        localStorage.setItem('userEmail',email);
        localStorage.setItem('userPassword', password);
        alert('User Sign up Successfull!');
    }
    if(form.id === 'signin-form'){
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');
        if(storedEmail !== email || storedPassword !== password){
            alert('Invalid username or password');
            event.preventDefault();
            return false;
        }
        alert('User Sign in Successfull!');
    }
    return true;
}

    
   
