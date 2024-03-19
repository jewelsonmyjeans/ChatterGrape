// Check if user is not logged in, redirect to login page
if (!isLoggedIn()) {
    window.location.replace("/index.html");
}

function logoutAndRedirect() {
    logout();
    //Redirect the user to login page after logging out
    window.location.replace("/index.html");
}

// Function to create post via fetch ()
function createPost() {
    // Retrieve the article value from the input field
    const article = articleField.value;

    // Check if the article field has a value
    if (!article) {
        alert('Please fill in the article field.');
        return;
    }

    // Get login data for authorization
    const loginData = getLoginData();

    // POST request with headers and body
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            text: article,
        }),
    };

    // note the api variable is defined in auth.js. FETCH to send request to server
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts", options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(createdPostData => {
            console.log(createdPostData);
            alert('Post created successfully!');
            // Redirects
            window.location.href = "/posts/index.html";
        })
        .catch(error => {
            console.error("Error creating post:", error);
            alert('Error creating post. Please try again.');
        });
}

// Select elements from HTML
const articleField = document.querySelector('.article');
const profilePictureInput = document.getElementById('profile-picture-input');

// Event listener for form submission & character limits
document.getElementById('post-form').addEventListener('submit', function (event) {
    event.preventDefault();
    if (isArticleLengthValid()) {
        createPost();
    } else {
        alert('Article exceeds the maximum character limit.');
    }
});

// Function to check if article length is valid
function isArticleLengthValid() {
    const article = articleField.value;
    const maxArticleLength = 200;
    return article.length <= maxArticleLength;
}

// Event listener for logout button click
document.getElementById('logoutBtn').addEventListener('click', function () {
    logoutAndRedirect();
});

// Function to handle profile picture upload
function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    // Perform the necessary actions to upload the profile picture
    // such as sending it to the server or storing it locally
    console.log('Profile picture uploaded:', file);
}

// Event listener for profile picture input change
profilePictureInput.addEventListener('change', handleProfilePictureUpload);