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
let productType = document.getElementById('product-type');
let product_measurement = document.getElementById('product_measurement');
let amount_per_stock = document.getElementById('amount_per_stock');
let amount_per_price = document.getElementById('amount_per_price');
let productListTable = document.getElementById('product-list-table');
let productLogsContainerField = document.getElementById('product-logs-table-container');
let productListTableVar;
let productLogsTable = document.getElementById('product-logs-table');
let productLogsTableVar;
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

    if(!document.getElementById('subtract-stock').classList.contains('d-none')){
        document.getElementById('subtract-stock').classList.add('d-none')
    }

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

        productName.value = '';
        productBrand.value = '';
        productPrice.value = '';
        productQuantity.value = '';
        productImageUpload.value = '';
        productImagePreview.src = '';
        productImagePreview.style.display = 'none';
        productImageRemoveBtn.style.display = 'none';
        productType.value = 'Powder'
        product_measurement.value = 'Kg'
        amount_per_stock.value = ''
        amount_per_price.value = ''

        updateProduct = false;

    }

    productQuantity.disabled = false;

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

    if((productType.value == 'Powder' && product_measurement.value != 'Kg' && product_measurement.value != 'Grams' && product_measurement.value != 'Cup') || 
    (productType.value == 'Liquid' && product_measurement.value != 'Ml' && product_measurement.value != 'Sachet')){
        isValid = false;
        dynamicFieldErrorMessage(product_measurement.id,  `Invalid unit measurement for ${productType.value} type.`);
        dynamicFieldErrorMessage(productType.id, `Invalid Type for ${product_measurement.value} unit measurement.`);
    }
    else {
        dynamicFieldErrorMessage(productType.id, '');
        dynamicFieldErrorMessage(product_measurement.id, '');
    }


    if(amount_per_stock.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(amount_per_stock.id, 'Please input a valid Laundry Shop Product Amount per Stock.');
    }
    else {
        dynamicFieldErrorMessage(amount_per_stock.id, '');
    }


    if(amount_per_price.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(amount_per_price.id, 'Please input a valid Laundry Shop Product Amount per Price.');
    }
    else {
        dynamicFieldErrorMessage(amount_per_price.id, '');
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
                            productType: productType.value,
                            product_measurement: product_measurement.value,
                            amount_per_stock: amount_per_stock.value,
                            amount_per_price:amount_per_price.value,
                            productPrice: currencyToNormalFormat(productPrice.value),
                            productQuantity: productQuantity.value,
                            imageLink: imageLink,
                            shop_id: sessionStorage.getItem('sessionShopId'),
                            submitLaundryShopProduct: true,
                        };

                        let logMessage = `Product Nam: ${productName.value}`;
                            logMessage += `\nProduct Brand: ${productBrand.value}`;
                            logMessage += `\nProduct Type: ${productType.value}`;
                            logMessage += `\nProduct Unit of Measurement: ${product_measurement.value}`;
                            logMessage += `\nProduct Amount per Stock: ${amount_per_stock.value}`;
                            logMessage += `\nProduct Amount per Price: ${amount_per_price.value}`;
                            logMessage += `\nProduct Price: ${formatToCurrency(productPrice.value)}`;
                            logMessage += `\nProduct Stock: ${productQuantity.value}`;
                    
                        const queriedList = dynamicSynchronousPostRequest(url, data);

                        if(isValidJSON(queriedList)){
                            let jsonQueriedValue = JSON.parse(queriedList)

                            if(jsonQueriedValue.insert_id && jsonQueriedValue.insert_id.length != 0){
                                
                                const url = "php-sql-controller/common-controller.php";
                                let data = {
                                    saveLog: true,
                                    product_id: jsonQueriedValue.insert_id,
                                    userid: userId,
                                    saveLogDetails: `New Product Inserted:\n` + logMessage,
                                };
                                const detailsList = dynamicSynchronousPostRequest(url, data);
                                if(isValidJSON(detailsList)){
                                    const details = JSON.parse(detailsList);
                                    // console.log('transaction => ', details)
                                    let status = details.status;
                                    if(status == 'success'){
                                        
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

                                        if(productLogsTableVar){
                                            productLogsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                                        }

                                    }
                                    else{
                                        let message = details.message
                                        // WaitigLoader(false)
                                        dynamicAlertMessage(message, 'error', 3000);
                                        WaitigLoader(false)
                                    }
                                }
                                else{
                                    console.error(detailsList);
                                    // WaitigLoader(false)
                                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                                    WaitigLoader(false)
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

// conver to float
amount_per_stock.addEventListener('blur', function(e){

    if(e.target.value.length > 0 && product_measurement.value != 'Sachet'){
        e.target.value =  currencyToNormalFormat(e.target.value)
    }
    else{
        e.target.value = integerConverter(e.target.value)
    }
    
})

// conver to float
amount_per_price.addEventListener('blur', function(e){

    if(e.target.value.length > 0 && product_measurement.value != 'Sachet'){
        e.target.value =  currencyToNormalFormat(e.target.value)
    }
    else{
        e.target.value = integerConverter(e.target.value)
    }
    
})

// an event that convert the value of price input into a currency
productQuantity.addEventListener('blur', function(e){

    if(e.target.value.length > 0){
        e.target.value = integerConverter(e.target.value)
    }
    
})

// product measurement field event change
product_measurement.addEventListener('change', function(e){

    if(amount_per_stock.value.length > 0 && e.target.value != 'Sachet'){
        amount_per_stock.value =  currencyToNormalFormat(amount_per_stock.value)
    }
    else{
        amount_per_stock.value = integerConverter(amount_per_stock.value)
    }


    if(amount_per_price.value.length > 0 && e.target.value != 'Sachet'){
        amount_per_price.value =  currencyToNormalFormat(amount_per_price.value)
    }
    else{
        amount_per_price.value = integerConverter(amount_per_price.value)
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
            
            responsive: false,
            fixedHeader: true,
            searching: true, // Disable default server-side search
            dom: 'Blfrtip',
            pageLength : 5,
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
                            return idx >= 2  && idx <= 10;
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
                "render": function ( data, type, row, meta ) {

                    // Serialize the row object to JSON and escape it for HTML
                    const serializedRow = encodeURIComponent(JSON.stringify(row));

                    let actionButton;
                    actionButton = `<button type="button" onClick="updateLaundryProduct('${serializedRow}')" class="btn btn-primary text-white" >Edit</button>`
                    return actionButton;
                            
                },
                
              },
              {
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
              {
                "render": function ( data, type, row, meta ) {

                    if( row[5] != 'Sachet'){
                        return currencyToNormalFormat(`${data}`); 
                    }
                    else{
                        return integerConverter(data);
                    }
                            
                },
              },
              {
                "render": function ( data, type, row, meta ) {

                    let actionButton;
                    let bgColor = 'success';

                    if(parseInt(data) <= 20){
                        bgColor = 'warning';
                    }

                    if(parseInt(data) <= 10){
                        bgColor = 'danger';
                    }
                    actionButton = `<h6 class=" text-${bgColor}">${data}</h6>`
                    return actionButton;
                            
                },
              },
              null,
              {
                "render": function ( data, type, row, meta ) {

                    if( row[5] != 'Sachet'){
                        return currencyToNormalFormat(`${data}`); 
                    }
                    else{
                        return integerConverter(data);
                    }
                            
                },
              },
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

if(productLogsTable){
    function productLogsTableTable(){

        var ajax_url = "php-sql-controller/manage-products-controller.php";
        let tableParamValue = {
            shop_id: sessionStorage.getItem('sessionShopId'),
            showLaundryProductLogs: true
        }


        if ( ! $.fn.DataTable.isDataTable(`#${productLogsTable.id}`) ) { // check if data table is already exist
        
            productLogsTableVar = $(`#${productLogsTable.id}`).DataTable({
      
            
            "deferRender": true,
            "serverSide": true,
            "ajax": {
                url: ajax_url,
                data: tableParamValue,
                "dataSrc": function ( json ) {
                return json.data;
              }      
              
            },
            order: [[2,'desc']],
            
            responsive: false,
            fixedHeader: true,
            searching: true, // Disable default server-side search
            dom: 'Blfrtip',
            pageLength : 5,
            buttons: [
                {
                    extend: 'excel',
                    text: 'Export Excel',
                    className: 'export-excel-btn',
                    title: 'Laundry Shop Product Logs',
                    exportOptions: {
                        // Specify columns to be included (0 to 8 in this case)
                        columns: function (idx, data, node) {
                            // Include columns 0 to 8
                            return idx >= 0  && idx <= 3;
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
                null,
                null,
                null,
                {
                    "render": function ( data, type, row, meta ) {
    
                        return `<textarea disabled class="border-0 shadow-sm w-100 bg-light p-3 text-secondary" name="" id="summary-message">${data}</textarea>

                        <style>
                        textarea#summary-message {
                            min-height: 150px;
                            max-height: 500px;
                          }
                        </style>`
                                
                    },
                }
            ],
          });    
        }

    }
    productLogsTableTable();


    if(productLogsContainerField){
        let navBtnContainer = document.getElementById('xnav-btn-container');
        let dataTableButtons = productLogsContainerField.querySelector('.dt-buttons');
        let navfilterContainer = document.getElementById('xnav-search-container');
        let dataTablefilter = productLogsContainerField.querySelector('.dataTables_filter');
        let dataTableInfo = productLogsContainerField.querySelector('.dataTables_info');
        let dataTablePaginate = productLogsContainerField.querySelector('.dataTables_paginate');
        let dataTableLength = productLogsContainerField.querySelector('.dataTables_length');
        let navFooterContainer = document.getElementById('xnav-footer-container');

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

function addStock() {
    const stockField = document.getElementById("product-quantity");

    // Parse the value as a number, default to 0 if it's not a valid number
    let currentStock = parseInt(stockField.value, 10) || 0;

    // Increment the stock value by 1
    currentStock += 1;

    // Update the input field value
    stockField.value = currentStock;
}

document.getElementById("add-stock").addEventListener("click", addStock);

let subtractStockEvent = false;

// to show more details of laundry shop
function updateLaundryProduct(row) { 

    if(document.getElementById('subtract-stock').classList.contains('d-none')){
        document.getElementById('subtract-stock').classList.remove('d-none')
    }


    
    // Given string
    let str = row;

    productImageUpload.value = '';

    productQuantity.disabled = true;

    // Split the string into an array
    let values = JSON.parse(decodeURIComponent(row));

    // Define the keys for the JSON object
    let keys = ["id", "image_link", "product_name", "product_brand", "product_type", "unit_measurement", "amount_per_stock", "quantity", "price", "amount_per_price", "product_status"];

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
    const product_type = jsonObj.product_type
    const unit_measurement = jsonObj.unit_measurement
    const amount_per_stock_field = jsonObj.amount_per_stock
    const amount_per_price_field = jsonObj.amount_per_price;
    const stockField = document.getElementById("product-quantity");
    if(!subtractStockEvent){
      

        document.getElementById('subtract-stock').addEventListener('click', function(e){
            if(parseInt(stockField.value) > parseInt(quantity)){

                // Parse the value as a number, default to 0 if it's not a valid number
                let currentStock = parseInt(stockField.value, 10) || 0;
            
                // Increment the stock value by 1
                currentStock -= 1;
            
                // Update the input field value
                stockField.value = currentStock;

            }
        })

        subtractStockEvent = true;
    }

     // Old values
     let oldValues = {
         image: jsonObj.image_link,
         productName: jsonObj.product_name,
         brand: jsonObj.product_brand,
         type: jsonObj.product_type,
         unitMeasurement: jsonObj.unit_measurement,
         amountPerStock: jsonObj.amount_per_stock,
         quantity: jsonObj.quantity,
         price: jsonObj.price,
         amountPerPrice: jsonObj.amount_per_price,
         productStatus: jsonObj.product_status,
     };

    productName.value = product_name;
    productBrand.value = product_brand;
    productPrice.value = price;
    productQuantity.value = quantity;
    productImagePreview.src = image_link;
    productStatus.value = product_status;
    productImagePreview.style.display = 'block';
    productImageRemoveBtn.style.display = 'none';
    productType.value = product_type
    product_measurement.value = unit_measurement
    amount_per_stock.value = amount_per_stock_field
    amount_per_price.value = amount_per_price_field

    if(amount_per_stock.value.length > 0 && product_measurement.value != 'Sachet'){
        amount_per_stock.value =  currencyToNormalFormat(amount_per_stock.value)
    }
    else{
        amount_per_stock.value = integerConverter(amount_per_stock.value)
    }

    if(amount_per_price.value.length > 0 && product_measurement.value != 'Sachet'){
        amount_per_price.value =  currencyToNormalFormat(amount_per_price.value)
    }
    else{
        amount_per_price.value = integerConverter(amount_per_price.value)
    }

    if(amount_per_stock_field == 0 || amount_per_stock_field == '0'){
        amount_per_stock.value = ''
    }

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

            if((productType.value == 'Powder' && product_measurement.value != 'Kg' && product_measurement.value != 'Grams' && product_measurement.value != 'Cup') || 
            (productType.value == 'Liquid' && product_measurement.value != 'Ml' && product_measurement.value != 'Sachet')){
                isValid = false;
                dynamicFieldErrorMessage(product_measurement.id,  `Invalid unit measurement for ${productType.value} type.`);
                dynamicFieldErrorMessage(productType.id, `Invalid Type for ${product_measurement.value} unit measurement.`);
            }
            else {
                dynamicFieldErrorMessage(productType.id, '');
                dynamicFieldErrorMessage(product_measurement.id, '');
            }
        
        
            if(amount_per_stock.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(amount_per_stock.id, 'Please input a valid Laundry Shop Product Amount per Stock.');
            }
            else {
                dynamicFieldErrorMessage(amount_per_stock.id, '');
            }


            if(amount_per_price.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(amount_per_price.id, 'Please input a valid Laundry Shop Product Amount per Price.');
            }
            else {
                dynamicFieldErrorMessage(amount_per_price.id, '');
            }
        

            if(isValid){
                WaitigLoader(true)
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

                if (productType.value) {
                    data.productType = productType.value;
                }


                if (product_measurement.value) {
                    data.product_measurement = product_measurement.value;
                }


                if (amount_per_stock.value) {
                    data.amount_per_stock = amount_per_stock.value;
                }

                if (amount_per_price.value) {
                    data.amount_per_price = amount_per_price.value;
                }

                data.shop_id = sessionStorage.getItem('sessionShopId');
                data.submitLaundryShopProduct = true;
                data.product_id = product_id;

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

                                        if(productListTableVar){
                                            productListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                                        }

                                        if(productLogsTableVar){
                                            productLogsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                                        }

                                        // New values
                                        const newValues = {
                                            image: imageLink,
                                            productName: productName.value,
                                            brand: productBrand.value,
                                            type: productType.value,
                                            unitMeasurement: product_measurement.value,
                                            amountPerStock: amount_per_stock.value,
                                            quantity: productQuantity.value,
                                            price: productPrice.value,
                                            amountPerPrice: amount_per_price.value,
                                            productStatus: productStatus.value,
                                        };

                                        // Labels for changes
                                        const labels = {
                                            image: "Image",
                                            productName: "Product Name",
                                            brand: "Brand",
                                            type: "Type",
                                            unitMeasurement: "Unit of Measurement",
                                            amountPerStock: "Amount per Stock",
                                            quantity: "Stock",
                                            price: "Price",
                                            amountPerPrice: "Amount per Price",
                                            productStatus: "Product Status",
                                        };

                                        // String to store the changes in receipt-like format
                                        let changeDetail = "";

                                        // Compare old and new values
                                        Object.keys(oldValues).forEach((key) => {
                                            if (newValues[key] !== "") {
                                                const oldValue = oldValues[key];
                                                const newValue = newValues[key];
                                        
                                                // Handle numeric comparison
                                                const isNumber = !isNaN(oldValue) && !isNaN(newValue);
                                                const valuesAreEqual = isNumber
                                                    ? parseFloat(oldValue) === parseFloat(newValue)
                                                    : oldValue === newValue;
                                        
                                                if (!valuesAreEqual) {
                                                    // Add change detail with explicit control of formatting
                                                    changeDetail += `${labels[key]}:\n`;
                                                    changeDetail += `Old Value: ${oldValue.trim()}\n`;
                                                    changeDetail += `New Value: ${newValue.trim()}\n\n`;
                                                }
                                            }
                                        });
                                        

                                        const url = "php-sql-controller/common-controller.php";
                                        let data = {
                                            saveLog: true,
                                            product_id: product_id,
                                            userid: userId,
                                            saveLogDetails: "Changes detected:\n" + changeDetail,
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
                                            }
                                        }
                                        else{
                                            console.error(detailsList);
                                            // WaitigLoader(false)
                                            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                                        }


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
                                        productType.value = 'Powder'
                                        product_measurement.value = 'Kg'
                                        amount_per_stock.value = ''
                                        amount_per_price.value = ''

                                        WaitigLoader(false)


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

                            oldValues = {
                                productName: jsonObj.product_name,
                                brand: jsonObj.product_brand,
                                type: jsonObj.product_type,
                                unitMeasurement: jsonObj.unit_measurement,
                                amountPerStock: jsonObj.amount_per_stock,
                                quantity: jsonObj.quantity,
                                price: jsonObj.price,
                                amountPerPrice: jsonObj.amount_per_price,
                                productStatus: jsonObj.product_status,
                            };


                            // New values
                            const newValues = {
                                productName: productName.value,
                                brand: productBrand.value,
                                type: productType.value,
                                unitMeasurement: product_measurement.value,
                                amountPerStock: amount_per_stock.value,
                                quantity: productQuantity.value,
                                price: productPrice.value,
                                amountPerPrice: amount_per_price.value,
                                productStatus: productStatus.value,
                            };

                            // Labels for changes
                            const labels = {
                                image: "Image",
                                productName: "Product Name",
                                brand: "Brand",
                                type: "Type",
                                unitMeasurement: "Unit of Measurement",
                                amountPerStock: "Amount per Stock",
                                quantity: "Stock",
                                price: "Price",
                                amountPerPrice: "Amount per Price",
                                productStatus: "Product Status",
                            };

                            // String to store the changes in receipt-like format
                            let changeDetail = "";

                            console.log(newValues)

                            Object.keys(oldValues).forEach((key) => {
                                if (newValues[key] !== "") {
                                    const oldValue = oldValues[key];
                                    const newValue = newValues[key];
                            
                                    // Handle numeric comparison
                                    const isNumber = !isNaN(oldValue) && !isNaN(newValue);
                                    const valuesAreEqual = isNumber
                                        ? parseFloat(oldValue) === parseFloat(newValue)
                                        : oldValue === newValue;
                            
                                    if (!valuesAreEqual) {
                                        // Add change detail with explicit control of formatting
                                        changeDetail += `${labels[key]}:\n`;
                                        changeDetail += `Old Value: ${oldValue.trim()}\n`;
                                        changeDetail += `New Value: ${newValue.trim()}\n\n`;
                                    }
                                }
                            });
                            

                            const url = "php-sql-controller/common-controller.php";
                            let data = {
                                saveLog: true,
                                product_id: product_id,
                                userid: userId,
                                saveLogDetails: "Changes detected:\n" + changeDetail,
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
                                }
                            }
                            else{
                                console.error(detailsList);
                                // WaitigLoader(false)
                                dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                            }


                            productName.value = '';
                            productBrand.value = '';
                            productPrice.value = '';
                            productQuantity.value = '';
                            productImageUpload.value = '';
                            productImagePreview.src = '';
                            productImagePreview.style.display = 'none';
                            productImageRemoveBtn.style.display = 'none';
                            productType.value = 'Powder'
                            product_measurement.value = 'Kg'
                            amount_per_stock.value = ''

                            WaitigLoader(false)

                            if(productListTableVar){
                                productListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                            }

                            if(productLogsTableVar){
                                productLogsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
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

    if(productImageUploadContainer.classList.contains('col-md-12')){
        productImageUploadContainer.classList.remove('col-md-12')
        productImageUploadContainer.classList.add('col-md-6')
    }
    $('#addLaundryShopProduct').modal('show');

}