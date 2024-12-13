if(!userPosition){
    dynamicHeaderLowerText('home.php', 'Home', 'Customer');

    const openTransactionCreationModal =  document.getElementById('open-transaction-creation-modal');

    if(openTransactionCreationModal.classList.contains('d-none')){
        openTransactionCreationModal.classList.remove('d-none')
    }
}
else{
    dynamicHeaderLowerText('service-and-more.php', 'Service and More', userPosition);
}


let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let page = 1; // Track the current page
let totalPages = 15; // Set the total number of pages (you can calculate this based on the total services count in PHP)
const maxDisplayPages = 5; // Maximum number of pages to display at once
let moreServicesAvailable = true; // Initialize the flag
let servicePagination = document.getElementById('service-pagination');
let emptyServiceIdentifier = document.getElementById('empty-service-identifier');
let openTransactionCreationModal = document.getElementById('open-transaction-creation-modal');
let serviceContainer = document.getElementById('transaction-service-container');
let productPage = 1; // Track the current product page
let productTotalPages = 15; // Set the total number of product pages (this will be dynamically calculated based on total product count in PHP)
const maxDisplayProductPages = 5; // Maximum number of product pages to display at once
let areMoreProductsAvailable = true; // Flag to track if more products are available
let productPaginationElement = document.getElementById('product-pagination');
let noProductsMessage = document.getElementById('empty-product-identifier');
let productListContainer = document.getElementById('order-process-container');
let selectedProductIds = [];
let productServiceName = document.getElementById('product-service-name')
let selectedServiceGlobalVar;
let checkoutButton = document.getElementById('checkout');
let backToProductModalBtn = document.getElementById('back-to-product-modal-btn');
let selectedProductsContainer = document.getElementById('selected-products-container');
let discountPage = 1; // Start with the first page for discounts
let discountContainer = document.getElementById('checkout-discount-container');
let emptyDiscountIdentifier = document.getElementById('empty-discount-identifier');
let selectedDiscounts = JSON.parse(sessionStorage.getItem('selectedDiscounts')) || [];
let clothesWeightInput = document.getElementById('clothes-weight-input');
let finalizeTransactionBtn = document.getElementById('finalize-transaction-btn');
let addLaundrycustomerSubmitBtn = document.getElementById('add-laundry-customer-submit-btn');
let laundrycustomerFirstName = document.getElementById('laundry-customer-first-name');
let laundrycustomerLastName = document.getElementById('laundry-customer-Last-name');
let laundrycustomerUsername = document.getElementById('laundry-customer-username');
let laundrycustomerEmail = document.getElementById('laundry-customer-email');
let laundrycustomerAddress = document.getElementById('laundry-customer-adress');
let laundrycustomerPhone = document.getElementById('laundry-customer-phone');
let backToCustomerForm = document.getElementById('back-to-customer-form');
let backToServiceList = document.getElementById('back-to-service-list');
let backToServiceListNP = document.getElementById('back-to-service-list-np');
const rateShopBTNVAr = document.getElementById('rate-shop');
let estimatedPayable;
let ratingLength = 0;
let globalNewCustomerId = '';
let order_measurement_change = false;
let customerRate = false;

// confirm transaction
dynamicConfirmationMessage( 
    {
        modalId : 'finalize-transaction-confirm-modal',
        modalText : '<span class="fa-solid fa-clipboard-list"></span> Transaction Confirmation',
        otherButtonId : 'confirm-transaction-now',
        otherButtonText : 'Confirm Transaction',
        hideCancelButton: true,
        customFooterContent: `<button type="button" id="cancel-finalize" class="btn btn-danger text-white" data-coreui-dismiss="modal">Cancel</button>`,
        customBodyContent : `<div class=" d-flex h-100 flex-column gap-3 justify-content-center align-items-center">

            <h6>By confirming this transaction, you acknowledge and accept the following calculation summary.</h6>
            <textarea disabled class="border-0 shadow-sm w-100 bg-light p-3 text-secondary" name="" id="summary-message" cols="30" rows="10"></textarea>

            <style>
            textarea#summary-message {
                min-height: 350px;
                max-height: 500px;
              }
            </style>
        </div>`
    }
)

