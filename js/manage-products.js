dynamicHeaderLowerText('manage-owner.php', 'Manage Owner', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let productImageUpload = document.getElementById(`product-image-upload`);
let productImagePreview = document.getElementById(`product-image-preview`);
let productImagePreviewContainer = document.getElementById(`product-image-preview-container`);
let productImageRemoveBtn = document.getElementById(`product-image-remove-btn`);
let submitLaundryShopProductBtn = document.getElementById('submit-laundry-shop-product-btn');
let createLaundryShopProductBtn = document.getElementById('create-laundry-shop-product-btn');
let updateProduct = false;
let productStatusContainer = document.getElementById('product-status-container');
let productImageUploadContainer = document.getElementById('product-image-upload-container');
let productName = document.getElementById('product-name');
let productBrand = document.getElementById('product-brand');
let productPrice = document.getElementById('product-price');
let productQuantity = document.getElementById('product-quantity');
let productStatus =  document.getElementById('product-status');
let productListTable = document.getElementById('product-list-table');
let productListTableVar;
manageServiceMoreSessionStorage(false, false);


// event listner to select an image from file storage
productImageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Check if the file type is an image
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
            // Show error if the file is not an image
            
            dynamicFieldErrorMessage(productImageUpload.id, 'Please upload a valid image Type.');

            productImagePreview.style.display = 'none';
            productImageRemoveBtn.style.display = 'none';
            productImageUpload.value = ''; // Clear the input field
            return;
        }

        // Hide the error and show the preview
        dynamicFieldErrorMessage(productImageUpload.id, '');
        const reader = new FileReader();
        reader.onload = function(e) {
            productImagePreview.src = e.target.result;
            productImagePreview.style.display = 'block';
            productImageRemoveBtn.style.display = 'none';
        }
        reader.readAsDataURL(file);
    } else {
        productImagePreview.style.display = 'none';
        productImageRemoveBtn.style.display = 'none';
    }
});

// Remove the image when clicking on the remove button
productImageRemoveBtn.addEventListener('click', function() {
    productImagePreview.src = '';
    productImagePreview.style.display = 'none';
    productImageRemoveBtn.style.display = 'none';
    productImageUpload.value = ''; // Clear the input field
});

// Show the remove button when hovering over the image
productImagePreviewContainer.addEventListener('mouseover', function() {
    productImageRemoveBtn.style.display = 'block';
});

// Hide the remove button when not hovering over the image
productImagePreviewContainer.addEventListener('mouseout', function() {
    productImageRemoveBtn.style.display = 'none';
});

// event for opening modal of laundry shop creation
createLaundryShopProductBtn.addEventListener('click', function(){

    // Select the container where the button will be added
    const container = document.getElementById('submit-laundry-shop-product-update-container');
    container.innerHTML = '';

    if(!productStatusContainer.classList.contains('d-none')){
        productStatusContainer.classList.add('d-none')
        
        if(!productImageUploadContainer.classList.contains('col-md-12')){
            productImageUploadContainer.classList.add('col-md-12')
            productImageUploadContainer.classList.remove('col-md-6')
        }
    }

    if(updateProduct){

        // serviceNameInput.value = ""
        // serviceDescriptionInput.value = ""
        // servicePriceInput.value = ""

        updateProduct = false;

    }

    if(submitLaundryShopProductBtn.classList.contains('d-none')){
        submitLaundryShopProductBtn.classList.remove('d-none');
    }

})

