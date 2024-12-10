dynamicHeaderLowerText('manage-transactions.php', 'Manage Transactions', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let customerTransactionTable = document.getElementById('customer-transaction-table');
let customerTransactionTableVar;
let showTransactionReportTable = document.getElementById('generateTransactionData-table');
let showTransactionReportTableVar;
let yearInputVar = document.getElementById('yearInput')
let generateMonthlyBtn = document.getElementById('generate-monthly-btn');
let generateWeeklyBtn = document.getElementById('generate-weekly-btn');
let generatDailyBtn = document.getElementById('generate-daily-btn');
let tableHeader1 = document.getElementById('tableHeader-1');
let emptyProductIdentifier = document.getElementById('empty-product-identifier');
let generateTransactionDataTableContainer = document.getElementById('generateTransactionData-table-container')

// generate Monthly Sales Report
generateMonthlyBtn.addEventListener('click', function(){

    if(verifySalesYear()){
        generateSales('Monthly');
    }
   
})

// generate Weekly Sales Report
generateWeeklyBtn.addEventListener('click', function(){

    if(verifySalesYear()){
        generateSales('Weekly');
    }
   
})

// generate Weekly Sales Report
generatDailyBtn.addEventListener('click', function(){

    if(verifySalesYear()){
        generateSales('Daily');
    }
   
})

// initialize the laundry staff list table
if(customerTransactionTable){
    function customerTransactionTableFunction(){

        var ajax_url = "php-sql-controller/manage-transactions-controller.php";
        let tableParamValue = {
            showCostumerTransaction: true,
            position: userPosition,
            userId: userId,
        };
        
        // Check if `sessionShopId` exists in sessionStorage
        const sessionShopId = sessionStorage.getItem('sessionShopId');
        if (sessionShopId) {
            tableParamValue.shop_id = sessionShopId;
        }
        

        if ( ! $.fn.DataTable.isDataTable(`#${customerTransactionTable.id}`) ) { // check if data table is already exist
        
            customerTransactionTableVar = $(`#${customerTransactionTable.id}`).DataTable({
      
            
            "deferRender": true,
            "serverSide": true,
            "ajax": {
                url: ajax_url,
                data: tableParamValue,
                "dataSrc": function ( json ) {
                return json.data;
              }      
              
            },
            order: [[8,'desc']],
            
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
                  title: 'Costumer Transactions',
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

                    let actionButton;
                    // Serialize the row object to JSON and escape it for HTML
                    const serializedRow = encodeURIComponent(JSON.stringify(row));

                    actionButton = `<button type="button" onClick="manageTransactionModal('${serializedRow}',false)" class="btn btn-primary text-white" >Manage</button> `
                    return actionButton;
                            
                },
                
             },
              null,
              null,
              null,
              {
                "targets": 4,
                "render": function ( data, type, row, meta ) {
                    return formatToCurrency(`${data}`);
                },
              },
              null,
              null,
              null,
              null,
            ],
          });    
        }

    }
    customerTransactionTableFunction();

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