// put a values on the shop card if session shop id exist
if (sessionStorage.getItem('service_more_shop_id')) {
    const shopDetails = {
        shop_id: sessionStorage.getItem('service_more_shop_id'),
        shop_name: sessionStorage.getItem('service_more_shop_name'),
        shop_address: sessionStorage.getItem('service_more_shop_address'),
        contact_number: sessionStorage.getItem('service_more_contact_number'),
        user_id: sessionStorage.getItem('service_more_user_id'),
        open_time: sessionStorage.getItem('service_more_open_time'),
        close_time: sessionStorage.getItem('service_more_close_time'),
        days_open: sessionStorage.getItem('service_more_days_open'),
        additional_schedule_details: sessionStorage.getItem('service_more_additional_schedule_details'),
        image_link: sessionStorage.getItem('service_more_image_link'),
        requirement_status: sessionStorage.getItem('service_more_requirement_status'),
        rating: sessionStorage.getItem('service_more_rating')
    };

    console.log(shopDetails)

    // Assume the rating value is dynamically obtained
    let ratingValue = parseFloat(shopDetails.rating); // Example: dynamically computed rating value

    // Set the value for the star rating
    let starRatingElement = document.getElementById("shop-rating-point-stars");
    starRatingElement.style.setProperty('--rating', ratingValue);  // Dynamically update the --rating CSS variable

    // Set the equivalent numeric rating value
    let ratingValueElement = document.getElementById("shop-rating-equivalent-value");
    ratingValueElement.textContent = currencyToNormalFormat(`${ratingValue}`);  // Set the value to one decimal place

    // Now, populate the fields with the values from shopDetails
    document.querySelector("#service-and-more-shop-name").innerText = shopDetails.shop_name || "Laundry Shop Name";
    document.querySelector(".service-more-elements.opacity-75:nth-child(1)").innerText = `- ${shopDetails.shop_address}`;
    document.querySelector(".service-more-elements.opacity-75:nth-child(2)").innerText = `- ${shopDetails.contact_number}`;
    document.querySelector(".service-more-elements.opacity-75:nth-child(3) span").innerText = shopDetails.open_time ? convertTimeFormat(shopDetails.open_time) : "00:00 AM";
    document.querySelector(".service-more-elements.opacity-75:nth-child(4) span").innerText = shopDetails.close_time ? convertTimeFormat(shopDetails.close_time) : "00:00 PM";
    document.querySelector(".service-more-elements.opacity-75:nth-child(5) span").innerText = shopDetails.days_open || "Loading...";
    document.querySelector(".service-more-elements.opacity-75:nth-child(6) span").innerText = shopDetails.additional_schedule_details || "N/A";
    document.querySelector("#laundry-shoup-service-more-image").src = shopDetails.image_link != "null" ? shopDetails.image_link : "https://e0.pxfuel.com/wallpapers/239/798/desktop-wallpaper-question-mark-widescreen-cool-awesome-question-mark.jpg" ;
    let nocommentsandRatingsYet = document.getElementById('no-comments-and-ratings-yet')
    let ratingListContainer = document.getElementById('comment-list-container');
    // Helper function to convert 24-hour format to AM/PM
    function convertTimeFormat(time) {
        let [hours, minutes] = time.split(':');
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${period}`;
    }

    let currentPage = 1;  // Track the current page for pagination
    const commentsPerPage = 10; // Number of comments to fetch per request
    let isRatingLoading = false;  // Prevent multiple requests at once
    const ratingsUrl = "php-sql-controller/service-and-more-controller.php";
    const selectedShopId = shopDetails.shop_id;  // Assuming shopDetails is already defined with a shop_id
    
    // Function to create and append a rating card to the comment list container
    function createRatingCard(ratingData) {
        const ratingCard = document.createElement('div');
        ratingCard.className = 'card';
    
        ratingCard.innerHTML = `
            <h5 class="card-header">${ratingData.user_name}</h5>
            <div class="card-body">
                <h5 class="card-title">${ratingData.comment}</h5>
                <h6 class="Stars" style="--rating: ${ratingData.rate};" aria-label="Rating: ${ratingData.rate} out of 5 stars"></h6>
                <h6>${currencyToNormalFormat(`${ratingData.rate}`)}</h6>
                <p>${new Date(ratingData.rating_created_date).toLocaleString()}</p>
            </div>
        `;
    
        return ratingCard;
    }
    
    // Function to fetch ratings from the PHP backend
    function fetchRatingsForShop() {
        if (isRatingLoading) return;  // Exit if already loading ratings
        isRatingLoading = true;
    
        const ratingRequestData = {
            queryRatingFromShop: true,
            shop_id: selectedShopId,
            page: currentPage,
            limit: commentsPerPage
        };
    
        // Assuming dynamicSynchronousPostRequest sends a POST request and returns JSON data
        const ratingResponse = dynamicSynchronousPostRequest(ratingsUrl, ratingRequestData);
        const ratingResults = JSON.parse(ratingResponse);
    
        // Append each rating as a card to the container
        ratingResults.forEach(rating => {
            const ratingCard = createRatingCard(rating);
            ratingListContainer.appendChild(ratingCard);
        });
    
        // Increment the page count if ratings were loaded successfully
        if (ratingResults.length > 0) {
           
            ratingLength = ratingResults.length;
            currentPage++;
        }


        if(ratingLength > 0){
            if(ratingListContainer.classList.contains('d-none')){
                ratingListContainer.classList.remove('d-none')
            }

            if(!nocommentsandRatingsYet.classList.contains('d-none')){
                nocommentsandRatingsYet.classList.add('d-none')
            }
        }else{
            if(!ratingListContainer.classList.contains('d-none')){
                ratingListContainer.classList.add('d-none')
            }

            if(nocommentsandRatingsYet.classList.contains('d-none')){
                nocommentsandRatingsYet.classList.remove('d-none')
            }
        }
    
        isRatingLoading = false;  // Reset loading state
    }
    
    // Attach scroll event listener to the ratings container
    ratingListContainer.addEventListener('scroll', () => {
        if (ratingListContainer.scrollTop + ratingListContainer.clientHeight >= ratingListContainer.scrollHeight - 10) {
            fetchRatingsForShop();  // Load more ratings if scrolled near the bottom
        }
    });
    
    // Initial load of ratings
    fetchRatingsForShop();  // Load the first set of ratings on page load

    openTransactionCreationModal.addEventListener('click', function(){
        customerRate = false;
    })
    
}
else{
    window.location.href = 'home.php';
}

// event listener when the transaction creation modal show it the service also ge queried
backToCustomerForm.addEventListener('click', function(){
    // serviceContainer.innerHTML = '';
    // loadServicesForPage(page);

    $('#addCustomerModal').modal('show');
    $('#createTransactionMadal').modal('hide');
})

// event listener when the transaction creation modal show it the service also ge queried
backToServiceList.addEventListener('click', function(){
    // serviceContainer.innerHTML = '';
    // loadServicesForPage(page);

    $('#createTransactionMadal').modal('show');
    $('#selectOrderProductModal').modal('hide');



})

// event listener when the transaction creation modal show it the service also ge queried
backToServiceListNP.addEventListener('click', function(){
    // serviceContainer.innerHTML = '';
    // loadServicesForPage(page);

    $('#createTransactionMadal').modal('show');
    $('#transactionFinalization').modal('hide');
})

rateShopBTNVAr.addEventListener('click', function(){
    $('#addCustomerModal').modal('show');

    customerRate = true;
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
        dynamicFieldErrorMessage(laundrycustomerPhone.id, '');
        dynamicFieldErrorMessage(laundrycustomerPhone.id, 'Please input a valid Phone number.');
    }
    else {

        if(!validatePhPhone(laundrycustomerPhone.value)){
            isValid = false;
            dynamicFieldErrorMessage(laundrycustomerPhone.id, '');
            dynamicFieldErrorMessage(laundrycustomerPhone.id, 'The Phone number must be a Ph number and must start with 639, 09, or 9.');
        }
        else{
            dynamicFieldErrorMessage(laundrycustomerPhone.id, '');
        }

       
    }

    if(isValid){
        WaitigLoader(true)
        // laundryCustomerFormCloseBtn.click();

        laundrycustomerPhone.value = normalizePhoneNumber(laundrycustomerPhone.value);

        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            isForCustomer: true,
            firstName:laundrycustomerFirstName.value,
            lastName:laundrycustomerLastName.value,
            username:`${laundrycustomerFirstName.value}-${laundrycustomerLastName.value}-${generateRandomNumber(6)}`,
            password:generateRandomNumber(6),
            email:laundrycustomerEmail.value,
            phoneNumber:laundrycustomerPhone.value,
            address:laundrycustomerAddress.value
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {
            if(isValidJSON(response)){
               
                if(JSON.parse(response).newRecordId){
                    // dynamicAlertMessage('New Laundry Customer added successfully.', 'success', 3000);
                    globalNewCustomerId = JSON.parse(response).newRecordId;
                    sessionStorage.setItem('raterId', globalNewCustomerId);

                    serviceContainer.innerHTML = '';
                    loadServicesForPage(page);

                    if(customerRate){
                        $('#addCustomerModal').modal('hide');
                        $('#createTransactionMadal').modal('hide');
                        $('#rateShop').modal('show');
                    }
                    else{
                        $('#addCustomerModal').modal('hide');
                        $('#createTransactionMadal').modal('show');
                    }
                    // laundrycustomerFirstName.value = ''
                    // laundrycustomerLastName.value = ''
                    // laundrycustomerEmail.value = ''
                    // laundrycustomerPhone.value = ''
                    // laundrycustomerAddress.value = ''

                    WaitigLoader(false)
                }
                else
                {
                    let errorMessage = JSON.parse(response);
                    dynamicAlertMessage(errorMessage, 'error', 3000);
                    WaitigLoader(false)
                }
            }
            else{
                let errorMessage = 'Something went wrong please check your console for error logs';
                console.error(response);
                dynamicAlertMessage(errorMessage, 'error', 3000);
                WaitigLoader(false)
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            WaitigLoader(false)
        });

    }
   
})

// event listener for checkout
checkoutButton.addEventListener('click', (e) => {
    WaitigLoader(true)
    e.preventDefault(); // Prevent the default action of the button

    if (selectedProductIds.length === 0) {
        WaitigLoader(false)
        dynamicAlertMessage('Please select at least one product before proceeding to checkout.', 'warning', 3000)
    } else {

        let isValid = true;

            selectedProductIds.forEach((product) => {

            
                if(product.amount_per_stock == 0 || product.stock == 0){
                    dynamicAlertMessage("One or more selected product is out of stock.", 'error', 3000);
                    isValid = false;
                }

                if(product.quantity < 1){
                    product.quantity = product.amount_per_price;

                    if(product.order_measurement == 'Cup' && product.original_unit_measurement == 'Kg'){
                        product.quantity = convertKgToGramsAndCups(product.amount_per_price).cups;
                    }
                    else if(product.order_measurement == 'Grams' && product.original_unit_measurement == 'Kg'){
                        product.quantity = convertKgToGramsAndCups(product.amount_per_price).grams;
                    }
                }

                if(product.order_measurement == 'Kg' && product.original_unit_measurement == 'Kg'){
                    product.estimatedPrice = calculatePricePerKg(product.price, product.amount_per_price, product.quantity);
                }
                else if(product.order_measurement == 'Grams' && product.original_unit_measurement == 'Kg'){
                    product.estimatedPrice = calculateCostKiloGramToGram(product.price, product.quantity, product.amount_per_price);
                }
                else if(product.order_measurement == 'Cup' && product.original_unit_measurement == 'Kg'){
                    product.estimatedPrice = calculatCostKiloGramToCup(product.price, product.quantity, product.amount_per_price);
                }

                if(product.order_measurement == 'Grams' && product.original_unit_measurement == 'Grams'){
                    product.estimatedPrice = calculatePricePerGram(product.price, product.amount_per_price, product.quantity);
                }

                if(product.order_measurement == 'Cup' && product.original_unit_measurement == 'Cup'){
                    product.estimatedPrice = calculatePricePerCup(product.price, product.amount_per_price, product.quantity);
                }

                if(product.order_measurement == 'Ml' && product.original_unit_measurement == 'Ml'){
                    product.estimatedPrice = calculatePricePerMl(product.price, product.amount_per_price, product.quantity);
                }

                if(product.order_measurement == 'Sachet' && product.original_unit_measurement == 'Sachet'){
                    product.estimatedPrice = calculatePricePerSachet(product.price, product.amount_per_price, product.quantity);
                }

            });

           

            // Final validation check
            if (isValid) {
                WaitigLoader(false)
                // console.log('Proceeding to checkout with selected products:', selectedProductIds);
                $('#selectOrderProductModal').modal('hide')
                $('#transactionFinalization').modal('show')        
                
                finalizeTransactionFunction();

            }
            else{
                WaitigLoader(false)
            }

    }
});

// event listener to go back to product modal
backToProductModalBtn.addEventListener('click', (e) => {
    $('#selectOrderProductModal').modal('show')
    $('#transactionFinalization').modal('hide')

    selectedProductIds.forEach((product) => {

        const quantityInput = document.getElementById(`quantityInput${product.id}`);
        if(quantityInput.value.length < 1){
            
            quantityInput.value = product.quantity;
            product.quantity = product.quantity;

            if(product.order_measurement == 'Cup' && product.original_unit_measurement == 'Kg'){
                product.quantity = convertKgToGramsAndCups(product.amount_per_price).cups;
            }
            else if(product.order_measurement == 'Grams' && product.original_unit_measurement == 'Kg'){
                product.quantity = convertKgToGramsAndCups(product.amount_per_price).grams;
            }
        }
            
    //    try {
    //     const quantityInput = document.getElementById(`quantityInput${product.id}`);
    //     quantityInput.value = product.amount_per_price;

    //     if(product.order_measurement == 'Cup'){
    //         quantityInput.value = convertKgToGramsAndCups(product.amount_per_price).cups;
    //     }
    //     else if(product.order_measurement == 'Grams'){
    //         quantityInput.value = convertKgToGramsAndCups(product.amount_per_price).grams;
    //     }
    //    } catch (error) {
        
    //    }


    });
});

const checkCancelFinalize =  setInterval(function(){
    let cancelFinalize = document.getElementById('cancel-finalize');
    if(cancelFinalize){
        clearInterval(checkCancelFinalize)
        cancelFinalize.addEventListener('click', function(){
            $('#transactionFinalization').modal('show')
        })
    }
},100)

// event listener to check finalization of checkout
finalizeTransactionBtn.addEventListener('click', function(){
    calculateTransaction();
})

// Add event listeners for 'keydown' (for typing) and 'paste' events
clothesWeightInput.addEventListener('keydown', function(event) {
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
clothesWeightInput.addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, parentheses, and decimal points in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)\.]+$/;


    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});

// an event that convert the value of price input into a currency
clothesWeightInput.addEventListener('blur', function(e){

    if(e.target.value.length > 0){

        if(selectedServiceGlobalVar.unit_measurement == 'Kg'){
            e.target.value = currencyToNormalFormat(e.target.value)
        }
        else{
            e.target.value = integerConverter(e.target.value);
        }
    }
    
})

// event listener to confirm transaction 
const confirmTransactionCheck = setInterval(() => {
    let confirmTransaction = document.getElementById('confirm-transaction-now');
    
    if (confirmTransaction) {
        // Element exists, stop the interval
        clearInterval(confirmTransactionCheck);

        confirmTransaction.addEventListener('click', (e) => {
            WaitigLoader(true)

            const products = selectedProductIds;
            const discount = selectedDiscounts;
            let transactionId;

            console.log(products)

            console.log(selectedServiceGlobalVar.unit_measurement)

            const service = selectedServiceGlobalVar;
            const clothsWeight = currencyToNormalFormat(`${clothesWeightInput.value}`);
            const payable = estimatedPayable;
            const shop_id = sessionStorage.getItem('service_more_shop_id');
            const user_id = globalNewCustomerId;
            let transaction_name = `${laundrycustomerFirstName.value} ${laundrycustomerLastName.value}-${service.service_name}-Transaction`;

            if((service.unit_measurement == 'Kg' || service.unit_measurement == 'Pcs') && clothesWeightInput.value.length > 0){
                transaction_name = `${laundrycustomerFirstName.value} ${laundrycustomerLastName.value}-${service.service_name}-Transaction (${currencyToNormalFormat(`${clothesWeightInput.value}`)}${service.unit_measurement})`;
            }

            // insert transaction
            const url = "php-sql-controller/service-and-more-controller.php";
            const data = {
                insertTransaction: true,
                shop_id: shop_id,
                user_id: user_id,
                service_id: service.service_id,
                transaction_date: getPhilippineDateTime(),
                last_update_date: getPhilippineDateTime(),
                transaction_name: transaction_name,
                clothes_weight: clothsWeight,
                total: payable,
                initial: selectedServiceGlobalVar.price,
                transaction_status: 'Pending'
            };

            const detailsList = dynamicSynchronousPostRequest(url, data);

            if(isValidJSON(detailsList)){
                const details = JSON.parse(detailsList);
                // console.log('transaction => ', details)
                let status = details.status;
                if(status == 'success'){
                    transactionId = details.transaction_id
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


            //insert order product
            if(Object.keys(selectedProductIds).length > 0){
                let orderProductId;

                products.forEach((product) => {
                    const productId = product.id;
                    const orderName = product.product_name + ` (${formatToCurrency(`${product.price}`)})`;

                    const url = "php-sql-controller/service-and-more-controller.php";
                    const data = {
                        insertOrderProduct: true,
                        order_name: orderName,
                        transaction_id: transactionId,
                        product_id: productId,
                        order_date: getPhilippineDateTime(),
                        item_quantity: product.quantity,
                        unit_measurement: product.order_measurement,
                        estimatedPrice: product.estimatedPrice
                    };
        
                    const detailsList = dynamicSynchronousPostRequest(url, data);
        
                    if(isValidJSON(detailsList)){
                        const details = JSON.parse(detailsList);
                        // console.log('order => ', details)
                        let status = details.status;
                        if(status == 'success'){
                            orderProductId = details.order_products_id
                        }
                        else{
                            let message = details.message
                            dynamicAlertMessage(message, 'error', 3000);
                            WaitigLoader(false)
                        }
                    }
                    else{
                        console.error(detailsList);
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                        WaitigLoader(false)
                    }


                })

            }


            //insert discount if exist
            if (Object.keys(selectedDiscounts).length > 0) {

                let discountInserted = true;
                let message;

                discount.forEach((discount) => {
                    const discountId = discount.discount_id;

                    console.log(discountId)

                    const url = "php-sql-controller/service-and-more-controller.php";
                    const data = {
                        insertDiscountedTransaction: true,
                        transaction_id: transactionId,
                        discount_id: discountId,
                        discounted_transaction_status: 'Pending'
                    };
        
                    const detailsList = dynamicSynchronousPostRequest(url, data);
        
                    if(isValidJSON(detailsList)){
                        const details = JSON.parse(detailsList);
                        console.log('discounted transaction => ', details)
                        let status = details.status;
                        if(status != 'success'){
                            discountInserted = false;
                            message = details.message;
                            WaitigLoader(false)
                        }
                    }
                    else{
                        WaitigLoader(false)
                        console.error(detailsList);
                        discountInserted = false;
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                    }


                })

                if(discountInserted){
                    WaitigLoader(false)
                    dynamicAlertMessage('Transaction has been successfully processed.', 'success', 3000);

                    setTimeout(function(){
                        // window.location.reload();
                    },2000)
                }
                else{
                    WaitigLoader(false)
                    dynamicAlertMessage(message, 'error', 3000);
                }
                
            } else {
                WaitigLoader(false)
                dynamicAlertMessage('Transaction has been successfully processed.', 'success', 3000);
                setTimeout(function(){
                    window.location.reload();
                },2000)
            }

        })

    }
}, 100);

// finalize transaction
function finalizeTransactionFunction(){
    if(Object.keys(selectedProductIds).length > 0){

        document.getElementById('selected-product-container-label').classList.remove('d-none');

        if(Object.keys(selectedProductIds).length > 1 ){
            document.getElementById('selected-product-container-label').textContent = 'Selected Products';
        }
        else{
            document.getElementById('selected-product-container-label').textContent = 'Selected Product';
        }

        selectedProductsContainer.innerHTML = '';
        selectedProductIds.forEach((product) => {

            const productPrice = product.price;
            const productBrand = product.product_brand;
            const productImage = product.product_image;
            const productName = product.product_name;
            let productQuantity = product.quantity;

            if(product.order_measurement == 'Cup'){
                productQuantity = parseInt(productQuantity);
            }

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
                    <p>Price: ${formatToCurrency(productPrice)} (${product.amount_per_price}${product.original_unit_measurement.toUpperCase()})</p>
                    <p>Ordered Amount: ${productQuantity} ${product.order_measurement.toUpperCase()}</p> <!-- You can replace 1 with a dynamic value if needed -->
                    <p>Ordered Estimated Price: ${formatToCurrency(`${product.estimatedPrice}`)}</p>
                    </div>
                </div>
                </div>
            </div>
            `;

            // Insert the card into the selectedProductsContainer
            selectedProductsContainer.innerHTML += productCardHTML;

        }) 
    }
    else{
        document.getElementById('selected-product-container-label').classList.add('d-none');
    }

    document.getElementById('check-out-selected-service').textContent = selectedServiceGlobalVar.service_name
    document.getElementById('check-out-selected-service-description').textContent = selectedServiceGlobalVar.description
    document.getElementById('check-out-selected-service-price').textContent =  formatToCurrency(selectedServiceGlobalVar.price)

    if(selectedServiceGlobalVar.unit_measurement == 'Kg'){
        document.getElementById('esitimated-clothes-weight-label').textContent = `Estimated Clothes Weight (Kg)`
        clothesWeightInput.placeholder = `Estimated Clothes Weight (Kg)`
    }
    else{
        document.getElementById('esitimated-clothes-weight-label').textContent = `Estimated Clothes Quantity`
        clothesWeightInput.placeholder = `Estimated Clothes Quantity`
    }

    discountPage = 1; 
    discountContainer.innerHTML = ''; // Clear previous content if needed
    discountContainer.innerHTML = `
    <div class="d-flex justify-content-flex-start" id="empty-discount-identifier">
        <p>Shop does not have any discount yet.</p>
    </div>`;
    loadDiscounts();
}