// an event for submitting the newly created product
submitLaundryShopProductBtn.addEventListener('click', function(){

    let isValid = true

    // Product Name
    if(productName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(productName.id, 'Please Input a valid Product Name.');
    }
    else {
        dynamicFieldErrorMessage(productName.id, '');
    }

    // Product Brand
    if(productBrand.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(productBrand.id, 'Please Input a valid Product Brand.');
    }
    else {
        dynamicFieldErrorMessage(productBrand.id, '');
    }

    // Product Price
    if(productPrice.value.length < 1 || !isValidCurrency(productPrice.value)){
        isValid = false;
        dynamicFieldErrorMessage(productPrice.id, 'Please input a valid Laundry Shop Product Price.');
    }
    else {
        dynamicFieldErrorMessage(productPrice.id, '');
    }

    // Product Quantity
    if(productQuantity.value.length < 1 ||  parseInt(productQuantity.value) < 1){
        isValid = false;
        dynamicFieldErrorMessage(productQuantity.id, 'Please Input a valid Product Quantity.');
    }
    else {
        dynamicFieldErrorMessage(productQuantity.id, '');
    }


    // Product Image
    if(productImageUpload.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(productImageUpload.id, 'Please upload a valid Product Image.');
    }
    else {
        dynamicFieldErrorMessage(productImageUpload.id, '');
    }


    if(isValid){
        let imageLink;
        if(productImageUpload.value.length > 0) {
            WaitigLoader(true)

            const file = productImageUpload.files[0];
            if (file) {
                imageLink =  uploadFileToFirebase(file).then((e)=>{

                    imageLink = e;

                    if (!imageLink.includes("Error uploading file:")) {
                       
                        const url = "php-sql-controller/manage-products-controller.php";
                        const data = {
                            productName: productName.value,
                            productBrand: productBrand.value,
                            productPrice: currencyToNormalFormat(productPrice.value),
                            productQuantity: productQuantity.value,
                            imageLink: imageLink,
                            shop_id: sessionStorage.getItem('sessionShopId'),
                            submitLaundryShopProduct: true,
                        };
                    
                        const queriedList = dynamicSynchronousPostRequest(url, data);

                        if(isValidJSON(queriedList)){
                            let jsonQueriedValue = JSON.parse(queriedList)

                            if(jsonQueriedValue.insert_id && jsonQueriedValue.insert_id.length != 0){
                                // let service_id = jsonQueriedValue.insert_id
                                dynamicAlertMessage('A Product has been successfully added.', 'success', 3000);
                                $('#addLaundryShopProduct').modal('hide');

                                productName.value = '';
                                productBrand.value = '';
                                productPrice.value = '';
                                productQuantity.value = '';
                                productImageUpload.value = '';
                                productImagePreview.src = '';
                                productImagePreview.style.display = 'none';
                                productImageRemoveBtn.style.display = 'none';

                                WaitigLoader(false)

                                if(productListTableVar){
                                    productListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                                }
                            }
                            else{
                                WaitigLoader(false)
                                let errorMessage = jsonQueriedValue.error;
                                dynamicAlertMessage(errorMessage, 'error', 3000);
                            }
                        }
                        else{
                            WaitigLoader(false)
                            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                            console.error(queriedList)
                        }
                    }

                });
            }

        }

    }

})

// an event that convert the value of price input into a currency
productPrice.addEventListener('blur', function(e){

    if(e.target.value.length > 0){
        e.target.value = formatToCurrency(e.target.value)
    }
    
})

// an event that convert the value of price input into a currency
productQuantity.addEventListener('blur', function(e){

    if(e.target.value.length > 0){
        e.target.value = integerConverter(e.target.value)
    }
    
})

