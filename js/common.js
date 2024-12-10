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
let transactionCustomerArr = [];
let wholeTransactionInfo = [];
let oldService = [];

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
        customBodyContent : `<div class=" d-flex flex-row flex-column gap-3 justify-content-center align-items-center">
        <h6 id="transactionConfirmMessage" style="font-size: 17px;"></h6>
        <textarea disabled class="border-0 shadow-sm w-100 bg-light p-3 text-secondary" name="" id="common-summary-message" cols="30" rows="10"></textarea>

            <style>
            textarea#summary-message {
                min-height: 350px;
                max-height: 500px;
              }
            </style>
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



                        if((userId != undefined && userId != null)){
                            const url = "php-sql-controller/login-controller.php";
                            const data = {
                                addNewLaundryOwner: true,
                                userId: userId,
                                status: 'Offline'
                            };    
                            
                            if(userId == 0 || userId == '0'){
                                
                                data.isForSuperAdmin = true;
                            }

                            if(userPosition == "Laundry Staff"){
                                data.isForStaff = true;
                            }

                            const detailsList = dynamicSynchronousPostRequest(url, data);
                            if(isValidJSON(detailsList)){
                                const details = JSON.parse(detailsList);
                                if (!`${details}`.includes("Error:")) {
                                   
                                    setTimeout(function(){
                                        sessionStorage.clear();
                                        WaitigLoader(false);
                                        window.location.href = 'login.php';
                                    },3000)
                                    dynamicAlertMessage('Logout successfully.', 'success', 3000);
                    
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
                    
                        }
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

// Interval variable to check if the nrate-shop exist
// const checkrateShop = setInterval(() => {
//     const rateShopBTNVAr = document.getElementById('rate-shop');

//     if(rateShopBTNVAr){

//         clearInterval(checkrateShop);
//         rateShopBTNVAr.addEventListener('click', function(){

//             $('#rateShop').modal('show');
//             $('#manageTransactionModal').modal('hide');
           
//         })
//     }


// }, 100);

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

// Interval variable to check if the ratingInput exist
const checratingInput = setInterval(() => {
    let ratingInput = document.getElementById('rating-input');

    if(ratingInput){

        clearInterval(checratingInput);
        // an event listener for rating input field
        ratingInput.addEventListener('input', function () {
            const rating = parseFloat(this.value);

            if (ratingInput.value.length > 0 && (isNaN(rating) || rating < 0 || rating > 5)) {
                dynamicFieldErrorMessage('rating-input', "Rating must be between 0 and 5.")
            } else {
                dynamicFieldErrorMessage('rating-input', "")
            }
        });

        let submitRatingButton = document.getElementById('submit-rating-button');
        let commentBoxForRating = document.getElementById('comment-box-for-rating')
        submitRatingButton.addEventListener('click', function(){
            let isValid = true
            const rating = parseFloat(ratingInput.value);
            if (ratingInput.value.length < 0) {
                dynamicFieldErrorMessage('rating-input', "Rating must be between 0 and 5.")
                isValid = false
            }
            else if((isNaN(rating) || rating < 0 || rating > 5)){
                dynamicFieldErrorMessage('rating-input', "Rating must be between 0 and 5.")
                isValid = false
            } else {
                dynamicFieldErrorMessage('rating-input', "")
            }


            if(isValid){
                
                // insert rating
                const url = "php-sql-controller/common-controller.php";
                const data = {
                    insertRating: true,
                    rating_created_date: getPhilippineDateTime(),
                    rate: ratingInput.value,
                    comment: commentBoxForRating.value,
                    shop_id: sessionStorage.getItem('service_more_shop_id'),
                    user_id: sessionStorage.getItem('raterId')
                };

                console.log(data)

                const detailsList = dynamicSynchronousPostRequest(url, data);

                if(isValidJSON(detailsList)){
                    const details = JSON.parse(detailsList);
                    // console.log('transaction => ', details)
                    let status = details.status;
                    if(status == 'success'){
                        let message = details.message
                        dynamicAlertMessage(message, 'success', 3000);
                        setTimeout(function(){
                            window.location.href = 'customer-home.php';
                        },2000)
                    }
                    else{
                        let message = details.message
                        WaitigLoader(false)
                        dynamicAlertMessage(message, 'error', 3000);
                    }
                }
                else{
                    console.error(detailsList);
                    WaitigLoader(false)
                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                }

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

//create an accesstoken
function generateRandomToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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

        if(!userPosition){

            const headerToggler = document.querySelector('.header-toggler');
            const headerNav =  document.querySelector('.profileAvatar');
            const sideBarId =  document.getElementById('sidebar');
            
           try {
            document.getElementById('rate-shop').classList.remove('d-none')
           } catch (error) {
            
           }

            if(headerToggler){

                if(!headerToggler.classList.contains('d-none')){
                    headerToggler.classList.add('d-none')
                }

            }

            if(headerNav){

                if(!headerNav.classList.contains('d-none')){
                    headerNav.classList.add('d-none')
                }

            }

            if(sideBarId){
                if(!sideBarId.classList.contains('hide')){
                    sideBarId.classList.add('hide')
                }
            }

            if(lastSegment == 'home.php'){
                window.location.href = 'customer-home.php';
            }

            return;
        }
        else{
            if(lastSegment == 'customer-home.php'){
                window.location.href = 'home.php';
            }
        }

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
    const queryUserData = dynamicSynchronousPostRequest(url, data)
    let userData
    if(isValidJSON(queryUserData)){
        userData = JSON.parse(queryUserData);
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
                    'service_more_requirement_status',
                    'service_more_rating'
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

    container.innerHTML = '';

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

    let imageLink = 'https://e0.pxfuel.com/wallpapers/239/798/desktop-wallpaper-question-mark-widescreen-cool-awesome-question-mark.jpg'

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

    let imageLink = 'https://e0.pxfuel.com/wallpapers/239/798/desktop-wallpaper-question-mark-widescreen-cool-awesome-question-mark.jpg'

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

    if(!userPosition){
        avatarUserLabel.textContent = 'Customer'
    }

    if(userPosition){
        userTitleHead.textContent = capitalizeWords(userPosition)+" "+capitalizeWords(userUserName);
    }

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

// Add an event listener for mouse movement
document.addEventListener("click", (event) => {
    const x = event.clientX; // X-coordinate of the mouse pointer
    const y = event.clientY; // Y-coordinate of the mouse pointer

    // Log the coordinates to the console
    // console.log('My Id : '+ userId.length)

    if((userId != undefined && userId != null)){
        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            userId: userId,
            status: 'Online'
        };    
        
        if(userId == 0 || userId == '0'){
            
            data.isForSuperAdmin = true;
        }

        if(userPosition == "Laundry Staff"){
            data.isForStaff = true;
        }

        const detailsList = dynamicSynchronousPostRequest(url, data);
        if(isValidJSON(detailsList)){
            const details = JSON.parse(detailsList);
            if (!`${details}`.includes("Error:")) {
                // console.log('info', details);

                updateStatusToOffline();

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

    }
});


function updateStatusToOffline(){

    const url = "php-sql-controller/common-controller.php";
    const data = {
        queryUserTosSetOffline: true, // Flag to trigger the backend action
    };

    // Call the custom POST function
    const response = dynamicSynchronousPostRequest(url, data);

    // Handle the response
    if (isValidJSON(response)) {
        const result = JSON.parse(response);
        if (result.status === "success") {
            // console.info("User statuses updated successfully.");
            try {
                if(typeof laundryOwnerDataTableVar !== undefined){
                    laundryOwnerDataTableVar.ajax.reload(null, false); 
                }
            } catch (error) {
            }


            try {
                if(typeof staffDataTableVar !== undefined){
                    staffDataTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                }
            } catch (error) {
                
            }

        } else {
            console.error("Failed to update user statuses:", result.message);
        }
    } else {
        console.error("Invalid response from server:", response);
    }

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

                    if(userPosition == 'Admin'){
                        data.isSuperAdmin = true;
                    }
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

// validate phone number
function validatePhPhone(inputValue) {
    const value = inputValue.trim(); // Trim any whitespace
    const startsWithValidPrefix = value.startsWith('639') || value.startsWith('09') || value.startsWith('9');
    const validLength = value.length === 12 || value.length === 11 || value.length === 10;

    if (!startsWithValidPrefix || !validLength) {
        return false; // Invalid phone number
    }
    return true; // Valid phone number
}

// function that if field start with 09 or 9 make that part into 639 
function normalizePhoneNumber(inputField) {
    let value = inputField.trim(); // Get the value and remove extra spaces

    if (value.startsWith('09')) {
        // Replace '09' with '639'
        value = '639' + value.slice(2);
    } else if (value.startsWith('9')) {
        // Add '63' before '9'
        value = '639' + value.slice(1);
    }

    // Update the input field value with the normalized phone number
    inputField.value = value;

    return value;
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
            ...(userPosition == 'Customer' && {isForCustomer: true}),
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

// Function to format the input with peso sign without altering the original decimal precision
function formatToCurrency(input) {
    // Remove non-numeric characters (except for the decimal point)
    let value = input.replace(/[^0-9.]/g, '');

    // Convert the cleaned string to a number, keeping the original precision
    let parsedValue = value ? parseFloat(value) : 0;

    // Format the number as currency using Intl.NumberFormat
    let formattedValue = new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2, // Optional: you can adjust this if you want more/less precision
        maximumFractionDigits: 2
    }).format(parsedValue);

    return !isValidCurrency(formattedValue) ? '' : formattedValue;
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
    return !isValidCurrency(normalFormat) ? '' : parseFloat(normalFormat).toFixed(2);
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
    return isNaN(intValue) ? '' : intValue; // Return 0 if the value is NaN, otherwise return the integer
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
        sessionStorage.setItem('service_more_rating', shop.overall_rating);
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
        sessionStorage.removeItem('service_more_rating');
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
            order: [[8, 'desc']],
            responsive: false,
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
                        const serializedRow = encodeURIComponent(JSON.stringify(row));
                        return `<button type="button" onClick="manageTransactionModal('${serializedRow}',true)" class="btn btn-primary text-white">Manage</button>`;
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
    transactionCustomerArr = [];
    wholeTransactionInfo = [];
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
    let rateShopVar = document.getElementById('rate-shop')
    const ThistransactionSubmitChanges = document.getElementById('transaction-submit-changes');
    const markAsReadNotification = document.getElementById('mark-as-read-notification')

    // an event that convert the value of price input into a currency
    // notifyCheckoutInitialInput.addEventListener('blur', function(e){
    //     if(e.target.value.length > 0){
    //         e.target.value = formatToCurrency(e.target.value)
    //     }
    // })

    // Given string
    let str = row;

    // Split the string into an array
    let values = JSON.parse(decodeURIComponent(row));

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
            const transaction = details.transaction;
            const userInfo = details.user;
            selectedTransactionShopId = transaction.shop_id;
            oldTransactionStatus = transaction.transaction_status;
            transactionCustomerArr = userInfo;
            oldService = service;
            wholeTransactionInfo = details;
            // console.log(details)

            notifySelectedProductContainer.innerHTML = '';
            notifModaldiscountContainer.innerHTML = '';

            // console.log(transaction)

            notifyCheckoutSelectedService.textContent = service.service_name
            notifySheckoutSelectedServiceDescription.textContent = service.service_description
            notifyCheckoutSelectedServicePrice.textContent = formatToCurrency(`${service.service_price}`)
            if(service.service_unit_measurement == 'Kg'){
                notifyCheckoutClothesWeightInput.value = currencyToNormalFormat(transaction.clothes_weight)
            }
            else{
                notifyCheckoutClothesWeightInput.value = integerConverter(transaction.clothes_weight);
            }

            if(service.service_unit_measurement == 'Kg'){
                document.getElementById('common-esitimated-clothes-weight-label').textContent = `Estimated Clothes Weight (Kg)`
                notifyCheckoutClothesWeightInput.placeholder = `Estimated Clothes Weight (Kg)`
            }
            else{
                document.getElementById('common-esitimated-clothes-weight-label').textContent = `Estimated Clothes Quantity`
                notifyCheckoutClothesWeightInput.placeholder = `Estimated Clothes Quantity`
            }

            // notifyCheckoutInitialInput.value = formatToCurrency(`${transaction.initial}`);
            notifyCheckoutTotalInput.value = formatToCurrency(`${transaction.total}`);
            otherTransactionChangesDescription.textContent = transaction.transaction_changes_other_details
            defaultInitial = transaction.initial;
            detailsTransactionStatus.value = transaction.transaction_status;
            oldTransaction = transaction;

            if(userPosition == 'Customer'){
                detailsTransactionStatus.disabled = true;
                // notifyCheckoutInitialInput.disabled = true;
                otherTransactionChangesDescription.disabled = true;

                if(detailsTransactionStatus.value != 'Pending'){
                    // changeServiceFromNotifBtn.classList.add('d-none')
                    // addMoreProduct.classList.add('d-none')
                    ThistransactionSubmitChanges.classList.add('d-none')
                    notifyCheckoutClothesWeightInput.disabled = true;
                    hideThisClass = 'd-none';
                }
                else{
                    // changeServiceFromNotifBtn.classList.remove('d-none')
                    // addMoreProduct.classList.remove('d-none')
                    ThistransactionSubmitChanges.classList.remove('d-none')
                    notifyCheckoutClothesWeightInput.disabled = false;
                }

                if(detailsTransactionStatus.value == 'Picked-Up'){
                    if(rateShopVar.classList.contains('d-none')){
                        rateShopVar.classList.remove('d-none')
                    }
                }
                else{
                    if(!rateShopVar.classList.contains('d-none')){
                        rateShopVar.classList.add('d-none')
                    }
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
                // changeServiceFromNotifBtn.addEventListener('click', function(){
                //     $('#changeService').modal('show');
                //     $('#manageTransactionModal').modal('hide');
                //     changeServiceShopId = transaction.shop_id;
                //     openChangeServiceModal();
                // });
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
                // addMoreProduct.addEventListener('click', function() {
                //     $('#addMoreProductModal').modal('show');
                //     $('#manageTransactionModal').modal('hide');
                //     changeServiceShopId = transaction.shop_id;
                //     loadAndSelectAddMoreProduct(service);
                // });
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
           
            if(productList[0].product_id){

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
                    <div class=" col-12 col-md-6">
                        <div class="card">
                            <div class="card-header">
                                ${productName}
                            </div>
                            <div class="card-body d-flex gap-3">
                                <div class="rounded-3 overflow-hidden d-flex align-items-center shadow" style="width: 100px;">
                                    <img src='${productImage}' alt="Image Preview" style="width: 100%; height: 100px; object-fit: cover;">
                                </div>
                                <div>
                                    <p>Brand: ${productBrand}</p>
                                    <p>Type: ${product.product_type}</p>
                                    <p>Price: ${formatToCurrency(`${productPrice}`)} (${product.amount_per_price}${product.product_unit_measurement.toUpperCase()})</p>
                                    <p>Ordered Amount: ${productQuantity} ${product.op_unit_measurement.toUpperCase()}</p> <!-- You can replace 1 with a dynamic value if needed -->
                                    <p>Ordered Estimated Price: ${formatToCurrency(`${product.order_product_price}`)}</p>
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

                document.getElementById('notify-checkout-product-container-label').classList.remove('d-none')
                
            }
            else{
                document.getElementById('notify-checkout-product-container-label').classList.add('d-none')
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
    let selectedServiceGlobalVar = oldService;
    const notifyCheckoutTotalInput = document.getElementById('notify-checkout-total-input');
    let changedTotal = currencyToNormalFormat(`${notifyCheckoutTotalInput.value}`);
    let isValid = true;
    let changeAddMore = false;
    let isValiddetailsTransactionStatus = true;
    const notifyCheckoutClothesWeightInput = document.getElementById('notify-checkout-clothes-weight-input');
    const detailsTransactionStatus = document.getElementById('details-transaction-status');
    const otherTransactionChangesDescription = document.getElementById('other-transaction-changes-description');
    let summaryMessage = ``;

    let clothesQuantityWeightVal = notifyCheckoutClothesWeightInput.value;

    summaryMessage +=`Service Calculation Summary:\n`
    summaryMessage += `${selectedServiceGlobalVar.service_name} (${selectedServiceGlobalVar.service_type}): ${formatToCurrency(`${selectedServiceGlobalVar.service_price}`)} (${currencyToNormalFormat(`${selectedServiceGlobalVar.service_load}`)}${selectedServiceGlobalVar.service_unit_measurement.toUpperCase()})\n`;
    if(notifyCheckoutClothesWeightInput.value.length < 1){
        if(selectedServiceGlobalVar.service_unit_measurement == 'Kg'){
            clothesQuantityWeightVal = 1;
        }
        else{
            clothesQuantityWeightVal = 10;
        }
    }

    if(selectedServiceGlobalVar.service_unit_measurement == 'Kg'){
        summaryMessage += `${notifyCheckoutClothesWeightInput.placeholder}: ${currencyToNormalFormat(`${clothesQuantityWeightVal}`)}KG\n`;
    }
    else{
        summaryMessage += `${notifyCheckoutClothesWeightInput.placeholder}: ${clothesQuantityWeightVal}PCS\n`;
    }

    let totalServiceCost = calculatePricePerKg(selectedServiceGlobalVar.service_price, selectedServiceGlobalVar.service_load, clothesQuantityWeightVal);
    summaryMessage += `Service Total Cost: ${formatToCurrency(`${totalServiceCost}`)}`;
    
    let singleItemPrice = totalServiceCost
    let subtotal = singleItemPrice;

    if(Object.keys(defaultProducSelected).length > 0){

        summaryMessage += `\n\nProduct Calculation Summary: \n`;
        const totaldefaultProduct = defaultProducSelected.reduce((total, product, index) => {
            summaryMessage += `${product.product_name} ${formatToCurrency(`${product.order_product_price}`)}`;
            // Add "+" only if it's not the last product
            if (index < defaultProducSelected.length - 1) {
                summaryMessage += " +\n";
            }
            return total + product.order_product_price;
        }, 0);
        summaryMessage += `\nTotal: ${formatToCurrency(`${totaldefaultProduct}`)}`;

        // Calculate subtotal
        subtotal = singleItemPrice + totaldefaultProduct;
        summaryMessage += `\n\nService Total Cost: ${formatToCurrency(`${selectedServiceGlobalVar.service_price}`)} +\n`;
        summaryMessage += `Product Total Cost: ${formatToCurrency(`${totaldefaultProduct}`)}`
        summaryMessage += `\nTotal Cost (Without Discount): ${formatToCurrency(`${subtotal}`)}`;
        subtotal = singleItemPrice + totaldefaultProduct;
    }
    
    
    if (Object.keys(changeableDiscount).length > 0) {
        // console.log('changeableDiscount = >' , changeableDiscount)
        
        // Initialize discount variables
        let discount3 = changeableDiscount[0] && changeableDiscount[0].discounted_transaction_status != 'Rejected'? parseFloat(changeableDiscount[0].discount_percent) / 100 : null;
        let discount4 = changeableDiscount[1] && changeableDiscount[1].discounted_transaction_status != 'Rejected'? parseFloat(changeableDiscount[1].discount_percent) / 100 : null;
    
        // Check if the first discount is present, else alert and stop
        if (discount3 ||discount4) {

            summaryMessage += `\n\nDiscount Calculation Summary:\n`
            let afterFirstDiscount = subtotal * (1 - discount3);
            summaryMessage += `Discount 1: ${formatToCurrency(`${subtotal}`)} * (1 - ${discount3})\n`
            subtotal = parseFloat(afterFirstDiscount.toFixed(2)); 
            summaryMessage += `Total (Discount 1): ${formatToCurrency(`${subtotal}`)}`
    
            // Check if the second discount is present
            if (discount4) {
                let finalPrice = afterFirstDiscount * (1 - discount4);
                summaryMessage += `\nDiscount 2: ${formatToCurrency(`${subtotal}`)} * (1 - ${discount4})\n`
                subtotal = parseFloat(finalPrice.toFixed(2)); // Format with two decimal places
                summaryMessage += `Total (Discount 2): ${formatToCurrency(`${subtotal}`)}`
            }
        }

    }

    changedTotal = subtotal;

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

    // if((oldTransaction.clothes_weight != notifyCheckoutClothesWeightInput.value 
    //   || oldTransaction.transaction_changes_other_details != otherTransactionChangesDescription.value) 
    //   && ['Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected'].includes(oldTransactionStatus))
    // {
    //     dynamicAlertMessage('You cannot modify the Transaction fields once the transaction is being processed or rejected.', 'error', 3000);
    //     isValid = false;
    // }

    console.log(oldTransactionStatus + " new value "+ detailsTransactionStatus.value)

    if((['In-Progress', 'Ready-to-Pick-Up', 'Picked-Up'].includes(detailsTransactionStatus.value)) && oldTransactionStatus == 'Pending'){
        dynamicAlertMessage(`You cannot modify the Transaction status to 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected' once the transaction is not yet Approved.`, 'error', 3000);
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

        summaryMessage += `\n\nOverall Total Payable: ${formatToCurrency(`${subtotal}`)}`;
        document.getElementById('common-summary-message').value = summaryMessage
        console.log(summaryMessage);

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
            transactionTotal: currencyToNormalFormat(`${changedTotal}`),
            clothesWeight: notifyCheckoutClothesWeightInput.value,
            changesDescription: otherTransactionChangesDescription.value,
            transactionStatus: detailsTransactionStatus.value,
            oldTransactionId: defaultTrnsactionId,
            summaryMessage: summaryMessage,
            // removedProduct: tobeRemoveOrderProduct,
            // moreProduct: tobeAddedMoreProduct,
            discountChanges: changeableDiscount
        }
    }

}

