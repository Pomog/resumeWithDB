const body = document.body;
const photo = document.getElementById("photo");
const endpoint = "http://localhost:8085/receive-data"

const shake1 = "shake1";
const shake2 = "shake2";

function shakeBody() {
    body.classList.add(shake1);
    shakePhoto();

    setTimeout(function () {
        body.classList.remove(shake1);
        photo.classList.remove(shake2);
    }, 200);
}

function shakePhoto() {
    photo.classList.add(shake2);
}

function saveClickedProjectToLocalStorage(id){
    if (localStorage.getItem('ClickedProject:') == null){
        localStorage.setItem('ClickedProject:', "");
    }

    let projects = localStorage.getItem('ClickedProject:').toString() + ` | ` + id.toString();
    localStorage.setItem('ClickedProject:', projects);
}

function saveCurrentTimeToLocalStorage(){
    localStorage.setItem('Data:', new Date().toString());
}


function purgeSentActivity(){
    localStorage.clear()
}

/**
 * IIFE. Retrieves the current geographical position and stores latitude and longitude in localStorage.
 */
(function() {
    // Get the current geographical position
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Store latitude and longitude in localStorage
            localStorage.setItem('Latitude:', position.coords.latitude.toString());
            localStorage.setItem('Longitude:', position.coords.longitude.toString());
        },
        function(error) {
            // If there's an error, store the error message in localStorage
            localStorage.setItem('Error getting geolocation:', error.message);
        }
    );
})();

/**
 * Sends the data from Window.localStorage to the server endpoint using fetch.
 */
async function sendDataToServer(endpoint) {
    saveCurrentTimeToLocalStorage();
    try {
        let response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(localStorage)
        });
        if (!response.ok) {
            console.log('The server response is: ', response.status);
        }
        console.log(JSON.stringify(localStorage));
        console.log('Data sent to server successfully');
        purgeSentActivity();
    } catch (error) {
        console.error('Error sending data to server:', error);
        purgeSentActivity(); // TODO: only for test, REMOVE THIS
    }
}

async function handleUnload() {
    console.log('Page is about to be closed');
    try {
        await sendDataToServer(endpoint);
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
}

window.addEventListener('unload', handleUnload);

/*
For testing
 */
document.getElementById('sendDataButton').addEventListener('click', async function() {
    try {
        await sendDataToServer(endpoint);
    } catch (error) {
        console.error('Error sending data to server:', error);
    }
});


