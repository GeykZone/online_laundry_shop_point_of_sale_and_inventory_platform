let userAddress;
let userEmail;
let userFirstName;
let userLastName;
let userPhoneNumber;
let userPosition;
let userUserName;
let userId;
let isShopView;

// Initialize Firebase
if(typeof firebase !== 'undefined' && firebase.apps.length === 0){

    const firebaseConfig = {
        apiKey: "AIzaSyC-vr5_3GReDmBVcr2KLIza12Crw1W4Olw",
        authDomain: "onlinelaundryshoppos.firebaseapp.com",
        projectId: "onlinelaundryshoppos",
        storageBucket: "onlinelaundryshoppos.appspot.com",
        messagingSenderId: "358981517507",
        appId: "1:358981517507:web:ae352f2cf265f0d78a6276",
        measurementId: "G-6ZQYE8G3FB"
      };

    firebase.initializeApp(firebaseConfig);
    storage = firebase.storage();
  }

deleteLoginTokenIfExpired();
routePage();

// logout confirmation
dynamicConfirmationMessage( 
    {
        modalId : 'logout-confirmation-modal',
        modalText : '<span class="fa-solid fa-right-from-bracket"></span> Logout Confirmation',
        otherButtonId : 'confirm-logout',
        otherButtonText : 'Confirm Logout',
        customBodyContent : `<div class=" d-flex flex-row gap-3 justify-content-center align-items-center">
        
        <h5> Do you really want to logout? </h5>

        </div>`
    }
)

// new user image confirmation
dynamicConfirmationMessage( 
    {
        modalId : 'confirm-new-logo-modal',
        modalText : `  <span class="fa-solid fa-camera me-2"></span> New Logo Confirmation`,
        otherButtonId : 'cancel-confirm-new-logo-modal',
        otherButtonText : 'Cancel',
        hideCancelButton: true,
        customFooterContent: `<button type="button" id="confirm-new-logo-btn" class="btn btn-info text-white">Confirm New Logo</button>`,
        customBodyContent : `<div class=" row g-3 d-flex ">

            <div class="col-12">
            <label class="form-label">Are you sure you want to upload and replace your current profile image? Please confirm by entering your username and password.</label>
            </div>

            <!-- Username -->
            <div class="col-12">
            <label for="changelogo-retype-username-input" class="form-label">Username</label>
            <input type="text" placeholder="Username" maxlength="50" class="form-control" id="changelogo-retype-username-input" required>
            <div id="changelogo-retype-username-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

            <!-- Password -->
            <div class="col-12">
            <label for="changelogo-retype-password-input" class="form-label">Password</label>
            <input type="password" placeholder="Password" maxlength="50" class="form-control" id="changelogo-retype-password-input" required>
            <div id="changelogo-retype-password-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

        </div>`,
    }
)

// new user shop logo confirmation
dynamicConfirmationMessage( 
    {
        modalId : 'confirm-new-logo-shop-modal',
        modalText : `  <span class="fa-solid fa-camera me-2"></span> New Shop Logo Confirmation`,
        otherButtonId : 'cancel-confirm-new-logo-shop-modal',
        otherButtonText : 'Cancel',
        hideCancelButton: true,
        customFooterContent: `<button type="button" id="confirm-new-logo-shop-btn" class="btn btn-info text-white">Confirm New Shop Logo</button>`,
        customBodyContent : `<div class=" row g-3 d-flex ">

            <div class="col-12">
            <label class="form-label">Are you sure you want to upload and replace your current shop logo? Please confirm by entering your username and password.</label>
            </div>

            <!-- Username -->
            <div class="col-12">
            <label for="changelogoShop-retype-username-input" class="form-label">Username</label>
            <input type="text" placeholder="Username" maxlength="50" class="form-control" id="changelogoShop-retype-username-input" required>
            <div id="changelogoShop-retype-username-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

            <!-- Password -->
            <div class="col-12">
            <label for="changelogoShop-retype-password-input" class="form-label">Password</label>
            <input type="password" placeholder="Password" maxlength="50" class="form-control" id="changelogoShop-retype-password-input" required>
            <div id="changelogoShop-retype-password-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

        </div>`,
    }
)

// new user info confirmation
dynamicConfirmationMessage( 
    {
        modalId : 'confirm-new-user-info-modal',
        modalText : `  <span class="fa-solid fa-file-invoice me-2"></span> User Update Confirmation`,
        otherButtonId : 'cancel-confirm-new-user-info-modal',
        otherButtonText : 'Cancel',
        hideCancelButton: true,
        customFooterContent: `<button type="button" id="confirm-new-user-info-btn" class="btn btn-info text-white">Confirm Update</button>`,
        customBodyContent : `<div class=" row g-3 d-flex ">

            <div class="col-12">
            <label class="form-label">Are you sure you want change some user information? Please confirm by entering your username and password.</label>
            </div>

            <!-- Username -->
            <div class="col-12">
            <label for="changeInfo-retype-username-input" class="form-label">Username</label>
            <input type="text" placeholder="Username" maxlength="50" class="form-control" id="changeInfo-retype-username-input" required>
            <div id="changeInfo-retype-username-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

            <!-- Password -->
            <div class="col-12">
            <label for="changeInfo-retype-password-input" class="form-label">Password</label>
            <input type="password" placeholder="Password" maxlength="50" class="form-control" id="changeInfo-retype-password-input" required>
            <div id="changeInfo-retype-password-input-error-feedback" class="invalid-feedback">
            </div>
            </div>

        </div>`,
    }
)

// Interval variable that checks if confirm logout button exist
const checkLogoutConfirmButon = setInterval(() => {
    const logoutButton = document.getElementById('confirm-logout');
    
    if (logoutButton) {
        // Element exists, stop the interval
        clearInterval(checkLogoutConfirmButon);

        // Assign click event to the element
        logoutButton.addEventListener('click', function() {
            
            const url = "php-sql-controller/common-controller.php";
            const data = {logout:true};
            WaitigLoader(true);
        
            dynamicPostRequest(url,data )
            .then((response) => {
                if(isValidJSON(response)){

                    if(JSON.parse(response) == 'Logout successfully.'){
                        setTimeout(function(){
                            sessionStorage.clear();
                            WaitigLoader(false);
                            window.location.href = 'login.php';
                        },3000)
                        dynamicAlertMessage('Logout successfully.', 'success', 3000);
                    }
                    else
                    {
                        WaitigLoader(false);
                        let errorMessage = JSON.parse(response);
                        dynamicAlertMessage(errorMessage, 'error', 3000);
                    }
                }
                else{
                    let errorMessage = 'Something went wrong please check your console for error logs';
                    console.error(response);
                    dynamicAlertMessage(errorMessage, 'error', 3000);
                }
            })
            .catch((error) => {
                WaitigLoader(false);
                console.error("Error:", error);
            });
            
        });
    }
}, 100);

