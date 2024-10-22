<!DOCTYPE html><!--
* CoreUI - Free Bootstrap Admin Template
* @version v5.1.0
* @link https://coreui.io/product/free-bootstrap-admin-template/
* Copyright (c) 2024 creativeLabs Łukasz Holeczek
* Licensed under MIT (https://github.com/coreui/coreui-free-bootstrap-admin-template/blob/main/LICENSE)
-->
<html lang="en">
  <head>
    <!-- Resources -->
    <?php include ("resources.php"); ?>
    <!-- Resources -->
    <title>Manage Services</title>
  </head>
  <body>
    <script>
    if (!sessionStorage.getItem('viewAsLaundryShop') || sessionStorage.getItem('viewAsLaundryShop') !== 'true') {
      window.location = 'home.php';
    }
    showLoader();
    </script>

    <!-- Modal Area -->
      <!-- add laundry shop service-->
      <div class="modal fade" id="addLaundryShopService" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addLaundryShopServiceLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addLaundryShopServiceLabel">Create Service</h5>
              <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <!-- create laundry shop form -->
              <div class="row g-3 needs-validation">

                  <!-- Service Name -->
                  <div class="col-md-6">
                    <label for="service-name" class="form-label">Service Name</label>
                    <input type="text" placeholder="Service Name" maxlength="50" class="form-control" id="service-name" required>
                    <div id="service-name-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="col-md-6">
                    <label for="service-price" class="form-label">Price</label>
                    <input type="text" placeholder="Price" maxlength="10" class="form-control" id="service-price" required>
                    <div id="service-price-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Service Status -->
                  <div class="col-md-6" id="service-status-container" >
                    <label for="service-status" class="form-label">Service Status</label>
                    <select id="service-status" class="form-select form-select" aria-label=".form-select-sm example" >
                      <option value='' selected>Select Option...</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                     <div id="service-status-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="col-md-6" id="service-description-container">
                    <label for="service-description" class="form-label">Description</label>
                    <input type="text" placeholder="Description" maxlength="255" class="form-control" id="service-description" required>
                    <div id="service-description-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

              </div>
              
            </div>
            

            <div class="modal-footer">
              <button id="submit-laundry-shop-service-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Submit Service</button>
              <div id="submit-laundry-shop-service-update-container"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- sivice card modal -->
      <div class="modal fade" id="serviceCardModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="serviceCardModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="serviceCardModalLabel"></h5>
              <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="serviceListBody">

              <!-- create laundry shop form -->
              <!-- <div class="row g-3  needs-validation  bg-dark-subtle text-gray  mt-3 pb-3 px-3 rounded-3">
                  Service Name
                  <div class="col-md-6">
                      <label for="service-name" class="form-label "><h5 class="ms-2 me-2 fa-solid fa-check-to-slot"></h5> Service Name</label>
                      <input type="text" disabled value="Service Name" maxlength="50" class="form-control" id="service-name" required>
                    </div>

                    Price
                    <div class="col-md-6">
                      <label for="service-price" class="form-label"><h5 class="ms-2 me-2 fa-solid fa-check-to-slot"></h5> Price</label>
                      <input type="text" disabled value="Price" maxlength="10" class="form-control" id="service-price" required>
                    </div>

                    Description
                    <div class="col-md-12">
                      <label for="service-description" class="form-label"><h5 class="ms-2 me-2 fa-solid fa-check-to-slot"></h5> Description</label>
                      <input type="text" disabled value="Description" maxlength="255" class="form-control" id="service-description" required>
                    </div>
              </div> -->
              
              
            </div>
            
            <!-- 
            <div class="modal-footer">
              <button id="submit-laundry-shop-service-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Submit Service</button>
              <div id="submit-laundry-shop-service-update-container"></div>
            </div> -->
          </div>
        </div>
      </div>

      <!-- manage discounts -->
      <div class="modal fade" id="discountModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="discountModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="discountModalLabel">Discount Management</h5>
              <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="row g-3 needs-validation px-3">

                <div id="add-discount-form-container" class="row g-3 needs-validation d-none">

                <!-- Discount Name -->
                <div class="col-md-6">
                  <label for="discount-name" class="form-label">Discount Name</label>
                  <input type="text" placeholder="Discount Name" maxlength="50" class="form-control" id="discount-name" required>
                  <div id="discount-name-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <!-- Discount Percent -->
                <div class="col-md-6">
                  <label for="discount-percent" class="form-label">Discount Percent</label>
                  <input type="text" placeholder="Discount Percent" maxlength="50" class="form-control" id="discount-percent" required>
                  <div id="discount-percent-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <!-- Discount Description -->
                <div class="col-md-12">
                  <label for="discount-description" class="form-label">Discount Description</label>
                  <input type="text" placeholder="Discount Description" maxlength="255" class="form-control" id="discount-description" required>
                  <div id="discount-description-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <button id="submit-discount-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center justify-content-center">Submit Discount</button>

                </div>

                <div class="col-6 col-12-504px align-items-center d-flex flex-wrap gap-2 px-0" id="discountManage-nav-btn-container">
                <button id="open-add-discount-form-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-plus"></span>Add Discount</button>
                <button id="hide-add-discount-form-btn" class=" d-none btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-xmark"></span>Close Discount Form</button>
                </div>

                <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="discountManage-nav-search-container">
                </div>

                <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="discountManage-table-container">
                  <table class="table table-striped nowrap content-table" id="discountManage-table" width="100%">
                    <thead class=" table-dark">
                      <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Name</th>
                        <th scope="col">Percent</th>
                        <th scope="col">Description</th>
                        <th scope="col">Discount Status</th>
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


                
                <div class="col-12 mt-3 px-0 dataTables_wrapper" id="discountManage-nav-footer-container">
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
        <div class="container-lg px-4">

        <div class="card">
          <h5 class="card-header">Laundry Shop Services</h5>
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
            <button data-coreui-toggle="modal" id="create-laundry-shop-service-btn" data-coreui-target="#addLaundryShopService" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none"><span class="fa-solid fa-circle-plus"></span>Create Service</button>
            <button id="manage-discount"  data-coreui-toggle="modal" data-coreui-target="#discountModal" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none"><span class="fa-solid fa-tags"></span>Manage Discounts</button>
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            <button id="view-service-card" class="btn btn-ghost-light text-secondary border border-1 d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none"><span class="fa-solid fa-clipboard-list"></span>View Service Card</button>
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="service-list-table-container">
            <table class="table table-striped nowrap content-table" id="service-list-table" width="100%">
              <thead class=" table-dark">
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Service Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Service Status</th>
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
    <script src="js/manage-services.js"></script>


  </body>
</html>