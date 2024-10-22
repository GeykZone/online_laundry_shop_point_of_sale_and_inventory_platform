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
                        <p class="card-text opacity-75" id="service_price_${service.service_id}">Price: $${service.price}</p>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" id="select-service-btn-${service.service_id}" type="button">Select Service</button>
                        </div>
                    </div>
                </div>`;

            serviceContainer.appendChild(serviceItem);

            // Add event listener to "Select Service" button
            document.getElementById(`select-service-btn-${service.service_id}`).addEventListener('click', () => {

                loadAndSelectProduct(service.service_id)
                
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
                        <p class="card-text opacity-75">Price: $${product.price}</p>
                        <p class="card-text opacity-75">Quantity: ${product.quantity}</p>
                        <div class="d-grid col-6">
                            <label style="min-width:50px; width:auto; max-width:500px;" type="button" class=" btn btn-info d-flex justify-content-center flex-row-reverse gap-2 text-white" for="productSelect${product.product_id}">
                                <input class="form-check-input " type="checkbox" value="${product.product_id}" id="productSelect${product.product_id}" ${selectedProductIds.includes(product.product_id) ? 'checked' : ''}>
                                <span id="product-check-label${product.product_id}">${selectedProductIds.includes(product.product_id) ? 'Selected' : 'Select'}</span>
                            </label>
                        </div>
                    </div>
                </div>`;

            productListContainer.appendChild(productCard);

            // Add event listener for the checkbox to track selections
            const checkbox = document.getElementById(`productSelect${product.product_id}`);
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedProductIds.push(product.product_id);
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Selected'
                } else {
                    selectedProductIds = selectedProductIds.filter(id => id !== product.product_id);
                    document.getElementById(`product-check-label${product.product_id}`).textContent = 'Select'
                }

                // console.log('selectedProductIds => ' + selectedProductIds)
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