// Interval variable that checks if new logo confirmation modal exist
const checkConfirmNewLogoModal = setInterval(() => {
    const confirmNewLogoModal = document.getElementById('confirm-new-logo-modal');

    if(confirmNewLogoModal){
        clearInterval(checkConfirmNewLogoModal);
        const cancelConfirmNewLogoBtn = document.getElementById('cancel-confirm-new-logo-modal');
        const confirmNewLogoBtn = document.getElementById('confirm-new-logo-btn');

        if(cancelConfirmNewLogoBtn.classList.contains('btn-info')){
            cancelConfirmNewLogoBtn.classList.remove('btn-info')
        }
        
        if(!cancelConfirmNewLogoBtn.classList.contains('btn-danger')){
            cancelConfirmNewLogoBtn.classList.add('btn-danger')
        }

        confirmNewLogoBtn.addEventListener('click', function(){
            mainLogoUpdate();
        })
    }

}, 100);

// Interval variable that checks if new shop logo confirmation modal exist
const checkConfirmNewShopLogoModal = setInterval(() => {
    const confirmNewShopLogoModal = document.getElementById('confirm-new-logo-shop-modal');

    if(confirmNewShopLogoModal){
        clearInterval(checkConfirmNewShopLogoModal);
        const cancelConfirmNewShopLogoBtn = document.getElementById('cancel-confirm-new-logo-shop-modal');
        const confirmNewShopLogoBtn = document.getElementById('confirm-new-logo-shop-btn');

        if(cancelConfirmNewShopLogoBtn.classList.contains('btn-info')){
            cancelConfirmNewShopLogoBtn.classList.remove('btn-info')
        }
        
        if(!cancelConfirmNewShopLogoBtn.classList.contains('btn-danger')){
            cancelConfirmNewShopLogoBtn.classList.add('btn-danger')
        }

        confirmNewShopLogoBtn.addEventListener('click', function(){
            mainShopLogoUpdate();
        })
    }

}, 100);

// Interval variable that checks if new logo confirmation modal exist
const checkNewUserInfoModal = setInterval(() => {
    const NewUserInfoModal = document.getElementById('confirm-new-user-info-modal');

    if(NewUserInfoModal){
        clearInterval(checkNewUserInfoModal);
        const cancelNewUserInfoBtn = document.getElementById('cancel-confirm-new-user-info-modal');
        const NewUserInfoBtn = document.getElementById('confirm-new-user-info-btn');

        if(cancelNewUserInfoBtn.classList.contains('btn-info')){
            cancelNewUserInfoBtn.classList.remove('btn-info')
        }
        
        if(!cancelNewUserInfoBtn.classList.contains('btn-danger')){
            cancelNewUserInfoBtn.classList.add('btn-danger')
        }

        NewUserInfoBtn.addEventListener('click', function(){
            
            mainUserInfoUpdate();
           
        })
    }

}, 100);

// Interval check update-userinfo-button if exist
const updateUserInfoButtonVar = setInterval(() => {
    const updateUserInfoButton = document.getElementById('update-userinfo-button');
    let newPhoneInput = document.getElementById('new-phone-input');

    if(updateUserInfoButton){
        clearInterval(updateUserInfoButtonVar);

        // Add event listeners for 'keydown' (for typing) and 'paste' events
        newPhoneInput.addEventListener('keydown', function(event) {
            // Allow backspace, delete, tab, escape, and enter
            if (
                event.key === 'Backspace' || 
                event.key === 'Delete' || 
                event.key === 'Tab' || 
                event.key === 'Escape' || 
                event.key === 'Enter'
            ) {
                return;
            }

            // Allow navigation keys like arrows
            if (event.key.startsWith('Arrow')) {
                return;
            }

            // Allow digits (0-9), spaces, dashes, parentheses
            const allowedCharacters = /[0-9 \-\(\)]/;

            if (!allowedCharacters.test(event.key)) {
                event.preventDefault(); // Prevent any other character from being input
            }
        });

        // Prevent non-numeric characters when pasting
        newPhoneInput.addEventListener('paste', function(event) {
            // Get the pasted data
            const pasteData = event.clipboardData.getData('text');

            // Allow only numbers, spaces, dashes, and parentheses in the pasted data
            const allowedCharacters = /^[0-9 \-\(\)]+$/;

            if (!allowedCharacters.test(pasteData)) {
                event.preventDefault(); // Prevent the paste if invalid characters are found
            }
        });

        updateUserInfoButton.addEventListener('click', function(){
            userInfoUpdate();
        })
    }
})

// dynamic function to show error field message
function dynamicFieldErrorMessage(fieldId, errorMessage){

    let errorFieldVar = document.getElementById(`${fieldId}`);
    let errorFeedBackVar = document.getElementById(`${fieldId}-error-feedback`);

    if(errorFieldVar && errorMessage.length > 0){
        if(!errorFieldVar.classList.contains('is-invalid')){
            errorFieldVar.classList.add('is-invalid');
            errorFeedBackVar.textContent = errorMessage;
        }
    }
    else {
        if(errorFieldVar.classList.contains('is-invalid')){
            errorFieldVar.classList.remove('is-invalid');
            errorFeedBackVar.textContent = errorMessage;
        }
    }

}

// dynamic post request
function dynamicPostRequest(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
  
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
  
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject("HTTP Error: " + xhr.status);
                }
            }
        };
  
        xhr.onerror = function () {
            reject("Network error");
        };
  
        xhr.send(JSON.stringify(data));
    });
}

