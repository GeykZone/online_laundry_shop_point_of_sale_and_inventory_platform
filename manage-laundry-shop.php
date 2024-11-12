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
    <title>Manage Laundry Shop</title>
  </head>
  <body>
    <script>
    if (userPosition != 'Admin' && userPosition != 'Laundry Owner') {
      window.location = 'home.php';
    }
    showLoader();
    </script>

    <!-- Modal Area -->

    <!-- add laundry requirements -->
    <div class="modal fade" id="addLaundryShopRequierments" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addLaundryShopRequiermentsLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addLaundryShopRequiermentsLabel">Laundry Shop Requirements</h5>
            <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="row g-3 needs-validation px-3">

              <div id="add-laundry-shop-requirements-form-container" class="row g-3 needs-validation d-none">

              <!-- Requirement Type -->
              <div class="col-12">
                <label for="requirement-type-input" class="form-label">Requirement Type</label>
                <input type="text" placeholder="Requirement Type" maxlength="50" class="form-control" id="requirement-type-input" required>
                <div id="requirement-type-input-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Field Type -->
              <div class="col-md-6">
              <label for="field-type" class="form-label">Field Type</label>
                <select id="field-type" class="form-select form-select" aria-label=".form-select-sm example" >
                  <option value='' selected>Select Option...</option>
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                </select>
                <div id="field-type-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Allow Photo Upload -->
              <div class="col-md-6">
                <label for="allow-photo-upload-select" class="form-label">Allow Photo Upload</label>
                <select id="allow-photo-upload-select" class="form-select form-select" aria-label=".form-select-sm example" >
                  <option value='' selected>Select Option...</option>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
                <div id="allow-photo-upload-select-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <button id="submit-requirement-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center justify-content-center">Submit Requirement</button>

              </div>

              <div class="col-6 col-12-504px align-items-center d-flex flex-wrap gap-2 px-0" id="addLaundryShopRequierments-nav-btn-container">
              <button id="open-add-requirements-form-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-plus"></span>Add Requirement</button>
              <button id="hide-add-requirements-form-btn" class=" d-none btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-circle-xmark"></span>Close Requirement Form</button>
              </div>

              <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="addLaundryShopRequierments-nav-search-container">
              </div>


              <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="addLaundryShopRequierments-table-container">
                <table class="table table-striped nowrap content-table" id="addLaundryShopRequierments-table" width="100%">
                  <thead class=" table-dark">
                    <tr>
                      <th scope="col">Action</th>
                      <th scope="col">Requirement Type</th>
                      <th scope="col">Field Type</th>
                      <th scope="col">Allow Photo Upload</th>
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


              
              <div class="col-12 mt-3 px-0 dataTables_wrapper" id="addLaundryShopRequierments-nav-footer-container">
              </div>

            </div>
            
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>

    <!-- add laundry shop -->
    <div class="modal fade" id="addLaundryShopMoadl" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addLaundryShopMoadlLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addLaundryShopMoadlLabel">Create Laundry Shop</h5>
            <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <!-- create laundry shop form -->
            <div class="row g-3 needs-validation">

                <!-- Shop Name -->
                <div class="col-md-6">
                  <label for="laundry-shop-name" class="form-label">Shop Name</label>
                  <input type="text" placeholder="Shop Name" maxlength="50" class="form-control" id="laundry-shop-name" required>
                  <div id="laundry-shop-name-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <!-- Contact Number -->
                <div class="col-md-6">
                  <label for="laundry-shop-contact-number" class="form-label">Contact Number</label>
                  <input type="text" placeholder="Contact Number" maxlength="15" class="form-control" id="laundry-shop-contact-number" required>
                  <div id="laundry-shop-contact-number-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <!-- Address -->
                <div class="col-md-12">
                  <label for="laundry-shop-address" class="form-label">Address</label>
                  <input type="text" placeholder="Address" maxlength="255" class="form-control" id="laundry-shop-address" required>
                  <div id="laundry-shop-address-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                 <!-- Time Open -->
                 <div class="col-md-6">
                  <label for="open-time-input" class="form-label">Open Time</label>
                  <input type="time" placeholder="Open Time" maxlength="255" class="form-control" id="open-time-input" required>
                  <div id="open-time-input-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                 <!-- Time Close -->
                 <div class="col-md-6">
                  <label for="close-time-input" class="form-label">Close Time</label>
                  <input type="time" placeholder="Close Time" maxlength="255" class="form-control" id="close-time-input" required>
                  <div id="close-time-input-error-feedback" class="invalid-feedback">
                  </div>
                </div>

                <!-- Shop Name -->
                <div class="col-md-12">
                <label class="form-check-label mb-2" >Days Open</label>
                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-monday">
                        <label class="form-check-label" for="shop-schedule-monday">Monday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-tuesday">
                        <label class="form-check-label" for="shop-schedule-tuesday">Tuesday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-wednesday">
                        <label class="form-check-label" for="shop-schedule-wednesday">Wednesday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-thursday">
                        <label class="form-check-label" for="shop-schedule-thursday">Thursday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-friday">
                        <label class="form-check-label" for="shop-schedule-friday">Friday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-saturday">
                        <label class="form-check-label" for="shop-schedule-saturday">Saturday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input open-days-input" type="checkbox" role="switch" id="shop-schedule-sunday">
                        <label class="form-check-label" for="shop-schedule-sunday">Sunday</label>
                    </div>

                    <input class="form-check-input open-days-input d-none" type="checkbox" role="switch" id="schedule-check">
                    <div id="schedule-check-error-feedback" class="invalid-feedback"></div>
                </div>

                <!-- Additional Schedule Details -->
                <div class="col-md-12">
                  <label for="additional-schedule" class="form-label">Additional Schedule Details</label>
                  <input type="text" placeholder="Additional Schedule Details" maxlength="255" class="form-control" id="additional-schedule" required>
                  <div id="additional-schedule-error-feedback" class="invalid-feedback">
                  </div>
                </div>


            </div>

            <!-- laundry shop requirement form -->
            <div class="row g-3 needs-validation mt-3 d-none" id="requirement-form-container">
               <h5>Requirements Section</h5>
            </div>
            
          </div>

          

          <div class="modal-footer">
            <button id="submit-laundry-shop-info-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Submit Laundry Shop</button>
            <div id="submit-laundry-shop-info-update-container"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- add laundry shop more details -->
    <div class="modal fade" id="laundryShopDetailsModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="laundryShopDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="laundryShopDetailsModalLabel">Laundry Shop Details</h5>
            <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <!-- create laundry shop form -->
            <div class="row g-3 px-3 pb-3">

                <div class="col-md-6">
                  <label for="laundry-detail-shop-name" class="form-label">Shop Name</label>
                  <input type="text" placeholder="Shop Name" disabled maxlength="50" class="form-control" id="laundry-detail-shop-name" required>
                </div>

                  <!-- Contact Number -->
                  <div class="col-md-6">
                  <label for="laundry-shop-contact-number-detail" class="form-label">Contact Number</label>
                  <input type="text" placeholder="Contact Number" disabled maxlength="15" class="form-control" id="laundry-shop-contact-number-detail" required>
                </div>

                <!-- Address -->
                <div class="col-md-12">
                  <label for="laundry-shop-address-detail" class="form-label">Address</label>
                  <input type="text" placeholder="Address" disabled maxlength="255" class="form-control" id="laundry-shop-address-detail" required>
                </div>


                <!-- Owner -->
                <div class="col-md-6">
                  <label for="laundry-shop-owner-detail" class="form-label">Owner</label>
                  <input type="text" placeholder="Owner" disabled maxlength="255" class="form-control" id="laundry-shop-owner-detail" required>
                </div>

                <!-- Requirement Status -->
                <div class="col-md-6">
                  <label for="laundry-shop-requirement-detail" class="form-label">Requirement Status</label>
                  <input type="text" placeholder="Requirement Status" disabled maxlength="255" class="form-control" id="laundry-shop-requirement-detail" required>
                </div>

                <!-- Time Open -->
                <div class="col-md-6">
                  <label for="open-time-input-detail" class="form-label">Open Time</label>
                  <input disabled type="time" placeholder="Open Time" maxlength="255" class="form-control" id="open-time-input-detail" required>
                </div>

                 <!-- Time Close -->
                 <div class="col-md-6">
                  <label for="close-time-input-detail" class="form-label">Close Time</label>
                  <input disabled type="time" placeholder="Close Time" maxlength="255" class="form-control" id="close-time-input-detail" required>
                </div>

                <!-- Shop Name -->
                <div class="col-md-12">
                <label class="form-check-label mb-2" >Days Open</label>
                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-monday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-monday-detail">Monday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-tuesday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-tuesday-detail">Tuesday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-wednesday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-wednesday-detail">Wednesday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-thursday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-thursday-detail">Thursday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-friday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-friday-detail">Friday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-saturday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-saturday-detail">Saturday</label>
                    </div>

                    <div class="form-check form-switch">
                        <input disabled class="form-check-input open-days-input-detail" type="checkbox" role="switch" id="shop-schedule-sunday-detail">
                        <label class="form-check-label for-details-view" for="shop-schedule-sunday-detail">Sunday</label>
                    </div>
                </div>

                <!-- Additional Schedule Details -->
                <div class="col-md-12">
                  <label for="additional-schedule-detail" class="form-label">Additional Schedule Details</label>
                  <input disabled type="text" placeholder="Additional Schedule Details" maxlength="255" class="form-control" id="additional-schedule-detail" required>
                </div>


                <!-- Laundry shop requirement form -->
                <div class="row g-3 needs-validation mt-3" id="requirement-detail-container">
                  <h5>Requirements Section</h5>
                </div>

            </div>
            
          </div>
          <div class="modal-footer" id="open-laundry-shop-details-footer">
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
          <h5 class="card-header">Laundry Shops</h5>
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
              <button data-coreui-toggle="modal" data-coreui-target="#addLaundryShopRequierments" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center admin d-none"><span class="fa-solid fa-list-check"></span>Manage Requirements</button>
              <button data-coreui-toggle="modal" id="create-laundry-shop-btn" data-coreui-target="#addLaundryShopMoadl" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner d-none"><span class="fa-solid fa-circle-plus"></span>Create Laundry Shop</button>
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="laundry-shop-table-container">
            <table class="table table-striped nowrap content-table" id="laundry-shop-table" width="100%">
              <thead class=" table-dark">
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Shop Name</th>
                  <th scope="col">Shop Address</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Requirement Status</th> 
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
    <script src="js/manage-laundry-shop.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>