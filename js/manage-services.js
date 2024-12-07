dynamicHeaderLowerText('manage-owner.php', 'Manage Owner', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let createLaundryShopServiceBtn = document.getElementById('create-laundry-shop-service-btn');
let submitLaundryShopServiceBtn = document.getElementById('submit-laundry-shop-service-btn');
let servicePriceInput = document.getElementById('service-price');
let serviceNameInput = document.getElementById('service-name');
let serviceStatusInput = document.getElementById('service-status');
let serviceTypeInput =  document.getElementById('service-type');
let service_unit_measurement = document.getElementById('service_unit_measurement')
let service_load = document.getElementById('service_load')
let serviceStatusInputContainer = document.getElementById('service-status-container');
let serviceDescriptionInput = document.getElementById('service-description');
let serviceDescriptionInputContainer = document.getElementById('service-description-container');
let serviceListTable = document.getElementById('service-list-table');
let viewServiceCard = document.getElementById('view-service-card');
let addDiscountFormContainer = document.getElementById('add-discount-form-container');
let openAddDiscountFormBtn = document.getElementById('open-add-discount-form-btn');
let hideAddDiscountFormBtn = document.getElementById('hide-add-discount-form-btn');
let discountManageTable = document.getElementById('discountManage-table');
let discountManageTableContainer = document.getElementById('discountManage-table-container');
let discountNameInput = document.getElementById('discount-name');
let discountPercentInput = document.getElementById('discount-percent');
let discountDescriptionInput = document.getElementById('discount-description');
let submitDiscountBtn = document.getElementById('submit-discount-btn');
let discountManageTableVar;
let serviceListTableVar;
let updateService = false;
let updateDiscountVar = false;
let updateDiscountId;
manageServiceMoreSessionStorage(false, false);

// event for opening modal of laundry shop creation
createLaundryShopServiceBtn.addEventListener('click', function(){

    // Select the container where the button will be added
    const container = document.getElementById('submit-laundry-shop-service-update-container');
    container.innerHTML = '';

    if(!serviceStatusInputContainer.classList.contains('d-none')){
        serviceStatusInputContainer.classList.add('d-none')

        if(!serviceDescriptionInputContainer.classList.contains('col-md-6')){
            serviceDescriptionInputContainer.classList.add('col-md-6')
            serviceDescriptionInputContainer.classList.remove('col-md-12')
        }
    }

    if(updateService){

        serviceNameInput.value = ""
        serviceDescriptionInput.value = ""
        servicePriceInput.value = ""

        updateService = false;

    }

    if(submitLaundryShopServiceBtn.classList.contains('d-none')){
        submitLaundryShopServiceBtn.classList.remove('d-none');
    }

})

// an event that convert the value of price input into a currency
servicePriceInput.addEventListener('blur', function(e){

    if(e.target.value.length > 0){
        e.target.value = formatToCurrency(e.target.value)
    }
    
})

// Add event listeners for 'keydown' (for typing) and 'paste' events
service_load.addEventListener('keydown', function(event) {
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
service_load.addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, parentheses, and decimal points in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)\.]+$/;


    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});


service_load.addEventListener('blur', function(e){

    if(e.target.value.length > 0 && service_unit_measurement.value == 'Kg'){
        e.target.value =  currencyToNormalFormat(e.target.value)
    }
    
})


service_unit_measurement.addEventListener('blur', function(e){

    if(e.target.value == 'Kg' && service_load.value.length > 0 ){
        service_load.value =  currencyToNormalFormat(service_load.value)
    }
    
})