// calculate transaction to finalize
function calculateTransaction(){
    
    if(transactionFinalizationValidation()){

        let summaryMessage = ``;

        // console.log(selectedServiceGlobalVar)

        let clothesQuantityWeightVal = clothesWeightInput.value;

        summaryMessage +=`Service Calculation Summary:\n`
        if(selectedServiceGlobalVar.unit_measurement == 'N/A' && (selectedServiceGlobalVar.service_load == 0 || selectedServiceGlobalVar.service_load == '0')){
            summaryMessage += `${selectedServiceGlobalVar.service_name} (${selectedServiceGlobalVar.service_type}): ${formatToCurrency(`${selectedServiceGlobalVar.price}`)}\n`;
        }
        else{
            summaryMessage += `${selectedServiceGlobalVar.service_name} (${selectedServiceGlobalVar.service_type}): ${formatToCurrency(`${selectedServiceGlobalVar.price}`)} (${currencyToNormalFormat(`${selectedServiceGlobalVar.service_load}`)}${selectedServiceGlobalVar.unit_measurement.toUpperCase()})\n`;
        }
        if(clothesWeightInput.value.length < 1){
            if(selectedServiceGlobalVar.unit_measurement == 'Kg'){
                clothesQuantityWeightVal = 1;
            }
            else{
                clothesQuantityWeightVal = 10;
            }
        }


        if(selectedServiceGlobalVar.unit_measurement == 'Kg'){
            summaryMessage += `${clothesWeightInput.placeholder}: ${currencyToNormalFormat(`${clothesQuantityWeightVal}`)}KG\n`;
        }
        else if(selectedServiceGlobalVar.unit_measurement == 'Pcs'){
            summaryMessage += `${clothesWeightInput.placeholder}: ${clothesQuantityWeightVal}PCS\n`;
        }


        let totalServiceCost = calculatePricePerKg(selectedServiceGlobalVar.price, selectedServiceGlobalVar.service_load, clothesQuantityWeightVal);
        if(selectedServiceGlobalVar.unit_measurement == 'N/A' && (selectedServiceGlobalVar.service_load == 0 || selectedServiceGlobalVar.service_load == '0')){
            totalServiceCost = selectedServiceGlobalVar.price;
        }
        summaryMessage += `Service Total Cost: ${formatToCurrency(`${totalServiceCost}`)}`;
        // console.log('singleItemPrice = ', selectedServiceGlobalVar)

        const singleItemPrice = totalServiceCost;
        let subtotal = singleItemPrice;

        // console.log('selectedProductIds : ', selectedProductIds)

        if(Object.keys(selectedProductIds).length > 0){
            
            summaryMessage += `\n\nProduct Calculation Summary: \n`;
            let totalProductPrice = selectedProductIds.reduce((total, product, index) => {
                summaryMessage += `${product.product_name} ${formatToCurrency(`${product.estimatedPrice}`)}`;
                // Add "+" only if it's not the last product
                if (index < selectedProductIds.length - 1) {
                    summaryMessage += " +\n";
                }
            
                return total + product.estimatedPrice;
            }, 0);
            summaryMessage += `\nTotal: ${formatToCurrency(`${totalProductPrice}`)}`;

            // Calculate subtotal
            subtotal = singleItemPrice + totalProductPrice;
            summaryMessage += `\n\nService Total Cost: ${formatToCurrency(`${selectedServiceGlobalVar.price}`)} +\n`;
            summaryMessage += `Product Total Cost: ${formatToCurrency(`${totalProductPrice}`)}`
            summaryMessage += `\nTotal Cost (Without Discount): ${formatToCurrency(`${subtotal}`)}`;
        }
        
       

        // Initialize discount variables
        let discount1 = selectedDiscounts[0] ? parseFloat(selectedDiscounts[0].discount_percent) / 100 : null;
        let discount2 = selectedDiscounts[1] ? parseFloat(selectedDiscounts[1].discount_percent) / 100 : null;

        // console.log('discount1 = ' +discount1);
        // console.log('discount2 = ' +discount2);

        // Check if the first discount is present, else alert and stop
        if (discount1 !== null) {

            summaryMessage += `\n\nDiscount Calculation Summary:\n`
            // Apply the first discount
            let afterFirstDiscount = subtotal * (1 - discount1);
            summaryMessage += `Discount 1: ${formatToCurrency(`${subtotal}`)} * (1 - ${discount1})\n`
            subtotal = afterFirstDiscount
            summaryMessage += `Total (Discount 1): ${formatToCurrency(`${subtotal}`)}`
           

            // Check if the second discount is present
            if (discount2 !== null) {
                // Apply the second discount to the result of the first discount
                let finalPrice = afterFirstDiscount * (1 - discount2);
                summaryMessage += `\nDiscount 2: ${formatToCurrency(`${subtotal}`)} * (1 - ${discount2})\n`
                subtotal = finalPrice
                summaryMessage += `Total (Discount 2): ${formatToCurrency(`${subtotal}`)}`
               
            }
        }

        summaryMessage += `\n\nOverall Total Payable: ${formatToCurrency(`${subtotal}`)}`;
        console.log(summaryMessage);
        document.getElementById('summary-message').value = summaryMessage
        estimatedPayable = currencyToNormalFormat(`${subtotal}`);
        console.log('estimatedPayable : '+ estimatedPayable)
        $('#finalize-transaction-confirm-modal').modal('show');
        $('#transactionFinalization').modal('hide')
    }

}

