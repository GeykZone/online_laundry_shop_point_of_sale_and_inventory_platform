let usernameFieldVar = document.getElementById('username-field');
let passwordFieldVar = document.getElementById('password-field');
let loginButtonVar = document.getElementById('login-button');
let createCustomerButtonVar = document.getElementById('create-customer-button');
let registerLaundryButtonVar = document.getElementById('register-laundry-button');
let addLaundryOwnerSubmitBtn = document.getElementById('add-laundry-owner-submit-btn');
let laundryOwnerFirstName = document.getElementById('laundry-owner-first-name');
let laundryOwnerLastName = document.getElementById('laundry-owner-Last-name');
let laundryOwnerUsername = document.getElementById('laundry-owner-username');
let laundryOwnerEmail = document.getElementById('laundry-owner-email');
let laundryOwnerAddress = document.getElementById('laundry-owner-adress');
let laundryOwnerPhone = document.getElementById('laundry-owner-phone');
let laundryOwnerPassword = document.getElementById('laundry-owner-password');
let retypeLaundryOwnerPasswordInput =  document.getElementById('retype-laundry-owner-password-input');
let laundryFormCloseBtn = document.getElementById('laundry-form-close-btn');
let addLaundrycustomerSubmitBtn = document.getElementById('add-laundry-customer-submit-btn');
let laundrycustomerFirstName = document.getElementById('laundry-customer-first-name');
let laundrycustomerLastName = document.getElementById('laundry-customer-Last-name');
let laundrycustomerUsername = document.getElementById('laundry-customer-username');
let laundrycustomerEmail = document.getElementById('laundry-customer-email');
let laundrycustomerAddress = document.getElementById('laundry-customer-adress');
let laundrycustomerPhone = document.getElementById('laundry-customer-phone');
let laundrycustomerPassword = document.getElementById('laundry-customer-password');
let retypeLaundrycustomerPasswordInput =  document.getElementById('retype-laundry-customer-password-input');
let laundryCustomerFormCloseBtn = document.getElementById('laundry-customer-form-close-btn');

// Check if 'shopIsRejected' exists in sessionStorage
if (sessionStorage.getItem('shopIsRejected')) {
    dynamicAlertMessage(sessionStorage.getItem('shopIsRejected'), 'error', 3000);
    sessionStorage.clear();
} 

dynamicConfirmationMessage( 
    {
        modalId : 'create-user-account-modal',
        modalText : `  <span class="fa-solid fa-users-gear me-2"></span> User Registration`,
        otherButtonId : 'as-laundry-owner-button',
        otherButtonText : 'Register as Laundry Owner',
        hideCancelButton: true,
        customBodyContent : `<div class=" d-flex flex-row gap-3 justify-content-center align-items-center">
        
        <h5> Please choose the type of user you are registering as.</h5>

        </div>`,
        customFooterContent: `<button type="button" id="as-customer-button" data-coreui-dismiss="modal" class="btn btn-info d-none text-white">Register as Customer</button>`
    }
)

// register as laundry owner button
const checkAsLaundryOwnerButton = setInterval(() => {
    const asLaundryOwnerButton = document.getElementById('as-laundry-owner-button');

    if(asLaundryOwnerButton){

        // Element exists, stop the interval
        clearInterval(checkAsLaundryOwnerButton);

        asLaundryOwnerButton.addEventListener('click', function(){
           
          var modalElement = document.getElementById('AddLaundryOwnerModal');

           // Trigger the modal to open
           var modal = new coreui.Modal(modalElement);
           modal.show();

        })

    }

}, 500)

// register as customer button
const checkAsCustomerButton = setInterval(() => {
    const asCustomerButton = document.getElementById('as-customer-button');

    if(asCustomerButton){

        // Element exists, stop the interval
        clearInterval(checkAsCustomerButton);

        asCustomerButton.addEventListener('click', function(){

            $('#addCustomerModal').modal('show');

        })

    }

}, 500)