// to initialize the list of service table
if(productListTable){
    function laundryShopRequiermentsTable(){

        var ajax_url = "php-sql-controller/manage-products-controller.php";
        let tableParamValue = {
            shop_id: sessionStorage.getItem('sessionShopId'),
            showLaundryProductList: true
        }


        if ( ! $.fn.DataTable.isDataTable(`#${productListTable.id}`) ) { // check if data table is already exist
        
            productListTableVar = $(`#${productListTable.id}`).DataTable({
      
            
            "deferRender": true,
            "serverSide": true,
            "ajax": {
                url: ajax_url,
                data: tableParamValue,
                "dataSrc": function ( json ) {
                return json.data;
              }      
              
            },
            order: [[1,'asc']],
            
            responsive: true,
            fixedHeader: true,
            searching: true, // Disable default server-side search
            dom: 'Blfrtip',
            pageLength : 10,
            buttons: [
                {
                    extend: 'excel',
                    text: 'Export Excel',
                    className: 'export-excel-btn',
                    title: 'Laundry Shop Product List',
                    exportOptions: {
                        // Specify columns to be included (0 to 8 in this case)
                        columns: function (idx, data, node) {
                            // Include columns 0 to 8
                            return idx >= 2  && idx <= 5;
                        }
                      }
                  }
              ],

            "lengthMenu": [[5, 10, 20, 50, 100], [5, 10, 20, 50, 100]],
        
            //disable the sorting of colomn
              "columnDefs": [ {
              "targets": 0,
              "orderable": false
              } ],
        
              "language": {
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoFiltered":""
              },
        
            "columns": [
             {
                "targets": 0,
                "render": function ( data, type, row, meta ) {

                    let actionButton;
                    actionButton = `<button type="button" onClick="updateLaundryProduct('${row}')" class="btn btn-primary text-white" >Edit</button>`
                    return actionButton;
                            
                },
                
              },
              {
                "targets": 0,
                "render": function ( data, type, row, meta ) {

                    let actionButton;
                    actionButton = `
                    <div class="rounded-3 overflow-hidden shadow" style="width: 50px;">
                    <img src="${row[1]}" alt="Image Preview" style="width: 50px; height: 50px; object-fit: cover;">
                    </div>`
                    return actionButton;
                            
                },
              },
              null,
              null,
              null,
              null,
              null
            ],
          });    
        }

    }
    laundryShopRequiermentsTable();

    if(productListTable){

        let navBtnContainer = document.getElementById('nav-btn-container');
        let dataTableButtons = document.querySelector('.dt-buttons');
        let navfilterContainer = document.getElementById('nav-search-container');
        let dataTablefilter = document.querySelector('.dataTables_filter');
        let dataTableInfo = document.querySelector('.dataTables_info');
        let dataTablePaginate = document.querySelector('.dataTables_paginate');
        let dataTableLength = document.querySelector('.dataTables_length');
        let navFooterContainer = document.getElementById('nav-footer-container');

        if (navBtnContainer && dataTableButtons) {
            navBtnContainer.appendChild(dataTableButtons);
            let excelBtn = dataTableButtons.querySelector('.buttons-excel');
            excelBtn.classList.add('btn','btn-primary', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2');
            if(excelBtn.classList.contains('dt-button')){
                excelBtn.classList.remove('dt-button');
            }
        }

        if (dataTablefilter && navfilterContainer && dataTableLength) {
            navfilterContainer.appendChild(dataTableLength);
            navfilterContainer.appendChild(dataTablefilter);
            
            let dataTablefilterLabel = dataTablefilter.querySelector('label');
            if(dataTablefilterLabel){
                let searchInput = dataTablefilterLabel.querySelector('input');
                searchInput.classList.add('form-control');
                searchInput.placeholder = 'Search';
    
                dataTablefilterLabel.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE && child.nodeValue.includes('Search:')) {
                        child.remove();
                    }
                });
            }
    
    
            // Select the label element
            let labelElement = dataTableLength.querySelector('label');
    
            // If the label element exists, loop through its child nodes
            if (labelElement) {
                labelElement.querySelector('select').classList.add('form-select')
                labelElement.childNodes.forEach(child => {
                    // Check if it's a text node and if it contains 'Show' or 'entries'
                    if (child.nodeType === Node.TEXT_NODE && (child.nodeValue.includes('Show') || child.nodeValue.includes('entries'))) {
                        child.remove();  // Remove the text node
                    }
                });
            }
        }

        if (navFooterContainer && dataTableInfo && dataTablePaginate) {
            navFooterContainer.appendChild(dataTableInfo);
            navFooterContainer.appendChild(dataTablePaginate);
        }
        

    }

}

