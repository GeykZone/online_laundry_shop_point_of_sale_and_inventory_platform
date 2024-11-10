let userAddress;
let userEmail;
let userFirstName;
let userLastName;
let userPhoneNumber;
let userPosition;
let userUserName;
let userId;
let isShopView;
let listinerErrors = 0
let savedCount = 0
let notifTransationTableVar
let changeServiceShopId
let changedServiceSelected = [];
let changeableDiscount = [];
let selectedDiscountsGloabl = [];
let defaultInitial;
let isChangeServiceCloseListenerAdded = false;
let isAddMoreProductListenerAdded = false;
let isAddMoreProductCloseListenerAdded = false;
let isChangeServiceListenerAdded = false;
let ischangeConfirmTransactionBack = false;
let finalTransactionObject = [];
let defaultTrnsactionId;
let transactionCustomer;
let selectedTransactionShopId;
let oldTransactionStatus;
let oldTransaction = [];

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

// confirm change transaction
dynamicConfirmationMessage( 
    {
        modalId : 'change-finalize-transaction-confirm-modal',
        modalText : '<span class="fa-solid fa-clipboard-list"></span> Transaction Confirmation',
        otherButtonId : 'change-confirm-transaction-now',
        otherButtonText : 'Cancel',
        hideCancelButton: true,
        customBodyContent : `<div class=" d-flex flex-row gap-3 justify-content-center align-items-center">
        <h5 id="transactionConfirmMessage" style="font-size: 17px;"></h5>
        </div>`,
        customFooterContent: `<button type="button" id="change-confirm-transaction-update" data-coreui-dismiss="modal" class="btn btn-info text-white">Confirm Transaction Update</button>`
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
}, 100);

// Interval variable to check if notif button exist
const checkNotifButton = setInterval(() => {
    const openNotificationButton = document.getElementById('open-notification-button');
    if(openNotificationButton){

        clearInterval(checkNotifButton);
        openNotificationButton.addEventListener('click', function(){
            notifTransationTable();
        })
    }
}, 100)

// Interval variable to check if submit changes transactio button exist
const checkSubmitTransactionChangeBtn = setInterval(() => {
    const transactionSubmitChanges = document.getElementById('transaction-submit-changes');

    if(transactionSubmitChanges){

        clearInterval(checkSubmitTransactionChangeBtn);
        transactionSubmitChanges.addEventListener('click', function(){
            formulateChangesForTransaction();
        })
    }

}, 100)

// Interval variable to check if the Back to notification button exist
const checkBackToNotificationList = setInterval(() => {
    const backToNotificationList = document.getElementById('back-to-notification-list');

    if(backToNotificationList){

        clearInterval(checkBackToNotificationList);
        backToNotificationList.addEventListener('click', function(){
            $('#viewNoftiicationList').modal('show');
            $('#manageTransactionModal').modal('hide');
        })
    }


}, 100);