// dynamic synchronous post request
function dynamicSynchronousPostRequest(url, data) {
    const xhr = new XMLHttpRequest();

    // Set async to false to make the request synchronous
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    try {
        // Send the request and block execution until the response is received
        xhr.send(JSON.stringify(data));

        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            throw new Error("HTTP Error: " + xhr.status);
        }
    } catch (error) {
        console.error("Request failed:", error);
        return null;
    }
}

// delete the login token if it is already expired
function deleteLoginTokenIfExpired() {

    const url = "php-sql-controller/common-controller.php";
    const data = {
        check_login_token: true,
    };
  
    dynamicPostRequest(url,data )
    .then((response) => {})
    .catch((error) => {
        console.error("Error:", error);
    });

}

// route the page to login or stay in page if the user is logged in or not
function routePage() {

    const url = "php-sql-controller/common-controller.php";
    const data = {
        page_route: true,
    };
  
    dynamicPostRequest(url,data )
    .then((response) => {
        let currentPageUrl = window.location.href;
        let lastSegment = currentPageUrl.substring(currentPageUrl.lastIndexOf('/') + 1);
        if(JSON.parse(response) == 'login.php'){

            if(lastSegment != 'login.php'){
                sessionStorage.clear();
                window.location.href = 'login.php';
            }
        }
        else{
            if(lastSegment == 'login.php') {
                window.location.href = 'home.php';
            }
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });


    // Make the synchronous POST request
    const userData = JSON.parse(dynamicSynchronousPostRequest(url, data));
    if (userData && Object.keys(userData).length > 0) {
        userAddress = userData.address;
        userEmail = userData.email;
        userFirstName = userData.first_name;
        userLastName = userData.last_name;
        userPhoneNumber = userData.phone_number;
        userPosition = userData.position;
        userUserName = userData.username;
        userId = userData.user_id;

        if(userPosition == 'Laundry Staff'){

            const url = "php-sql-controller/common-controller.php";
            const data = {
                user_id: userId,
                queryStaffDetails: true,
            };

            const detailsList = dynamicSynchronousPostRequest(url, data);

            if(isValidJSON(detailsList)){

                const details = JSON.parse(detailsList);
                console.log('data => ', details)
                
                if(Object.keys(details).length > 0){

                    if(details == 'login.php'){
                        sessionStorage.clear();
                        sessionStorage.setItem('shopIsRejected', "The user's shop has been rejected by the admin or has not yet been approved. Please contact the laundry owner for more information.");
                        window.location.href = 'login.php';
                    }

                    sessionStorage.setItem('viewAsLaundryShop', true);
                    sessionStorage.setItem('sessionShopId', details[0].shop_id);
                    sessionStorage.setItem('sessionShopName', details[0].shop_name);
                    sessionStorage.setItem('sessionShopAddress', details[0].shop_address);
                    sessionStorage.setItem('sessionShopContactNumber', details[0].contact_number);
                }
            }
            else{
                console.error(detailsList);
            }

        }


        const url = "php-sql-controller/common-controller.php";
        const data = {
            shop_id: sessionStorage.getItem('sessionShopId'), // Get shop_id from session storage
            checkIfShopExist: true,
        };
        const detailsList = dynamicSynchronousPostRequest(url, data);
        const response = JSON.parse(detailsList);
        if (!response.exists) {
            // Define the keys you want to keep
            const keysToKeep = [
                'service_more_shop_id',
                'service_more_shop_name',
                'service_more_shop_address',
                'service_more_contact_number',
                'service_more_user_id',
                'service_more_open_time',
                'service_more_close_time',
                'service_more_days_open',
                'service_more_additional_schedule_details',
                'service_more_image_link',
                'service_more_requirement_status'
            ];

             // Convert the keysToKeep array into a Set for faster lookups
            const keepSet = new Set(keysToKeep);
            
            // Iterate through sessionStorage
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                
                // If the key is not in the keepSet, remove it
                if (!keepSet.has(key)) {
                    sessionStorage.removeItem(key);
                    
                    // Adjust the iteration since the storage length changes when an item is removed
                    i--;
                }
            }
        }

    }

}
  
