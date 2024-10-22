dynamicHeaderLowerText('manage-laundry-shop.php', 'Manage Laundry Shop', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let openAddRequirementsFormBtn = document.getElementById('open-add-requirements-form-btn');
let hideAddRequirementsFormBtn = document.getElementById('hide-add-requirements-form-btn');
let submitRequirementBtn = document.getElementById('submit-requirement-btn');
let addLaundryShopRequirementsFormContainer = document.getElementById('add-laundry-shop-requirements-form-container');
let requirementTypeInput = document.getElementById('requirement-type-input');
let allowPhotoUploadSelect = document.getElementById('allow-photo-upload-select');
let fieldType = document.getElementById('field-type');
let addLaundryShopRequiermentsTable = document.getElementById('addLaundryShopRequierments-table');
let addLaundryShopRequiermentsTableVar;
let addLaundryShopRequiermentsTableContainer = document.getElementById('addLaundryShopRequierments-table-container');
let laundryShopTable = document.getElementById('laundry-shop-table');
let laundryShopTableVar;
let laundrSshopTableContainer = document.getElementById('laundry-shop-table-container');
let requirement_id_global = null;
let submitLaundryShopInfoBtn = document.getElementById('submit-laundry-shop-info-btn');
let createLaundryShopBtn = document.getElementById('create-laundry-shop-btn');
let isUpdate = false;
let isLaundryFormUpdate
let globalRequirementsId;
manageServiceMoreSessionStorage(false, false);

// event listener to show the add laundry shop requirement form
openAddRequirementsFormBtn.addEventListener('click', function(){

    if(addLaundryShopRequirementsFormContainer.classList.contains('d-none')){
        addLaundryShopRequirementsFormContainer.classList.remove('d-none');
    }

    if(!openAddRequirementsFormBtn.classList.contains('d-none')){
        openAddRequirementsFormBtn.classList.add('d-none');
    }

    if(hideAddRequirementsFormBtn.classList.contains('d-none')){
        hideAddRequirementsFormBtn.classList.remove('d-none');
    }

    if(requirement_id_global){
        requirement_id_global = null;
        requirementTypeInput.value = "";
        allowPhotoUploadSelect.value = "";
        fieldType.value = "";
    }

})

// event listener to hide the add laundry shop requirement form
hideAddRequirementsFormBtn.addEventListener('click', function(){

    if(!addLaundryShopRequirementsFormContainer.classList.contains('d-none')){
        addLaundryShopRequirementsFormContainer.classList.add('d-none');
    }

    if(!hideAddRequirementsFormBtn.classList.contains('d-none')){
        hideAddRequirementsFormBtn.classList.add('d-none');
    }

    if(openAddRequirementsFormBtn.classList.contains('d-none')){
        openAddRequirementsFormBtn.classList.remove('d-none');
    }
    

})

// event listener to submit the laundry shop requirement
submitRequirementBtn.addEventListener('click', function(){

    let isValid = true

    //Requirement Type
    if(requirementTypeInput.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(requirementTypeInput.id, 'Please input a valid Requirement Type.');
    }
    else {
        dynamicFieldErrorMessage(requirementTypeInput.id, '');
    }

    //Allow Photo Upload
    if(allowPhotoUploadSelect.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(allowPhotoUploadSelect.id, 'Please select a valid option.');
    }
    else {
        dynamicFieldErrorMessage(allowPhotoUploadSelect.id, '');
    }

    //Field Type
    if(fieldType.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(fieldType.id, 'Please select a valid option.');
    }
    else {
        dynamicFieldErrorMessage(fieldType.id, '');
    }

    if(isValid) {

        const url = "php-sql-controller/manage-laundry-shop-controller.php";
        const data = {
            addLaundryShopRequirement: true,
            requirementTypeInput:requirementTypeInput.value,
            allowPhotoUploadSelect:allowPhotoUploadSelect.value,
            fieldType: fieldType.value,
            requirementId: requirement_id_global
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {
            if(isValidJSON(response)){

                if(JSON.parse(response) == 'A Shop Requirement added successfully.'){
                    dynamicAlertMessage('A Shop Requirement added successfully.', 'success', 3000);

                    if(!addLaundryShopRequirementsFormContainer.classList.contains('d-none')){
                        addLaundryShopRequirementsFormContainer.classList.add('d-none');
                    }
                
                    if(!hideAddRequirementsFormBtn.classList.contains('d-none')){
                        hideAddRequirementsFormBtn.classList.add('d-none');
                    }
                
                    if(openAddRequirementsFormBtn.classList.contains('d-none')){
                        openAddRequirementsFormBtn.classList.remove('d-none');
                    }

                   requirementTypeInput.value = '';
                   allowPhotoUploadSelect.value = '';
                   requirement_id_global = null;
                   fieldType.value = '';

                   
                   if(addLaundryShopRequiermentsTableVar){
                    addLaundryShopRequiermentsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                    }
                   

                }
                else if(JSON.parse(response) == 'Requirement updated successfully.'){
                    dynamicAlertMessage('Requirement updated successfully.', 'success', 3000);

                    if(!addLaundryShopRequirementsFormContainer.classList.contains('d-none')){
                        addLaundryShopRequirementsFormContainer.classList.add('d-none');
                    }
                
                    if(!hideAddRequirementsFormBtn.classList.contains('d-none')){
                        hideAddRequirementsFormBtn.classList.add('d-none');
                    }
                
                    if(openAddRequirementsFormBtn.classList.contains('d-none')){
                        openAddRequirementsFormBtn.classList.remove('d-none');
                    }

                   requirementTypeInput.value = '';
                   allowPhotoUploadSelect.value = '';
                   requirement_id_global = null;
                   fieldType.value = '';

                   if(addLaundryShopRequiermentsTableVar){
                    addLaundryShopRequiermentsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
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

// event for opening modal of laundry shop creation
createLaundryShopBtn.addEventListener('click', function(){

    // Select the container where the button will be added
    const container = document.getElementById('submit-laundry-shop-info-update-container');

    if(container){
        container.innerHTML = '';
    }

    if(submitLaundryShopInfoBtn.classList.contains('d-none')){
        submitLaundryShopInfoBtn.classList.remove('d-none');
    }

    if(isLaundryFormUpdate){
        const url = "php-sql-controller/manage-laundry-shop-controller.php";
        const data = {
            queryRequirements: true,
        };
        
        const queriedList = dynamicSynchronousPostRequest(url, data);
        const requirements = JSON.parse(queriedList);
    
        if(Object.keys(requirements).length > 0){
    
            let laundryShopName = document.getElementById('laundry-shop-name');
            let laundryShopContactNumber = document.getElementById('laundry-shop-contact-number');
            let laundryShopAddress = document.getElementById('laundry-shop-address');
            let openTime = document.getElementById('open-time-input');
            let closeTime = document.getElementById('close-time-input');
            let scheduleCheck = document.getElementById('schedule-check');
            let additionalSchedule = document.getElementById('additional-schedule');
    
            laundryShopName.value = '';
            laundryShopContactNumber.value = '';
            laundryShopAddress.value = '';
            openTime.value = '';
            closeTime.value = '';
            scheduleCheck.value = '';
            additionalSchedule.value = '';
            checkDaysFromString('', false)
    
            requirements.forEach((requirement, index) => {
                const requirementsField = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);
                requirementsField.value = '';
    
                if(requirement.upload_photo == 'True'){
                    const imageUpload = document.getElementById(`image-upload${requirement.laundry_shop_requirements_id}`);
                    const imagePreview = document.getElementById(`image-preview${requirement.laundry_shop_requirements_id}`);
                    const removeImageBtn = document.getElementById(`remove-image-btn${requirement.laundry_shop_requirements_id}`);
    
                    imagePreview.src = '';
                    imagePreview.style.display = 'none';
                    removeImageBtn.style.display = 'none';
                    imageUpload.value = '';
                }
    
            })
        }

        isLaundryFormUpdate = false;
    }

})

// initialize Laundry Shop Requirements List
if(addLaundryShopRequiermentsTable){
    function laundryShopRequiermentsTable(){

        var ajax_url = "php-sql-controller/manage-laundry-shop-controller.php";
        let tableParamValue = {
            showLaundryShopRequirementList: true
        }

        if ( ! $.fn.DataTable.isDataTable(`#${addLaundryShopRequiermentsTable.id}`) ) { // check if data table is already exist
        
            addLaundryShopRequiermentsTableVar = $(`#${addLaundryShopRequiermentsTable.id}`).DataTable({
      
            
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
            pageLength : 10,

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
                    actionButton = `<button type="button" onClick="updateRequirementFunction('${row}')" class="btn btn-primary text-white" >Edit</button> `
                    actionButton += `<button type="button" onClick="deleteRequirementFunction('${row}')" class="btn btn-primary text-white" >Delete</button> `
                    return actionButton;
                            
                },
                
              },
              null,
              null,
              null,
            ],
          });    
        }

    }
    laundryShopRequiermentsTable();

    if(addLaundryShopRequiermentsTableContainer){

        let navfilterContainer = document.getElementById('addLaundryShopRequierments-nav-search-container');
        let dataTablefilter = addLaundryShopRequiermentsTableContainer.querySelector('.dataTables_filter');
        let dataTableInfo = addLaundryShopRequiermentsTableContainer.querySelector('.dataTables_info');
        let dataTablePaginate = addLaundryShopRequiermentsTableContainer.querySelector('.dataTables_paginate');
        let dataTableLength = addLaundryShopRequiermentsTableContainer.querySelector('.dataTables_length');
        let navFooterContainer = document.getElementById('addLaundryShopRequierments-nav-footer-container');

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

// Add event listeners for 'keydown' (for typing) and 'paste' events for contact field
document.getElementById('laundry-shop-contact-number').addEventListener('keydown', function(event) {
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

// Prevent non-numeric characters when pasting for contact field
document.getElementById('laundry-shop-contact-number').addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, and parentheses in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)]+$/;

    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});

// initialize Laundry Shop Table
if(laundryShopTable){
    function laundryShopDataTable(){

        var ajax_url = "php-sql-controller/manage-laundry-shop-controller.php";
        let tableParamValue = {
            userId: userId,
            showLaundryShopList: true
        }

        if ( ! $.fn.DataTable.isDataTable(`#${laundryShopTable.id}`) ) { // check if data table is already exist
        
            laundryShopTableVar = $(`#${laundryShopTable.id}`).DataTable({
      
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
                  title: 'Laundry Owner List',
                  exportOptions: {
                      // Specify columns to be included (0 to 8 in this case)
                      columns: function (idx, data, node) {
                          // Include columns 0 to 8
                          return idx >= 1 && idx <= 5;
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
                    actionButton = `<button type="button" onClick="openMoreDetails('${row}')" class="btn btn-primary text-white" >Open Details</button> `
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
    laundryShopDataTable();

    let navBtnContainer = document.getElementById('nav-btn-container');
    let navfilterContainer = document.getElementById('nav-search-container');
    let dataTableButtons = laundrSshopTableContainer.querySelector('.dt-buttons');
    let dataTablefilter = laundrSshopTableContainer.querySelector('.dataTables_filter');
    let dataTableInfo = laundrSshopTableContainer.querySelector('.dataTables_info');
    let dataTablePaginate = laundrSshopTableContainer.querySelector('.dataTables_paginate');
    let navFooterContainer = document.getElementById('nav-footer-container');
    let dataTableLength = laundrSshopTableContainer.querySelector('.dataTables_length');

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

// to show more details of laundry shop
function openMoreDetails(row) { 
    
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["id", "shop_name", "shop_address", "contact_number", "owner", "requirement_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    const id_val = jsonObj.id;
    const shop_name = jsonObj.shop_name;
    const shop_address = jsonObj.shop_address;
    const contact_number = jsonObj.contact_number;
    const owner = jsonObj.owner;
    const requirement_status = jsonObj.requirement_status;
    let days_open;
    let open_time;
    let close_time;
    let additional_schedule_details;

    document.getElementById('laundry-detail-shop-name').value = shop_name;
    document.getElementById('laundry-shop-address-detail').value = shop_address;
    document.getElementById('laundry-shop-contact-number-detail').value = contact_number;
    document.getElementById('laundry-shop-owner-detail').value = owner;
    document.getElementById('laundry-shop-requirement-detail').value = requirement_status;

    const urlA = "php-sql-controller/manage-laundry-shop-controller.php";
    const dataA = {
        shopId: id_val,
        queryShopSchedule: true,
    };

    const detailsListA = dynamicSynchronousPostRequest(urlA, dataA);
    if(isValidJSON(detailsListA)){

        const shopDetails = JSON.parse(detailsListA); // Assuming detailsList is in JSON format
    
        if (!shopDetails.error) {
            days_open = shopDetails.days_open
            open_time = shopDetails.open_time;
            close_time = shopDetails.close_time;
            additional_schedule_details = shopDetails.additional_schedule_details;
            checkDaysFromString(days_open, true);

            // Display shop open and close times
            document.getElementById("open-time-input-detail").value = open_time;
            document.getElementById("close-time-input-detail").value = close_time;

            let additionalSchedValue = 'N/A'

            if(shopDetails.additional_schedule_details.length > 1){
                additionalSchedValue = additional_schedule_details;
            }

            // Display additional schedule details
            document.getElementById("additional-schedule-detail").value = additionalSchedValue;

        } else {
            dynamicAlertMessage(shopDetails.error, 'error', 3000);
        }
    }
    else{
        console.error(detailsListA);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
    }

    // Select the container where the buttons will be inserted
    const footerContainer = document.getElementById('open-laundry-shop-details-footer');

    // Clear the footer container (remove any existing elements)
    footerContainer.innerHTML = '';

    // Define the HTML for the buttons
    const buttonsHTML = `
        <button id="approve-laundry-shop-btn-${id_val}" class="btn btn-success text-white d-flex flex-row gap-2 align-items-center admin d-none">
            Mark as Approved
        </button>
        <button id="reject-laundry-shop-btn-${id_val}" class="btn btn-secondary text-white d-flex flex-row gap-2 align-items-center admin d-none">
            Mark as Rejected
        </button>
        <button id="edit-laundry-shop-details-btn-${id_val}" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner d-none">
            Edit Details
        </button>
        <button id="view-as-laundry-shop-btn-${id_val}" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner d-none">
            View as Laundry Shop
        </button>
    `;

    // Insert the buttons at the end of the container using "beforeend"
    footerContainer.insertAdjacentHTML('beforeend', buttonsHTML);

    showHideFunctions();

    const approveLaundryShopBtn = document.getElementById(`approve-laundry-shop-btn-${id_val}`);
    const rejectLaundryShopBtn = document.getElementById(`reject-laundry-shop-btn-${id_val}`);
    const editLaundryShopDetailsBtn = document.getElementById(`edit-laundry-shop-details-btn-${id_val}`);
    const viewAsLaundryShopBtn = document.getElementById(`view-as-laundry-shop-btn-${id_val}`);

    // event listener to approve laundry shop
    approveLaundryShopBtn.addEventListener('click', function(){
        approveOrRejectLaundryShopApplication(id_val, 'Approved')
    })

     // event listener to reject laundry shop
    rejectLaundryShopBtn.addEventListener('click', function(){
        approveOrRejectLaundryShopApplication(id_val, 'Rejected')
    })

    // event to view as laundry shop
    viewAsLaundryShopBtn.addEventListener('click', function(){

        if(requirement_status == 'Approved'){
            dynamicAlertMessage(`You are now viewing as ${shop_name}.`, 'success', 3000);
            sessionStorage.setItem('viewAsLaundryShop', true);
            sessionStorage.setItem('sessionShopId', id_val);
            sessionStorage.setItem('sessionShopName', shop_name);
            sessionStorage.setItem('sessionShopAddress', shop_address);
            sessionStorage.setItem('sessionShopContactNumber', contact_number);

            window.location.href = 'login.php';
        }
        else{
            dynamicAlertMessage(  `You can't view this as a Laundry Shop. The requirement status must first be approved by the admin.`, 'error', 3000);
        }

    })

    // event listener to edit the laundry shop details
    editLaundryShopDetailsBtn.addEventListener('click', function(){

        isLaundryFormUpdate = true;

        let selectedTableRowDetails = {
            id_val: id_val,
            shop_name: shop_name,
            shop_address: shop_address,
            contact_number: contact_number,
            owner: owner,
            days_open: days_open,
            open_time: open_time,
            close_time: close_time,
            additional_schedule_details: additional_schedule_details,
            requirement_status: requirement_status
        }

        editLaundryShopDetails(selectedTableRowDetails)
    })


    const url = "php-sql-controller/manage-laundry-shop-controller.php";
    const data = {
        shopId: id_val,
        queryRequirementsDetails: true,
    };

    const detailsList = dynamicSynchronousPostRequest(url, data);
   
    const requirementDetailContainer = document.getElementById('requirement-detail-container');
        // Select the <h5> element you want to keep
    const requirementsHeader = requirementDetailContainer;

    // Select all <h5> elements
    const allHeaders = requirementDetailContainer.querySelectorAll('div');

    // Loop through the <h5> elements
    allHeaders.forEach(header => {
        // Check if the current header is not the one you want to keep
        if (header !== requirementsHeader) {
            // Remove the header from the DOM
            header.remove();
        }
    });

    if(isValidJSON(detailsList)){

        const details = JSON.parse(detailsList);

        if(Object.keys(details).length > 0){
    
            details.forEach((field, index) => {

                let colomn = `col-md-12`
                let imageEvidence = '';
                let imageLink = field.image_link;
                let requirementName = field.requirement_name;
                let value = field.details

                if(field.upload_photo == 'True'){
                    imageEvidence = `<!-- Display responsive image -->
                    <div class="${colomn}">
                    <label for="requirement-image" class="form-label">${requirementName} Image</label>
                    <div class="image-preview">
                        <img id="requirement-image" src="${imageLink}" alt="Requirement Image" class="img-fluid shadow rounded-4" style="max-width: 100%; height: auto; object-fit: cover;">
                    </div>
                    </div>`
                }

                // Define the HTML structure as a string
                const newElements = `
                <!-- Requirement Status -->
                <div class="${colomn}">
                <label for="laundry-shop-requirement-detail" class="form-label">${requirementName}</label>
                <input type="text" placeholder="${requirementName}" disabled maxlength="255" value="${value}" class="form-control" id="laundry-shop-requirement-detail" required>
                </div>

                ${imageEvidence}
                `;

                // Insert the new HTML right after the <h5>Requirements Section</h5>
                requirementDetailContainer.insertAdjacentHTML('beforeend', newElements);

            })
    
        }

    }
    else{
        console.error(detailsList);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
    }


    // console.log(jsonObj)
    $('#laundryShopDetailsModal').modal('show');

}

// function approve or reject the laundry shop application 
function approveOrRejectLaundryShopApplication(id_val, type){
    const url = "php-sql-controller/manage-laundry-shop-controller.php";
    const data = {
        isApproved: type,
        shopId: id_val,
        submitLaundryShopInfo: true,
    };

    let typeMsg;

    if(type == 'Approved'){
        typeMsg = 'approved  successfully';
    }
    else{
        typeMsg = 'rejected';
    }

    const queriedList = dynamicSynchronousPostRequest(url, data);

    if(isValidJSON(queriedList)){
        let jsonQueriedValue = JSON.parse(queriedList)

        if(jsonQueriedValue.message && jsonQueriedValue.message.length != 0){
            dynamicAlertMessage(`Laundry shop creation request was ${typeMsg}.`, 'success', 3000);
            $('#laundryShopDetailsModal').modal('hide');
            if(laundryShopTableVar){
                laundryShopTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
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

// function to edit laundry shop details
function editLaundryShopDetails(selectedTableRowDetails){

    let id_val = selectedTableRowDetails.id_val;
    let shop_name = selectedTableRowDetails.shop_name;
    let shop_address = selectedTableRowDetails.shop_address;
    let contact_number = selectedTableRowDetails.contact_number;
    let days_open = selectedTableRowDetails.days_open;
    let open_time = selectedTableRowDetails.open_time;
    let close_time = selectedTableRowDetails.close_time;
    let additional_schedule_details = selectedTableRowDetails.additional_schedule_details;
    // let owner = selectedTableRowDetails.owner;
    // let requirement_status = selectedTableRowDetails.requirement_status;
    checkDaysFromString(days_open, false)
    let laundryShopName = document.getElementById('laundry-shop-name');
    let laundryShopContactNumber = document.getElementById('laundry-shop-contact-number');
    let laundryShopAddress = document.getElementById('laundry-shop-address');
    let openTime = document.getElementById('open-time-input');
    let closeTime = document.getElementById('close-time-input');
    let additionalSchedule = document.getElementById('additional-schedule');

    laundryShopName.value = shop_name;
    laundryShopContactNumber.value = contact_number;
    laundryShopAddress.value = shop_address;
    openTime.value = open_time;
    closeTime.value = close_time;
    additionalSchedule.value = additional_schedule_details;

    const url = "php-sql-controller/manage-laundry-shop-controller.php";
    const data = {
        shopId: id_val,
        queryRequirementsDetails: true,
    };

    const detailsList = dynamicSynchronousPostRequest(url, data);


    if(isValidJSON(detailsList)){

        const details = JSON.parse(detailsList);

        if(Object.keys(details).length > 0){
    
            details.forEach((field, index) => {

                // console.log('data => ' , field);

                const imageLink = field.image_link;
                const value = field.details;
                const requirementId = field.laundry_shop_requirements_id;
                const uploadPhoto = field.upload_photo;
            
                const requirementsField = document.getElementById(`requirement${requirementId}`);
                requirementsField.value = value;
        
                if(uploadPhoto == 'True'){
                    const imageUpload = document.getElementById(`image-upload${requirementId}`);

                    const imagePreview = document.getElementById(`image-preview${requirementId}`);
                    const removeImageBtn = document.getElementById(`remove-image-btn${requirementId}`);
                    imagePreview.src = imageLink;
                    imagePreview.style.display = 'block';
                    removeImageBtn.style.display = 'none';
                }

            })
    
        }


        // Select the container where the button will be added
        const container = document.getElementById('submit-laundry-shop-info-update-container');
        container.innerHTML = '';

        // Define the button HTML as a string
        const buttonHTML = `
            <button id="submit-laundry-shop-info-update-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">
                Update Laundry Shop
            </button>
        `;

        // Insert the button into the container
        container.insertAdjacentHTML('beforeend', buttonHTML);

        if(!submitLaundryShopInfoBtn.classList.contains('d-none')){
            submitLaundryShopInfoBtn.classList.add('d-none');
        }

        const submitLaundryShopInfoUpdateBtn = document.getElementById('submit-laundry-shop-info-update-btn');
        submitLaundryShopInfoUpdateBtn.addEventListener('click', function(){
            validateUpdatingLaundryShopForm(details);
        })


        $('#laundryShopDetailsModal').modal('hide');
        $('#addLaundryShopMoadl').modal('show');

    }
    else{
        console.error(detailsList);
        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
    }
}

// function to update the laundry shop requirements
function updateRequirementFunction(row){

        // Given string
        let str = row;

        // Split the string into an array
        let values = str.split(",");
    
        // Define the keys for the JSON object
        let keys = ["requirement_id", "requirement_name", "field_type", "upload_photo"];
    
        // Create a JSON object by mapping keys to values
        let jsonObj = {};
        keys.forEach((key, index) => {
            jsonObj[key] = values[index];
        });
        
       const requirement_id = jsonObj.requirement_id;
       const requirement_name = jsonObj.requirement_name;
       const upload_photo = jsonObj.upload_photo;
       const field_type = jsonObj.field_type;

       requirementTypeInput.value = requirement_name;
       allowPhotoUploadSelect.value = upload_photo;
       fieldType.value = field_type;
       requirement_id_global = requirement_id;


        if(addLaundryShopRequirementsFormContainer.classList.contains('d-none')){
            addLaundryShopRequirementsFormContainer.classList.remove('d-none');
        }

        if(!openAddRequirementsFormBtn.classList.contains('d-none')){
            openAddRequirementsFormBtn.classList.add('d-none');
        }

        if(hideAddRequirementsFormBtn.classList.contains('d-none')){
            hideAddRequirementsFormBtn.classList.remove('d-none');
        }

}

// function to delete the laundry shop requirements
function deleteRequirementFunction(row){
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

    // Define the keys for the JSON object
    let keys = ["requirement_id"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    const requirement_id = jsonObj.requirement_id;

    const url = "php-sql-controller/manage-laundry-shop-controller.php";
        const data = {
            deleteLaundryShopRequirement: true,
            requirementId: requirement_id
        };
      
        dynamicPostRequest(url,data )
        .then((response) => {
            if(isValidJSON(response)){

                if(JSON.parse(response) == 'Requirement deleted successfully.'){
                    dynamicAlertMessage('Requirement deleted successfully.', 'success', 3000);

                   if(addLaundryShopRequiermentsTableVar){
                        addLaundryShopRequiermentsTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
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

// function to query the Laundry Shop Requirements
function queryLaundryShopRequirements(){

    const url = "php-sql-controller/manage-laundry-shop-controller.php";
    const data = {
        queryRequirements: true,
    };

    const queriedList = dynamicSynchronousPostRequest(url, data);
    const requirements = JSON.parse(queriedList);
    const requirementFormContainer = document.getElementById('requirement-form-container');

    if(Object.keys(requirements).length > 0){

        requirements.forEach((requirement, index) => {

            if(requirementFormContainer.classList.contains('d-none')){
                requirementFormContainer.classList.remove('d-none');
            }

            const fieldDataType = requirement.field_data_type;

            // Get the container element
    
            let colomClass = `col-md-6`;
            let uploadPhotoField = `
            <!-- Image Upload with Preview and Remove Icon -->
            <div class="col-md-6">
            <label for="image-upload${requirement.laundry_shop_requirements_id}" class="form-label">Upload ${requirement.requirement_name} Image</label>
            <input type="file" accept="image/*" class="form-control" id="image-upload${requirement.laundry_shop_requirements_id}" required>
            <div id="image-error-feedback" class="invalid-feedback"></div>
            <!-- Preview Section with Remove Icon -->
            <div id="image-preview-container${requirement.laundry_shop_requirements_id}" class="mt-2 position-relative" style="width: 100px;">
                <img id="image-preview${requirement.laundry_shop_requirements_id}" src="" alt="Image Preview" style="display: none; width: 100px; height: 100px; object-fit: cover;">
                <i id="remove-image-btn${requirement.laundry_shop_requirements_id}" class="fa fa-trash-alt" style="display:none; position: absolute; top: 0; right: 0; background-color: rgba(0,0,0,0.5); color: white; cursor: pointer; font-size: 0.9rem; padding: 10px; border-radius: 50%;"></i>
            </div>
            <div id="image-upload${requirement.laundry_shop_requirements_id}-error-feedback" class="invalid-feedback">wew</div>
            </div>`
    
            if(requirement.upload_photo == 'False'){
                uploadPhotoField = '';
                colomClass = `col-12`
            }
    
            // Define the new element using a template string
            const newElement = document.createElement('div');
            newElement.innerHTML = `
                <!-- Requirement -->
                <div class="${colomClass}">
                <label for="requirement${requirement.laundry_shop_requirements_id}" class="form-label">${requirement.requirement_name}</label>
                <input type="text" placeholder="${requirement.requirement_name}" maxlength="50" class="form-control" id="requirement${requirement.laundry_shop_requirements_id}" required>
                <div id="requirement${requirement.laundry_shop_requirements_id}-error-feedback" class="invalid-feedback"></div>
                </div>
    
               ${uploadPhotoField}
            `;
    
            newElement.classList.add('row', 'g-3');
            newElement.id =  `requirement-wrapper-${requirement.laundry_shop_requirements_id}`
            // Insert the new element as the second child
            requirementFormContainer.insertBefore(newElement, requirementFormContainer.children[1]);

            if(fieldDataType == 'Number'){

                const requirementInput = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);

                // Add event listeners for 'keydown' (for typing) and 'paste' events
                requirementInput.addEventListener('keydown', function(event) {
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
                requirementInput.addEventListener('paste', function(event) {
                    // Get the pasted data
                    const pasteData = event.clipboardData.getData('text');

                    // Allow only numbers, spaces, dashes, and parentheses in the pasted data
                    const allowedCharacters = /^[0-9 \-\(\)]+$/;

                    if (!allowedCharacters.test(pasteData)) {
                        event.preventDefault(); // Prevent the paste if invalid characters are found
                    }
                });

            }
    
            if(requirement.upload_photo != 'False'){
    
            // Add the image preview functionality
            const imageUpload = document.getElementById(`image-upload${requirement.laundry_shop_requirements_id}`);
            const imagePreview = document.getElementById(`image-preview${requirement.laundry_shop_requirements_id}`);
            const imagePreviewContainer = document.getElementById(`image-preview-container${requirement.laundry_shop_requirements_id}`);
            const removeImageBtn = document.getElementById(`remove-image-btn${requirement.laundry_shop_requirements_id}`);
    
            imageUpload.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    // Check if the file type is an image
                    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                    if (!validImageTypes.includes(file.type)) {
                        // Show error if the file is not an image
                        
                        dynamicFieldErrorMessage(imageUpload.id, 'Please upload a valid image Type.');
    
                        imagePreview.style.display = 'none';
                        removeImageBtn.style.display = 'none';
                        imageUpload.value = ''; // Clear the input field
                        return;
                    }
            
                    // Hide the error and show the preview
                    dynamicFieldErrorMessage(imageUpload.id, '');
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imagePreview.src = e.target.result;
                        imagePreview.style.display = 'block';
                        removeImageBtn.style.display = 'none';
                    }
                    reader.readAsDataURL(file);
                } else {
                    imagePreview.style.display = 'none';
                    removeImageBtn.style.display = 'none';
                }
            });
    
            // Remove the image when clicking on the remove button
            removeImageBtn.addEventListener('click', function() {
                imagePreview.src = '';
                imagePreview.style.display = 'none';
                removeImageBtn.style.display = 'none';
                imageUpload.value = ''; // Clear the input field
            });
    
            // Show the remove button when hovering over the image
            imagePreviewContainer.addEventListener('mouseover', function() {
                removeImageBtn.style.display = 'block';
            });
    
            // Hide the remove button when not hovering over the image
            imagePreviewContainer.addEventListener('mouseout', function() {
                removeImageBtn.style.display = 'none';
            });
                
            }
    
        })

        validateAddingLaundryShopForm(requirements)

    }
    else{

        if(!requirementFormContainer.classList.contains('d-none')){
            requirementFormContainer.classList.add('d-none');
        }

        validateAddingLaundryShopForm(requirements)
    }

}
queryLaundryShopRequirements();

// function to validate the laundry shop form details
function validateAddingLaundryShopForm(requirements){
    submitLaundryShopInfoBtn.addEventListener('click', function(){

        let isValid = true;
        let laundryShopName = document.getElementById('laundry-shop-name');
        let laundryShopContactNumber = document.getElementById('laundry-shop-contact-number');
        let laundryShopAddress = document.getElementById('laundry-shop-address');
        let openTime = document.getElementById('open-time-input');
        let closeTime = document.getElementById('close-time-input');
        let scheduleCheck = document.getElementById('schedule-check');
        let additionalSchedule = document.getElementById('additional-schedule');
        let selectedDays = getSelectedDays();

        // Close and Open Time
        if (openTime.value.length < 1) {
            dynamicFieldErrorMessage(openTime.id, 'Please input a valid Open Time.');
            isValid = false;
        }
        else{
            dynamicFieldErrorMessage(openTime.id, '');
        }

        if (closeTime.value.length < 1) {
            dynamicFieldErrorMessage(closeTime.id, 'Please input a valid Close Time.');
            isValid = false;
        }
        else{
            dynamicFieldErrorMessage(closeTime.id, '');
        }

         // Convert times to Date objects for comparison
        let open = new Date(`1970-01-01T${openTime.value}`);
        let close = new Date(`1970-01-01T${closeTime.value}`);
        if (open >= close) {
            dynamicFieldErrorMessage(closeTime.id, 'Close Time should be later than Open Time.');
            dynamicFieldErrorMessage(openTime.id, 'Open Time should be earlier than Close Time.');
            isValid = false;
        }

        // open days
        if(!validateOpenDays()){
            dynamicFieldErrorMessage(scheduleCheck.id, 'Please select at least one Open Day.');
            isValid = false;
        }
        else{
            dynamicFieldErrorMessage(scheduleCheck.id, '');
        }

        // Shop Name
        if(laundryShopName.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(laundryShopName.id, 'Please input a valid Shop Name.');
        }
        else {
            dynamicFieldErrorMessage(laundryShopName.id, '');
        }

        // Contact
        if(laundryShopContactNumber.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(laundryShopContactNumber.id, 'Please input a valid Shop Name.');
        }
        else {
            dynamicFieldErrorMessage(laundryShopContactNumber.id, '');
        }

        // Address 
        if(laundryShopAddress.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(laundryShopAddress.id, 'Please input a valid Shop Name.');
        }
        else {
            dynamicFieldErrorMessage(laundryShopAddress.id, '');
        }

        requirements.forEach((requirement, index) => {

            
            const requirementsField = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);

            // Requirements
            if(requirementsField.value.length < 1){
                isValid = false;
                dynamicFieldErrorMessage(requirementsField.id, `Please input a valid ${requirement.requirement_name}.`);
            }
            else {
                dynamicFieldErrorMessage(requirementsField.id, '');
            }
            

            if(requirement.upload_photo == 'True'){

                const imageUpload = document.getElementById(`image-upload${requirement.laundry_shop_requirements_id}`);

                // Requirement image
                if(imageUpload.value.length < 1){
                    isValid = false;
                    dynamicFieldErrorMessage(imageUpload.id, `Please upload a valid ${requirement.requirement_name} image.`);
                }
                else {
                    dynamicFieldErrorMessage(imageUpload.id, '');
                }

            }

        })

        if(isValid){

            if(Object.keys(requirements).length < 1){
                dynamicAlertMessage('You can\'t add a Laundry Shop yet. The super admin hasn\'t set any requirements.', 'warning', 3000);
                return;
            }

            const url = "php-sql-controller/manage-laundry-shop-controller.php";
            const data = {
                openTime: openTime.value,
                closeTime: closeTime.value,
                additionalSchedule: additionalSchedule.value,
                selectedDays: selectedDays,
                laundryShopName: laundryShopName.value,
                laundryShopContactNumber: laundryShopContactNumber.value,
                laundryShopAddress: laundryShopAddress.value,
                ownerId:userId,
                submitLaundryShopInfo: true,
            };
        
            const queriedList = dynamicSynchronousPostRequest(url, data);

            if(isValidJSON(queriedList)){
                let jsonQueriedValue = JSON.parse(queriedList)

                if(jsonQueriedValue.insert_id && jsonQueriedValue.insert_id.length != 0){
                    let shopId = jsonQueriedValue.insert_id
                    uploadRequirementImages(requirements, shopId);
                    dynamicAlertMessage('A request to create a laundry shop has been successfully submitted. Please wait for the admin\'s approval.', 'success', 3000);
                    $('#addLaundryShopMoadl').modal('hide');
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

// function to validate the laundry shop form when updating
function validateUpdatingLaundryShopForm(details){

    let isValid = true;
    let laundryShopName = document.getElementById('laundry-shop-name');
    let laundryShopContactNumber = document.getElementById('laundry-shop-contact-number');
    let laundryShopAddress = document.getElementById('laundry-shop-address');
    let openTime = document.getElementById('open-time-input');
    let closeTime = document.getElementById('close-time-input');
    let scheduleCheck = document.getElementById('schedule-check');
    let additionalSchedule = document.getElementById('additional-schedule');
    let selectedDays = getSelectedDays();
    let shopId;

    // Close and Open Time
    if (openTime.value.length < 1) {
        dynamicFieldErrorMessage(openTime.id, 'Please input a valid Open Time.');
        isValid = false;
    }
    else{
        dynamicFieldErrorMessage(openTime.id, '');
    }

    if (closeTime.value.length < 1) {
        dynamicFieldErrorMessage(closeTime.id, 'Please input a valid Close Time.');
        isValid = false;
    }
    else{
        dynamicFieldErrorMessage(closeTime.id, '');
    }

     // Convert times to Date objects for comparison
    let open = new Date(`1970-01-01T${openTime.value}`);
    let close = new Date(`1970-01-01T${closeTime.value}`);
    if (open >= close) {
        dynamicFieldErrorMessage(closeTime.id, 'Close Time should be later than Open Time.');
        dynamicFieldErrorMessage(openTime.id, 'Open Time should be earlier than Close Time.');
        isValid = false;
    }

    // open days
    if(!validateOpenDays()){
        dynamicFieldErrorMessage(scheduleCheck.id, 'Please select at least one Open Day.');
        isValid = false;
    }
    else{
        dynamicFieldErrorMessage(scheduleCheck.id, '');
    }

    // Shop Name
    if(laundryShopName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryShopName.id, 'Please input a valid Shop Name.');
    }
    else {
        dynamicFieldErrorMessage(laundryShopName.id, '');
    }

    // Contact
    if(laundryShopContactNumber.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryShopContactNumber.id, 'Please input a valid Shop Name.');
    }
    else {
        dynamicFieldErrorMessage(laundryShopContactNumber.id, '');
    }

    // Address 
    if(laundryShopAddress.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(laundryShopAddress.id, 'Please input a valid Shop Name.');
    }
    else {
        dynamicFieldErrorMessage(laundryShopAddress.id, '');
    }

    details.forEach((requirement, index) => {
        const requirementsField = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);
        shopId = requirement.shop_id;

        // Requirements
        if(requirementsField.value.length < 1){
            isValid = false;
            dynamicFieldErrorMessage(requirementsField.id, `Please input a valid ${requirement.requirement_name}.`);
        }
        else {
            dynamicFieldErrorMessage(requirementsField.id, '');
        }

    })

    if(isValid){

        if(Object.keys(details).length < 1){
            dynamicAlertMessage('You can\'t add a Laundry Shop yet. The super admin hasn\'t set any requirements.', 'warning', 3000);
            return;
        }

        const url = "php-sql-controller/manage-laundry-shop-controller.php";
        const data = {
            shopId: shopId,
            openTime: openTime.value,
            closeTime: closeTime.value,
            additionalSchedule: additionalSchedule.value,
            selectedDays: selectedDays,
            laundryShopName: laundryShopName.value,
            laundryShopContactNumber: laundryShopContactNumber.value,
            laundryShopAddress: laundryShopAddress.value,
            ownerId:userId,
            submitLaundryShopInfo: true,
        };
    
        const queriedList = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(queriedList)){
            let jsonQueriedValue = JSON.parse(queriedList)

            if(jsonQueriedValue.message && jsonQueriedValue.message.length != 0){
                uploadRequirementImages(details, shopId);
                dynamicAlertMessage('Laundry shop details has been successfully updated.', 'success', 3000);
                $('#addLaundryShopMoadl').modal('hide');
            }
            else{
                let errorMessage = jsonQueriedValue.error;
                dynamicAlertMessage(errorMessage, 'error', 3000);
            }
        }else{
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
            console.error(queriedList)
        }

        
    }
}

// upload the images of requirements when submitting laundry shop details
function uploadRequirementImages(requirements, shopId){

    let index1 = 0;
    let index2 = 0;

    requirements.forEach((requirement, index) => {

        index1 += 1;

        const requirementId = requirement.laundry_shop_requirements_id;
        const requirementsField = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);
        let imageLink;

        const url = "php-sql-controller/manage-laundry-shop-controller.php";
        let data = {
            requirementId: requirementId,
            shopId: shopId,
            details: requirementsField.value,
            uploadRequirementsNeeded: true,
        };

        if(requirement.submitted_requirements_id && requirement.submitted_requirements_id.length > 0){
             data = {
                requirementId: requirementId,
                shopId: shopId,
                id: requirement.submitted_requirements_id,
                details: requirementsField.value,
                isForUpadate: true,
                uploadRequirementsNeeded: true,
            };
        }

        const insertionResult = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(insertionResult)){
            let jsonResultValue = JSON.parse(insertionResult)

            if(jsonResultValue.message && jsonResultValue.message.length != 0 || jsonResultValue.insert_id && jsonResultValue.insert_id.length != 0){
                let laundryRequirementId;
                if(requirement.submitted_requirements_id){
                    laundryRequirementId = requirement.submitted_requirements_id;
                }else{
                    laundryRequirementId = jsonResultValue.insert_id;
                }
                

                if(requirement.upload_photo == 'True'){

                    console.log('upload photo')

                    const imageUpload = document.getElementById(`image-upload${requirement.laundry_shop_requirements_id}`);

                    if(imageUpload.value.length > 0) {

                        console.log('true upload => ',imageUpload.value)

                        const file = imageUpload.files[0];
                        if (file) {
                            imageLink =  uploadFileToFirebase(file).then((e)=>{

                                index2 += 1;
                                imageLink = e;

                                if (!imageLink.includes("Error uploading file:")){
                                    const url = "php-sql-controller/manage-laundry-shop-controller.php";
                                    const data = {
                                        imageLink: imageLink,
                                        id: laundryRequirementId,
                                        uploadRequirementsNeeded: true,
                                    };
                                    const updateResult = dynamicSynchronousPostRequest(url, data);
    
                                    if(isValidJSON(updateResult)){
                                        let jsonUpdateResultValue= JSON.parse(updateResult)
    
                                        if(!jsonUpdateResultValue.message && jsonUpdateResultValue.message.length < 1){
    
                                            let errorMessage = jsonResultValue.error;
                                            dynamicAlertMessage(errorMessage, 'error', 3000);
    
                                        }
    
                                    }
                                    else{
                                        
                                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                                        console.error(updateResult)
                                    }
                                }

                            });
                        }

                    }
                    else{
                        index2 += 1;
                    }
                }
                else{
                    index2 += 1;
                }
             
            }
            else{
                let errorMessage = jsonResultValue.error;
                dynamicAlertMessage(errorMessage, 'error', 3000);
            }
        }
        else{
            
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
            console.error(insertionResult)
        }

    })

    let checkMessage = setInterval(function(){
        if(index1 == index2){
            clearInterval(checkMessage);
           
            let laundryShopName = document.getElementById('laundry-shop-name');
            let laundryShopContactNumber = document.getElementById('laundry-shop-contact-number');
            let laundryShopAddress = document.getElementById('laundry-shop-address');
            let openTime = document.getElementById('open-time-input');
            let closeTime = document.getElementById('close-time-input');
            let scheduleCheck = document.getElementById('schedule-check');
            let additionalSchedule = document.getElementById('additional-schedule');
    
            laundryShopName.value = '';
            laundryShopContactNumber.value = '';
            laundryShopAddress.value = '';
            openTime.value = '';
            closeTime.value = '';
            scheduleCheck.value = '';
            additionalSchedule.value = '';
            checkDaysFromString('', false)

            requirements.forEach((requirement, index) => {
                const requirementsField = document.getElementById(`requirement${requirement.laundry_shop_requirements_id}`);
                requirementsField.value = '';
    
                if(requirement.upload_photo == 'True'){
                    const imageUpload = document.getElementById(`image-upload${requirement.laundry_shop_requirements_id}`);
                    const imagePreview = document.getElementById(`image-preview${requirement.laundry_shop_requirements_id}`);
                    const removeImageBtn = document.getElementById(`remove-image-btn${requirement.laundry_shop_requirements_id}`);

                    imagePreview.src = '';
                    imagePreview.style.display = 'none';
                    removeImageBtn.style.display = 'none';
                    imageUpload.value = '';
                }
    
            })

            if(laundryShopTableVar){
                laundryShopTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
            }
        }
    },500)

}

// function to check if open days is selected
function validateOpenDays() {
    const checkboxes = document.querySelectorAll('.open-days-input');
    let isChecked = false;

    // Check if any checkbox is checked
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        return false; // Prevent further actions
    }
    return true;
}

// function to get the value of selected days
function getSelectedDays() {
    const checkboxes = document.querySelectorAll('.open-days-input'); // Select all checkboxes
    const selectedDays = [];

    // Loop through checkboxes and collect labels of checked ones
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = document.querySelector(`label[for="${checkbox.id}"]`).textContent;
            selectedDays.push(label);
        }
    });

    // Join the selected days into a string, separated by commas
    return selectedDays.length > 0 ? selectedDays.join(', ') : '';
}

// function that will check the appropriate checkboxes based on the provided day names
function checkDaysFromString(daysString, isViewDetails) {
    const daysArray = daysString.split(',').map(day => day.trim()); // Split and trim the string into an array of days
    
    if(isViewDetails){
        const detailsCheckBox = document.querySelectorAll('.open-days-input-detail');
        detailsCheckBox.forEach((checkBoxes) => {
            checkBoxes.checked = false;
        })
    }
    else{
        const detailsCheckBox = document.querySelectorAll('.open-days-input');
        detailsCheckBox.forEach((checkBoxes) => {
            checkBoxes.checked = false;
        })
    }

    daysArray.forEach(day => {
        // Find all labels and loop through them to find the correct one

        if(isViewDetails){
            const labels = document.querySelectorAll('.for-details-view');
            labels.forEach(label => {
                if (label.textContent.trim() === day) {
                    const checkboxId = label.getAttribute('for'); // Get the corresponding checkbox ID from 'for' attribute
                    const checkbox = document.getElementById(checkboxId);
                    if (checkbox) {
                        checkbox.checked = true; // Check the checkbox if it matches the day
                    }
                }
            });
        }else{
            const labels = document.querySelectorAll('.form-check-label');
            labels.forEach(label => {
                if (label.textContent.trim() === day) {
                    const checkboxId = label.getAttribute('for'); // Get the corresponding checkbox ID from 'for' attribute
                    const checkbox = document.getElementById(checkboxId);
                    if (checkbox) {
                        checkbox.checked = true; // Check the checkbox if it matches the day
                    }
                }
            });
        }

        
    });
}