// to show more details of laundry shop
function updateLaundryProduct(row) { 
    
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["id", "image_link", "product_name", "product_brand", "quantity", "price", "product_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    const product_id = jsonObj.id;
    const image_link = jsonObj.image_link;
    const product_name = jsonObj.product_name;
    const product_brand = jsonObj.product_brand
    const quantity = jsonObj.quantity
    const price = jsonObj.price
    const product_status = jsonObj.product_status
    

    productName.value = product_name;
    productBrand.value = product_brand;
    productPrice.value = price;
    productQuantity.value = quantity;
    productImagePreview.src = image_link;
    productStatus.value = product_status;
    productImagePreview.style.display = 'block';
    productImageRemoveBtn.style.display = 'none';

    // Select the container where the button will be added
    const container = document.getElementById('submit-laundry-shop-product-update-container');
    container.innerHTML = '';

    // Define the button HTML as a string
    const buttonHTML = `<button id="edit-laundry-shop-product-btn${product_id}" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">Update Service</button>
    `;

    if(!submitLaundryShopProductBtn.classList.contains('d-none')){
        submitLaundryShopProductBtn.classList.add('d-none');
    }

    // Insert the button into the container
    container.insertAdjacentHTML('beforeend', buttonHTML);

    const buttonId = document.getElementById(`edit-laundry-shop-product-btn${product_id}`)

    if(buttonId){
        buttonId.addEventListener('click', function(){

            let isValid = true

            // Product Name
            if(productName.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(productName.id, 'Please Input a valid Product Name.');
            }
            else {
                dynamicFieldErrorMessage(productName.id, '');
            }

            // Product Brand
            if(productBrand.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(productBrand.id, 'Please Input a valid Product Brand.');
            }
            else {
                dynamicFieldErrorMessage(productBrand.id, '');
            }

            // Product Price
            if(productPrice.value.length < 1 || !isValidCurrency(productPrice.value)){
                isValid = false;
                dynamicFieldErrorMessage(productPrice.id, 'Please input a valid Laundry Shop Product Price.');
            }
            else {
                dynamicFieldErrorMessage(productPrice.id, '');
            }

            // Product Quantity
            if(productQuantity.value.length < 1 ||  parseInt(productQuantity.value) < 1){
                isValid = false;
                dynamicFieldErrorMessage(productQuantity.id, 'Please Input a valid Product Quantity.');
            }
            else {
                dynamicFieldErrorMessage(productQuantity.id, '');
            }

            // Product Status
            if(productStatus.value.length < 1 && updateProduct){
                isValid = false;
                dynamicFieldErrorMessage(productStatus.id, 'Please Select a valid Laundry Shop Service Status.');
            }
            else {
                dynamicFieldErrorMessage(productStatus.id, '');
            }

            if(isValid){
                let imageLink;

                const url = "php-sql-controller/manage-products-controller.php";
                const data = {};

                // Dynamically add properties if they are not null, empty, or blank
                if (productName.value) {
                    data.productName = productName.value;
                }

                if (productStatus.value) {
                    data.productStatus = productStatus.value;
                }

                if (productBrand.value) {
                    data.productBrand = productBrand.value;
                }

                if (productPrice.value) {
                    data.productPrice = currencyToNormalFormat(productPrice.value);
                }

                if (productQuantity.value) {
                    data.productQuantity = productQuantity.value;
                }

                data.shop_id = sessionStorage.getItem('sessionShopId');
                data.submitLaundryShopProduct = true;
                data.product_id = product_id;

                WaitigLoader(true)

                if(productImageUpload.value.length > 0) {

                    const file = productImageUpload.files[0];
                    if (file) {
                        imageLink =  uploadFileToFirebase(file).then((e)=>{

                            imageLink = e;

                            if (!imageLink.includes("Error uploading file:")) {
                            
                                if (imageLink) {
                                    data.imageLink = imageLink;
                                }

                                const queriedList = dynamicSynchronousPostRequest(url, data);
                                if(isValidJSON(queriedList)){
                                    let jsonQueriedValue = JSON.parse(queriedList)

                                    if(jsonQueriedValue.message && jsonQueriedValue.message.length != 0){
                                        dynamicAlertMessage(jsonQueriedValue.message, 'success', 3000);
                                        $('#addLaundryShopProduct').modal('hide');

                                        productName.value = '';
                                        productBrand.value = '';
                                        productPrice.value = '';
                                        productQuantity.value = '';
                                        productImageUpload.value = '';
                                        productImagePreview.src = '';
                                        productImagePreview.style.display = 'none';
                                        productImageRemoveBtn.style.display = 'none';

                                        WaitigLoader(false)

                                        if(productListTableVar){
                                            productListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                                        }
                                    }
                                    else{
                                        WaitigLoader(false)
                                        let errorMessage = jsonQueriedValue.error;
                                        dynamicAlertMessage(errorMessage, 'error', 3000);
                                    }
                                }
                                else{
                                    WaitigLoader(false)
                                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                                    console.error(queriedList)
                                }
                            }

                        });
                    }

                }
                else{

                    const queriedList = dynamicSynchronousPostRequest(url, data);
                    if(isValidJSON(queriedList)){
                        let jsonQueriedValue = JSON.parse(queriedList)

                        if(jsonQueriedValue.message && jsonQueriedValue.message.length != 0){
                            dynamicAlertMessage(jsonQueriedValue.message, 'success', 3000);
                            $('#addLaundryShopProduct').modal('hide');

                            productName.value = '';
                            productBrand.value = '';
                            productPrice.value = '';
                            productQuantity.value = '';
                            productImageUpload.value = '';
                            productImagePreview.src = '';
                            productImagePreview.style.display = 'none';
                            productImageRemoveBtn.style.display = 'none';

                            WaitigLoader(false)

                            if(productListTableVar){
                                productListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                            }
                        }
                        else{
                            WaitigLoader(false)
                            let errorMessage = jsonQueriedValue.error;
                            dynamicAlertMessage(errorMessage, 'error', 3000);
                        }
                    }
                    else{
                        WaitigLoader(false)
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                        console.error(queriedList)
                    }

                }

            }
            
        })
    }

    // console.log(jsonObj)
    updateProduct = true;
    if(productStatusContainer.classList.contains('d-none')){
        productStatusContainer.classList.remove('d-none')
    }
    $('#addLaundryShopProduct').modal('show');

}