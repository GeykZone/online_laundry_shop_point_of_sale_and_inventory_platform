dynamicHeaderLowerText('manage-staff.php', 'Manage Staff', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
let addStaffModalLabel = document.getElementById('addStaffModalLabel').innerText = sessionStorage.getItem('sessionShopName') + ' Staff Creation Form';
showHideFunctions();
let staffTable = document.getElementById('staff-table');
let staffDataTableVar;
let staffFirstName = document.getElementById('staff-first-name');
let staffLastName = document.getElementById('staff-Last-name');
let staffUsername = document.getElementById('staff-username');
let staffEmail = document.getElementById('staff-email');
let staffAdress = document.getElementById('staff-adress');
let staffPhone =  document.getElementById('staff-phone');
let staffPassword = document.getElementById('staff-password');
let addStaffSubmitBtn = document.getElementById('add-staff-submit-btn')
const randomNo = generateRandomNumber(4);
manageServiceMoreSessionStorage(false, false);

// blur event for to get the staff first name
staffFirstName.addEventListener('blur', function(e){
    const inputValue = e.target.value;

    generateStaffUsername(inputValue, staffLastName.value)
})

// blur event for to get the staff last name
staffLastName.addEventListener('blur', function(e){
    const inputValue = e.target.value;

    generateStaffUsername(staffFirstName.value, inputValue)
})

// event to submit the staff information
addStaffSubmitBtn.addEventListener('click', function(){

    let isValid = true;

    if(staffFirstName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(staffFirstName.id, 'Please input a valid First Name.');
    }
    else {
        dynamicFieldErrorMessage(staffFirstName.id, '');
    }

    if(staffLastName.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(staffLastName.id, 'Please input a valid Last Name.');
    }
    else {
        dynamicFieldErrorMessage(staffLastName.id, '');
    }

    if(staffEmail.value.length < 1 || !isValidEmail(staffEmail)){
        isValid = false;
        dynamicFieldErrorMessage(staffEmail.id, 'Please input a valid Email.');
    }
    else {
        dynamicFieldErrorMessage(staffEmail.id, '');
    }

    if(staffAdress.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(staffAdress.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(staffAdress.id, '');
    }

    if(staffPhone.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(staffPhone.id, 'Please input a valid Address.');
    }
    else {
        dynamicFieldErrorMessage(staffPhone.id, '');
    }


    if(isValid){
        
        const url = "php-sql-controller/login-controller.php";
        const data = {
            addNewLaundryOwner: true,
            firstName:staffFirstName.value,
            lastName:staffLastName.value,
            username:staffUsername.value,
            password:staffPassword.value,
            email:staffEmail.value,
            phoneNumber:staffPhone.value,
            address:staffAdress.value,
            isForStaff:true
        };

        const detailsList = dynamicSynchronousPostRequest(url, data);

        if(isValidJSON(detailsList)){

            const details = JSON.parse(detailsList);

            if (!`${details}`.includes("Error:")) {

                const user_staff_id = details;

                const url = "php-sql-controller/manage-staff-controller.php";
                const data = {
                    addStaff: true,
                    user_id:user_staff_id,
                    shop_id:sessionStorage.getItem('sessionShopId')
                };

                const StaffdetailsList = dynamicSynchronousPostRequest(url, data);

                if(isValidJSON(StaffdetailsList)){

                    const staffDeatails = JSON.parse(StaffdetailsList);
                
                    if(Object.keys(staffDeatails).length > 0){

                        console.log(staffDeatails.insert_id)
                
                        $('#addStaffModal').modal('hide')
                        staffFirstName.value = ''
                        staffLastName.value = ''
                        staffUsername.value = ''
                        staffEmail.value = ''
                        staffPhone.value = ''
                        staffAdress.value = ''
                       if(staffDeatails.insert_id){
                             dynamicAlertMessage('New staff member has been added successfully.', 'success', 3000)
                             
                            if(staffDataTableVar){
                                staffDataTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                            }
                       }
                       else{
                        dynamicAlertMessage(staffDeatails.error, 'error', 3000);
                       }
                
                    }
                    else{
                        console.error(StaffdetailsList);
                        dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                    }
                    
                }
                else{
                    console.error(StaffdetailsList);
                    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
                }
               
            } else {
                console.log(details)
                dynamicAlertMessage(details, 'error', 3000);
            }
            
        }
        else{
            console.error(detailsList);
            dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
        }

    }


})

// Add event listeners for 'keydown' (for typing) and 'paste' events
staffPhone.addEventListener('keydown', function(event) {
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
staffPhone.addEventListener('paste', function(event) {
    // Get the pasted data
    const pasteData = event.clipboardData.getData('text');

    // Allow only numbers, spaces, dashes, and parentheses in the pasted data
    const allowedCharacters = /^[0-9 \-\(\)]+$/;

    if (!allowedCharacters.test(pasteData)) {
        event.preventDefault(); // Prevent the paste if invalid characters are found
    }
});

// initialize the laundry staff list table
if(staffTable){
    function laundryOwnerDataTable(){

        var ajax_url = "php-sql-controller/manage-staff-controller.php";
        let tableParamValue = {
            showStaffList: true,
            shop_id: sessionStorage.getItem('sessionShopId')
        }

        if ( ! $.fn.DataTable.isDataTable(`#${staffTable.id}`) ) { // check if data table is already exist
        
            staffDataTableVar = $(`#${staffTable.id}`).DataTable({
      
            
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
            pageLength : 10,
            buttons: [
              {
                  extend: 'excel',
                  text: 'Export Excel',
                  className: 'export-excel-btn',
                  title: 'Laundry Staff List',
                  exportOptions: {
                      // Specify columns to be included (0 to 8 in this case)
                      columns: function (idx, data, node) {
                          // Include columns 0 to 8
                          return idx >= 1 && idx <= 8;
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

                    let actionButtonText;
                    let buttonType;

                    if(row[7] == 'Active'){
                        actionButtonText = "Deactivate";
                        buttonType = 'btn-secondary'
                    }
                    else if(row[7] == 'Inactive'){

                        actionButtonText = "Activate";
                        buttonType = 'btn-success'
                    }

                     // Serialize the row object to JSON and escape it for HTML
                     const serializedRow = encodeURIComponent(JSON.stringify(row));

                    let actionButton;
                    actionButton = `<button type="button" onClick="activateDeactivateLaundryStaff('${serializedRow}')" class="btn ${buttonType} text-white" >${actionButtonText}</button> `
                    return actionButton;
                            
                },
                
             },
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
            ],
          });    
        }

    }
    laundryOwnerDataTable();

    let navBtnContainer = document.getElementById('nav-btn-container');
    let navfilterContainer = document.getElementById('nav-search-container');
    let dataTableButtons = document.querySelector('.dt-buttons');
    let dataTablefilter = document.querySelector('.dataTables_filter');
    let dataTableInfo = document.querySelector('.dataTables_info');
    let dataTablePaginate = document.querySelector('.dataTables_paginate');
    let navFooterContainer = document.getElementById('nav-footer-container');
    let dataTableLength = document.querySelector('.dataTables_length');

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

// function to generate a default username for the laundry shop staff
function generateStaffUsername(fname, lname){
    staffUsername.value = fname +'_'+ lname +'_'+ randomNo;
}

// deactivate or activate the laundry owner
function activateDeactivateLaundryStaff(row) { 
    
    // Given string
    let str = row;

    // Split the string into an array
    let values = JSON.parse(decodeURIComponent(row));

    // Define the keys for the JSON object
    let keys = ["id", "firstName", "lastName", "username", "email", "phoneNumber", "address", "activation_status"];

    // Create a JSON object by mapping keys to values
    let jsonObj = {};
    keys.forEach((key, index) => {
        jsonObj[key] = values[index];
    });

    const laundryOwnerId = jsonObj.id;
    const activationStatus = jsonObj.activation_status
    let updatedActivationStatus;

    // alert('Status => ' + activationStatus+ '\n Id => '+laundryOwnerId)

    if(activationStatus == 'Inactive'){
        updatedActivationStatus = 'Active';
    }
    else{
        updatedActivationStatus = 'Inactive';
    }

    const url = "php-sql-controller/manage-owner-controller.php";
    const data = {
        activateDeactivateLaundryOwner: true,
        laundryOwnerId: laundryOwnerId,
        updatedActivationStatus: updatedActivationStatus
    };
  
    dynamicPostRequest(url,data )
    .then((response) => {
        if(isValidJSON(response)){

            if(JSON.parse(response).includes('User activation status updated successfully.')){
                if(staffDataTableVar){
                    staffDataTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
                }
                dynamicAlertMessage('User activation status updated successfully.', 'success', 3000);
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