// an event for submitting the newly created service
submitLaundryShopServiceBtn.addEventListener('click', function(){

    let isValid = true

    // Service Name
    if(serviceNameInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(serviceNameInput.id, 'Please input a valid Laundry Shop Service Name.');
    }
    else {
        dynamicFieldErrorMessage(serviceNameInput.id, '');
    }

    // Service Description
    if(serviceDescriptionInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(serviceDescriptionInput.id, 'Please input a valid Laundry Shop Service Description.');
    }
    else {
        dynamicFieldErrorMessage(serviceDescriptionInput.id, '');
    }

    // Service Price
    if(servicePriceInput.value.length < 1 || !isValidCurrency(servicePriceInput.value)){
        isValid = false;
        dynamicFieldErrorMessage(servicePriceInput.id, 'Please input a valid Laundry Shop Service Price.');
    }
    else {
        dynamicFieldErrorMessage(servicePriceInput.id, '');
    }


    if(service_unit_measurement.value.length > 1 && service_load.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(service_load.id, '');
        dynamicFieldErrorMessage(service_load.id, 'Please input a valid Laundry Shop Service Load Amount.');
    }
    else {

        if(service_unit_measurement.value == 'Pcs' && service_load.value.includes('.')){
            isValid = false;
            dynamicFieldErrorMessage(service_load.id, '');
            dynamicFieldErrorMessage(service_load.id, 'Invalid Load Amount for PCS Unit of Measurement Type.')
        }
        else if(service_unit_measurement.value.length < 1 && service_load.value.length > 1){
            isValid = false;
            dynamicFieldErrorMessage(service_load.id, '');
            dynamicFieldErrorMessage(service_load.id, 'Invalid Load Amount for none Unit of Measurement Type.')
        }
        else if(service_load.value == NaN || service_load.value == "NaN"){
            isValid = false;
            dynamicFieldErrorMessage(service_load.id, '');
            dynamicFieldErrorMessage(service_load.id, 'Please input a valid Laundry Shop Service Load Amount.');
        }
        else{
            dynamicFieldErrorMessage(service_load.id, '');
            dynamicFieldErrorMessage(service_unit_measurement.id, '');
        }
       
    }


    if(isValid){

        let unitMeasurement = service_unit_measurement.value;
        if(service_unit_measurement.value.length < 1){
            unitMeasurement = 'N/A'
        }
        
        const url = "php-sql-controller/manage-services-controller.php";
        const data = {
            serviceType:serviceTypeInput.value,
            service_unit_measurement: unitMeasurement,
            service_load: service_load.value,
            serviceName:serviceNameInput.value,
            serviceDescription:serviceDescriptionInput.value,
            servicePrice:currencyToNormalFormat(servicePriceInput.value),
            shop_id: sessionStorage.getItem('sessionShopId'),
            submitLaundryShopService: true,
        };
    
        const queriedList = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(queriedList)){
            let jsonQueriedValue = JSON.parse(queriedList)

            if(jsonQueriedValue.insert_id && jsonQueriedValue.insert_id.length != 0){
                // let service_id = jsonQueriedValue.insert_id
                dynamicAlertMessage('A service has been successfully created.', 'success', 3000);
                $('#addLaundryShopService').modal('hide');

                serviceNameInput.value = '';
                serviceDescriptionInput.value = '';
                servicePriceInput.value = '';
                serviceTypeInput.value = 'All Types';

                if(serviceListTableVar){
                    serviceListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                }
            }
            else{
                let errorMessage = jsonQueriedValue.error;
                dynamicAlertMessage(errorMessage, 'error', 3000);
            }
        }
        else{
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
            console.error(queriedList)
        }

    }

})

// an event for opening add discount form
openAddDiscountFormBtn.addEventListener('click', function(){

    if(addDiscountFormContainer.classList.contains('d-none')){
        addDiscountFormContainer.classList.remove('d-none');
    }

    if(hideAddDiscountFormBtn.classList.contains('d-none')){
        hideAddDiscountFormBtn.classList.remove('d-none');
    }

    if(!openAddDiscountFormBtn.classList.contains('d-none')){
        openAddDiscountFormBtn.classList.add('d-none');
    }

    if(updateDiscountVar && updateDiscountVar){

        discountNameInput.value = ""
        discountPercentInput.value = ""
        discountDescriptionInput.value = ""

        updateDiscountVar = false;
        updateDiscountId = false;
    }



})

// an event for closing add discount form
hideAddDiscountFormBtn.addEventListener('click', function(){

    if(!addDiscountFormContainer.classList.contains('d-none')){
        addDiscountFormContainer.classList.add('d-none');
    }

    if(!hideAddDiscountFormBtn.classList.contains('d-none')){
        hideAddDiscountFormBtn.classList.add('d-none');
    }

    if(openAddDiscountFormBtn.classList.contains('d-none')){
        openAddDiscountFormBtn.classList.remove('d-none');
    }

})

// an event for submitting new discount
submitDiscountBtn.addEventListener('click', function(){

    if(updateDiscountVar && updateDiscountId){
        validateDiscountAndSubmit(updateDiscountId, false);
    }
    else{
        validateDiscountAndSubmit(false, false);
    }

    
})

// Add event listeners for 'keydown' (for typing) and 'paste' events
discountPercentInput.addEventListener('keydown', function(event) {
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
discountPercentInput.addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, parentheses, and decimal points in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)\.]+$/;


    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});