// dynamic alert message
function dynamicAlertMessage(message, type, time) {

    // intialize sweet alert
    const toastMixin = Swal.mixin({
      toast: true,
      icon: 'success',
      title: 'General Title',
      position: 'top-right',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  
    toastMixin.fire({
        animation: true,
        title: message,
        timer: time,
        icon: type
    });
}

// loader to be shown before the page loads
function showLoader() {
    // Create the style element for the loader
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        z-index: 9999;
        color: #0d6efd;
      }
  
      .loader.hidden {
        display: none;
      }
    `;
  
    // Append the style element to the head of the document
    document.head.appendChild(style);
  
    // Create the loader div and its content
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.id = 'loader';
  
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.setAttribute('role', 'status');
  
    const spinnerText = document.createElement('span');
    spinnerText.className = 'visually-hidden';
    spinnerText.innerText = 'Loading...';
  
    // Append spinner text to the spinner, and spinner to the loader
    spinner.appendChild(spinnerText);
    loader.appendChild(spinner);
  
    // Append the loader to the body of the document
    document.body.appendChild(loader);
  
    // Hide the loader when the page is fully loaded
    window.addEventListener('load', () => {
      document.getElementById('loader').classList.add('hidden');
    });
}

// loader to be shown when processing
function WaitigLoader(show) {
    // Check if the loader already exists
    let existingLoader = document.getElementById('WaitigLoader');

    if (!show) {
        // If the loader exists and show is false, remove it from the DOM
        if (existingLoader) {
            existingLoader.remove();
        }
        // Also remove the style element if it exists
        const existingStyle = document.querySelector('style#loaderStyle');
        if (existingStyle) {
            existingStyle.remove();
        }
    } else {
        // If the loader doesn't exist and show is true, create it
        if (!existingLoader) {
            // Create the style element for the loader
            const style = document.createElement('style');
            style.type = 'text/css';
            style.id = 'loaderStyle'; // Add ID to target later for removal
            style.innerHTML = `
              .WaitigLoader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ffffff23;
                z-index: 9999;
                color: #0d6efd;
              }
          
              .WaitigLoader.hidden {
                display: none;
              }
            `;
        
            // Append the style element to the head of the document
            document.head.appendChild(style);
        
            // Create the WaitigLoader div and its content
            const WaitigLoader = document.createElement('div');
            WaitigLoader.className = 'WaitigLoader';
            WaitigLoader.id = 'WaitigLoader';
        
            const spinner = document.createElement('div');
            spinner.className = 'spinner-border';
            spinner.setAttribute('role', 'status');
        
            const spinnerText = document.createElement('span');
            spinnerText.className = 'visually-hidden';
            spinnerText.innerText = 'Loading...';
        
            // Append spinner text to the spinner, and spinner to the WaitigLoader
            spinner.appendChild(spinnerText);
            WaitigLoader.appendChild(spinner);
        
            // Append the WaitigLoader to the body of the document
            document.body.appendChild(WaitigLoader);
        }
    }
}

// dynamic function to get current date year and month
function getCurrentDateInfo(param) {
    const date = new Date();
    
    if (param === 'year') {
        return date.getFullYear(); // Returns current year
    } else if (param === 'day') {
        return date.getDate(); // Returns current day
    } else if (param === 'month') {
        return date.getMonth() + 1; // Returns current month (getMonth is 0-based, so add 1)
    } else {
        return "Invalid parameter. Use 'year', 'day', or 'month'.";
    }
}

// dynamic header lower text
function dynamicHeaderLowerText(link, page, userPosition) {

    // Get the container element where the breadcrumb will be added
    const container = document.querySelector('.header-lower-text-container');
    const upperContainer = document.querySelector('#user-avatar-container');

    // Use template literals to define the HTML structure
    const laundryShopOwnerView = `
    <button id="view-as-laundry-owner" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none">
        View as Laundry Owner
    </button>
    `;

    // Create the <nav> element and set its attributes
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'breadcrumb');

    // Create the <ol> element for the breadcrumb and add classes
    const ol = document.createElement('ol');
    ol.classList.add('breadcrumb', 'my-0');

    // Create the first <li> element with a link
    const liHome = document.createElement('li');
    liHome.classList.add('breadcrumb-item');
    const aHome = document.createElement('a');
    aHome.href = link;
    aHome.textContent = page;
    liHome.appendChild(aHome);

    // Create the second <li> element for the active page
    const liDashboard = document.createElement('li');
    liDashboard.classList.add('breadcrumb-item', 'active');
    const spanDashboard = document.createElement('span');
    spanDashboard.textContent = userPosition;
    liDashboard.appendChild(spanDashboard);

    // Append the <li> elements to the <ol>
    ol.appendChild(liDashboard);
    ol.appendChild(liHome);

    // Append the <ol> to the <nav>
    nav.appendChild(ol);

    // Finally, append the <nav> to the container
    container.appendChild(nav);
    upperContainer.insertAdjacentHTML('beforeend', laundryShopOwnerView);

    const laundryShopOwnerViewBtn = document.getElementById('view-as-laundry-owner');
    laundryShopOwnerViewBtn.addEventListener('click', function(){
        sessionStorage.clear();
        window.location = 'login.php'
    })

}

// sidebar logo query
function sideBarLogoQuery() {


    const url = "php-sql-controller/common-controller.php";
    const data = {
        query_shop_logo: true
    };

    if(sessionStorage.getItem('viewAsLaundryShop') && sessionStorage.getItem('viewAsLaundryShop') == 'true'){
        data.isShopView = true;
        data.shop_id = sessionStorage.getItem('sessionShopId');
    }
    else{
        data.user_main_logo = userId;

        if(userPosition == 'Admin') {
            data.user_main_logo = 0;

            console.log('Admin is active')
        }
    }

    let imageLink = 'https://cdn-icons-png.freepik.com/512/4992/4992668.png'

    let imageQueryResult = dynamicSynchronousPostRequest(url, data);

    // Make the synchronous POST request
    if(isValidJSON(imageQueryResult)){

        const resultString  = JSON.parse(imageQueryResult);

        if(resultString != 'not found'){
            imageLink = resultString;
        }

    }
    
    return imageLink;
}

// avatar logo query
function avatarLogoQuery() {

    const url = "php-sql-controller/common-controller.php";
    const data = {
        query_shop_logo: true
    };

    data.user_main_logo = userId;

    if(userPosition == 'Admin') {
        data.user_main_logo = 0;
    }

    let imageLink = 'https://cdn-icons-png.freepik.com/512/4992/4992668.png'

    let imageQueryResult = dynamicSynchronousPostRequest(url, data);

    // Make the synchronous POST request
    if(isValidJSON(imageQueryResult)){

        const resultString  = JSON.parse(imageQueryResult);
        if(resultString != 'not found'){
            imageLink = resultString;
        }

    }
    
    return imageLink;
}

// show or hide admin function and other user functions
function showHideFunctions() {

    let adminClass = document.querySelectorAll('.admin')
    let customerClass = document.querySelectorAll('.costumer')
    let laundryOwner = document.querySelectorAll('.laundry-owner')
    let adminAndLaundryOwner =  document.querySelectorAll('.admin-and-laundry-owner');
    let laundryStaffLaundryOwner = document.querySelectorAll('.laundry-owner-and-staff');
    let userTitleHead = document.getElementById('user-title-head');
    // let userSvatarContainer = document.getElementById('user-avatar-container');
    let avatarUserImage = document.getElementById('avatar-user-image');
    let avatarUserLabel = document.getElementById('avatar-user-label');
    let defaultImagePreview = document.getElementById('default-image-preview');
    defaultImagePreview.src = avatarLogoQuery();

    userTitleHead.textContent = capitalizeWords(userPosition)+" "+capitalizeWords(userUserName);

    if(userPosition == 'Admin'){

        userTitleHead.textContent = "Super Admin "+capitalizeWords(userUserName);
       
        adminClass.forEach(adcls => {

            if(adcls.classList.contains('d-none')){
                adcls.classList.remove('d-none');
            }

        })

        adminAndLaundryOwner.forEach(adcls => {

            if(adcls.classList.contains('d-none')){
                adcls.classList.remove('d-none');
            }

        })
    }

    
    if(userPosition == 'Laundry Owner'){
        laundryOwner.forEach(adcls => {

            if(adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                adcls.classList.remove('d-none');
            }

        })

        adminAndLaundryOwner.forEach(adcls => {

            if(adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                adcls.classList.remove('d-none');
            }

        })
    }



    if(userPosition == 'Costumer'){
        customerClass.forEach(adcls => {
            if(adcls.classList.contains('d-none')){
                adcls.classList.remove('d-none');
            }

        })
    }


    


    if(sessionStorage.getItem('viewAsLaundryShop') && sessionStorage.getItem('viewAsLaundryShop') == 'true'){
        userTitleHead.textContent = sessionStorage.getItem('sessionShopName')
        let defaultImagePreviewShop = document.getElementById('default-image-preview-shop');
        defaultImagePreviewShop.src = sideBarLogoQuery();
        
        if(userPosition == 'Laundry Owner'){
            laundryOwner.forEach(adcls => {
    
                if(adcls.classList.contains('d-none') && adcls.classList.contains('is-shop')){
                    adcls.classList.remove('d-none');
                }
                else if(!adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                    adcls.classList.add('d-none');
                }
    
            })
    
            adminAndLaundryOwner.forEach(adcls => {
    
                if(adcls.classList.contains('d-none') && adcls.classList.contains('is-shop')){
                    adcls.classList.remove('d-none');
                }
                else if(!adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                    adcls.classList.add('d-none');
                }
    
            })

            laundryStaffLaundryOwner.forEach(adcls => {
    
                if(adcls.classList.contains('d-none') && adcls.classList.contains('is-shop')){
                    adcls.classList.remove('d-none');
                }
                else if(!adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                    adcls.classList.add('d-none');
                }
    
            })
        }

        if(userPosition == 'Laundry Staff'){
            laundryStaffLaundryOwner.forEach(adcls => {
    
                if(adcls.classList.contains('d-none') && adcls.classList.contains('is-shop')){
                    adcls.classList.remove('d-none');
                }
                else if(!adcls.classList.contains('d-none') && !adcls.classList.contains('is-shop')){
                    adcls.classList.add('d-none');
                }
    
            })
        }

        avatarUserImage.src = avatarLogoQuery();
        avatarUserLabel.textContent = capitalizeWords(userPosition)+" "+capitalizeWords(userUserName);
    }

    changeMainLogoConfiguration();
    changeSHopLogoConfiguratiion();

}

// email checker function
function isValidEmail(emailField) {
    const email = emailField.value; // Get the value from the input field

    // Regular expression for validating email syntax
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex and return true or false
    return emailRegex.test(email);
}

// response checker (this checks if the response is json or not)
function isValidJSON(response) {
    try {
        JSON.parse(response);
        return true;  // It's a valid JSON
    } catch (e) {
        return false;  // It's not a valid JSON
    }
}

// dynamic confirmation modal
function dynamicConfirmationMessage(paramValue) {

    if (paramValue.modalText == undefined || paramValue.modalText.length < 1) {
        paramValue.modalText = '';
    }

    if (paramValue.customClass == undefined || paramValue.customClass.length < 1) {
        paramValue.customClass = '';
    }

    if (paramValue.customClass == undefined || paramValue.customClass.length < 1) {
        paramValue.customClass = '';
    }

    if (paramValue.otherButtonId == undefined || paramValue.otherButtonId.length < 1) {
        paramValue.otherButtonId = '';
    }

    if ( paramValue.otherButtonText == undefined ||  paramValue.otherButtonText.length < 1) {
         paramValue.otherButtonText = '';
    }

    if ( paramValue.customBodyContent == undefined ||  paramValue.customBodyContent.length < 1) {
         paramValue.customBodyContent = '';
    }

    if ( (paramValue.hideCancelButton == undefined ||  paramValue.hideCancelButton.length < 1) && paramValue.hideCancelButton != true) {
         paramValue.hideCancelButton = '';
    }
    else {
        paramValue.hideCancelButton =  `d-none`;
    }

    if ( paramValue.customFooterContent == undefined ||  paramValue.customFooterContent.length < 1) {
        paramValue.customFooterContent = '';
    }


    // Create the modal container
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = `
    <!-- Modal -->
    <div class="modal fade" id="${paramValue.modalId}" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="${paramValue.modalId}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="${paramValue.modalId}Label">${paramValue.modalText}</h5>
        </div>
        <div class="modal-body ${paramValue.customClass}">
            ${paramValue.customBodyContent}
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger text-white ${paramValue.hideCancelButton}" data-coreui-dismiss="modal">Cancel</button>
            <button type="button" id="${paramValue.otherButtonId}" data-coreui-dismiss="modal" class="btn btn-info text-white">${paramValue.otherButtonText}</button>
            ${paramValue.customFooterContent}
        </div>
        </div>
    </div>
    </div>`;

    // Set an interval to check for the body element every 100ms
    const interval = setInterval(() => {
        const bodyElement = document.querySelector('body');
        
        if (bodyElement) {
            // Append the modalContainer as the first child of the body
            bodyElement.insertBefore(modalContainer, bodyElement.firstChild);
            // Stop the interval
            clearInterval(interval);
        }
    }, 100); // Checks every 100 milliseconds

}

// Upload a file to Firebase Storage and return the download URL
function uploadFileToFirebase(file) {
  const storageRef = storage.ref(`image-files/${file.name}`);
  
  return storageRef.put(file)
    .then((snapshot) => {
    //   console.log('Uploaded a file!', snapshot);
      // Get the download URL
      return storageRef.getDownloadURL();
    })
    .then((downloadURL) => {
    //   console.log('File available at', downloadURL);
      return downloadURL; // Return the download URL
    })
    .catch((error) => {
      WaitigLoader(false)
      dynamicAlertMessage('Something went wrong while uploading your image. Please check the errors in your browser console.', 'error', 3000)
      console.error('Error uploading file:', error);
      throw error; // Handle errors
    });
}

// function to capitalize every first letter of a word
function capitalizeWords(str) {
    return str
        .toLowerCase() // Convert the entire string to lowercase first
        .split(' ')    // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' ');    // Join the array back into a single string
}

// function for changing the main logo
function changeMainLogoConfiguration(){
    let defaultImagePreview 
    document.getElementById('change-main-logo').addEventListener('click', function() {
        defaultImagePreview = document.getElementById('default-image-preview')
        // Trigger the file input when the button is clicked
        document.getElementById('logo-input').click();
    });
    
    document.getElementById('logo-input').addEventListener('change', function(event) {
        const file = event.target.files[0];
    
        // Ensure a file is selected
        if (file) {
            const reader = new FileReader();
    
            // When the file is read, preview the image
            reader.onload = function(e) {
                const imagePreviewContainer = document.getElementById('image-preview-container');
                const logoChangeButtonContainer = document.getElementById('logo-change-button-container');
                
                // Clear previous image if any
                if (imagePreviewContainer.children.length > 1) {
                    imagePreviewContainer.removeChild(imagePreviewContainer.lastChild);
                }
                logoChangeButtonContainer.innerHTML = '';
    
                // Create the image element
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.alt = 'Selected Image';
                imgElement.classList.add('sidebar-brand-full', 'shadow', 'rounded-4');
                imgElement.style.width = '100%';
                imgElement.style.height = '300px';
    
                // Create a remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('btn', 'btn-secondary', 'mt-2', 'text-white');
                
                // Handle remove button click
                removeBtn.addEventListener('click', function() {
                    imagePreviewContainer.removeChild(imagePreviewContainer.lastChild);
                    logoChangeButtonContainer.innerHTML = '';
                    document.getElementById('logo-input').value = ''; // Reset the file input

                    if(defaultImagePreview.classList.contains('d-none')){
                        defaultImagePreview.classList.remove('d-none');
                    }
                });
    
                // Create a submit button
                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Submit Image';
                submitBtn.classList.add('btn', 'btn-primary', 'mt-2', 'text-white');
                
                // Handle submit button click
                submitBtn.addEventListener('click', function() {
                    $('#configModal').modal('hide');
                    $('#confirm-new-logo-modal').modal('show');
                });
    
                // Add the image, remove button, and submit button to the container
                imagePreviewContainer.appendChild(imgElement);
                logoChangeButtonContainer.appendChild(removeBtn);
                if(!defaultImagePreview.classList.contains('d-none')){
                    defaultImagePreview.classList.add('d-none');
                }
                logoChangeButtonContainer.appendChild(submitBtn);
            };
    
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    });
}

// function for changing the shop logo
function changeSHopLogoConfiguratiion(){
    let defaultImagePreview 
    document.getElementById('change-main-logo-shop').addEventListener('click', function() {
        defaultImagePreview = document.getElementById('default-image-preview-shop')
        // Trigger the file input when the button is clicked
        document.getElementById('logo-input-shop').click();
    });
    
    document.getElementById('logo-input-shop').addEventListener('change', function(event) {
        const file = event.target.files[0];
    
        // Ensure a file is selected
        if (file) {
            const reader = new FileReader();
    
            // When the file is read, preview the image
            reader.onload = function(e) {
                const imagePreviewContainer = document.getElementById('image-preview-container-shop');
                const logoChangeButtonContainer = document.getElementById('logo-change-button-container-shop');
                
                // Clear previous image if any
                if (imagePreviewContainer.children.length > 1) {
                    imagePreviewContainer.removeChild(imagePreviewContainer.lastChild);
                }
                logoChangeButtonContainer.innerHTML = '';
    
                // Create the image element
                const imgElement = document.createElement('img');
                imgElement.src = e.target.result;
                imgElement.alt = 'Selected Image';
                imgElement.classList.add('sidebar-brand-full', 'shadow', 'rounded-4');
                imgElement.style.width = '100%';
                imgElement.style.height = '300px';
    
                // Create a remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('btn', 'btn-secondary', 'mt-2', 'text-white');
                
                // Handle remove button click
                removeBtn.addEventListener('click', function() {
                    imagePreviewContainer.removeChild(imagePreviewContainer.lastChild);
                    logoChangeButtonContainer.innerHTML = '';
                    document.getElementById('logo-input-shop').value = ''; // Reset the file input

                    if(defaultImagePreview.classList.contains('d-none')){
                        defaultImagePreview.classList.remove('d-none');
                    }
                });
    
                // Create a submit button
                const submitBtn = document.createElement('button');
                submitBtn.textContent = 'Submit Image';
                submitBtn.classList.add('btn', 'btn-primary', 'mt-2', 'text-white');
                
                // Handle submit button click
                submitBtn.addEventListener('click', function() {
                    $('#configModal').modal('hide');
                    $('#confirm-new-logo-shop-modal').modal('show');
                });
    
                // Add the image, remove button, and submit button to the container
                imagePreviewContainer.appendChild(imgElement);
                logoChangeButtonContainer.appendChild(removeBtn);
                if(!defaultImagePreview.classList.contains('d-none')){
                    defaultImagePreview.classList.add('d-none');
                }
                logoChangeButtonContainer.appendChild(submitBtn);
            };
    
            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    });
}

// function to update main logo
function mainLogoUpdate(){

    let isValid = retypePasswordAndUsername(true, false, false);

    if(isValid == true){

        const logoInput  = document.getElementById('logo-input');
        let imageLink;

        const file = logoInput.files[0];
        WaitigLoader(true);
        if (file) {
            imageLink =  uploadFileToFirebase(file).then((e)=>{

                imageLink = e;

                if (!imageLink.includes("Error uploading file:")){
                    const url = "php-sql-controller/common-controller.php";
                    const data = {
                        imageLink: imageLink,
                        user_id: userId,
                        changeLogo: true,
                    };
                    const updateResult = dynamicSynchronousPostRequest(url, data);
    
                    if(isValidJSON(updateResult)){
                        let jsonUpdateResultValue= JSON.parse(updateResult)
                        console.log(jsonUpdateResultValue)
    
                        if(jsonUpdateResultValue.status == 'success'){
                            let errorMessage = jsonUpdateResultValue.message;
                            dynamicAlertMessage(errorMessage, 'success', 3000);
                            window.location.reload(true);
                        }
                        else{
                            let errorMessage = jsonUpdateResultValue.error;
                            dynamicAlertMessage(errorMessage, 'error', 3000);
                        }
                        WaitigLoader(false);
                    }
                    else{
                        WaitigLoader(false);
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                        console.error(updateResult)
                    }
                }

            });
        }
       
    }else if(isValid == false){
        let errorMessage = 'Something went wrong. We are unable to verify your identity.';
        dynamicAlertMessage(errorMessage, 'error', 3000);
    }

}

// function to update main logo
function mainShopLogoUpdate(){

    let isValid = retypePasswordAndUsername(false, false, true);

    if(isValid == true){

        const logoInput  = document.getElementById('logo-input-shop');
        let imageLink;

        const file = logoInput.files[0];
        WaitigLoader(true);
        if (file) {
            imageLink =  uploadFileToFirebase(file).then((e)=>{

                imageLink = e;

                if (!imageLink.includes("Error uploading file:")){
                    const url = "php-sql-controller/common-controller.php";
                    const data = {
                        imageLink: imageLink,
                        shop_id: sessionStorage.getItem('sessionShopId'),
                        user_id: 0,
                        changeLogo: true
                    };
                    const updateResult = dynamicSynchronousPostRequest(url, data);
    
                    if(isValidJSON(updateResult)){
                        let jsonUpdateResultValue= JSON.parse(updateResult)
                        console.log(jsonUpdateResultValue)
    
                        if(jsonUpdateResultValue.status == 'success'){
                            let errorMessage = jsonUpdateResultValue.message;
                            dynamicAlertMessage(errorMessage, 'success', 3000);
                            window.location.reload(true);
                        }
                        else{
                            let errorMessage = jsonUpdateResultValue.error;
                            dynamicAlertMessage(errorMessage, 'error', 3000);
                        }
                        WaitigLoader(false);
                    }
                    else{
                        WaitigLoader(false);
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                        console.error(updateResult)
                    }
                }

            });
        }
       
    }else if(isValid == false){
        let errorMessage = 'Something went wrong. We are unable to verify your identity.';
        dynamicAlertMessage(errorMessage, 'error', 3000);
    }

}

// function to update user info
function mainUserInfoUpdate(){

    let newFirstNameInput = document.getElementById('new-first-name-input');
    let newLastNameInput = document.getElementById('new-last-name-input');
    let newUsernameInput = document.getElementById('new-username-input');
    let newPasswordInput = document.getElementById('new-password-input');
    let retypeNewPasswordInput = document.getElementById('retype-new-password-input');
    let newAddressInput = document.getElementById('new-address-input');
    let newEmailInput = document.getElementById('new-email-input');
    let newPhoneInput = document.getElementById('new-phone-input');

    let isValidUserInfo = retypePasswordAndUsername(false, true, false);

    WaitigLoader(true);
    if(isValidUserInfo == true){
        $('#confirm-new-user-info-modal').modal('hide')
        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            userId: userId,
            ...(userPosition == 'Laundry Staff' && {isForStaff: true}),
            ...(userPosition == 'Admin' && {isForSuperAdmin: true}),
            ...(newFirstNameInput.value && { firstName: newFirstNameInput.value }),
            ...(newLastNameInput.value && { lastName: newLastNameInput.value }),
            ...(newUsernameInput.value && { username: newUsernameInput.value }),
            ...(newPasswordInput.value && { password: newPasswordInput.value }),
            ...(newEmailInput.value && { email: newEmailInput.value }),
            ...(newPhoneInput.value && { phoneNumber: newPhoneInput.value }),
            ...(newAddressInput.value && { address: newAddressInput.value }),
        };        

        const detailsList = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(detailsList)){
            const details = JSON.parse(detailsList);
            if (!`${details}`.includes("Error:")) {
                newFirstNameInput.value = ''
                newLastNameInput.value = ''
                newUsernameInput.value = ''
                newPasswordInput.value = ''
                retypeNewPasswordInput.value = ''
                newAddressInput.value = ''
                newEmailInput.value = ''
                newPhoneInput.value = ''

                if(userPosition == 'Laundry Staff'){
                    dynamicAlertMessage("User updated successfully.", 'success', 3000);
                }
                else{
                    dynamicAlertMessage(details, 'success', 3000);
                }
                
                setTimeout(function(){
                    window.location.reload(true);
                },3000)
                
                
            } else {
                WaitigLoader(false);
                dynamicAlertMessage(details, 'error', 3000);
            }
            
        }
        else{
            console.error(detailsList);
            WaitigLoader(false);
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        }

    }else if(isValidUserInfo == false){
        WaitigLoader(false);
        let errorMessage = 'Something went wrong. We are unable to verify your identity.';
        dynamicAlertMessage(errorMessage, 'error', 3000);
    }

}

// function to verify that the user that applies the changes is the real user
function retypePasswordAndUsername(isForLogo, isForInfo, isForShop){
    let isValid = true;
    let isRealUser = true;
    let retypeUsernameInput;
    let retypePasswordInput;
    let modalId;
    if(isForLogo){
        retypeUsernameInput = document.getElementById('changelogo-retype-username-input');
        retypePasswordInput =  document.getElementById('changelogo-retype-password-input');
        modalId = document.getElementById('confirm-new-logo-modal').id;
    }

    if(isForInfo){
        retypeUsernameInput = document.getElementById('changeInfo-retype-username-input');
        retypePasswordInput =  document.getElementById('changeInfo-retype-password-input');
        modalId = document.getElementById('confirm-new-logo-modal').id;
    }


    if(isForShop){
        retypeUsernameInput = document.getElementById('changelogoShop-retype-username-input');
        retypePasswordInput =  document.getElementById('changelogoShop-retype-password-input');
        modalId = document.getElementById('confirm-new-logo-shop-modal').id;
    }

    if(retypeUsernameInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(retypeUsernameInput.id, 'Please input a valid Username.');
    }
    else {
        dynamicFieldErrorMessage(retypeUsernameInput.id, '');
    }

    if(retypePasswordInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(retypePasswordInput.id, 'Please input a valid Password.');
    }
    else {
        dynamicFieldErrorMessage(retypePasswordInput.id, '');
    }

    if(isValid){

        const url = "php-sql-controller/login-controller.php";
        const data = {
            userId: userId,
            login: 'for confirmation',
            username: retypeUsernameInput.value,
            password: retypePasswordInput.value
        };
      
        const returnConfirmation = dynamicSynchronousPostRequest(url,data );

        // console.log('Actual return => ', returnConfirmation)

        if(isValidJSON(returnConfirmation)){
            if(JSON.parse(returnConfirmation) != 'User Confirmed.'){
                isRealUser = false;
            }
            else{
                retypeUsernameInput.value = '';
                retypePasswordInput.value = '';
                $(`#${modalId}`).modal('hide');
            }
       }
       else{
            let errorMessage = 'Something went wrong please check your console for error logs';
            console.error(returnConfirmation);
            dynamicAlertMessage(errorMessage, 'error', 3000);
            isRealUser = false;
       }
       

    }
    else{
        isRealUser = 'invalid form';
    }

    return isRealUser

}