// function to load all services from a shop
function loadServicesForPage(pageNumber) {
    const data = { queryServices: true, page: pageNumber, shop_id:sessionStorage.getItem('service_more_shop_id') };

    const response = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', data);
    const result = JSON.parse(response);
    const services = result.services;
    const totalPages = result.totalPages;
    serviceContainer.innerHTML = ''; // Clear previous services

    if (services.length > 0) {
        moreServicesAvailable = true; // Reset flag if services are found
        services.forEach(service => {

            let perAmount = '';
            if(service.unit_measurement != 'N/A'){
                
                let serviceLoad = service.service_load;

                if(service.unit_measurement == 'Kg' || service.unit_measurement == 'Cup'){
                    serviceLoad = currencyToNormalFormat(service.service_load)
                }

                perAmount = ` (${serviceLoad}${service.unit_measurement.toUpperCase()})`;
            }

            const serviceItem = document.createElement('div');
            serviceItem.classList.add('col-md-4');
            serviceItem.innerHTML = `
                <div class="card  d-flex flex-column">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" id="service_name_${service.service_id}">${service.service_name}</h5>
                        <p class="card-text opacity-75" id="service_description_${service.service_id}">Description: ${service.description || 'No description available'}</p>
                        <span class="card-text opacity-75" id="service_price_${service.service_id}">Price: ${formatToCurrency(service.price)}${perAmount}</span>
                        <span class="card-text opacity-75" id="service_type_${service.service_id}">Type: ${service.service_type}</span>
                        <div class="d-grid gap-2 mt-3">
                            <button class="btn btn-primary" id="select-service-btn-${service.service_id}" type="button">Select Service</button>
                        </div>
                    </div>
                </div>`;

            serviceContainer.appendChild(serviceItem);

            // Add event listener to "Select Service" button
            document.getElementById(`select-service-btn-${service.service_id}`).addEventListener('click', () => {

                loadAndSelectProduct(service)
                
            });
        });
    } else {
        // No services for this page
        moreServicesAvailable = false; // Set flag to false if no services are available
        if(!servicePagination.classList.contains('d-none')){
            servicePagination.classList.add('d-none')
            emptyServiceIdentifier.classList.remove('d-none')
        }
    }

    updatePagination(pageNumber, totalPages); // Pass total pages to updatePagination
}