// to initialize the list of service table
if(serviceListTable){
    function laundryShopRequiermentsTable(){

        var ajax_url = "php-sql-controller/manage-services-controller.php";
        let tableParamValue = {
            shop_id: sessionStorage.getItem('sessionShopId'),
            showLaundryServiceList: true
        }


        if ( ! $.fn.DataTable.isDataTable(`#${serviceListTable.id}`) ) { // check if data table is already exist
        
            serviceListTableVar = $(`#${serviceListTable.id}`).DataTable({
      
            
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
                    title: 'Laundry Shop Services List',
                    exportOptions: {
                        // Specify columns to be included (0 to 8 in this case)
                        columns: function (idx, data, node) {
                            // Include columns 0 to 8
                            return idx >= 1 && idx <= 7;
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

                    // Serialize the row object to JSON and escape it for HTML
                    const serializedRow = encodeURIComponent(JSON.stringify(row));

                    let actionButton;
                    actionButton = `<button type="button" onClick="updateLaundryService('${serializedRow}')" class="btn btn-primary text-white" >Edit</button>`
                    return actionButton;
                            
                },
                
              },
              null,
              null,
              null,
              {
                "render": function ( data, type, row, meta ) {

                    if(data != 0 && row[3] == 'Kg'){
                        return currencyToNormalFormat(`${data}`);
                    }

                    return data;
                },

              },
              null,
              null,
              null
            ],
          });    
        }

    }
    laundryShopRequiermentsTable();

    if(serviceListTable){

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

// initialize Laundry Shop Requirements List
if(discountManageTable){
    function discountTable(){

        var ajax_url = "php-sql-controller/manage-services-controller.php";
        let tableParamValue = {
            showDiscountList: true,
            shop_id: sessionStorage.getItem('sessionShopId')
        }

        if ( ! $.fn.DataTable.isDataTable(`#${discountManageTable.id}`) ) { // check if data table is already exist
        
            discountManageTableVar = $(`#${discountManageTable.id}`).DataTable({
      
            
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
            dom: 'lfrtip',
            pageLength : 5,

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

                    let status = row[4];
                    let activeBTN = 'Activate';
                    let BTNType = 'btn-success'

                    if(status == 'Active'){
                        activeBTN = 'Deactivate';
                        BTNType = 'btn-secondary'
                    }

                    let actionButton;
                    actionButton = `<button type="button" onClick="updateDiscount('${row}')" class="btn btn-primary text-white" >Edit</button> `
                    actionButton += `<button type="button" onClick="activeDeactivateDiscount('${row}')" class="btn ${BTNType} text-white" >${activeBTN}</button> `
                    return actionButton;
                            
                },
                
              },
              null,
              null,
              null,
              null
            ],
          });    
        }

    }
    discountTable();

    if(discountManageTableContainer){

        let navfilterContainer = document.getElementById('discountManage-nav-search-container');
        let dataTablefilter = discountManageTableContainer.querySelector('.dataTables_filter');
        let dataTableInfo = discountManageTableContainer.querySelector('.dataTables_info');
        let dataTablePaginate = discountManageTableContainer.querySelector('.dataTables_paginate');
        let dataTableLength = discountManageTableContainer.querySelector('.dataTables_length');
        let navFooterContainer = document.getElementById('discountManage-nav-footer-container');

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
function updateLaundryService(row) { 
    
    // Given string
    let str = row;

    // Split the string into an array
    let values = JSON.parse(decodeURIComponent(row));

    // Define the keys for the JSON object
    let keys = ["id", "shop_name", "service_type", "unit_measurement", "service_load", "description", "price", "service_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });


    const service_id = jsonObj.id;
    const shop_name = jsonObj.shop_name;
    const description = jsonObj.description;
    const price = jsonObj.price;
    const service_status = jsonObj.service_status;
    const service_type = jsonObj.service_type;
    const unit_measurement = jsonObj.unit_measurement;
    let service_load_var =  jsonObj.service_load;

    if(unit_measurement == 'Kg'){
        service_load_var = currencyToNormalFormat(`${jsonObj.service_load}`) ;
    }

    serviceNameInput.value = shop_name
    serviceDescriptionInput.value = description
    servicePriceInput.value = price
    serviceStatusInput.value = service_status
    serviceTypeInput.value = service_type
    if(unit_measurement == 'N/A'){
        service_unit_measurement.value = '';
    }
    else{
        service_unit_measurement.value = unit_measurement;
    }
    if(service_load_var == 0 || service_load_var == '0'){
        service_load.value = '';
    }
    else{
        service_load.value = service_load_var;
    }


    // Select the container where the button will be added
    const container = document.getElementById('submit-laundry-shop-service-update-container');
    container.innerHTML = '';

    // Define the button HTML as a string
    const buttonHTML = `<button id="edit-laundry-shop-service-btn${service_id}" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">Update Service</button>
    `;

    if(!submitLaundryShopServiceBtn.classList.contains('d-none')){
        submitLaundryShopServiceBtn.classList.add('d-none');
    }

    // Insert the button into the container
    container.insertAdjacentHTML('beforeend', buttonHTML);

    const buttonId = document.getElementById(`edit-laundry-shop-service-btn${service_id}`)

    if(buttonId){
        buttonId.addEventListener('click', function(){

            let isValid = true

            // Service Name
            if(serviceNameInput.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(serviceNameInput.id, 'Please input a valid Laundry Shop Service Name.');
            }
            else {
                dynamicFieldErrorMessage(serviceNameInput.id, '');
            }

            // Service Description
            if(serviceDescriptionInput.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(serviceDescriptionInput.id, 'Please input a valid Laundry Shop Service Description.');
            }
            else {
                dynamicFieldErrorMessage(serviceDescriptionInput.id, '');
            }

            // Service Description
            if(servicePriceInput.value.length < 1 || !isValidCurrency(servicePriceInput.value)){
                isValid = false;
                dynamicFieldErrorMessage(servicePriceInput.id, 'Please input a valid Laundry Shop Service Price.');
            }
            else {
                dynamicFieldErrorMessage(servicePriceInput.id, '');
            }

            // Service Status
            if(serviceStatusInput.value.length < 1 && updateService){
                isValid = false;
                dynamicFieldErrorMessage(serviceStatusInput.id, 'Please Select a valid Laundry Shop Service Status.');
            }
            else {
                dynamicFieldErrorMessage(serviceStatusInput.id, '');
            }

            //
            if(service_unit_measurement.value.length > 1 && service_load.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(service_load.id, '');
                dynamicFieldErrorMessage(service_load.id, 'Please input a valid Laundry Shop Service Load Amount.');
            }
            else {
        
                if(service_unit_measurement.value == 'Pcs' && service_load.value.includes('.')){
                    isValid = false;
                    dynamicFieldErrorMessage(service_load.id, '');
                    dynamicFieldErrorMessage(service_load.id, 'Invalid Load Amount for PCS Unit of Measurement Type.')
                }
                else if(service_unit_measurement.value.length < 1 && service_load.value.length > 1){
                    isValid = false;
                    dynamicFieldErrorMessage(service_load.id, '');
                    dynamicFieldErrorMessage(service_load.id, 'Invalid Load Amount for none Unit of Measurement Type.')
                }
                else if(service_load.value == NaN || service_load.value == "NaN"){
                    isValid = false;
                    dynamicFieldErrorMessage(service_load.id, '');
                    dynamicFieldErrorMessage(service_load.id, 'Please input a valid Laundry Shop Service Load Amount.');
                }
                else{
                    dynamicFieldErrorMessage(service_load.id, '');
                    dynamicFieldErrorMessage(service_unit_measurement.id, '');
                }
               
            }

            if(isValid){

                let unitMeasurement = service_unit_measurement.value;
                if(service_unit_measurement.value.length < 1){
                    unitMeasurement = 'N/A'
                }
                
                const url = "php-sql-controller/manage-services-controller.php";
                const data = {
                    service_status:serviceStatusInput.value,
                    serviceType:serviceTypeInput.value,
                    service_unit_measurement: unitMeasurement,
                    service_load: service_load.value,
                    serviceName:serviceNameInput.value,
                    serviceDescription:serviceDescriptionInput.value,
                    servicePrice:currencyToNormalFormat(servicePriceInput.value),
                    shop_id: sessionStorage.getItem('sessionShopId'),
                    service_id: service_id,
                    submitLaundryShopService: true,
                };
            
                const queriedList = dynamicSynchronousPostRequest(url, data);

                if(isValidJSON(queriedList)){
                    let jsonQueriedValue = JSON.parse(queriedList)

                    if(jsonQueriedValue.message && jsonQueriedValue.message.length != 0){
                        // let service_id = jsonQueriedValue.insert_id
                        dynamicAlertMessage('A service has been successfully updated.', 'success', 3000);
                        $('#addLaundryShopService').modal('hide');

                        serviceNameInput.value = '';
                        serviceDescriptionInput.value = '';
                        servicePriceInput.value = '';
                        serviceTypeInput.value = 'All Types'
                        service_unit_measurement.value = '';
                        service_load.value = '';

                        if(serviceListTableVar){
                            serviceListTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                        }
                    }
                    else{
                        let errorMessage = jsonQueriedValue.error;
                        dynamicAlertMessage(errorMessage, 'error', 3000);
                    }
                }
                else{
                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                    console.error(queriedList)
                }

            }
            
        })
    }

    // console.log(jsonObj)
    updateService = true;
    if(serviceStatusInputContainer.classList.contains('d-none')){
        serviceStatusInputContainer.classList.remove('d-none')
    }

    if(!serviceDescriptionInputContainer.classList.contains('col-md-12')){
        serviceDescriptionInputContainer.classList.add('col-md-12')
        serviceDescriptionInputContainer.classList.remove('col-md-6')
    }
    $('#addLaundryShopService').modal('show');

}

// function to validate and submit discount
function validateDiscountAndSubmit(id, status) {

    let isValid = true;

    if(!status){
        if(discountNameInput.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(discountNameInput.id, 'Please input a valid Discount Name.');
        }
        else {
            dynamicFieldErrorMessage(discountNameInput.id, '');
        }
    
        if(discountPercentInput.value.length < 1 || parseInt(discountPercentInput.value) > 100 || parseInt(discountPercentInput.value) < 5){
            isValid = false;
            dynamicFieldErrorMessage(discountPercentInput.id, 'Please input a valid Discount Percentage.');
        }
        else {
            dynamicFieldErrorMessage(discountPercentInput.id, '');
        }
    
        if(discountDescriptionInput.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(discountDescriptionInput.id, 'Please input a valid Discount Description.');
        }
        else {
            dynamicFieldErrorMessage(discountDescriptionInput.id, '');
        }
    
    }

    if(isValid){

        const url = "php-sql-controller/manage-services-controller.php";
        const data = {
            discount_name: discountNameInput.value,
            discount_percent: discountPercentInput.value,
            discount_description: discountDescriptionInput.value,
            shop_id: sessionStorage.getItem('sessionShopId'),
            discountUpsert: true,
        };

        if(id){
            data.id = id;
        }

        if(status){
            data.discount_status = status;
        }
    
        const queriedList = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(queriedList)){
            let jsonQueriedValue = JSON.parse(queriedList)

            // dynamicAlertMessage('A service has been successfully created.', 'success', 3000);
            // $('#addLaundryShopService').modal('hide');

            if (jsonQueriedValue.includes("Discount successfully inserted.") || jsonQueriedValue.includes("Discount status updated successfully.")
            || jsonQueriedValue.includes("Discount details updated successfully.")) {
                dynamicAlertMessage(jsonQueriedValue, 'success', 3000);
               
                if(!addDiscountFormContainer.classList.contains('d-none')){
                    addDiscountFormContainer.classList.add('d-none');
                }
            
                if(!hideAddDiscountFormBtn.classList.contains('d-none')){
                    hideAddDiscountFormBtn.classList.add('d-none');
                }
            
                if(openAddDiscountFormBtn.classList.contains('d-none')){
                    openAddDiscountFormBtn.classList.remove('d-none');
                }

                discountNameInput.value = '';
                discountPercentInput.value = '';
                discountDescriptionInput.value = '';

                if(discountManageTableVar){
                    discountManageTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                }
              
            }else {
                dynamicAlertMessage(jsonQueriedValue, 'error', 3000);
            }
        }
        else{
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
            console.error(queriedList)
        }

    }

}

// function to activate or deactivate discount
function activeDeactivateDiscount(row){
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["discount_id", "discount_name", "discount_percent", "discount_description", "discount_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    console.log(jsonObj)

    const discount_id = jsonObj.discount_id;
    const discount_status = jsonObj.discount_status;

    let status = 'Inactive';

    if(discount_status == 'Inactive'){
        status = 'Active'
    }

    validateDiscountAndSubmit(discount_id, status)

}

// function to update the discount 
function updateDiscount(row){
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["discount_id", "discount_name", "discount_percent", "discount_description", "discount_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    console.log(jsonObj)

    const discount_id = jsonObj.discount_id;
    const discount_name = jsonObj.discount_name;
    const discount_percent = jsonObj.discount_percent;
    const discount_description = jsonObj.discount_description;

    discountNameInput.value = discount_name
    discountPercentInput.value = discount_percent
    discountDescriptionInput.value = discount_description

    if(addDiscountFormContainer.classList.contains('d-none')){
        addDiscountFormContainer.classList.remove('d-none');
    }

    if(hideAddDiscountFormBtn.classList.contains('d-none')){
        hideAddDiscountFormBtn.classList.remove('d-none');
    }

    if(!openAddDiscountFormBtn.classList.contains('d-none')){
        openAddDiscountFormBtn.classList.add('d-none');
    }

    updateDiscountVar = true;
    updateDiscountId = discount_id;

}