// Interval variable to check if the checkForAddMoreCheckoutBtn exist
const checkForAddMoreCheckoutBtn = setInterval(() => {

    let addMoreCheckout = document.getElementById('add-more-checkout');
    let addedMoreProductContainer = document.getElementById('added-more-product-container');
    let addedMoreProduct = document.querySelectorAll('.added-more-product');
    let notifyCheckoutMoreProductContainerLabel = document.getElementById('notify-checkout-more-product-container-label');
    
    if(addMoreCheckout && addedMoreProductContainer && addedMoreProduct){

        clearInterval(checkForAddMoreCheckoutBtn);
        addMoreCheckout.addEventListener('click', function(){

            $('#addMoreProductModal').modal('hide');
            $('#manageTransactionModal').modal('show');
    
            addedMoreProductContainer.innerHTML = '';
    
            if(Object.keys(selectedAddMoreProductIds).length > 0){
    
                addedMoreProduct.forEach((e) => {
                    if(e.classList.contains('d-none')){
                        e.classList.remove('d-none')
                    }
                })

                if(Object.keys(selectedAddMoreProductIds).length > 1){
                    notifyCheckoutMoreProductContainerLabel.textContent = 'Added Products'
                }else{
                    notifyCheckoutMoreProductContainerLabel.textContent = 'Added Product'
                }
    
                selectedAddMoreProductIds.forEach(function(product){
    
                    const productPrice = product.price;
                    const productBrand = product.product_brand;
                    const productImage = product.product_image;
                    const productName = product.product_name;
                    const productQuantity = product.quantity;
    
                    // Create the card HTML dynamically
                    const productCardHTML = `
                    <div class=" col-12 col-md-6">
                        <div class="card">
                        <div class="card-header">
                            ${productName}
                        </div>
                        <div class="card-body d-flex gap-3">
                            <div class="rounded-3 overflow-hidden shadow" style="width: 100px;">
                            <img src='${productImage}' alt="Image Preview" style="width: 100%; height: 100px; object-fit: cover;">
                            </div>
                            <div>
                            <p>Brand: ${productBrand}</p>
                            <p>Price: ${formatToCurrency(productPrice)}</p>
                            <p>Selected Quantity: ${productQuantity}</p> <!-- You can replace 1 with a dynamic value if needed -->
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
    
                    // Insert the card into the selectedProductsContainer
                    addedMoreProductContainer.innerHTML += productCardHTML;
    
                })
    
            }
            else{
                addedMoreProduct.forEach((e) => {
                    if(!e.classList.contains('d-none')){
                        e.classList.add('d-none')
                    }
                })
            }
    
        })
    }

    
}, 100);

// Interval variable to check if the notify-checkout-clothes-weight-input exist
const checknotifyCheckoutClothesWeightInput = setInterval(() => {
    const notifyCheckoutClothesWeightInput = document.getElementById('notify-checkout-clothes-weight-input');

    if(notifyCheckoutClothesWeightInput){

        clearInterval(checknotifyCheckoutClothesWeightInput);
        // Add event listeners for 'keydown' (for typing) and 'paste' events
        notifyCheckoutClothesWeightInput.addEventListener('keydown', function(event) {
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
            const allowedCharacters = /^[0-9 \-\(\)\.]+$/;

            if (!allowedCharacters.test(event.key)) {
                event.preventDefault(); // Prevent any other character from being input
            }
        });

        // Prevent non-numeric characters when pasting
        notifyCheckoutClothesWeightInput.addEventListener('paste', function(event) {
            // Get the pasted data
            const pasteData = event.clipboardData.getData('text');

            // Allow only numbers, spaces, dashes, parentheses, and decimal points in the pasted data
            const allowedCharacters = /^[0-9 \-\(\)\.]+$/;


            if (!allowedCharacters.test(pasteData)) {
                event.preventDefault(); // Prevent the paste if invalid characters are found
            }
        });
    }


}, 100);

// Interval variable to check if the notify-checkout-clothes-weight-input exist
const checkchangeConfirmTransactionUpdate = setInterval(() => {
    const changeConfirmTransactionUpdate = document.getElementById('change-confirm-transaction-update');

    if(changeConfirmTransactionUpdate){

        clearInterval(checkchangeConfirmTransactionUpdate);
        changeConfirmTransactionUpdate.addEventListener('click', function(){
            updateTransaction();
        })
    }


}, 100);

// Interval variable to check if the mark-as-read-notification exist
const checkmarkAsReadNotification = setInterval(() => {
    const markAsReadNotification = document.getElementById('mark-as-read-notification')

    if(markAsReadNotification){

        clearInterval(checkmarkAsReadNotification);
        markAsReadNotification.addEventListener('click', function(){
            WaitigLoader(true)

            const url = "php-sql-controller/service-and-more-controller.php";
            const data = {
                insertTransaction: true,
                transaction_id: defaultTrnsactionId,
                notification_is_read: 'True'
            };
            const detailsList = dynamicSynchronousPostRequest(url, data);
            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                // console.log('transaction => ', details)
                let status = details.status;
                if(status == 'success'){
                    $('#manageTransactionModal').modal('hide');
                }
                else{
                    let message = details.message
                    // WaitigLoader(false)
                    dynamicAlertMessage(message, 'error', 3000);
                }

                WaitigLoader(false)
            }
            else{
                console.error(detailsList);
                // WaitigLoader(false)
                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                WaitigLoader(false)
            }

        })
    }


}, 100);

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
    let customerClass = document.querySelectorAll('.customer')
    let laundryOwnerAndStaffCustomer = document.querySelectorAll('.laundry-owner-and-staff-customer');
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


    if(userPosition == 'Customer'){
        customerClass.forEach(adcls => {
            if(adcls.classList.contains('d-none')){
                adcls.classList.remove('d-none');
            }

        })

        laundryOwnerAndStaffCustomer.forEach(adcls => {
            if(adcls.classList.contains('d-none')){
                adcls.classList.remove('d-none');
            }

        })

        setInterval(function(){
            listenToTRansaction()
        },1000)
        
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

            laundryOwnerAndStaffCustomer.forEach(adcls => {
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

            laundryOwnerAndStaffCustomer.forEach(adcls => {
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


        setInterval(function(){
            listenToTRansaction()
        },1000)
       
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
// Function to format the input with peso sign without altering the original decimal precision
function formatToCurrency(input) {
    // Remove non-numeric characters (except for the decimal point)
    let value = input.replace(/[^0-9.]/g, '');

    // Convert the cleaned string to a number, keeping the original precision
    let parsedValue = value ? parseFloat(value) : 0;

    // Add peso sign manually, without changing decimal places
    let formattedValue = `₱${parsedValue}`;

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

// function to return datetime in ph timezone
function getPhilippineDateTime() {
    // Create a new Date object for the current date and time
    const now = new Date();

    // Set the timezone offset to Philippines time (UTC+8)
    const phTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));

    // Format the date and time in SQL DATETIME format (YYYY-MM-DD HH:MM:SS)
    const year = phTime.getFullYear();
    const month = String(phTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(phTime.getDate()).padStart(2, '0');
    const hours = String(phTime.getHours()).padStart(2, '0');
    const minutes = String(phTime.getMinutes()).padStart(2, '0');
    const seconds = String(phTime.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// dynamic function to reverse discount
function reverseDiscount(discountedPrice, discountPercentage) {
    if (discountPercentage >= 100) {
        throw new Error("Discount percentage should be less than 100");
    }
    return discountedPrice / (1 - (discountPercentage / 100));
}

// function to listen to transaction
function listenToTRansaction() {
    const notifBadgeMessage =  document.getElementById('notif-badge-message');
    const url = "php-sql-controller/common-controller.php";
    const data = {
        listenToTransaction: true,
        userRole: userPosition,
        userId: userId,
    };

    if(sessionStorage.getItem('viewAsLaundryShop') && sessionStorage.getItem('viewAsLaundryShop') == 'true'){
        data.shop_id = sessionStorage.getItem('sessionShopId');
    }

    let transactionListTableContainer = document.getElementById('transaction-list-table-container')
    let transactionListInfoMessage = document.getElementById('transaction-list-info-message')

    const detailsList = dynamicSynchronousPostRequest(url, data);

    if(isValidJSON(detailsList)){

        const details = JSON.parse(detailsList);

        if(Object.keys(details).length > 0){
            let status = details.status;
           
            if(status == 'success'){
                const totalcount = parseInt(details.total_count);
                
                if(totalcount > 0){
                    
                    if(notifBadgeMessage.classList.contains('d-none')){
                        notifBadgeMessage.classList.remove('d-none');
                    }
                    listinerErrors = 0;

                    if(totalcount >= 99){
                        notifBadgeMessage.textContent = '99+';
                    }
                    else{
                        notifBadgeMessage.textContent = totalcount;
                    }

                    if(!transactionListInfoMessage.classList.contains('d-none')){
                        transactionListInfoMessage.classList.add('d-none');
                    }

                    if(transactionListTableContainer.classList.contains('d-none')){
                        transactionListTableContainer.classList.remove('d-none');
                    }

                    const notifCustomerTransactionTable = document.getElementById('notif-customer-transaction-table');
                    if ($.fn.DataTable.isDataTable(`#${notifCustomerTransactionTable.id}`) && savedCount != totalcount) {
                            // If table exists, reload its data without resetting the page
                            $(`#${notifCustomerTransactionTable.id}`).DataTable().ajax.reload(null, false);

                            savedCount = totalcount;
                    }
                    
                }
                else{
                    notifBadgeMessage.classList.add('d-none');
                    notifBadgeMessage.textContent = 0;

                    if(transactionListInfoMessage.classList.contains('d-none')){
                        transactionListInfoMessage.classList.remove('d-none');
                    }

                    if(!transactionListTableContainer.classList.contains('d-none')){
                        transactionListTableContainer.classList.add('d-none');
                    }
                }

            }
            else{

                listinerErrors += 1;
                
                if(listinerErrors == 1){
                    let errMessage = details.message;
                    console.error(errMessage);
                    if(!notifBadgeMessage.classList.contains('d-none')){
                        notifBadgeMessage.classList.add('d-none');
                        notifBadgeMessage.textContent = 0;

                        if(transactionListInfoMessage.classList.contains('d-none')){
                            transactionListInfoMessage.classList.remove('d-none');
                        }
    
                        if(!transactionListTableContainer.classList.contains('d-none')){
                            transactionListTableContainer.classList.add('d-none');
                        }
                    }
                }
                
            }
        }
        
    }
    else{
        console.error(detailsList);
        if(!notifBadgeMessage.classList.contains('d-none')){
            notifBadgeMessage.classList.add('d-none');
            notifBadgeMessage.textContent = 0;

            if(transactionListInfoMessage.classList.contains('d-none')){
                transactionListInfoMessage.classList.remove('d-none');
            }

            if(!transactionListTableContainer.classList.contains('d-none')){
                transactionListTableContainer.classList.add('d-none');
            }
        }
    }

}

// function to load the notification table
function notifTransationTable() {
    var ajax_url = "php-sql-controller/manage-transactions-controller.php";
    let tableParamValue = {
        showCostumerTransaction: true,
        isForNotification: true,
        position: userPosition,
        userId: userId,
    };

    const notifCustomerTransactionTable = document.getElementById('notif-customer-transaction-table');
    let sessionShopId = sessionStorage.getItem('sessionShopId');

    if (sessionShopId) {
        tableParamValue.shop_id = sessionShopId;
    }

    // Check if DataTable instance already exists for reload functionality
    if ($.fn.DataTable.isDataTable(`#${notifCustomerTransactionTable.id}`)) {
        // If table exists, reload its data without resetting the page
        $(`#${notifCustomerTransactionTable.id}`).DataTable().ajax.reload(null, false);
    } else {
        // If table does not exist, initialize it
        notifTransationTableVar = $(`#${notifCustomerTransactionTable.id}`).DataTable({
            deferRender: true,
            serverSide: true,
            ajax: {
                url: ajax_url,
                data: tableParamValue,
                dataSrc: function (json) {
                    return json.data;
                }
            },
            order: [[1, 'asc']],
            responsive: true,
            fixedHeader: true,
            searching: true,
            dom: 'Blfrtip',
            pageLength: 10,
            buttons: [
                {
                    extend: 'excel',
                    text: 'Export Excel',
                    className: 'export-excel-btn',
                    title: 'Costumer Transactions',
                    exportOptions: {
                        columns: function (idx) {
                            return idx >= 1 && idx <= 8;
                        }
                    }
                }
            ],
            lengthMenu: [[5, 10, 20, 50, 100], [5, 10, 20, 50, 100]],
            columnDefs: [{
                targets: 0,
                orderable: false
            }],
            language: {
                info: "Showing _START_ to _END_ of _TOTAL_ entries",
                infoFiltered: ""
            },
            columns: [
                {
                    targets: 0,
                    render: function (data, type, row) {
                        return `<button type="button" onClick="manageTransactionModal('${row}',true)" class="btn btn-primary text-white">Manage</button>`;
                    }
                },
                null,
                null,
                null,
                {
                    targets: 4,
                    render: function (data) {
                        return formatToCurrency(`${data}`);
                    }
                },
                null,
                null,
                null,
                null,
            ],
        });
    }

    // Code to modify and relocate DataTable UI elements
    let transactionListModalTableContainer = document.getElementById('notif-customer-transaction-table_wrapper')
    let navBtnContainer = document.getElementById('notif-nav-btn-container');
    let navfilterContainer = document.getElementById('notif-nav-search-container');
    let navFooterContainer = document.getElementById('notif-nav-footer-container');

    let dataTableButtons = transactionListModalTableContainer.querySelector('.dt-buttons');
    let dataTablefilter = transactionListModalTableContainer.querySelector('.dataTables_filter');
    let dataTableInfo = transactionListModalTableContainer.querySelector('.dataTables_info');
    let dataTablePaginate = transactionListModalTableContainer.querySelector('.dataTables_paginate');
    let dataTableLength = transactionListModalTableContainer.querySelector('.dataTables_length');

    if (navBtnContainer && dataTableButtons) {
        navBtnContainer.appendChild(dataTableButtons);
        let excelBtn = dataTableButtons.querySelector('.buttons-excel');
        excelBtn.classList.add('btn', 'btn-primary', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2');
        if (excelBtn.classList.contains('dt-button')) {
            excelBtn.classList.remove('dt-button');
        }
    }

    if (dataTablefilter && navfilterContainer && dataTableLength) {
        navfilterContainer.appendChild(dataTableLength);
        navfilterContainer.appendChild(dataTablefilter);
        
        let dataTablefilterLabel = dataTablefilter.querySelector('label');
        if (dataTablefilterLabel) {
            let searchInput = dataTablefilterLabel.querySelector('input');
            searchInput.classList.add('form-control');
            searchInput.placeholder = 'Search';

            dataTablefilterLabel.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && child.nodeValue.includes('Search:')) {
                    child.remove();
                }
            });
        }

        let labelElement = dataTableLength.querySelector('label');
        if (labelElement) {
            labelElement.querySelector('select').classList.add('form-select');
            labelElement.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && (child.nodeValue.includes('Show') || child.nodeValue.includes('entries'))) {
                    child.remove();
                }
            });
        }
    }

    if (navFooterContainer && dataTableInfo && dataTablePaginate) {
        navFooterContainer.appendChild(dataTableInfo);
        navFooterContainer.appendChild(dataTablePaginate);
    }
}

