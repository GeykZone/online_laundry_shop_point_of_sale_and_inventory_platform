
<html lang="en">
  <head>
    <!-- Resources -->
    <?php include ("resources.php"); ?>
    <!-- Resources -->
    <title>Manage Staff</title>
  </head>
  <body>
    <script>
    if (!sessionStorage.getItem('viewAsLaundryShop') || sessionStorage.getItem('viewAsLaundryShop') !== 'true') {
      window.location = 'home.php';
    }
    showLoader();
    </script>
    <!-- Modal Area -->
    <div class="modal fade" id="addStaffModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addStaffModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStaffModalLabel"></h5>
            <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="row g-3 needs-validation">
              <!-- First Name -->
              <div class="col-md-6">
                <label for="staff-first-name" class="form-label">First Name</label>
                <input type="text" placeholder="First Name" maxlength="50" class="form-control" id="staff-first-name" required>
                <div id="staff-first-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label for="staff-Last-name" class="form-label">Last Name</label>
                <input type="text" placeholder="Last Name" maxlength="50" class="form-control" id="staff-Last-name" required>
                <div id="staff-Last-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Username -->
              <div class="col-md-6">
                <label for="staff-username" class="form-label">Username</label>
                <input type="text" placeholder="Username" disabled maxlength="50" class="form-control" id="staff-username" required>
                <div id="staff-username-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label for="staff-email" class="form-label">Email</label>
                <input type="text" placeholder="Email" maxlength="100" class="form-control" id="staff-email" required>
                <div id="staff-email-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Address -->
              <div class="col-md-12">
                <label for="staff-adress" class="form-label">Address</label>
                <input type="text" placeholder="Address" maxlength="255" class="form-control" id="staff-adress" required>
                <div id="staff-adress-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Phone -->
              <div class="col-md-6">
                <label for="staff-phone" class="form-label">Phone</label>
                <input type="text" placeholder="Phone" maxlength="15" class="form-control" id="staff-phone" required>
                <div id="staff-phone-error-feedback" class="invalid-feedback">
                </div>
              </div>

               <!-- Password -->
               <div class="col-md-6">
                <label for="staff-password" class="form-label">Password</label>
                <input type="text" placeholder="Password" value="admin1234" maxlength="50" disabled value="" class="form-control" id="staff-password" required>
                <div id="staff-password-error-feedback" class="invalid-feedback">
                </div>
              </div>

            </div>
            
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">Close</button> -->
            <button type="button" class="btn btn-primary" id="add-staff-submit-btn">Submit</button>
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

        <div class="card">
          <h5 class="card-header">List of Staff</h5>
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
            <button data-coreui-toggle="modal" id="create-staff-btn" data-coreui-target="#addStaffModal" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none"><span class="fa-solid fa-circle-plus"></span>Create Staff</button>
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="staff-table-container">
            <table class="table table-striped nowrap content-table" id="staff-table" width="100%">
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
    <script src="js/manage-staff.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>