// Function to format the input into currency with peso sign
function formatToCurrency(input) {
    // Remove non-numeric characters (except for the decimal point)
    let value = input.replace(/[^0-9.]/g, '');

    // Parse the value as a floating point number and format it to currency
    let formattedValue = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2
    }).format(value ? parseFloat(value) : 0);

    // Update the input value with the formatted currency
    return formattedValue;
}

// function that check if currency is valid or not
function isValidCurrency(input) {
    // Remove non-numeric characters (except for the decimal point)
    let value = input.replace(/[^0-9.]/g, '');

    // Parse the string as a float
    let amount = parseFloat(value);

    // Check if the amount is a valid number and greater than 0
    if (!isNaN(amount) && amount > 0) {
        return true;
    } else {
        return false;
    }
}

// function that reverts currency format into normal number
function currencyToNormalFormat(currencyString) {
    // Remove peso sign, commas, and any non-numeric characters except for the decimal point
    let normalFormat = currencyString.replace(/[^0-9.]/g, '');
    
    // Return the number as a float or integer depending on the input
    return parseFloat(normalFormat);
}

// function to generate random numbers
function generateRandomNumber(length) {
    // Generate a random number of the specified length
    let randomNumber = '';
    
    // Ensure the first digit is not 0
    randomNumber += Math.floor(Math.random() * 9) + 1; // Adds a digit from 1 to 9
    
    for (let i = 1; i < length; i++) {
        // Append a digit between 0 and 9
        randomNumber += Math.floor(Math.random() * 10);
    }
    
    return parseInt(randomNumber, 10); // Convert the string to an integer
}