// Array to hold selected products
let selectedProductToRemove = [];
let defaultProducSelected = [];

// Function to toggle product selection and update label text
function NotiftoggleProductSelection(product) {
    const checkbox = document.getElementById(`selectedProductInput${product.order_product_id}`);
    const labelText = document.getElementById(`NotifProductlabelText${product.order_product_id}`);
    const existingIndex = selectedProductToRemove.findIndex(p => p.order_product_id === product.order_products_id);

    if (checkbox.checked) {
        if (existingIndex === -1) {
            selectedProductToRemove.push({
                order_product_id: product.order_products_id,
                product_id: product.product_id,
                item_quantity: product.item_quantity,
                product_price: product.product_price
            });
            labelText.textContent = 'Unmark to unremove';
        }
    } else {
        if (existingIndex > -1) {
            selectedProductToRemove.splice(existingIndex, 1);
            labelText.textContent = 'Mark to remove';
        }
    }

    // Update session storage
    // console.log('Selected Products:', selectedProductToRemove);
}

// function to open modal for mananging transations
function manageTransactionModal(row, fromNotif) {
    selectedProductToRemove = [];
    selectedAddMoreProductIds = [];
    selectedDiscountsGloabl = [];
    defaultProducSelected = [];
    changedServiceSelected = [];
    changeableDiscount = [];
    defaultInitial = null;
    let notifySelectedProductContainer = document.getElementById('notify-checkout-product-container');
    let notifModaldiscountContainer = document.getElementById('notify-checkout-discount-container');
    let notifyCheckoutSelectedService = document.getElementById('notify-checkout-selected-service');
    let notifySheckoutSelectedServiceDescription = document.getElementById('notify-checkout-selected-service-description');
    let notifyCheckoutSelectedServicePrice = document.getElementById('notify-checkout-selected-service-price');
    let notifyCheckoutClothesWeightInput = document.getElementById('notify-checkout-clothes-weight-input');
    let notifyCheckoutInitialInput = document.getElementById('notify-checkout-initial-input');
    let notifyCheckoutTotalInput = document.getElementById('notify-checkout-total-input');
    // let addMoreDiscount = document.getElementById('add-more-discount');
    let addMoreProduct = document.getElementById('add-more-product');
    let detailsTransactionStatus = document.getElementById('details-transaction-status');
    let changeServiceFromNotifBtn = document.getElementById('change-service-from-notif-btn');
    let changeServiceCloseBtn = document.getElementById('changeService-close-btn');
    let addMoreProductCloseBtn =  document.getElementById('add-more-product-close-btn');
    let notifyCheckoutProductContainerLabel =  document.getElementById('notify-checkout-product-container-label');
    let otherTransactionChangesDescription = document.getElementById('other-transaction-changes-description');
    let hideThisClass = '';
    const ThistransactionSubmitChanges = document.getElementById('transaction-submit-changes');
    const markAsReadNotification = document.getElementById('mark-as-read-notification')

    // an event that convert the value of price input into a currency
    notifyCheckoutInitialInput.addEventListener('blur', function(e){
        if(e.target.value.length > 0){
            e.target.value = formatToCurrency(e.target.value)
        }
    })

    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["id", "customer", "shop", "service", "payable_amount", "status", "transaction_date", "pickup_date"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    const transactionId = jsonObj.id;
    defaultTrnsactionId = transactionId;
    transactionCustomer = jsonObj.customer;

    // using my custom js to post request to php 
    const url = "php-sql-controller/common-controller.php"; 
    const data = {
        transactionId: transactionId, 
        queryTransaction: true, 
    };

    const detailsList = dynamicSynchronousPostRequest(url, data);
    if(isValidJSON(detailsList)){

        const details = JSON.parse(detailsList);
        if(Object.keys(details).length > 0){
            const productList = details.products;
            const discountList = details.discounts;
            const service = details.service;
            const transaction = details.transaction ;
            selectedTransactionShopId = transaction.shop_id;
            oldTransactionStatus =transaction.transaction_status;

            notifySelectedProductContainer.innerHTML = '';
            notifModaldiscountContainer.innerHTML = '';

            // console.log(transaction)

            notifyCheckoutSelectedService.textContent = service.service_name
            notifySheckoutSelectedServiceDescription.textContent = service.service_description
            notifyCheckoutSelectedServicePrice.textContent = formatToCurrency(`${service.service_price}`)
            notifyCheckoutClothesWeightInput.value = parseInt(transaction.clothes_weight);
            notifyCheckoutInitialInput.value = formatToCurrency(`${transaction.initial}`);
            notifyCheckoutTotalInput.value = formatToCurrency(`${transaction.total}`);
            otherTransactionChangesDescription.textContent = transaction.transaction_changes_other_details
            defaultInitial = transaction.initial;
            detailsTransactionStatus.value = transaction.transaction_status;
            oldTransaction = transaction;

            if(userPosition == 'Customer'){
                detailsTransactionStatus.disabled = true;
                notifyCheckoutInitialInput.disabled = true;
                otherTransactionChangesDescription.disabled = true;

                if(detailsTransactionStatus.value != 'Pending'){
                    changeServiceFromNotifBtn.classList.add('d-none')
                    addMoreProduct.classList.add('d-none')
                    ThistransactionSubmitChanges.classList.add('d-none')
                    notifyCheckoutClothesWeightInput.disabled = true;
                    hideThisClass = 'd-none';
                }
                else{
                    changeServiceFromNotifBtn.classList.remove('d-none')
                    addMoreProduct.classList.remove('d-none')
                    ThistransactionSubmitChanges.classList.remove('d-none')
                    notifyCheckoutClothesWeightInput.disabled = false;
                }


                if(fromNotif){
                    if(transaction.notification_is_read == 'False'){
                        
                        if(markAsReadNotification.classList.contains('d-none')){
                            markAsReadNotification.classList.remove('d-none');
                        }

                    }
                    else{
                        if(!markAsReadNotification.classList.contains('d-none')){
                            markAsReadNotification.classList.add('d-none');
                        }
                    }
                }else{
                    if(!markAsReadNotification.classList.contains('d-none')){
                        markAsReadNotification.classList.add('d-none');
                    }
                }
            }

            if (!isChangeServiceListenerAdded) {
                changeServiceFromNotifBtn.addEventListener('click', function(){
                    $('#changeService').modal('show');
                    $('#manageTransactionModal').modal('hide');
                    changeServiceShopId = transaction.shop_id;
                    openChangeServiceModal();
                });
                isChangeServiceListenerAdded = true; // Mark listener as added
            }

            // Add event listener for changeServiceCloseBtn if not already added
            if (!isChangeServiceCloseListenerAdded) {
                changeServiceCloseBtn.addEventListener('click', function() {
                    $('#changeService').modal('hide');
                    $('#manageTransactionModal').modal('show');
                });
                isChangeServiceCloseListenerAdded = true;
            }

            // Add event listener for addMoreProduct if not already added
            if (!isAddMoreProductListenerAdded) {
                addMoreProduct.addEventListener('click', function() {
                    $('#addMoreProductModal').modal('show');
                    $('#manageTransactionModal').modal('hide');
                    changeServiceShopId = transaction.shop_id;
                    loadAndSelectAddMoreProduct(service);
                });
                isAddMoreProductListenerAdded = true;
            }

            // Add event listener for addMoreProductCloseBtn if not already added
            if (!isAddMoreProductCloseListenerAdded) {
                addMoreProductCloseBtn.addEventListener('click', function() {
                    $('#addMoreProductModal').modal('hide');
                    $('#manageTransactionModal').modal('show');
                });
                isAddMoreProductCloseListenerAdded = true;
            }

            //products
            productList.forEach((product) => {
                const productPrice = product.product_price;
                const productBrand = product.product_brand;
                const productImage = product.image_link;
                const productName = product.product_name;
                const productQuantity = product.item_quantity;
                const productId = product.product_id;
                defaultProducSelected.push(product);
            
                // Create the card HTML dynamically
                const productCardHTML = `
                <div class="col-12 col-md-6">
                    <div class="card">
                        <div class="card-header">
                            ${productName}
                            <label class="btn btn-info ${hideThisClass} d-flex justify-content-center gap-2 text-white">
                                <input class="form-check-input" type="checkbox" value="${productId}" 
                                    id="selectedProductInput${product.order_product_id}" 
                                    onclick='NotiftoggleProductSelection(${JSON.stringify(product)})'>
                                <span id="NotifProductlabelText${product.order_product_id}">Mark to remove</span>
                            </label>
                        </div>
                        <div class="card-body d-flex gap-3">
                            <div class="rounded-3 overflow-hidden shadow" style="width: 100px;">
                                <img src='${productImage}' alt="Image Preview" style="width: 100%; height: 100px; object-fit: cover;">
                            </div>
                            <div>
                                <p>Brand: ${productBrand}</p>
                                <p>Price: ${formatToCurrency(`${productPrice}`)}</p>
                                <p>Selected Quantity: ${productQuantity}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            
                // Insert the card into the notifySelectedProductContainer
                notifySelectedProductContainer.innerHTML += productCardHTML;
            });
            
            if(Object.keys(defaultProducSelected).length > 1){
                notifyCheckoutProductContainerLabel.textContent = 'Selected Products'
            }
            else{
                notifyCheckoutProductContainerLabel.textContent = 'Selected Product'
            }

            //dicounts
            selectedDiscountsGloabl = discountList
            discountList.forEach(discount => {
                if (discount.discount_id) {
                    const discountCardHTML = `
                    <div class="card mb-3 responsive-card">
                        <div class="row g-0">
                            <div class="col img-container bg-info">
                                <img src="https://cdn-icons-png.flaticon.com/512/9528/9528844.png" alt="Discount Image" class="product-image">
                            </div>
                            <div class="col content-container d-flex flex-wrap flex-column">
                                <div class="card-body">
                                    <h5 class="card-title">${discount.discount_name}</h5>
                                    <p class="card-text">${discount.discount_description}</p>
                                    <p class="card-text">${discount.discount_percent}%</p>
                                    
                                    <div class="row g-3 mb-3 needs-validation">
                                        <div class="col-12">
                                            <label for="details-discount-status-${discount.discount_id}" class="form-label">Status</label>
                                            <select id="details-discount-status-${discount.discount_id}" class="form-select form-select" aria-label=".form-select-sm example" style="max-width:200px;">
                                                <option value='' selected>Select Option...</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Pending">Pending</option>
                                            </select>
                                            <div id="details-discount-status-${discount.discount_id}-error-feedback" class="invalid-feedback"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                    notifModaldiscountContainer.insertAdjacentHTML('beforeend', discountCardHTML);

                    // Get the select element and set initial value
                    const discountStatusSelectList = document.getElementById(`details-discount-status-${discount.discount_id}`);
                    discountStatusSelectList.value = discount.discounted_transaction_status;

                    if(userPosition == 'Customer'){
                        discountStatusSelectList.disabled = true;
                    }

                    const updatedDiscount = {
                        discount_id: discount.discount_id,
                        discount_transaction_id: discount.discounted_transaction_id,
                        discount_name: discount.discount_name,
                        discount_percent: discount.discount_percent,
                        discount_description: discount.discount_description,
                        olddiscounted_transaction_status: discount.discounted_transaction_status,
                        discounted_transaction_status: document.getElementById(`details-discount-status-${discount.discount_id}`).value
                    };

                    // Check if the discount already exists in the changeableDiscount array
                    const existingIndex = changeableDiscount.findIndex(d => d.discount_id === discount.discount_id);
                    if (existingIndex !== -1) {
                        // Update the existing entry
                        changeableDiscount[existingIndex] = updatedDiscount;
                    } else {
                        // Add a new entry
                        changeableDiscount.push(updatedDiscount);
                    }

                    // Add change event listener to the select element
                    discountStatusSelectList.addEventListener('change', () => {

                        const updatedDiscount2 = {
                            discount_id: discount.discount_id,
                            discount_transaction_id: discount.discounted_transaction_id,
                            discount_name: discount.discount_name,
                            discount_percent: discount.discount_percent,
                            discount_description: discount.discount_description,
                            olddiscounted_transaction_status: discount.discounted_transaction_status,
                            discounted_transaction_status: document.getElementById(`details-discount-status-${discount.discount_id}`).value
                        };

                        // Check if the discount already exists in the changeableDiscount array
                        const existingIndex = changeableDiscount.findIndex(d => d.discount_id === discount.discount_id);
                        if (existingIndex !== -1) {
                            // Update the existing entry
                            changeableDiscount[existingIndex] = updatedDiscount2;
                        } else {
                            // Add a new entry
                            changeableDiscount.push(updatedDiscount2);
                        }

                        // console.log('Updated changeableDiscount:', changeableDiscount);
                    });
                } else {
                    const discountCardHTML = `<p>No selected discount found.</p>`;
                    notifModaldiscountContainer.insertAdjacentHTML('beforeend', discountCardHTML);
                }
            });


        }
        
    }
    else{
        console.error(detailsList);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
    }

    $('#viewNoftiicationList').modal('hide');
    $('#manageTransactionModal').modal('show');
    const backToNotificationList = document.getElementById('back-to-notification-list');

    if(fromNotif){
        if(backToNotificationList.classList.contains('d-none')){
            backToNotificationList.classList.remove('d-none')
        }
    }else{
        if(!backToNotificationList.classList.contains('d-none')){
            backToNotificationList.classList.add('d-none')
        }
    }

    let addedMoreProductContainer = document.getElementById('added-more-product-container');
    let addedMoreProduct = document.querySelectorAll('.added-more-product')

    addedMoreProductContainer.innerHTML = '';
    if(Object.keys(selectedAddMoreProductIds).length > 0){
        addedMoreProduct.forEach((e) => {
            if(e.classList.contains('d-none')){
                e.classList.remove('d-none')
            }
        })
    }
    else{
        addedMoreProduct.forEach((e) => {
            if(!e.classList.contains('d-none')){
                e.classList.add('d-none')
            }
        })
    }
}