// Function to load sales report table with setup and cleanup
function generateSales(SalesType) {
    const reportYear = yearInputVar.value;
    const sessionShopId = sessionStorage.getItem('sessionShopId');

    // Update table header based on SalesType
    if (SalesType === 'Daily') {
        tableHeader1.textContent = 'Year-Month-Day';
    } else if (SalesType === 'Weekly') {
        tableHeader1.textContent = 'Year-Week';
    } else if (SalesType === 'Monthly') {
        tableHeader1.textContent = 'Year-Month';
    }

    if(!emptyProductIdentifier.classList.contains('d-none')){
        emptyProductIdentifier.classList.add('d-none');
    }

    if(generateTransactionDataTableContainer.classList.contains('d-none')){
        generateTransactionDataTableContainer.classList.remove('d-none');
    }

    // Helper function to remove only dynamically added elements
    function cleanupCustomDataTableUI() {
        // Remove dynamically added elements within containers by targeting their class or id
        const dataTableButtons = document.querySelector('.dt-buttons');
        const dataTableFilter = document.querySelector('.dataTables_filter');
        const dataTableInfo = document.querySelector('.dataTables_info');
        const dataTablePaginate = document.querySelector('.dataTables_paginate');
        const dataTableLength = document.querySelector('.dataTables_length');

        // Remove elements if they exist
        dataTableButtons?.remove();
        dataTableFilter?.remove();
        dataTableInfo?.remove();
        dataTablePaginate?.remove();
        dataTableLength?.remove();
    }

    // Remove custom UI elements before destroying the DataTable
    cleanupCustomDataTableUI();

    // Destroy the DataTable instance if it exists
    if ($.fn.DataTable.isDataTable(`#${showTransactionReportTable.id}`)) {
        $(`#${showTransactionReportTable.id}`).DataTable().destroy();
    }

    // Reinitialize the DataTable
    showTransactionReportTableVar = $(`#${showTransactionReportTable.id}`).DataTable({
        "deferRender": true,
        "serverSide": false,
        "ajax": {
            url: "php-sql-controller/manage-transactions-controller.php",
            data: function(d) {
                d.showTransactionReport = true;
                d.reportYear = reportYear;
                d.SalesType = SalesType;
                if (sessionShopId) {
                    d.shop_id = sessionShopId;
                }
            },
            "dataSrc": function(json) {
                return json.data;
            }
        },
        order: [[0, 'desc']],
        responsive: true,
        fixedHeader: true,
        searching: true,
        dom: 'Blfrtip',
        pageLength: 10,
        buttons: [
            {
                extend: 'excel',
                text: 'Export Excel',
                className: 'export-excel-btn',
                title: `${SalesType} Sales Report`,
                exportOptions: {
                    columns: function(idx, data, node) {
                        return idx >= 0 && idx <= 2;
                    }
                }
            }
        ],
        "lengthMenu": [[5, 10, 20, 50, 100], [5, 10, 20, 50, 100]],
        "columnDefs": [{
            "targets": 0,
            "orderable": false
        }],
        "language": {
            "info": "Showing _START_ to _END_ of _TOTAL_ entries",
            "infoFiltered": ""
        },
        "columns": [
            null,
            {
                "targets": 1,
                "render": function ( data, type, row, meta ) {
                    return formatToCurrency(`${data}`);
                },
              },
            null
        ]
    });

    // Call to reapply the custom UI setup after reinitialization
    setupCustomDataTableUI();
}

// Helper function to set up custom DataTable elements
function setupCustomDataTableUI() {
    let generateTransactionDataTableContainer = document.getElementById('generateTransactionData-table-container');
    let navBtnContainer = document.getElementById('generateTransactionData-nav-btn-container');
    let navfilterContainer = document.getElementById('generateTransactionData-nav-search-container');
    let dataTableButtons = generateTransactionDataTableContainer.querySelector('.dt-buttons');
    let dataTablefilter = generateTransactionDataTableContainer.querySelector('.dataTables_filter');
    let dataTableInfo = generateTransactionDataTableContainer.querySelector('.dataTables_info');
    let dataTablePaginate = generateTransactionDataTableContainer.querySelector('.dataTables_paginate');
    let navFooterContainer = document.getElementById('generateTransactionData-nav-footer-container');
    let dataTableLength = generateTransactionDataTableContainer.querySelector('.dataTables_length');

    if (navBtnContainer && dataTableButtons) {
        navBtnContainer.appendChild(dataTableButtons);
        let excelBtn = dataTableButtons.querySelector('.buttons-excel');
        excelBtn.classList.add('btn', 'btn-primary', 'd-flex', 'justify-content-center', 'align-items-center', 'gap-2');
        if (excelBtn.classList.contains('dt-button')) {
            excelBtn.classList.remove('dt-button');
        }
    }

    if (dataTablefilter && navfilterContainer && dataTableLength) {
        navfilterContainer.appendChild(dataTableLength);
        navfilterContainer.appendChild(dataTablefilter);

        let dataTablefilterLabel = dataTablefilter.querySelector('label');
        if (dataTablefilterLabel) {
            let searchInput = dataTablefilterLabel.querySelector('input');
            searchInput.classList.add('form-control');
            searchInput.placeholder = 'Search';

            dataTablefilterLabel.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && child.nodeValue.includes('Search:')) {
                    child.remove();
                }
            });
        }

        let labelElement = dataTableLength.querySelector('label');
        if (labelElement) {
            labelElement.querySelector('select').classList.add('form-select');
            labelElement.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && (child.nodeValue.includes('Show') || child.nodeValue.includes('entries'))) {
                    child.remove();
                }
            });
        }
    }

    if (navFooterContainer && dataTableInfo && dataTablePaginate) {
        navFooterContainer.appendChild(dataTableInfo);
        navFooterContainer.appendChild(dataTablePaginate);
    }
}

// function to validate sales report
function verifySalesYear(){
    let isValid = true;

    if(yearInputVar.value.length < 1){
        isValid = false;
        dynamicFieldErrorMessage(yearInputVar.id, 'Please input a year.');
    }
    else {
        dynamicFieldErrorMessage(yearInputVar.id, '');
    }

    return isValid;
}



