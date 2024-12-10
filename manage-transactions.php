
<html lang="en">
  <head>
    <!-- Resources -->
    <?php include ("resources.php"); ?>
    <!-- Resources -->
    <title>Manage Owner</title>
  </head>
  <body>
    <script>
    showLoader();
    </script>

    <!-- Modal Area -->
      <!-- generate data -->
      <div class="modal fade" id="generateTransactionData" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="generateTransactionDataLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="generateTransactionDataLabel">Sales Report</h5>
              <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="row g-3 needs-validation px-3">

                <div class="col-6 col-12-504px align-items-center d-flex flex-wrap gap-2 px-0" id="generateTransactionData-nav-btn-container">
                <button id="generate-daily-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-plus"></span>Daily</button>
                <button id="generate-weekly-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-plus"></span>Weekly</button>
                <button id="generate-monthly-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-plus"></span>Montly</button>
                </div>

                <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="generateTransactionData-nav-search-container">
                    <div class="" style=" width: 150px;">
                        <input 
                            type="number" 
                            class="form-control" 
                            id="yearInput" 
                            placeholder="Enter Year" 
                            min="1900" 
                            max="2099" 
                            step="1" 
                            oninput="this.value = this.value.slice(0, 4)"
                            required
                        >
                        <div id="yearInput-error-feedback" class="invalid-feedback">
                        </div>  
                    </div>
                 </div>

                <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4 d-none" id="generateTransactionData-table-container">
                  <table class="table table-striped nowrap content-table" id="generateTransactionData-table" width="100%">
                    <thead class=" table-dark">
                      <tr>
                        <th scope="col" id="tableHeader-1">Date</th>
                        <th scope="col">Total Revenue</th>
                        <th scope="col">Number of Transactions</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                    </tbody>
                  </table>
                </div>

                <div id="empty-product-identifier">
                    <div class="d-flex justify-content-center" >
                      <p>No report has been generated yet.</p>
                    </div>
                </div>

                <div class="col-12 mt-3 px-0 dataTables_wrapper" id="generateTransactionData-nav-footer-container">
                </div>

              </div>
              
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
    <!-- Modal Area -->

    <!-- Side Bar Area -->
    <?php include ("sidebar.php"); ?>
    <!-- Side Bar Area -->

    <div class="wrapper d-flex flex-column min-vh-100">
    
      <!-- Header Area -->
      <?php include ("header.php"); ?>
      <!-- Header Area -->

      <div class="body flex-grow-1">
        <div class="container-fluid px-4">

        <div class="card" >
          <h5 class="card-header">Customer Transactions</h5>
          <div class="card-body row px-5 py-4" id="customer-transaction-card-body">
            <!-- <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->

            <style>
              @media (max-width: 504px) {
                #nav-btn-container, #nav-search-container {
                  flex: 0 0 100%;
                  max-width: 100%;
                }
                
                #nav-search-container {
                  justify-content: flex-start !important;
                  margin-top: 20px;
                }
              }
            </style>
            

            <div class="col-6 col-12-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-btn-container">
              <button id="generate-data" data-coreui-toggle="modal" data-coreui-target="#generateTransactionData" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center  laundry-owner-and-staff is-shop d-none"><span class="fa-solid fa-magnifying-glass-chart"></span>Sales Report</button>
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="laundry-owners-table-container">
            <table class="table table-striped nowrap content-table" id="customer-transaction-table" width="100%">
              <thead class=" table-dark">
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Shop</th>
                  <th scope="col">Service</th>
                  <th scope="col">Payable Amount</th>
                  <th scope="col">Status</th>
                  <th scope="col">Transaction Date</th>
                  <th scope="col">Pick-up Date</th>
                  <th scope="col">Last Update</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
              </tbody>
            </table>
            </div>

            <div class="col-12 mt-3 px-0 dataTables_wrapper" id="nav-footer-container">
            </div>

            
          </div>
        </div>

        </div>
      </div>

    <!-- footer-area -->
      <?php include ("footer.php"); ?>
    <!-- footer-area -->
    </div>
    <!-- CoreUI and necessary plugins-->
    <script src="vendors/@coreui/coreui/js/coreui.bundle.min.js"></script>
    <script src="vendors/simplebar/js/simplebar.min.js"></script>
    <script>
      const header = document.querySelector('header.header');

      document.addEventListener('scroll', () => {
        if (header) {
          header.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
        }
      });
    </script>
    <!-- Plugins and scripts required by this view-->
    <script src="vendors/chart.js/js/chart.umd.js"></script>
    <script src="vendors/@coreui/chartjs/js/coreui-chartjs.js"></script>
    <script src="vendors/@coreui/utils/js/index.js"></script>
    <script src="js/manage-transactions.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>