// function to formulate changes for trensaction
function formulateChangesForTransaction() {
    const notifyCheckoutTotalInput = document.getElementById('notify-checkout-total-input');
    let changedTotal = currencyToNormalFormat(`${notifyCheckoutTotalInput.value}`)
    const tobeRemoveOrderProduct = selectedProductToRemove;
    const tobeAddedMoreProduct = selectedAddMoreProductIds;
    let isValid = true;
    let changeAddMore = false;

    let isValiddetailsTransactionStatus = true;

    const notifyCheckoutClothesWeightInput = document.getElementById('notify-checkout-clothes-weight-input');
    const notifyCheckoutInitialInput = document.getElementById('notify-checkout-initial-input');
    const detailsTransactionStatus = document.getElementById('details-transaction-status');
    const otherTransactionChangesDescription = document.getElementById('other-transaction-changes-description');
    
    if (changedServiceSelected){
        if(Object.keys(changedServiceSelected).length > 0){
            changeAddMore = true;
        }
    }

    let singleItemPrice = currencyToNormalFormat(`${notifyCheckoutInitialInput.value}`);
   
    const totaldefaultProduct = defaultProducSelected.reduce((total, product) => {
        return total + parseFloat(product.product_price) * parseInt(product.item_quantity, 10);
    }, 0);

    // Calculate subtotal
    let subtotal = singleItemPrice + totaldefaultProduct;

    const totalProductPrice = tobeRemoveOrderProduct.reduce((total, product) => {
        return total + parseFloat(product.product_price) * parseInt(product.item_quantity, 10);
    }, 0);

    const totalAddMoreProducts = tobeAddedMoreProduct.reduce((total, product) => {
        return total + parseFloat(product.price) * parseInt(product.quantity, 10);
    }, 0);

    if(totalAddMoreProducts > 0){
        subtotal += totalAddMoreProducts;
        changeAddMore = true;
    }

    if(totalProductPrice > 0){
        subtotal -= totalProductPrice;
        changeAddMore = true;
    }    
    
    if (Object.keys(changeableDiscount).length > 0) {
        // console.log('changeableDiscount = >' , changeableDiscount)
        
        // Initialize discount variables
        let discount3 = changeableDiscount[0] && changeableDiscount[0].discounted_transaction_status != 'Rejected'? parseFloat(changeableDiscount[0].discount_percent) / 100 : null;
        let discount4 = changeableDiscount[1] && changeableDiscount[1].discounted_transaction_status != 'Rejected'? parseFloat(changeableDiscount[1].discount_percent) / 100 : null;
    
        // Check if the first discount is present, else alert and stop
        if (discount3 ||discount4) {

            // console.log("discount3 = " + discount3);
            // Apply the first discount
            let afterFirstDiscount = subtotal * (1 - discount3);
            subtotal = parseFloat(afterFirstDiscount.toFixed(2)); // Format with two decimal places
    
            // Check if the second discount is present
            if (discount4) {
                // console.log("discount4 = " + discount4);
                // Apply the second discount to the result of the first discount
                let finalPrice = afterFirstDiscount * (1 - discount4);
                subtotal = parseFloat(finalPrice.toFixed(2)); // Format with two decimal places
            }
        }

        changeableDiscount.forEach(function(discount){

            if(discount.olddiscounted_transaction_status != discount.discounted_transaction_status){
                changeAddMore = true;
            }

        })

    }

    changedTotal = subtotal;

    // validations
    if(parseInt(Object.keys(tobeRemoveOrderProduct).length) == parseInt(Object.keys(defaultProducSelected).length) && parseInt(Object.keys(tobeAddedMoreProduct).length) < 1){
        dynamicAlertMessage('You cannot remove all products without adding new one.', 'warning', 3000);
        isValid = false;
    }

    if(notifyCheckoutClothesWeightInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(notifyCheckoutClothesWeightInput.id, 'Please input a valid clothes weight.');
    }
    else {
        dynamicFieldErrorMessage(notifyCheckoutClothesWeightInput.id, '');
    }

    changeableDiscount.forEach((discount) => {
        const detailsDiscountID = document.getElementById(`details-discount-status-${discount.discount_id}`);

        if(detailsDiscountID){
            if(detailsDiscountID.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(detailsDiscountID.id, 'Please select a valid discount status.');
            }
            else {
                dynamicFieldErrorMessage(detailsDiscountID.id, '');
            }
    
            if(detailsDiscountID.value == 'Pending' && (detailsTransactionStatus.value == 'Approved'
                                                        || detailsTransactionStatus.value == 'In-Progress' 
                                                        || detailsTransactionStatus.value == 'Ready-to-Pick-Up'
                                                        || detailsTransactionStatus.value == 'Picked-Up' )){
                                                            console.log( detailsTransactionStatus.id+' - One or more discounts remain pending approval.')
                isValid = false;
                isValiddetailsTransactionStatus = false;
                dynamicFieldErrorMessage(detailsTransactionStatus.id, 'One or more discounts remain pending approval.');
            }
        }
    })

    if(isValiddetailsTransactionStatus){
        if(detailsTransactionStatus.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(detailsTransactionStatus.id, 'Please select a valid transaction status.');
        }
        else {
            dynamicFieldErrorMessage(detailsTransactionStatus.id, '');
        }
    }

    if(notifyCheckoutInitialInput.value < 1){
        isValid = false;
        dynamicFieldErrorMessage(notifyCheckoutInitialInput.id, 'Please input a valid clothes weight.');
    }    
    else {
        dynamicFieldErrorMessage(notifyCheckoutInitialInput.id, '');
    }

    if(notifyCheckoutInitialInput.value.length < 1 || !isValidCurrency(notifyCheckoutInitialInput.value)){
        isValid = false;
        dynamicFieldErrorMessage(notifyCheckoutInitialInput.id, 'Please input a valid intial amount.');
    }
    else {
        dynamicFieldErrorMessage(notifyCheckoutInitialInput.id, '');
    }

    if (oldTransactionStatus === 'Rejected') {
        dynamicAlertMessage('You cannot update a transaction that has already been rejected.', 'error', 3000);
        isValid = false;
    }
    else if(changeAddMore && ['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus)){
        dynamicAlertMessage('You cannot modify the products, services, or discount once the transaction is being processed.', 'error', 3000);
        isValid = false;
    }
    
    if(['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up'].includes(oldTransactionStatus) && detailsTransactionStatus.value == 'Rejected'){
        dynamicAlertMessage('You cannot reject the transaction once it is already in process.', 'error', 3000);
        isValid = false;
    }

    // console.log("oldTransaction = > ", oldTransaction)

    if((oldTransaction.clothes_weight != notifyCheckoutClothesWeightInput.value 
      || formatToCurrency(`${oldTransaction.initial}`)  != notifyCheckoutInitialInput.value
      || oldTransaction.transaction_changes_other_details != otherTransactionChangesDescription.value) 
      && ['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus))
    {
        dynamicAlertMessage('You cannot modify the Transaction fields once the transaction is being processed or rejected.', 'error', 3000);
        isValid = false;
    }

    if((['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus)) && detailsTransactionStatus.value == 'Pending'){
        dynamicAlertMessage('You cannot modify the Transaction status to Pending once the transaction is being processed or rejected.', 'error', 3000);
        isValid = false;
    }

    if((['In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus)) && detailsTransactionStatus.value == 'Approved'){
        dynamicAlertMessage(`You cannot modify the Transaction status to Approve once the transaction is 'In Progress', 'Ready to Pick-Up', 'Picked-Up', or 'Rejected'.`, 'error', 3000);
        isValid = false;
    }

    if((['Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus)) && detailsTransactionStatus.value == 'In-Progress'){
        dynamicAlertMessage(`You cannot modify the Transaction status to In Progress once the transaction is 'Ready to Pick Up', 'Picked-Up', or 'Rejected'.`, 'error', 3000);
        isValid = false;
    }

    if((['Picked-Up', 'Rejected'].includes(oldTransactionStatus)) && detailsTransactionStatus.value == 'Ready-to-Pick-Up'){
        dynamicAlertMessage(`You cannot modify the Transaction status to Ready to Pick Up once the transaction is 'Picked-Up', or 'Rejected'.`, 'error', 3000);
        isValid = false;
    }

    if(oldTransactionStatus == "Picked-Up"){
        dynamicAlertMessage(`You cannot modify the Transaction status once it is Picked-Up.`, 'error', 3000);
        isValid = false;
    }

    if((['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus)) && oldTransactionStatus == detailsTransactionStatus.value){
        dynamicAlertMessage(`You can only modify the status of the Transaction.`, 'error', 3000);
        isValid = false;
    }

    if(isValid){
        const changeConfirmTransactionBack = document.getElementById('change-confirm-transaction-now');
        const transactionConfirmMessage = document.getElementById('transactionConfirmMessage');

        `<span id="change-identifier"></span> estimated payable amount is <span id="change-confirmMessagePayblleAmount"></span>. <span id="change-lastNote"></span>`

        if(userPosition == "Customer"){
            transactionConfirmMessage.textContent = `Your estimated payable amount is ${formatToCurrency(`${changedTotal}`)}. Please note that this amount may change based on staff review of your eligibility for payment criteria.`
        }
        else{
            transactionConfirmMessage.textContent = `The Customer's estimated payable amount is ${formatToCurrency(`${changedTotal}`)}. Please note that by confirming, you acknowledge that you have reviewed the transaction.`
        }

        if(detailsTransactionStatus.value == 'Rejected'){
            transactionConfirmMessage.textContent = 'By confirming, you acknowledge that you have reviewed and confirmed the rejection of this transaction.'
        }

        if(changeConfirmTransactionBack.classList.contains('btn-info')){
            changeConfirmTransactionBack.classList.remove('btn-info');
            changeConfirmTransactionBack.classList.add('btn-danger');
        }

        if (!ischangeConfirmTransactionBack) {
            changeConfirmTransactionBack.addEventListener('click', function(){
                $('#change-finalize-transaction-confirm-modal').modal('hide');
                $('#manageTransactionModal').modal('show');
            });
            ischangeConfirmTransactionBack = true; // Mark listener as added
        }

        $('#change-finalize-transaction-confirm-modal').modal('show');
        $('#manageTransactionModal').modal('hide');

        finalTransactionObject = {
            transactionTotal: changedTotal,
            clothesWeight: notifyCheckoutClothesWeightInput.value,
            initial: currencyToNormalFormat(`${notifyCheckoutInitialInput.value}`),
            changesDescription: otherTransactionChangesDescription.value,
            transactionStatus: detailsTransactionStatus.value,
            oldTransactionId: defaultTrnsactionId,
            newService: changedServiceSelected,
            removedProduct: tobeRemoveOrderProduct,
            moreProduct: tobeAddedMoreProduct,
            discountChanges: changeableDiscount
        }
    }

}

function updateTransaction() {
    console.log(finalTransactionObject)
    let isSuccessful = true;
    const changesDescription = finalTransactionObject.changesDescription;
    const clothesWeight = finalTransactionObject.clothesWeight;
    const initialTotal = finalTransactionObject.initial;
    const oldTransactionId = finalTransactionObject.oldTransactionId;
    const transactionStatus = finalTransactionObject.transactionStatus;
    const transactionTotal = finalTransactionObject.transactionTotal;
    WaitigLoader(true)

    // insert transaction
    const url = "php-sql-controller/service-and-more-controller.php";
    let data = {
        insertTransaction: true,
        transaction_id: oldTransactionId,
        clothes_weight: clothesWeight,
        total: transactionTotal,
        last_update_date: getPhilippineDateTime(),
        notification_is_read: 'False',
        initial: initialTotal,
        transaction_status: transactionStatus,
        transaction_changes_other_details: changesDescription
    };

    if(transactionStatus == 'Rejected'){
        data = {
            insertTransaction: true,
            transaction_id: oldTransactionId,
            last_update_date: getPhilippineDateTime(),
            notification_is_read: 'False',
            transaction_status: transactionStatus,
        };
    }
    if (Object.keys(finalTransactionObject.newService).length > 0){
        // console.log('new Service Update')
        const newService = finalTransactionObject.newService;
        const newServiceId = newService.service_id;
        const transaction_name = `${transactionCustomer} - ${newService.service_name} - Transaction`;
        data.service_id = newServiceId
        data.transaction_name = transaction_name;
    }
    if(transactionStatus == 'Picked-Up'){
        data.pick_up_date = getPhilippineDateTime();
    }
    const detailsList = dynamicSynchronousPostRequest(url, data);
    if(isValidJSON(detailsList)){
        const details = JSON.parse(detailsList);
        // console.log('transaction => ', details)
        let status = details.status;
        if(status == 'success'){
            console.info(details.message);
        }
        else{
            let message = details.message
            // WaitigLoader(false)
            dynamicAlertMessage(message, 'error', 3000);
            isSuccessful = false
        }
    }
    else{
        console.error(detailsList);
        // WaitigLoader(false)
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        isSuccessful = false
    }

    // Remove Product
    if (Object.keys(finalTransactionObject.removedProduct).length > 0 && transactionStatus != 'Rejected'){
       
        const removedProductFromTransaction = finalTransactionObject.removedProduct;
        
        removedProductFromTransaction.forEach((removedProduct) => {
            const item_quantity = removedProduct.item_quantity;
            const order_product_id = removedProduct.order_product_id;
            const product_id = removedProduct.product_id;
            let allProductRemoveSuccess = true;
            // const product_price = removedProduct.product_id;

            const url = "php-sql-controller/service-and-more-controller.php";
            const data = {
                isRemoveProduct: true,
                insertOrderProduct: true,
                order_products_id: order_product_id
            };
            const detailsList = dynamicSynchronousPostRequest(url, data);

            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                // console.log('transaction => ', details)
                let status = details.status;
                if(status == 'success'){
                    console.info(details.message);
                }
                else{
                    let message = details.message
                    dynamicAlertMessage(message, 'error', 3000);
                    allProductRemoveSuccess = false;
                    isSuccessful = false
                }
            }
            else{
                console.error(detailsList);
                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                allProductRemoveSuccess = false;
                isSuccessful = false
            }

            if(allProductRemoveSuccess){
                const url = "php-sql-controller/manage-products-controller.php";
                const data = {
                    submitLaundryShopProduct: true,
                    product_id: product_id,
                    addQuantity: parseInt(item_quantity),
                    shop_id:selectedTransactionShopId
                };
                const detailsList = dynamicSynchronousPostRequest(url, data);

                if(isValidJSON(detailsList)){
                    const details = JSON.parse(detailsList);
                    if(details.message && details.message.length != 0){
                        console.info(details.message);
                    }
                    else{
                        let message = details.error; 
                        dynamicAlertMessage(message, 'error', 3000);
                        isSuccessful = false
                    }
                }
                else{
                    console.error(detailsList);
                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                    isSuccessful = false
                }
            }
        })
    }

    // Add More Product
    if (Object.keys(finalTransactionObject.moreProduct).length > 0 && transactionStatus != 'Rejected'){
        const addMoreProductToTransaction = finalTransactionObject.moreProduct;

        addMoreProductToTransaction.forEach((product) => {
            const productId = product.id;
            let justUpdateOrderProduct = false;
            let toUpdateOrders = [];

            const url = "php-sql-controller/common-controller.php";
            const data = {
                orderProductsCommonDml: true,
                queryDml: true,
                transaction_id: oldTransactionId,
                product_id: productId
            };
            const detailsList = dynamicSynchronousPostRequest(url, data);
            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                // console.log('transaction => ', details)
                let status = details.status;
                if(status == 'query success'){
                    console.info(details.message);
                    const retrieved = details.data

                    if(Object.keys(retrieved).length > 0){
                        justUpdateOrderProduct = true;
                        toUpdateOrders = retrieved
                    }
                    
                }
                else{
                    let message = details.message
                    dynamicAlertMessage(message, 'error', 3000);
                    isSuccessful = false
                }
            }
            else{
                console.error(detailsList);
                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                isSuccessful = false
            }

            if(justUpdateOrderProduct){

                toUpdateOrders.forEach((order) => {
                    const url = "php-sql-controller/common-controller.php";
                    const data = {
                        orderProductsCommonDml: true,
                        updateDml: true,
                        order_products_id: order.order_products_id,
                        product_id: order.product_id,
                        addQuantity: parseInt(product.quantity)
                    };
    
                    const detailsList = dynamicSynchronousPostRequest(url, data);
    
                    if(isValidJSON(detailsList)){
                        const details = JSON.parse(detailsList);
                        // console.log('order => ', details)
                        let status = details.status;
                        if(status == 'success'){
                            console.info(details.message);
                        }
                        else{
                            let message = details.message
                            dynamicAlertMessage(message, 'error', 3000);
                            isSuccessful = false
                        }
                    }
                    else{
                        console.error(detailsList);
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'warning', 3000);
                        isSuccessful = false
                    }
                })
            }
            else{
                const orderName = product.product_name + ' - ' + product.product_brand;
                const url = "php-sql-controller/service-and-more-controller.php";
                const data = {
                    insertOrderProduct: true,
                    order_name: orderName,
                    transaction_id: oldTransactionId,
                    product_id: productId,
                    order_date: getPhilippineDateTime(),
                    item_quantity: product.quantity
                };

                const detailsList = dynamicSynchronousPostRequest(url, data);

                if(isValidJSON(detailsList)){
                    const details = JSON.parse(detailsList);
                    // console.log('order => ', details)
                    let status = details.status;
                    if(status == 'success'){
                        console.info('More Product are added.');
                    }
                    else{
                        let message = details.message
                        dynamicAlertMessage(message, 'error', 3000);
                         isSuccessful = false
                    }
                }
                else{
                    console.error(detailsList);
                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                     isSuccessful = false
                }
            }

        })
    }

    if (Object.keys(finalTransactionObject.discountChanges).length > 0 && transactionStatus != 'Rejected'){
        
        const changedDiscount = finalTransactionObject.discountChanges;
        console.log('changedDiscount => ', changedDiscount)

        changedDiscount.forEach((discounted_transaction) => {

            const url = "php-sql-controller/service-and-more-controller.php";
            const data = {
                insertDiscountedTransaction: true,
                discounted_transaction_id: discounted_transaction.discount_transaction_id,
                discounted_transaction_status: discounted_transaction.discounted_transaction_status
            };
            const detailsList = dynamicSynchronousPostRequest(url, data);
            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                // console.log('transaction => ', details)
                let status = details.status;
                if(status == 'success'){
                    console.info(details.message);
                }
                else{
                    let message = details.message
                    // WaitigLoader(false)
                    dynamicAlertMessage(message, 'error', 3000);
                    isSuccessful = false
                }
            }
            else{
                console.error(detailsList);
                // WaitigLoader(false)
                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                isSuccessful = false
            }

        })
        
    }

    if(transactionStatus == 'Rejected' && Object.keys(defaultProducSelected).length > 0){

        defaultProducSelected.forEach((orderProduct) => {
            const url = "php-sql-controller/manage-products-controller.php";
            const data = {
                submitLaundryShopProduct: true,
                product_id: orderProduct.product_id,
                addQuantity: parseInt(orderProduct.item_quantity),
                shop_id:selectedTransactionShopId
            };
            const detailsList = dynamicSynchronousPostRequest(url, data);

            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                if(details.message && details.message.length != 0){
                    console.info(details.message);
                }
                else{
                    let message = details.error; 
                    dynamicAlertMessage(message, 'error', 3000);
                    isSuccessful = false
                }
            }
            else{
                console.error(detailsList);
                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                isSuccessful = false
            }
        })

    }

    if(isSuccessful){
        WaitigLoader(false)
        dynamicAlertMessage('Transaction is updated successfully.', 'success', 3000);
        $('#manageTransactionModal').modal('hide');
        setTimeout(function(){
           window.location.reload();
        },200)
    }
    else{
        setTimeout(function(){
            WaitigLoader(false)
        },3000)
    }


}

// Define global variables for pagination specific to Change Service
let changeServiceMaxDisplayPages = 5; // Adjust as needed
let changeServiceCurrentPage = 1; // Start at the first page

// Function to open the Change Service modal and load services
function openChangeServiceModal() {
    // Reset the current page when opening the modal
    changeServiceCurrentPage = 1; 
    loadServicesForChangeModal(changeServiceCurrentPage); // Load services for the first page
}

// Function to load services into the Change Service modal
function loadServicesForChangeModal(pageNumber) {
    const data = { queryServices: true, page: pageNumber, shop_id: changeServiceShopId };

    const response = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', data);
    const result = JSON.parse(response);
    const services = result.services;
    const totalPages = result.totalPages;
    const changeServiceContainer = document.getElementById('change-transaction-service-container');

    changeServiceContainer.innerHTML = ''; // Clear previous services

    if (services.length > 0) {
        services.forEach(service => {

            // console.log(service)

            const serviceItem = document.createElement('div');
            serviceItem.classList.add('col-md-4');
            serviceItem.innerHTML = `
                <div class="card d-flex flex-column">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${service.service_name}</h5>
                        <p class="card-text opacity-75">Description: ${service.description || 'No description available'}</p>
                        <p class="card-text opacity-75">Price: ${formatToCurrency(service.price)}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" id="change-service-btn-${service.service_id}" type="button">Select Service</button>
                        </div>
                    </div>
                </div>`;

            changeServiceContainer.appendChild(serviceItem);

            // Add event listener to "Select Service" button
            document.getElementById(`change-service-btn-${service.service_id}`).addEventListener('click', () => {
                $('#changeService').modal('hide');
                $('#manageTransactionModal').modal('show');

                changedServiceSelected = service;

                const notifyCheckoutSelectedService = document.getElementById('notify-checkout-selected-service');
                const notifySheckoutSelectedServiceDescription = document.getElementById('notify-checkout-selected-service-description');
                const notifyCheckoutSelectedServicePrice = document.getElementById('notify-checkout-selected-service-price');

                notifyCheckoutSelectedService.textContent = changedServiceSelected.service_name
                notifySheckoutSelectedServiceDescription.textContent = changedServiceSelected.description
                notifyCheckoutSelectedServicePrice.textContent = formatToCurrency(`${changedServiceSelected.price}`)

                let notifyCheckoutInitialInput = document.getElementById('notify-checkout-initial-input');
                notifyCheckoutInitialInput.value = formatToCurrency(`${changedServiceSelected.price}`);

                // console.log(changedServiceSelected)
            });
        });

        // Show the pagination and reset empty state message
        document.getElementById('change-transaction-service-pagination').classList.remove('d-none');
        document.getElementById('change-transaction-empty-service-identifier').classList.add('d-none');
    } else {
        // No services for this page
        document.getElementById('change-transaction-service-pagination').classList.add('d-none');
        document.getElementById('change-transaction-empty-service-identifier').classList.remove('d-none');
    }

    updateChangeServicePagination(pageNumber, totalPages); // Call to update pagination
}

// Function to update pagination in the Change Service modal
function updateChangeServicePagination(currentPage, totalPages) {
    const pagination = document.querySelector('#change-transaction-service-pagination .pagination');
    pagination.innerHTML = ''; // Clear existing pagination

    const startPage = Math.max(1, currentPage - Math.floor(changeServiceMaxDisplayPages / 2));
    const endPage = Math.min(totalPages, startPage + changeServiceMaxDisplayPages - 1);

    // Add "Previous" button
    const prevItem = document.createElement('li');
    prevItem.classList.add('page-item');
    if (currentPage === 1) {
        prevItem.classList.add('disabled');
    }
    const prevLink = document.createElement('a');
    prevLink.classList.add('page-link');
    prevLink.href = '#';
    prevLink.innerText = 'Previous';
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            loadServicesForChangeModal(currentPage - 1);
        }
    });
    prevItem.appendChild(prevLink);
    pagination.appendChild(prevItem);

    // Add page links dynamically
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }

        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.innerText = i;

        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            changeServiceCurrentPage = i; // Update current page
            loadServicesForChangeModal(changeServiceCurrentPage); // Load services for the clicked page
        });

        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }

    // Add "Next" button
    const nextItem = document.createElement('li');
    nextItem.classList.add('page-item');
    if (currentPage === totalPages) {
        nextItem.classList.add('disabled');
    }
    const nextLink = document.createElement('a');
    nextLink.classList.add('page-link');
    nextLink.href = '#';
    nextLink.innerText = 'Next';
    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (changeServiceCurrentPage < totalPages) {
            loadServicesForChangeModal(changeServiceCurrentPage + 1);
        }
    });
    nextItem.appendChild(nextLink);
    pagination.appendChild(nextItem);
}

