dynamicHeaderLowerText('manage-transactions.php', 'Manage Transactions', userPosition);
let sidebarLogo = document.getElementById('sidebar-logo').src = sideBarLogoQuery();
let headerAvatar = document.getElementById('header-avatar').src = sideBarLogoQuery();
showHideFunctions();
let customerTransactionTable = document.getElementById('customer-transaction-table');
let customerTransactionTableVar;

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
                    actionButton = `<button type="button" onClick="manageTransactionModal('${row}',false)" class="btn btn-primary text-white" >Manage</button> `
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