// function to update user info details
function userInfoUpdate() {
    let newUsernameInput = document.getElementById('new-username-input');
    let newPasswordInput = document.getElementById('new-password-input');
    let newFirstNameInput = document.getElementById('new-first-name-input');
    let newLastNameInput = document.getElementById('new-last-name-input');
    let retypeNewPasswordInput = document.getElementById('retype-new-password-input');
    let newAddressInput = document.getElementById('new-address-input');
    let newEmailInput = document.getElementById('new-email-input');
    let newPhoneInput = document.getElementById('new-phone-input');
    let isValid = true;

    if(retypeNewPasswordInput.value != newPasswordInput.value){
        isValid = false;
        dynamicFieldErrorMessage(retypeNewPasswordInput.id, 'Password re-entry does not match.');
    }
    else {
        dynamicFieldErrorMessage(retypeNewPasswordInput.id, '');
    }

    if(newEmailInput.value.length > 1 && !isValidEmail(newEmailInput)){
        isValid = false;
        dynamicFieldErrorMessage(newEmailInput.id, 'Please input a valid Email.');
    }
    else {
        dynamicFieldErrorMessage(newEmailInput.id, '');
    }

    if(newFirstNameInput.value.length < 1 && newLastNameInput.value.length < 1 && newUsernameInput.value.length < 1 && newPasswordInput.value.length < 1 && retypeNewPasswordInput.value.length < 1 &&
        newAddressInput.value.length < 1 && newEmailInput.value.length < 1 && newPhoneInput.value.length < 1){
        isValid = false;
        dynamicAlertMessage('No changes were applied.', 'warning', 3000);
    }

    if(isValid){

        $('#confirm-new-user-info-modal').modal('show');
        $('#configModal').modal('hide');

    }

}