// Global variables for add more products
let selectedAddMoreProductIds = []; // To store selected product IDs and their quantities
let addMoreProductPage = 1; // Current page for add more products
let areMoreAddMoreProductsAvailable = true; // Flag for product availability
let maxDisplayAddMoreProductPages = 5; // Max number of pages to display in pagination

// Function to load and select product for the selected service
function loadAndSelectAddMoreProduct(service) {
    addMoreProductPage = 1; 
    loadAddMoreProductsForCurrentPage(addMoreProductPage); // Load products for the first page
}

// Function to load products for the given page in add more product modal
function loadAddMoreProductsForCurrentPage(pageNumber) {
    const addMoreProductListContainer = document.getElementById('add-more-order-process-container');
    const addMoreProductPaginationElement = document.getElementById('add-more-product-pagination');
    const productRequestData = {
        queryProducts: true,
        currentPage: pageNumber,
        shop_id: changeServiceShopId // Ensure this variable is defined
    };

    const productResponse = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', productRequestData);
    const parsedResponse = JSON.parse(productResponse);

    const productsArray = parsedResponse.products;
    const totalAddMoreProductPages = parsedResponse.totalPages;

    addMoreProductListContainer.innerHTML = ''; // Clear existing product cards

    if (productsArray.length > 0) {
        areMoreAddMoreProductsAvailable = true; // Reset flag if products are found
        productsArray.forEach(product => {
            let bgColor = 'success';
            if (parseInt(product.quantity) <= 20) {
                bgColor = 'warning';
            }
            if (parseInt(product.quantity) <= 10) {
                bgColor = 'danger';
            }

            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4');
            productCard.innerHTML = `
                <div class="card d-flex flex-column">
                    <div class="overflow-hidden shadow-sm" style="height: 300px;">
                        <img src="${product.image_link}" class="card-img-top" alt="${product.product_name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.product_name}</h5>
                        <p class="card-text opacity-75">Brand: ${product.product_brand}</p>
                        <p class="card-text opacity-75">Price: ${formatToCurrency(product.price)}</p>
                        <p class="card-text opacity-75 ">Quantity: <span class="text-${bgColor}">${product.quantity}</span></p>
                        <div class="d-flex align-items-center">
                            <input type="number" class="form-control me-2" id="add-more-quantityInput${product.product_id}" value="1" min="1" style="width: 70px;">
                            <label style="min-width:50px; width:auto; max-width:500px;" type="button" class="btn btn-info d-flex justify-content-center flex-row-reverse gap-2 text-white" for="add-more-productSelect${product.product_id}">
                                <input class="form-check-input" type="checkbox" value="${product.product_id}" id="add-more-productSelect${product.product_id}" ${selectedAddMoreProductIds.some(item => item.id === product.product_id) ? 'checked' : ''}>
                                <span id="add-more-product-check-label${product.product_id}">${selectedAddMoreProductIds.some(item => item.id === product.product_id) ? 'Selected' : 'Select'}</span>
                            </label>
                        </div>
                    </div>
                </div>`;

            addMoreProductListContainer.appendChild(productCard);

            // Add event listener for the checkbox to track selections
            const checkbox = document.getElementById(`add-more-productSelect${product.product_id}`);
            const quantityInput = document.getElementById(`add-more-quantityInput${product.product_id}`);

            // Restore quantity if the product is already selected
            const selectedProduct = selectedAddMoreProductIds.find(item => item.id === product.product_id);
            if (selectedProduct) {
                quantityInput.value = selectedProduct.quantity; // Restore previous quantity
            }

            // Update selection when checkbox is changed
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const quantity = quantityInput.value; // Get quantity from input
                    selectedAddMoreProductIds.push({
                        id: product.product_id,
                        quantity: quantity,
                        product_name: product.product_name, 
                        product_image: product.image_link,
                        product_brand: product.product_brand,
                        price: product.price
                    }); // Store product ID and quantity
                    document.getElementById(`add-more-product-check-label${product.product_id}`).textContent = 'Selected';
                } else {
                    selectedAddMoreProductIds = selectedAddMoreProductIds.filter(item => item.id !== product.product_id); // Remove product from selection
                    document.getElementById(`add-more-product-check-label${product.product_id}`).textContent = 'Select';
                }

                // console.log(selectedAddMoreProductIds)
            });

            // Add event listener to update quantity when input value changes
            quantityInput.addEventListener('input', () => {
                const quantity = quantityInput.value; // Get the updated quantity
                const selectedProduct = selectedAddMoreProductIds.find(item => item.id === product.product_id); // Find the selected product

                if (selectedProduct) {
                    selectedProduct.quantity = quantity; // Update the quantity in the selectedAddMoreProductIds array
                }

                // console.log(selectedAddMoreProductIds)
            });
        });

        // Show pagination if products are found
        addMoreProductPaginationElement.classList.remove('d-none');
        document.getElementById('add-more-empty-product-identifier').classList.add('d-none');
    } else {
        // No products found for this page
        areMoreAddMoreProductsAvailable = false; // Update flag if no products are found
        addMoreProductPaginationElement.classList.add('d-none'); // Hide pagination
        document.getElementById('add-more-empty-product-identifier').classList.remove('d-none'); // Show empty state
    }

    updateAddMoreProductPagination(pageNumber, totalAddMoreProductPages); // Update the pagination display
}