// function to update the pahination
function updatePagination(currentPage, totalPages) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''; // Clear existing pagination

    const startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

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
            loadServicesForPage(currentPage - 1);
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
            page = i;
            loadServicesForPage(page); // Load services for the clicked page
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
        if (currentPage < totalPages) {
            loadServicesForPage(currentPage + 1);
        }
    });
    nextItem.appendChild(nextLink);
    pagination.appendChild(nextItem);
}

// function to load and for selecting product for the selected service
function loadAndSelectProduct(service){

    const serviceType = service.service_type;
    selectedServiceGlobalVar = service;

    if(['Fold', 'Dry', 'Package' ].includes(serviceType)){
        selectedProductIds = [];

        if(!backToProductModalBtn.classList.contains('d-none')){
            backToProductModalBtn.classList.add('d-none')
        }

        if(backToServiceListNP.classList.contains('d-none')){
            backToServiceListNP.classList.remove('d-none')
        }

        $('#selectOrderProductModal').modal('hide')
        $('#createTransactionMadal').modal('hide')
        $('#transactionFinalization').modal('show')  

        finalizeTransactionFunction();
          
    }
    else{

        if(backToProductModalBtn.classList.contains('d-none')){
            backToProductModalBtn.classList.remove('d-none')
        }

        if(!backToServiceListNP.classList.contains('d-none')){
            backToServiceListNP.classList.add('d-none')
        }
        
        $('#createTransactionMadal').modal('hide')
        $('#selectOrderProductModal').modal('show')
        productPage = 1; 
        productListContainer.innerHTML = '';
    
        // console.log('service : ', service   )
    
        loadProductsForCurrentPage(productPage)
    }


}

