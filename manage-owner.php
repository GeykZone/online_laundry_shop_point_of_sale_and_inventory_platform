
<html lang="en">
  <head>
    <!-- Resources -->
    <?php include ("resources.php"); ?>
    <!-- Resources -->
    <title>Manage Owner</title>
  </head>
  <body>
    <script>
    if (userPosition != 'Admin') {
      window.location = 'home.php';
    }
    showLoader();
    </script>
    <!-- Side Bar Area -->
    <?php include ("sidebar.php"); ?>
    <!-- Side Bar Area -->

    <div class="wrapper d-flex flex-column min-vh-100">
    
      <!-- Header Area -->
      <?php include ("header.php"); ?>
      <!-- Header Area -->

      <div class="body flex-grow-1">
        <div class="container-fluid px-4">

        <div class="card">
          <h5 class="card-header">Laundry Owners</h5>
          <div class="card-body row px-5 py-4">
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
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="laundry-owners-table-container">
            <table class="table table-striped nowrap content-table" id="laundry-owner-table" width="100%">
              <thead class=" table-dark">
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th> 
                  <th scope="col">Address</th>
                  <th scope="col">Activation Status</th>
                  <th scope="col">Active Status</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <!-- <tr>
                  <th scope="row">1</th>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                </tr> -->
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
    <script src="js/manage-owner.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>