// function to convert any value into an integer
function integerConverter(value) {
    const intValue = parseInt(value, 10); // Parse the value to an integer in base 10
    return isNaN(intValue) ? 0 : intValue; // Return 0 if the value is NaN, otherwise return the integer
}

// function to format time into AM PM
function convertToAMPM(timeString) {
    // Split the input string into hours, minutes, and seconds
    let [hours, minutes] = timeString.split(':');

    // Convert string values to integers
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    // Determine AM or PM suffix
    const suffix = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;  // Modulus to convert 24-hour time to 12-hour format

    // Return the formatted time
    return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
}

// function to see service and more
function manageServiceMoreSessionStorage(shop, shouldStore) {
    if (shouldStore) {
        // Store values in session storage with 'service_more_' prefix
        sessionStorage.setItem('service_more_shop_id', shop.shop_id);
        sessionStorage.setItem('service_more_shop_name', shop.shop_name);
        sessionStorage.setItem('service_more_shop_address', shop.shop_address);
        sessionStorage.setItem('service_more_contact_number', shop.contact_number);
        sessionStorage.setItem('service_more_user_id', shop.user_id);
        sessionStorage.setItem('service_more_open_time', shop.open_time);
        sessionStorage.setItem('service_more_close_time', shop.close_time);
        sessionStorage.setItem('service_more_days_open', shop.days_open);
        sessionStorage.setItem('service_more_additional_schedule_details', shop.additional_schedule_details);
        sessionStorage.setItem('service_more_image_link', shop.image_link);
        sessionStorage.setItem('service_more_requirement_status', shop.requirement_status);
    } else {
        // Remove the session storage variables if shouldStore is false
        sessionStorage.removeItem('service_more_shop_id');
        sessionStorage.removeItem('service_more_shop_name');
        sessionStorage.removeItem('service_more_shop_address');
        sessionStorage.removeItem('service_more_contact_number');
        sessionStorage.removeItem('service_more_user_id');
        sessionStorage.removeItem('service_more_open_time');
        sessionStorage.removeItem('service_more_close_time');
        sessionStorage.removeItem('service_more_days_open');
        sessionStorage.removeItem('service_more_additional_schedule_details');
        sessionStorage.removeItem('service_more_image_link');
        sessionStorage.removeItem('service_more_requirement_status');
    }
}







 




  
  