// Function to load products for the given page
function loadProductsForCurrentPage(pageNumber) {
    const productRequestData = {
        queryProducts: true,
        currentPage: pageNumber,
        shop_id: sessionStorage.getItem('service_more_shop_id')
    };

    const productResponse = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', productRequestData);
    const parsedResponse = JSON.parse(productResponse);

    const productsArray = parsedResponse.products;
    const totalProductPages = parsedResponse.totalPages;
    productListContainer.innerHTML = ''; // Clear existing product cards

    if (productsArray.length > 0) {
        areMoreProductsAvailable = true; // Reset flag if products are found
        productsArray.forEach(product => {
            let bgColor = 'success';
            if(parseInt(product.quantity) <= 20){
                bgColor = 'warning';
            }

            if(parseInt(product.quantity) <= 10){
                bgColor = 'danger';
            }
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4');

            let optionList = `
            <option value="Kg">KG</option>
            <option value="Ml">ML</option>
            <option value="Cup">CUP</option>
            <option value="Grams">GRAMS</option>
            <option value="Sachet">SACHET</option>
            `

            if(product.unit_measurement.includes('Kg')){
                optionList = `<option value="Kg">KG</option>
                <option value="Cup">CUP</option>
                <option value="Grams">GRAMS</option>`
            }
            else if(product.unit_measurement.includes('Ml'))[
                optionList = `
                <option value="Ml">ML</option>
                `
            ]
            else if(product.unit_measurement.includes('Grams'))[
                optionList = `
                <option value="Grams">GRAMS</option>
                `
            ]
            else if(product.unit_measurement.includes('Cup'))[
                optionList = `
                <option value="Cup">CUP</option>
                `
            ]
            else if(product.unit_measurement.includes('Sachet'))[
                optionList = `
                <option value="Sachet">SACHET</option>
                `
            ]

            productCard.innerHTML = `
                <div class="card d-flex flex-column">
                    <div class="overflow-hidden shadow-sm" style="height: 300px;">
                        <img src="${product.image_link}" class="card-img-top" alt="${product.product_name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.product_name}</h5>
                        <p class="card-text opacity-75">Brand: ${product.product_brand}</p>
                        <p class="card-text opacity-75">Type: ${product.product_type}</p>
                        <p class="card-text opacity-75">Price: ${formatToCurrency(product.price)} (${product.amount_per_price}${product.unit_measurement.toUpperCase()})</p>
                        <p class="card-text opacity-75 ">Stock: <span class="text-${bgColor}">${product.quantity}</span></p>
                        <p class="card-text opacity-75">Amount per Stock: ${product.amount_per_stock}${product.unit_measurement.toUpperCase()}</p>
                        <div class="d-flex flex-column gap-3">
                            
                            <!-- Unit of Measurement -->
                            <div class="">
                                <label for="order_measurement${product.product_id}" class="form-label">Unit of Measurement</label>
                                    <select id="order_measurement${product.product_id}" class="form-select form-select" aria-label=".form-select-sm example" >
                                        ${optionList}
                                    </select>
                                <div id="order_measurement${product.product_id}-error-feedback" class="invalid-feedback">
                                </div>
                            </div>

                            <div class="">
                                <label for="quantityInput${product.product_id}" id="quantityInputLabel${product.product_id}" class="form-label">Order Amount per ${product.unit_measurement.toUpperCase()}</label>
                                <input type="number" placeholder="Order Amount per ${product.unit_measurement.toUpperCase()}" class="form-control me-2" id="quantityInput${product.product_id}"  min="1">
                                <div id="quantityInput${product.product_id}-error-feedback" class="invalid-feedback">
                                </div>
                            </div>

                            <label style="min-width:50px; width:auto; max-width:500px;" type="button" class="btn btn-info d-flex justify-content-center flex-row-reverse gap-2 text-white" for="productSelect${product.product_id}">
                                <input class="form-check-input" type="checkbox" value="${product.product_id}" id="productSelect${product.product_id}" ${selectedProductIds.some(item => item.id === product.product_id) ? 'checked' : ''}>
                                <span id="product-check-label${product.product_id}">${selectedProductIds.some(item => item.id === product.product_id) ? 'Selected' : 'Select'}</span>
                            </label>
                        </div>
                    </div>
                </div>`;

            productListContainer.appendChild(productCard);

            productServiceName.textContent = selectedServiceGlobalVar.service_name;

            // Add event listener for the checkbox to track selections
            const checkbox = document.getElementById(`productSelect${product.product_id}`);
            const quantityInput = document.getElementById(`quantityInput${product.product_id}`);
            const order_measurement_field = document.getElementById(`order_measurement${product.product_id}`);
            const quantityInputLabel = document.getElementById(`quantityInputLabel${product.product_id}`);

            // Restore quantity if the product is already selected
            const selectedProduct = selectedProductIds.find(item => item.id === product.product_id);
            if (selectedProduct) {
                quantityInput.value = selectedProduct.quantity; // Restore previous quantity
                order_measurement_field.value = selectedProduct.order_measurement; // Restore previous quantity

                if(quantityInput.value.length > 0 && order_measurement_field.value != 'Sachet'){
                    quantityInput.value =  currencyToNormalFormat(quantityInput.value)
                }
                else{
                    quantityInput.value = integerConverter(quantityInput.value)
                }
            }

            quantityInputLabel.textContent = `Order Amount per ${order_measurement_field.value.toUpperCase()}`
            quantityInput.placeholder = `Order Amount per ${order_measurement_field.value.toUpperCase()}`

            order_measurement_field.addEventListener('change', function(){

                if(quantityInput.value.length > 0  && order_measurement_field.value != 'Sachet'){
                    quantityInput.value =  currencyToNormalFormat(quantityInput.value)
                }
                else{
                    quantityInput.value = integerConverter(quantityInput.value)
                }

                quantityInputLabel.textContent = `Order Amount per ${order_measurement_field.value.toUpperCase()}`
                quantityInput.placeholder = `Order Amount per ${order_measurement_field.value.toUpperCase()}`
            })

            // Update selection when checkbox is changed
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const quantity = quantityInput.value; // Get quantity from input
                    const order_measurement = order_measurement_field.value;
                    selectedProductIds.push(
                        { id: product.product_id,
                          stock:product.quantity,
                          quantity: quantity,
                          order_measurement: order_measurement,
                          original_unit_measurement: product.unit_measurement,
                          product_name: product.product_name, 
                          amount_per_price:product.amount_per_price,
                          amount_per_stock:product.amount_per_stock,
                          product_type: product.product_type,
                          product_image: product.image_link,
                          product_brand: product.product_brand,
                          price: product.price
                        }); // Store product ID and quantity
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Selected';
                } else {
                    selectedProductIds = selectedProductIds.filter(item => item.id !== product.product_id); // Remove product from selection
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Select';
                }
            });

            // Add event listener to update quantity when input value changes
            quantityInput.addEventListener('input', () => {
                const quantity = quantityInput.value; // Get the updated quantity
                const selectedProduct = selectedProductIds.find(item => item.id === product.product_id); // Find the selected product

                if (selectedProduct) {
                    selectedProduct.quantity = quantity; // Update the quantity in the selectedProductIds array
                }
            });

            quantityInput.addEventListener('blur', () => {

                if(quantityInput.value.length > 0 && order_measurement_field.value != 'Sachet'){
                    quantityInput.value =  currencyToNormalFormat(quantityInput.value)
                }
                else{
                    quantityInput.value = integerConverter(quantityInput.value)
                }
            });
            
            order_measurement_field.addEventListener('input', () => {
                const order_measurement = order_measurement_field.value; // Get the updated quantity
                const selectedProduct = selectedProductIds.find(item => item.id === product.product_id); // Find the selected product

                if (selectedProduct) {
                    selectedProduct.order_measurement = order_measurement; // Update the quantity in the selectedProductIds array
                }
                
            });
        });
    } else {
        // No products found for this page
        areMoreProductsAvailable = false; // Update flag if no products are found
        if (!productPaginationElement.classList.contains('d-none')) {
            productPaginationElement.classList.add('d-none');
            noProductsMessage.classList.remove('d-none');
        }
    }

    updateProductPagination(pageNumber, totalProductPages); // Update the pagination display
}

