dynamicHeaderLowerText('service-and-more.php', 'Service and More', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let ratingInput = document.getElementById('rating-input');
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
let estimatedPayable;

// confirm transaction
dynamicConfirmationMessage( 
    {
        modalId : 'finalize-transaction-confirm-modal',
        modalText : '<span class="fa-solid fa-right-from-bracket"></span> Transaction Confirmation',
        otherButtonId : 'confirm-transaction-now',
        otherButtonText : 'Confirm Transaction',
        customBodyContent : `<div class=" d-flex flex-row gap-3 justify-content-center align-items-center">
        
        <h5> Your estimated payable amount is <span id="confirmMessagePayblleAmount"></span>. Please note that this amount may change based on staff review of your eligibility for payment criteria. </h5>

        </div>`
    }
)

// // an event listener for rating input field
// ratingInput.addEventListener('input', function () {
//     const rating = parseFloat(this.value);

//     if (ratingInput.value.length > 0 && (isNaN(rating) || rating < 0 || rating > 5)) {
//         dynamicFieldErrorMessage('rating-input', "Rating must be between 0 and 5.")
//     } else {
//         dynamicFieldErrorMessage('rating-input', "")
//     }
// });

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
        requirement_status: sessionStorage.getItem('service_more_requirement_status')
    };

    console.log(shopDetails.image_link)

    // Now, populate the fields with the values from shopDetails
    document.querySelector("#service-and-more-shop-name").innerText = shopDetails.shop_name || "Laundry Shop Name";
    document.querySelector(".service-more-elements.opacity-75:nth-child(1)").innerText = `- ${shopDetails.shop_address}`;
    document.querySelector(".service-more-elements.opacity-75:nth-child(2)").innerText = `- ${shopDetails.contact_number}`;
    document.querySelector(".service-more-elements.opacity-75:nth-child(3) span").innerText = shopDetails.open_time ? convertTimeFormat(shopDetails.open_time) : "00:00 AM";
    document.querySelector(".service-more-elements.opacity-75:nth-child(4) span").innerText = shopDetails.close_time ? convertTimeFormat(shopDetails.close_time) : "00:00 PM";
    document.querySelector(".service-more-elements.opacity-75:nth-child(5) span").innerText = shopDetails.days_open || "Loading...";
    document.querySelector(".service-more-elements.opacity-75:nth-child(6) span").innerText = shopDetails.additional_schedule_details || "N/A";
    document.querySelector("#laundry-shoup-service-more-image").src = shopDetails.image_link != "null" ? shopDetails.image_link : "https://cdn-icons-png.freepik.com/512/4992/4992668.png" ;

    // Helper function to convert 24-hour format to AM/PM
    function convertTimeFormat(time) {
        let [hours, minutes] = time.split(':');
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${period}`;
    }
    
}
else{
    window.location.href = 'home.php';
}

// event listener when the transaction creation modal show it the service also ge queried
openTransactionCreationModal.addEventListener('click', function(){
    serviceContainer.innerHTML = '';
    loadServicesForPage(page);
})

// event listener for checkout
checkoutButton.addEventListener('click', (e) => {
    WaitigLoader(true)
    e.preventDefault(); // Prevent the default action of the button

    if (selectedProductIds.length === 0) {
        WaitigLoader(false)
        dynamicAlertMessage('Please select at least one product before proceeding to checkout.', 'warning', 3000)
    } else {


        if (selectedProductIds.some(product => parseInt(product.quantity, 10) === 0)) {
            dynamicAlertMessage("One or more selected products have a quantity of 0.", 'error', 3000);
            WaitigLoader(false)
        } else {

            let isValid = true;
            let errorMessage;

            selectedProductIds.forEach((product) => {
                const productId = product.id;
                const productQuantity = product.quantity;

                const url = "php-sql-controller/service-and-more-controller.php";
                const data = {
                    productId: productId,
                    productQuantity: productQuantity,
                    verifyQuantity: true,
                };

                // Synchronous request to check quantity from the database
                const detailsList = dynamicSynchronousPostRequest(url, data);

                if (isValidJSON(detailsList)) {
                    const details = JSON.parse(detailsList);

                    // Check if the queried quantity is less than the requested productQuantity
                    if (details.quantity < productQuantity) {
                        isValid = false;
                        errorMessage = `Insufficient stock for Product ID ${productId}. Requested: ${productQuantity}, Available: ${details.quantity}`;
                    }
                } else {
                    isValid = false;
                    console.error(detailsList);
                    errorMessage = 'Something went wrong. Please see the error logs for additional information.';
                }
            });

            // Final validation check
            if (isValid) {
                
                console.log('Proceeding to checkout with selected products:', selectedProductIds);
                $('#selectOrderProductModal').modal('hide')
                $('#transactionFinalization').modal('show')
        
                // id
                // quantity
                // product_name
                // product_image
        
                
                if(Object.keys(selectedProductIds).length > 0){
                    WaitigLoader(false)
        
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
                        selectedProductsContainer.innerHTML += productCardHTML;
        
                    }) 
        
                    document.getElementById('check-out-selected-service').textContent = selectedServiceGlobalVar.service_name
                    document.getElementById('check-out-selected-service-description').textContent = selectedServiceGlobalVar.description
                    document.getElementById('check-out-selected-service-price').textContent =  formatToCurrency(selectedServiceGlobalVar.price)
        
                }
        
                discountPage = 1; 
                discountContainer.innerHTML = ''; // Clear previous content if needed
                discountContainer.innerHTML = `
                <div class="d-flex justify-content-flex-start" id="empty-discount-identifier">
                    <p>Shop does not have any discount yet.</p>
                </div>`;
                loadDiscounts();

            }
            else{
                WaitigLoader(false)
                dynamicAlertMessage(errorMessage, 'error', 3000); 
            }

        }

    }
});

// event listener to go back to product modal
backToProductModalBtn.addEventListener('click', (e) => {
    $('#selectOrderProductModal').modal('show')
    $('#transactionFinalization').modal('hide')
});

// event listener to check finalization of checkout
finalizeTransactionBtn.addEventListener('click', function(){

    if(transactionFinalizationValidation()){
        
        // console.log(`service : `,selectedServiceGlobalVar,` \n product: `,selectedProductIds,` \n discounts: `,selectedDiscounts,``)

        // Define initial prices
        const singleItemPrice = parseFloat(selectedServiceGlobalVar.price);
        // console.log('singleItemPrice = '+singleItemPrice)

        const totalProductPrice = selectedProductIds.reduce((total, product) => {
            return total + parseFloat(product.price) * parseInt(product.quantity, 10);
        }, 0);
        // console.log('totalProductPrice = '+totalProductPrice)

        // Calculate subtotal
        let subtotal = singleItemPrice + totalProductPrice;
        // console.log('singleItemPrice + totalProductPrice = '+ subtotal)

        // Initialize discount variables
        let discount1 = selectedDiscounts[0] ? parseFloat(selectedDiscounts[0].discount_percent) / 100 : null;
        let discount2 = selectedDiscounts[1] ? parseFloat(selectedDiscounts[1].discount_percent) / 100 : null;

        // console.log('discount1 = ' +discount1);
        // console.log('discount2 = ' +discount2);

        // Check if the first discount is present, else alert and stop
        if (discount1 !== null) {
            // Apply the first discount
            let afterFirstDiscount = subtotal * (1 - discount1);
            console.log('afterFirstDiscount = ' +afterFirstDiscount)
            subtotal = afterFirstDiscount

            // Check if the second discount is present
            if (discount2 !== null) {
                // Apply the second discount to the result of the first discount
                let finalPrice = afterFirstDiscount * (1 - discount2);
                console.log('afterFirstDiscount = ' +finalPrice)
                subtotal = finalPrice
            }
        }

        document.getElementById('confirmMessagePayblleAmount').textContent = formatToCurrency(`${subtotal}`)
        estimatedPayable = subtotal;
        $('#finalize-transaction-confirm-modal').modal('show');
        $('#transactionFinalization').modal('hide')
        console.log('Toatal = ' + subtotal); 
    }

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
            let orderProductId;

            const service = selectedServiceGlobalVar;
            const clothsWeight = clothesWeightInput.value;
            const payable = estimatedPayable;
            const shop_id = sessionStorage.getItem('service_more_shop_id');
            const user_id = userId;
            const transaction_name = `${userUserName} - ${service.service_name} - Transaction`;

            // insert transaction
            const url = "php-sql-controller/service-and-more-controller.php";
            const data = {
                insertTransaction: true,
                shop_id: shop_id,
                user_id: user_id,
                service_id: service.service_id,
                transaction_date: getPhilippineDateTime(),
                transaction_name: transaction_name,
                clothes_weight: clothsWeight,
                total: payable,
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
            if(transactionId){

                products.forEach((product) => {
                    const productId = product.id;
                    const orderName = product.product_name + ' - ' + product.product_brand;

                    const url = "php-sql-controller/service-and-more-controller.php";
                    const data = {
                        insertOrderProduct: true,
                        order_name: orderName,
                        transaction_id: transactionId,
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
            if(orderProductId){

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
                            window.location.reload();
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
                

            }

        })

    }
}, 100);

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
            const serviceItem = document.createElement('div');
            serviceItem.classList.add('col-md-4');
            serviceItem.innerHTML = `
                <div class="card  d-flex flex-column">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" id="service_name_${service.service_id}">${service.service_name}</h5>
                        <p class="card-text opacity-75" id="service_description_${service.service_id}">Description: ${service.description || 'No description available'}</p>
                        <p class="card-text opacity-75" id="service_price_${service.service_id}">Price: ${formatToCurrency(service.price)}</p>
                        <div class="d-grid gap-2">
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
    $('#createTransactionMadal').modal('hide')
    $('#selectOrderProductModal').modal('show')
    productPage = 1; 
    productListContainer.innerHTML = '';
    selectedServiceGlobalVar = service;

    loadProductsForCurrentPage(productPage)

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
                            <input type="number" class="form-control me-2" id="quantityInput${product.product_id}" value="1" min="1" style="width: 70px;">
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

            // Restore quantity if the product is already selected
            const selectedProduct = selectedProductIds.find(item => item.id === product.product_id);
            if (selectedProduct) {
                quantityInput.value = selectedProduct.quantity; // Restore previous quantity
            }

            // Update selection when checkbox is changed
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const quantity = quantityInput.value; // Get quantity from input
                    selectedProductIds.push(
                        { id: product.product_id,
                          quantity: quantity,
                          product_name: product.product_name, 
                          product_image: product.image_link,
                          product_brand: product.product_brand,
                          price: product.price
                        }); // Store product ID and quantity
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Selected';
                } else {
                    selectedProductIds = selectedProductIds.filter(item => item.id !== product.product_id); // Remove product from selection
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Select';
                }

                // Log selectedProductIds for debugging
                // console.log('selectedProductIds => ' + JSON.stringify(selectedProductIds));
            });

            // Add event listener to update quantity when input value changes
            quantityInput.addEventListener('input', () => {
                const quantity = quantityInput.value; // Get the updated quantity
                const selectedProduct = selectedProductIds.find(item => item.id === product.product_id); // Find the selected product

                if (selectedProduct) {
                    selectedProduct.quantity = quantity; // Update the quantity in the selectedProductIds array
                }
                
                // Log selectedProductIds for debugging
                // console.log('selectedProductIds => ' + JSON.stringify(selectedProductIds));
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
    const response = dynamicSynchronousPostRequest('php-sql-controller/service-and-more-controller.php', data);

    if (isValidJSON(response)) {
        const discounts = JSON.parse(response);

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
                                <label class="btn btn-info d-flex justify-content-center gap-2 text-white">
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

function transactionFinalizationValidation(){
    let isValid = true;

    // validation using dynamic error message
    if(clothesWeightInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(clothesWeightInput.id, 'Please input a valid Laundry Shop Service Name.');
    }
    else {
        dynamicFieldErrorMessage(clothesWeightInput.id, '');
    }

    if(!isValid){
        dynamicAlertMessage('Please complete additional requirements before finalizing checkout.', 'warning', 3000);
    }

    return isValid;
}