// Function to update product pagination
function updateAddMoreProductPagination(currentProductPage, totalProductPages) {
    const paginationContainer = document.querySelector('#add-more-product-pagination-ui');
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const startProductPage = Math.max(1, currentProductPage - Math.floor(maxDisplayAddMoreProductPages / 2));
    const endProductPage = Math.min(totalProductPages, startProductPage + maxDisplayAddMoreProductPages - 1);

    // Add "Previous" button for pagination
    const prevProductItem = document.createElement('li');
    prevProductItem.classList.add('page-item');
    if (currentProductPage === 1) {
        prevProductItem.classList.add('disabled');
    }
    const prevProductLink = document.createElement('a');
    prevProductLink.classList.add('page-link');
    prevProductLink.href = '#';
    prevProductLink.innerText = 'Previous';
    prevProductLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentProductPage > 1) {
            loadAddMoreProductsForCurrentPage(currentProductPage - 1);
        }
    });
    prevProductItem.appendChild(prevProductLink);
    paginationContainer.appendChild(prevProductItem);

    // Add individual page links dynamically
    for (let i = startProductPage; i <= endProductPage; i++) {
        const productPageItem = document.createElement('li');
        productPageItem.classList.add('page-item');
        if (i === currentProductPage) {
            productPageItem.classList.add('active');
        }

        const productPageLink = document.createElement('a');
        productPageLink.classList.add('page-link');
        productPageLink.href = '#';
        productPageLink.innerText = i;

        productPageLink.addEventListener('click', (e) => {
            e.preventDefault();
            addMoreProductPage = i;
            loadAddMoreProductsForCurrentPage(addMoreProductPage); // Load products for the clicked page
        });

        productPageItem.appendChild(productPageLink);
        paginationContainer.appendChild(productPageItem);
    }

    // Add "Next" button for pagination
    const nextProductItem = document.createElement('li');
    nextProductItem.classList.add('page-item');
    if (currentProductPage === totalProductPages) {
        nextProductItem.classList.add('disabled');
    }
    const nextProductLink = document.createElement('a');
    nextProductLink.classList.add('page-link');
    nextProductLink.href = '#';
    nextProductLink.innerText = 'Next';
    nextProductLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentProductPage < totalProductPages) {
            loadAddMoreProductsForCurrentPage(currentProductPage + 1);
        }
    });
    nextProductItem.appendChild(nextProductLink);
    paginationContainer.appendChild(nextProductItem);
}












 




  
  