// Function to update product pagination
function updateProductPagination(currentProductPage, totalProductPages) {
    const paginationContainer = document.querySelector('#product-pagination-ui');
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const startProductPage = Math.max(1, currentProductPage - Math.floor(maxDisplayProductPages / 2));
    const endProductPage = Math.min(totalProductPages, startProductPage + maxDisplayProductPages - 1);

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
            loadProductsForCurrentPage(currentProductPage - 1);
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
            productPage = i;
            loadProductsForCurrentPage(productPage); // Load products for the clicked page
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
            loadProductsForCurrentPage(currentProductPage + 1);
        }
    });
    nextProductItem.appendChild(nextProductLink);
    paginationContainer.appendChild(nextProductItem);
}

// Function to load discounts
function loadDiscounts() {
    const shopId = sessionStorage.getItem('service_more_shop_id');
    const data = { queryDiscounts: true, page: discountPage, shop_id: shopId };
    const emptyDiscountIdentifier = document.getElementById('empty-discount-identifier');
    const response = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', data);

    if (isValidJSON(response)) {
        const discounts = JSON.parse(response);

        if(Object.keys(discounts).length > 0){

            discounts.forEach(discount => {
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
                                    <label class="btn btn-info d-flex justify-content-center gap-2 text-white" style="width:100px;">
                                        <input class="form-check-input" type="checkbox" value="${discount.discount_id}" 
                                            id="selectedDiscountInput${discount.discount_id}" 
                                            onclick='toggleDiscountSelection(${JSON.stringify(discount)})'>
                                        <span>Select</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                discountContainer.insertAdjacentHTML('beforeend', discountCardHTML);
    
                // Restore selection state from sessionStorage
                if (selectedDiscounts.some(d => d.discount_id === discount.discount_id)) {
                    document.getElementById(`selectedDiscountInput${discount.discount_id}`).checked = true;
                }
            });
    
            discountPage++;

            if(!emptyDiscountIdentifier.classList.contains('d-none')){
                emptyDiscountIdentifier.classList.add('d-none')
            }
    
        }

    } else {
        console.error(response);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
    }
}

