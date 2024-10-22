dynamicHeaderLowerText('manage-owner.php', 'Manage Owner', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let laundryOwnerTable = document.getElementById('laundry-owner-table');
let laundryOwnerDataTableVar;

// initialize the laundry owner list table
if(laundryOwnerTable){
    function laundryOwnerDataTable(){

        var ajax_url = "php-sql-controller/manage-owner-controller.php";
        let tableParamValue = {
            showLaundryOwnerList: true
        }

        if ( ! $.fn.DataTable.isDataTable(`#${laundryOwnerTable.id}`) ) { // check if data table is already exist
        
            laundryOwnerDataTableVar = $(`#${laundryOwnerTable.id}`).DataTable({
      
            
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

                    let actionButton;
                    actionButton = `<button type="button" onClick="activateDeactivateLaundryOwner('${row}')" class="btn ${buttonType} text-white" >${actionButtonText}</button> `
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

// deactivate or activate the laundry owner
function activateDeactivateLaundryOwner(row) { 
    
    // Given string
    let str = row;

    // Split the string into an array
    let values = str.split(",");

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

            if(JSON.parse(response) == 'User activation status updated successfully.'){
                if(laundryOwnerDataTableVar){
                    laundryOwnerDataTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
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