function updateTransaction() {
    WaitigLoader(true)
    console.log(finalTransactionObject)
    let isSuccessful = true;
    const changesDescription = finalTransactionObject.changesDescription;
    const clothesWeight = finalTransactionObject.clothesWeight;
    const initialTotal = finalTransactionObject.initial;
    const oldTransactionId = finalTransactionObject.oldTransactionId;
    const transactionStatus = finalTransactionObject.transactionStatus;
    const transactionTotal = finalTransactionObject.transactionTotal;
    const summaryMessage = finalTransactionObject.summaryMessage;
    

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
        transaction_changes_other_details: changesDescription, 
        transactionTrackUpdate: true
    };

    if(sessionStorage.getItem('sessionShopName')){
        data.shopName = sessionStorage.getItem('sessionShopName');
    }

    if(transactionStatus == 'Rejected'){
        data = {
            insertTransaction: true,
            transaction_id: oldTransactionId,
            last_update_date: getPhilippineDateTime(),
            notification_is_read: 'False',
            transaction_status: transactionStatus,
        };
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

    if(transactionStatus == 'Approved' && Object.keys(defaultProducSelected).length > 0){

        defaultProducSelected.forEach((orderProduct) => {
            const productUnitType = orderProduct.product_unit_measurement;
            const customerSelectedUnitType = orderProduct.op_unit_measurement;
            let stockAmount = orderProduct.product_quantity;
            let amountPerStock = orderProduct.product_amount_per_stock;
            let orderedAmount = orderProduct.item_quantity;
            let saveLog = false;
            let saveLogDetails = `Changes detected:\n`;

            if(customerSelectedUnitType == 'Cup' && productUnitType == 'Kg'){

                orderedAmount = convertToKg({ cups: orderProduct.item_quantity }).kg; // Cups to Kg
                console.log(orderedAmount);
            }
            else if(customerSelectedUnitType == 'Grams' && productUnitType == 'Kg'){

                orderedAmount = convertToKg({ grams: orderProduct.item_quantity }).kg; // Grams to Kg
                console.log(orderedAmount);
            }
            
            let result = calculateStockAfterPurchase(stockAmount, amountPerStock, orderedAmount);

            let new_amount_per_stock = result.remainingcustomerBuy;

            if(new_amount_per_stock == 0 || new_amount_per_stock == '0'){
                new_amount_per_stock = orderProduct.base_stock;
            }

            let new_product_overall_stock = result.updatedStock;
            
            if(stockAmount != new_product_overall_stock){
                saveLog = true
                saveLogDetails +=`Stock:\n`
                saveLogDetails +=`Field old value: ${stockAmount}\n`
                saveLogDetails +=`Field new value: ${new_product_overall_stock}\n\n`
            }

            if(amountPerStock != new_amount_per_stock){
                saveLog = true
                saveLogDetails +=`Amount per Stock:\n`
                saveLogDetails +=`Field old value: ${amountPerStock}\n`
                saveLogDetails +=`Field new value: ${new_amount_per_stock}\n`
            }

            const url = "php-sql-controller/manage-products-controller.php";
            const data = {
                submitLaundryShopProduct: true,
                product_id: orderProduct.product_id,
                amount_per_stock: new_amount_per_stock,
                productQuantity: new_product_overall_stock,
                shop_id:selectedTransactionShopId,
                dontUpdateBaseStock: true
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


            if(saveLog){

                const url = "php-sql-controller/common-controller.php";
                let data = {
                    saveLog: true,
                    product_id: orderProduct.product_id,
                    userid: userId,
                    saveLogDetails: saveLogDetails,
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
    
            }
        })       

    }

    if(isSuccessful){
        $('#manageTransactionModal').modal('hide');

        // using my custom js to post request to php 
        const url = "php-sql-controller/common-controller.php"; 
        const data = {
            transactionId: oldTransactionId, 
            queryTransaction: true, 
        };

        const detailsList = dynamicSynchronousPostRequest(url, data);
        if(isValidJSON(detailsList)){
            const details = JSON.parse(detailsList);
            if(Object.keys(details).length > 0){
                wholeTransactionInfo = details;
            }
        }
        else{
            console.error(detailsList);
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        }

        const customerEmailUsed = transactionCustomerArr.email;
        const customerFullName = transactionCustomerArr.first_name + ' ' + transactionCustomerArr.last_name;
        const customerPhoneUsed = transactionCustomerArr.phone_number; 
        const cusomerIdUsed = transactionCustomerArr.user_id;

        // Generate the full notification message
        const notifMessage = `Hello ${customerFullName}, notice from ${sessionStorage.getItem('sessionShopName')}\n\nLaundry Transaction Details:\nLaundry Transaction Status: ${transactionStatus}\n\n${summaryMessage}\n\n${document.getElementById('footer-text').textContent}
        `;

        // if(!dynamicEmailSend(notifMessage, customerFullName ,customerEmailUsed)){
        //   WaitigLoader(false)
        // }

        // if(!dynamicSendSMS(notifMessage, cusomerIdUsed)){
        //   WaitigLoader(false)
        // }

        console.log(notifMessage)

        dynamicAlertMessage('Transaction is updated successfully.', 'success', 3000);
        
        setTimeout(function(){
            // WaitigLoader(false)
            // window.location.reload();
        },2000)
       
       
    }
    else{
        setTimeout(function(){
            WaitigLoader(false)
        },3000)
    }

}

// dynamic function to send email message
function dynamicEmailSend(message, name, email){


    const url1 = "php-sql-controller/common-controller.php"; 
    const data1 = {
        sendEmail: true, 
    };

    const detailsList1 = dynamicSynchronousPostRequest(url1, data1);

    if(isValidJSON(detailsList1)){
        const details = JSON.parse(detailsList1);
        const details2 = JSON.parse(details);
        let status = details2.status;
        if(status == 'success'){

            
            const dataDetail = details2.data[0];
            
            const url = "https://api.emailjs.com/api/v1.0/email/send";
            const data = {
                service_id: dataDetail.service_id,
                template_id: dataDetail.template_id,
                user_id: dataDetail.user_id, //public key
                template_params: {
                    'fromName': 'Online Laundry Shop POS and Inventory Platform',
                    'message': message,
                    'toEmail': email,
                    'toName': name
                }
            };
        
            const detailsList = dynamicSynchronousPostRequest(url, data);
            if(detailsList != 'OK'){
                console.error(detailsList);
                dynamicAlertMessage('Something went wrong in sending email. Please see the error logs for additional information.', 'error', 3000);
                return false;
            }
            else{
                console.log(detailsList);
                return true;
            }

        }
        else{
            let message = details.message
            // WaitigLoader(false)
            dynamicAlertMessage(message, 'error', 3000);
            return false;
        }
    }
    else{
        console.error(detailsList1);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        return false;
    }

}

// dynamically send sms
function dynamicSendSMS(message, cusomerIdUsed){
    

    let isSuccessful = true
    const url = "php-sql-controller/common-controller.php"; 
    const data = {
        message: message, 
        cusomerIdUsed: cusomerIdUsed, 
        sendSMS: true, 
    };

    const detailsList = dynamicSynchronousPostRequest(url, data);
    console.log(detailsList)
    if(isValidJSON(detailsList)){
        const details = JSON.parse(detailsList);
        let status = details.status;
        if(status == '200'){
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
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        isSuccessful = false
    }

    return isSuccessful;

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

// calculate cost kilo gram to gram
function calculateCostKiloGramToGram(pricePerBaseKg, weightInGrams, baseKg) {
    console.log(`Price per ${baseKg} kilogram(s): ${formatToCurrency(`${pricePerBaseKg}`)}`);
    console.log(`Weight in grams: ${weightInGrams} grams`);
    
    // Convert the price to price per 1 kg
    let pricePerKg = pricePerBaseKg / baseKg;
    console.log(`Converted price per kilogram: ${formatToCurrency(`${pricePerKg}`)}`);
    
    // Convert grams to kilograms
    let weightInKg = weightInGrams / 1000;
    console.log(`Converted weight in kilograms: ${currencyToNormalFormat(`${weightInKg}`)} kg`);
    
    // Calculate total cost
    let totalCost = pricePerKg * weightInKg;
    console.log(`Total cost calculation: ${formatToCurrency(`${pricePerKg}`)} x ${currencyToNormalFormat(`${weightInKg}`)} = ${formatToCurrency(`${totalCost}`)}`);
    
    return totalCost;
}

// Calculate cost based on custom base kilograms and cups
function calculatCostKiloGramToCup(pricePerBaseKg, cups, baseKg) {
    let gramsPerCup = 100; // Powdered Soap (Laundry Detergent): Typically ranges from 100-120 grams per cup, depending on the brand and granule density.
    
    console.log(`Price per ${baseKg} kilogram(s): ${formatToCurrency(`${pricePerBaseKg}`)}`);
    console.log(`Number of cups: ${cups}`);
    console.log(`Estimated grams per cup: ${gramsPerCup} (based on Standard Powdered Soap)`);
    
    // Convert the price to price per 1 kg
    let pricePerKg = pricePerBaseKg / baseKg;
    console.log(`Converted price per kilogram: ${formatToCurrency(`${pricePerKg}`)}`);
    
    // Convert cups to weight in kilograms
    let totalWeightKg = (cups * gramsPerCup) / 1000;
    console.log(`Total weight in kilograms: ${currencyToNormalFormat(`${totalWeightKg}`)} kg`);
    
    // Calculate total cost
    let totalCost = pricePerKg * totalWeightKg;
    console.log(`Total cost calculation: ${formatToCurrency(`${pricePerKg}`)} x ${currencyToNormalFormat(`${totalWeightKg}`)}kg = ${formatToCurrency(`${totalCost}`)}`);
    
    return totalCost;
}

//calculate price per ml
function calculatePricePerMl(pricePerSet, setMl, selectedMl) {
    console.log(`Price for ${setMl} ml: ${pricePerSet}`);
    console.log(`Selected ml: ${selectedMl}`);
    
    // Calculate the price per ml
    const pricePerMl = pricePerSet / setMl;
    console.log(`Price per ml: ${currencyToNormalFormat(`${pricePerMl}`)}`);
    
    // Calculate the total price for the selected ml
    const totalPrice = pricePerMl * selectedMl;
    console.log(`Total price for ${selectedMl} ml: ${formatToCurrency(`${totalPrice}`)}`);
    
    return totalPrice;
}

// Calculate price per kg
function calculatePricePerKg(pricePerSet, setKg, selectedKg) {
    console.log(`Price for ${setKg} kg: ${pricePerSet}`);
    console.log(`Selected kg: ${selectedKg}`);
    
    // Calculate the price per kg
    const pricePerKg = pricePerSet / setKg;
    console.log(`Price per kg: ${currencyToNormalFormat(`${pricePerKg}`)}`);
    
    // Calculate the total price for the selected kg
    const totalPrice = pricePerKg * selectedKg;
    console.log(`Total price for ${selectedKg} kg: ${formatToCurrency(`${totalPrice}`)}`);
    
    return totalPrice;
}

// Calculate price per sachet
function calculatePricePerSachet(pricePerSet, setSachets, selectedSachets) {
    console.log(`Price for ${setSachets} sachets: ${pricePerSet}`);
    console.log(`Selected sachets: ${selectedSachets}`);
    
    // Calculate the price per sachet
    const pricePerSachet = pricePerSet / setSachets;
    console.log(`Price per sachet: ${pricePerSachet.toFixed(2)}`);
    
    // Calculate the total price for the selected sachets
    const totalPrice = pricePerSachet * selectedSachets;
    console.log(`Total price for ${selectedSachets} sachets: ${totalPrice.toFixed(2)}`);
    
    return totalPrice;
}

// Calculate price per gram
function calculatePricePerGram(pricePerSet, setGrams, selectedGrams) {
    console.log(`Price for ${setGrams} grams: ${pricePerSet}`);
    console.log(`Selected grams: ${selectedGrams}`);
    
    // Calculate the price per gram
    const pricePerGram = pricePerSet / setGrams;
    console.log(`Price per gram: ${pricePerGram.toFixed(2)}`);
    
    // Calculate the total price for the selected grams
    const totalPrice = pricePerGram * selectedGrams;
    console.log(`Total price for ${selectedGrams} grams: ${totalPrice.toFixed(2)}`);
    
    return totalPrice;
}

// Calculate price per cup
function calculatePricePerCup(pricePerSet, setCups, selectedCups) {
    console.log(`Price for ${setCups} cups: ${pricePerSet}`);
    console.log(`Selected cups: ${selectedCups}`);
    
    // Calculate the price per cup
    const pricePerCup = pricePerSet / setCups;
    console.log(`Price per cup: ${pricePerCup.toFixed(2)}`);
    
    // Calculate the total price for the selected cups
    const totalPrice = pricePerCup * selectedCups;
    console.log(`Total price for ${selectedCups} cups: ${totalPrice.toFixed(2)}`);
    
    return totalPrice;
}

// Convert Kg to Grams or Cup
function convertKgToGramsAndCups(kg) {
    // Conversion constants
    const gramsPerKg = 1000; // 1 kg = 1000 grams
    const gramsPerCup = 100; // 1 cup = 100 grams

    // Convert kg to grams
    const grams = kg * gramsPerKg;

    // Convert grams to cups
    const cups = grams / gramsPerCup;

    console.log(`${kg} kg is equal to:`);
    console.log(`${grams} grams`);
    console.log(`${currencyToNormalFormat(`${cups}`)} cups (based on 100 grams per cup)`);

    return {
        grams: grams,
        cups: currencyToNormalFormat(`${cups}`), // Rounded to 2 decimal places
    };
}

// Calculate Unit stock after purchase
function calculateStockAfterPurchase(stock, base, customerBuy) {
    console.log(`Initial stock (in ${base} units): ${stock}`);
    console.log(`Base unit weight: ${base} units`);
    console.log(`Customer wants to buy: ${customerBuy} units`);

    let remainingcustomerBuy = customerBuy; // Amount the customer still wants
    let remainingStock = stock; // Remaining stock in base units

    // Process the purchase
    while (remainingcustomerBuy > 0 && remainingStock > 0) {
        if (remainingcustomerBuy >= base) {
            // If customer needs a full unit or more
            remainingcustomerBuy -= base;
            remainingStock -= 1; // Reduce one stock unit
        } else {
            // If customer needs less than one stock unit
            // No full stock unit is consumed, so we break here
            remainingcustomerBuy -= base;
            
        }
        console.log(`Remaining customer buy: ${remainingcustomerBuy} units, Remaining stock: ${remainingStock} units`);
    }

    return {
        updatedStock: remainingStock,
        remainingcustomerBuy: Math.abs(remainingcustomerBuy), // Return any unfulfilled amount
    };
}
// let result = calculateStockAfterPurchase(100, 3, 3);
// console.log(`Updated stock: ${result.updatedStock} units`);
// console.log(`Unfulfilled customer buy: ${result.remainingcustomerBuy} units`);


// Convert Grams or Cups to Kg
function convertToKg({ grams = 0, cups = 0 }) {
    // Conversion constants
    const gramsPerKg = 1000; // 1 kg = 1000 grams
    const gramsPerCup = 100; // 1 cup = 100 grams

    let totalKg = 0;

    if (grams > 0) {
        // Convert grams to kilograms
        totalKg = grams / gramsPerKg;
        console.log(`${grams} grams is equal to ${totalKg.toFixed(2)} kilograms`);
    } else if (cups > 0) {
        // Convert cups to grams, then to kilograms
        const totalGrams = cups * gramsPerCup;
        totalKg = totalGrams / gramsPerKg;
        console.log(`${cups} cups is equal to ${totalKg.toFixed(2)} kilograms`);
    } else {
        console.log("No valid input provided. Please provide either grams or cups.");
    }

    return {
        kg: totalKg.toFixed(2), // Return kilograms rounded to 2 decimal places
    };
}
// // Example usage
// const resultFromGrams = convertToKg({ grams: 1500 }); // Grams to Kg
// console.log(resultFromGrams);

// const resultFromCups = convertToKg({ cups: 5 }); // Cups to Kg
// console.log(resultFromCups);















 




  
  