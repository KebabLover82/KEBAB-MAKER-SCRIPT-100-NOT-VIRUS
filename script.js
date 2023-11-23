var users = JSON.parse(localStorage.getItem('users')) || [];
var currentUser = null;
var messages = JSON.parse(localStorage.getItem('messages')) || [];

function login() {
    var usernameInput = document.getElementById("usernameInput");
    var passwordInput = document.getElementById("passwordInput");

    var username = usernameInput.value;
    var password = passwordInput.value;

    if (username.trim() !== "" && password.trim() !== "") {
        var userIndex = findUser(username);
        if (userIndex !== -1 && users[userIndex].password === password) {
            currentUser = username;
            switchToChatPage();
        } else {
            alert("Invalid username or password");
        }
    }
}

function signup() {
    var newUsernameInput = document.getElementById("newUsernameInput");
    var newPasswordInput = document.getElementById("newPasswordInput");

    var username = newUsernameInput.value;
    var password = newPasswordInput.value;

    if (username.trim() !== "" && password.trim() !== "") {
        if (findUser(username) === -1) {
            users.push({ username: username, password: password });
            currentUser = username;
            switchToChatPage();
            saveUsersToLocalStorage();
        } else {
            alert("Username already exists");
        }
    }
}

function sendMessage() {
    var messageInput = document.getElementById("messageInput");
    var userMessage = messageInput.value;

    if (currentUser && userMessage.trim() !== "") {
        messages.push({ user: currentUser, message: userMessage });

        var messageOutputDiv = document.getElementById("messageOutput");
        messageOutputDiv.innerHTML = "";

        for (var i = 0; i < messages.length; i++) {
            messageOutputDiv.innerHTML += messages[i].user + ": " + messages[i].message + "<br>";
        }

        messageInput.value = "";
        saveMessagesToLocalStorage();
    }
}

function logout() {
    currentUser = null;
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("chatPage").style.display = "none";
}

function switchToChatPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("chatPage").style.display = "block";
}

function switchToSignupPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("signupPage").style.display = "block";
    document.getElementById("chatPage").style.display = "none";
}

function switchToLoginPage() {
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("signupPage").style.display = "none";
    document.getElementById("chatPage").style.display = "none";
}

function findUser(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return i;
        }
    }
    return -1;
}

function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}

function saveMessagesToLocalStorage() {
    localStorage.setItem('messages', JSON.stringify(messages));
}

function goToPostPage() {
    switchToPostPage();
}

function createPost() {
    var postTitleInput = document.getElementById("postTitleInput");
    var postDescriptionInput = document.getElementById("postDescriptionInput");

    var postTitle = postTitleInput.value;
    var postDescription = postDescriptionInput.value;

    if (currentUser && postTitle.trim() !== "" && postDescription.trim() !== "") {
        // Assuming posts have a 'user' property for the username
        posts.push({ user: currentUser, title: postTitle, description: postDescription });

        // Optionally, you can display the created post on the chat page
        displayPosts();

        postTitleInput.value = "";
        postDescriptionInput.value = "";

        // Save posts to local storage
        savePostsToLocalStorage();
    }
}

function goToChatPage() {
    switchToChatPage();
} 