// Function to toggle discount selection
function toggleDiscountSelection(discount) {
    const existingIndex = selectedDiscounts.findIndex(d => d.discount_id === discount.discount_id);

    if (existingIndex > -1) {
        selectedDiscounts.splice(existingIndex, 1);
    } else {
        if (selectedDiscounts.length >= 2) {
            dynamicAlertMessage('You can only select up to two discounts.', 'warning', 3000);
            document.getElementById(`selectedDiscountInput${discount.discount_id}`).checked = false;
            return;
        }
        selectedDiscounts.push(discount);
    }

    // Store updated selectedDiscounts in sessionStorage
    sessionStorage.setItem('selectedDiscounts', JSON.stringify(selectedDiscounts));
    console.log('Selected Discounts:', selectedDiscounts);
}

// Scroll event listener for infinite scroll
discountContainer.addEventListener('scroll', () => {
    if (discountContainer.scrollTop + discountContainer.clientHeight >= discountContainer.scrollHeight - 50) {
        loadDiscounts();
    }
});

// transaction finalozation validation
function transactionFinalizationValidation(){
    let isValid = true;

    // validation using dynamic error message
    // if(clothesWeightInput.value.length < 1){
    //     isValid = false;
    //     dynamicFieldErrorMessage(clothesWeightInput.id, 'Please input a valid clothes weight.');
    // }
    // else {
    //     dynamicFieldErrorMessage(clothesWeightInput.id, '');
    // }

    if(!isValid){
        dynamicAlertMessage('Please complete additional requirements before finalizing checkout.', 'warning', 3000);
    }

    return isValid;
}






