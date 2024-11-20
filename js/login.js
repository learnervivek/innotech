const firebaseConfig = {
    apiKey: "AIzaSyAC7IlAuVT6QG4o1HHo6qHuHRejLdnJcW8",
    authDomain: "fir-project-678d0.firebase.com",
    projectId: "fir-project-678d0",
    storageBucket: "fir-project-678d0.appspot.com",
    messagingSenderId: "247849084200",
    appId: "1:247849084200:web:74fa32bdff1ef8f1d49c1d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.tab:first-child').classList.add('active');
        document.querySelector('#loginForm').classList.add('active');
    } else {
        document.querySelector('.tab:last-child').classList.add('active');
        document.querySelector('#signupForm').classList.add('active');
    }
    document.getElementById('message').innerHTML = '';
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;
    messageDiv.className = `message ${type}`;
}

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        showMessage('Successfully logged in!', 'success');
        // Redirect to dashboard or home page after successful login
        window.location.href = "index.html";
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
            displayName: name
        });
        showMessage('Account created successfully!', 'success');
        // Redirect to dashboard or home page after successful signup
        // window.location.href = '/dashboard';
    } catch (error) {
        showMessage(error.message, 'error');
    }
});

// Social login functions
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        showMessage('Successfully logged in with Google!', 'success');
        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function signInWithFacebook() {
    try {
        const provider = new firebase.auth.FacebookAuthProvider();
        await auth.signInWithPopup(provider);
        showMessage('Successfully logged in with Facebook!', 'success');
        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function signInWithGithub() {
    try {
        const provider = new firebase.auth.GithubAuthProvider();
        await auth.signInWithPopup(provider);
        showMessage('Successfully logged in with GitHub!', 'success');
        // Redirect to dashboard or home page
        // window.location.href = '/dashboard';
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Track authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user.email);
        // You can redirect to protected pages here
        
    } else {
        console.log('No user is signed in');
    }
});