// login button event click listener
loginButtonVar.addEventListener('click', function(){

    if(loginFormValidation()){

        const url = "php-sql-controller/login-controller.php";
        const data = {
            login: true,
            username: usernameFieldVar.value,
            password: passwordFieldVar.value
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {

           if(isValidJSON(response)){
                if(JSON.parse(response) != 'User does not exist.'){
                    if(JSON.parse(response) == 'Your account must be activated first.'){
                        let errorMessage = JSON.parse(response);
                        dynamicAlertMessage(errorMessage, 'error', 3000);
                    }
                    else{
                        window.location.href = 'home.php';
                        // console.log('response => ', JSON.parse(response))
                    }
                }
                else
                {
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
            console.error("Error:", error);
        });

    }

})

// click button event for submiting new laundry owner
addLaundryOwnerSubmitBtn.addEventListener('click', function(){
    let isValid = true;

    //laundryOwnerFirstName
    if(laundryOwnerFirstName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerFirstName.id, 'Please input a valid First Name.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerFirstName.id, '');
    }

    //laundryOwnerLastName
    if(laundryOwnerLastName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerLastName.id, 'Please input a valid Last Name.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerLastName.id, '');
    }

    //laundryOwnerUsername
    if(laundryOwnerUsername.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerUsername.id, 'Please input a valid Username.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerUsername.id, '');
    }

    //laundryOwnerEmail
    if(laundryOwnerEmail.value.length < 1 || !isValidEmail(laundryOwnerEmail)){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerEmail.id, 'Please input a valid Email.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerEmail.id, '');
    }

     //laundryOwnerAddress
     if(laundryOwnerAddress.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerAddress.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerAddress.id, '');
    }


     //laundryOwnerPhone
     if(laundryOwnerPhone.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerPhone.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerPhone.id, '');
    }

    //laundryOwnerPassword
    if(laundryOwnerPassword.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryOwnerPassword.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundryOwnerPassword.id, '');
    }

    if(laundryOwnerPassword.value.length > 1 && retypeLaundryOwnerPasswordInput.value != laundryOwnerPassword.value){
        isValid = false;
        dynamicFieldErrorMessage(retypeLaundryOwnerPasswordInput.id, 'Password re-entry does not match.');
    }
    else {
        dynamicFieldErrorMessage(retypeLaundryOwnerPasswordInput.id, '');
    }

    if(isValid){

        laundryFormCloseBtn.click();

        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            firstName:laundryOwnerFirstName.value,
            lastName:laundryOwnerLastName.value,
            username:laundryOwnerUsername.value,
            password:laundryOwnerPassword.value,
            email:laundryOwnerEmail.value,
            phoneNumber:laundryOwnerPhone.value,
            address:laundryOwnerAddress.value
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {
            if(isValidJSON(response)){

                if(JSON.parse(response) == 'New Laundry Owner added successfully.'){
                    dynamicAlertMessage('New Laundry Owner added successfully.', 'success', 3000);

                    laundryOwnerFirstName.value = '';
                    laundryOwnerLastName.value = '';
                    laundryOwnerUsername.value = '';
                    laundryOwnerPassword.value = '';
                    laundryOwnerEmail.value = '';
                    laundryOwnerPhone.value = '';
                    laundryOwnerAddress.value = '';
                    retypeLaundryOwnerPasswordInput.value = '';
                }
                else
                {
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
            console.error("Error:", error);
        });

    }
   
})

// click button event for submiting new laundry customer
addLaundrycustomerSubmitBtn.addEventListener('click', function(){
    let isValid = true;

    //laundryOwnerFirstName
    if(laundrycustomerFirstName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerFirstName.id, 'Please input a valid First Name.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerFirstName.id, '');
    }

    //laundrycustomerLastName
    if(laundrycustomerLastName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerLastName.id, 'Please input a valid Last Name.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerLastName.id, '');
    }

    //laundrycustomerUsername
    if(laundrycustomerUsername.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerUsername.id, 'Please input a valid Username.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerUsername.id, '');
    }

    //laundrycustomerEmail
    if(laundrycustomerEmail.value.length < 1 || !isValidEmail(laundrycustomerEmail)){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerEmail.id, 'Please input a valid Email.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerEmail.id, '');
    }

     //laundrycustomerAddress
     if(laundrycustomerAddress.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerAddress.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerAddress.id, '');
    }


     //laundrycustomerPhone
     if(laundrycustomerPhone.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerPhone.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerPhone.id, '');
    }

    //laundrycustomerPassword
    if(laundrycustomerPassword.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundrycustomerPassword.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(laundrycustomerPassword.id, '');
    }

    if(laundrycustomerPassword.value.length > 1 && retypeLaundrycustomerPasswordInput.value != laundrycustomerPassword.value){
        isValid = false;
        dynamicFieldErrorMessage(retypeLaundrycustomerPasswordInput.id, 'Password re-entry does not match.');
    }
    else {
        dynamicFieldErrorMessage(retypeLaundrycustomerPasswordInput.id, '');
    }

    if(isValid){

        laundryCustomerFormCloseBtn.click();

        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            isForCustomer: true,
            firstName:laundrycustomerFirstName.value,
            lastName:laundrycustomerLastName.value,
            username:laundrycustomerUsername.value,
            password:laundrycustomerPassword.value,
            email:laundrycustomerEmail.value,
            phoneNumber:laundrycustomerPhone.value,
            address:laundrycustomerAddress.value
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {
            if(isValidJSON(response)){

                if(JSON.parse(response) == 'New Laundry Owner added successfully.'){
                    dynamicAlertMessage('New Laundry Customer added successfully.', 'success', 3000);

                    laundrycustomerFirstName.value = ''
                    laundrycustomerLastName.value = ''
                    laundrycustomerUsername.value = ''
                    laundrycustomerPassword.value = ''
                    laundrycustomerEmail.value = ''
                    laundrycustomerPhone.value = ''
                    laundrycustomerAddress.value = ''
                    retypeLaundrycustomerPasswordInput.value = ''
                }
                else
                {
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
            console.error("Error:", error);
        });

    }
   
})

// Add event listeners for 'keydown' (for typing) and 'paste' events
laundryOwnerPhone.addEventListener('keydown', function(event) {
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
laundryOwnerPhone.addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, and parentheses in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)]+$/;

    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});

// returns true if valid text is inputed in the login form
function loginFormValidation(){
    let isValid = true;

    if(usernameFieldVar.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(usernameFieldVar.id, 'Please input a valid Username.');
    }
    else {
        dynamicFieldErrorMessage(usernameFieldVar.id, '');
    }

    if(passwordFieldVar.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(passwordFieldVar.id, 'Please input a valid Password.');
    }
    else {
        dynamicFieldErrorMessage(passwordFieldVar.id, '');
    }

    return isValid;
}