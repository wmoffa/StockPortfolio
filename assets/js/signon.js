//Initialize Firebase
    var config = {
	    apiKey: "AIzaSyDnyAYqMyTJpf_DQHEV2vzU_LQvciYNDWA",
	    authDomain: "project-1-test-88061.firebaseapp.com",
	    databaseURL: "https://project-1-test-88061.firebaseio.com",
	    projectId: "project-1-test-88061",
	    storageBucket: "project-1-test-88061.appspot.com",
	    messagingSenderId: "86731025915"
	};
	
	firebase.initializeApp(config);

	// Get Elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Add login event
	btnLogin.addEventListener('click', e => {
	// Get email and pass
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	// Sign in
	const promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
	});

	// Add signup event
	btnSignUp.addEventListener('click', e => {
	// Get email and pass
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	// Sign in
	const promise = auth.createUserWithEmailAndPassword(email,pass);
	promise.catch(e =>console.log(e.message));
	});

	btnLogout.addEventListener('click', e=> {
		firebase.auth().signOut();
	});


	// Add a realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		}   else {
			console.log('not logged in');
			btnLogout.classList.add('hide');
		}
	});