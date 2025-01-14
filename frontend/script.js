// Navigation functionality
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetPage = link.getAttribute('data-page');

        pages.forEach(page => page.classList.add('hidden'));
        document.getElementById(targetPage).classList.remove('hidden');
    });
});

// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', async () => {
const name = document.getElementById('signup-name').value.trim();
const email = document.getElementById('signup-email').value.trim();
const password = document.getElementById('signup-password').value.trim();
const error = document.getElementById('signup-error');

if (name && email && password) {
try {
    const response = await fetch('http://localhost:4000/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Sign Up Successful! Redirecting to Login page...');
        error.style.display = 'none';
        document.getElementById('signup').classList.add('hidden');
        document.getElementById('login').classList.remove('hidden');
    } else {
        error.textContent = data.message || 'Sign Up Failed!';
        error.style.display = 'block';
    }
} catch (err) {
    error.textContent = 'An error occurred. Please try again later.';
    error.style.display = 'block';
}
} else {
error.textContent = 'All fields are required!';
error.style.display = 'block';
}
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error = document.getElementById('login-error');

    if (email && password) {
        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Welcome back, ${data.user.name}!`);
                error.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(data));

                // Redirect to photo_page.html
                window.location.href = 'photo_page.html';
            } else {
                error.textContent = data.message || 'Invalid email or password.';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        }
    } else {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
    }
});

