<!DOCTYPE html><!--
* CoreUI - Free Bootstrap Admin Template
* @version v5.1.0
* @link https://coreui.io/product/free-bootstrap-admin-template/
* Copyright (c) 2024 creativeLabs Łukasz Holeczek
* Licensed under MIT (https://github.com/coreui/coreui-free-bootstrap-admin-template/blob/main/LICENSE)
-->
<html lang="en">
  <head>
    <?php include ("resources.php"); ?>
    <title>Login</title>
  </head>
  <body>
  <script>
  showLoader();
  </script>
    <!-- Modal Area -->
    <!-- laundry owner reg -->
    <div class="modal fade" id="AddLaundryOwnerModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="AddLaundryOwnerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddLaundryOwnerModalLabel">Laundry Owner Form</h5>
            <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="row g-3 needs-validation">
              <!-- First Name -->
              <div class="col-md-6">
                <label for="laundry-owner-first-name" class="form-label">First Name</label>
                <input type="text" placeholder="First Name" maxlength="50" class="form-control" id="laundry-owner-first-name" required>
                <div id="laundry-owner-first-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label for="laundry-owner-Last-name" class="form-label">Last Name</label>
                <input type="text" placeholder="Last Name" maxlength="50" class="form-control" id="laundry-owner-Last-name" required>
                <div id="laundry-owner-Last-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Username -->
              <div class="col-md-6">
                <label for="laundry-owner-username" class="form-label">Username</label>
                <input type="text" placeholder="Username" maxlength="50" class="form-control" id="laundry-owner-username" required>
                <div id="laundry-owner-username-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label for="laundry-owner-email" class="form-label">Email</label>
                <input type="text" placeholder="Email" maxlength="100" class="form-control" id="laundry-owner-email" required>
                <div id="laundry-owner-email-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Address -->
              <div class="col-md-12">
                <label for="laundry-owner-adress" class="form-label">Address</label>
                <input type="text" placeholder="Address" maxlength="255" class="form-control" id="laundry-owner-adress" required>
                <div id="laundry-owner-adress-error-feedback" class="invalid-feedback">
                </div>
              </div>

               <!-- Password -->
               <div class="col-md-6">
                <label for="laundry-owner-password" class="form-label">Password</label>
                <input type="password" placeholder="Password" maxlength="50" value="" class="form-control" id="laundry-owner-password" required>
                <div id="laundry-owner-password-error-feedback" class="invalid-feedback">
                </div>
              </div>

              
              <!-- Re Type New Password -->
              <div class="col-md-6 col-sm-12">
                  <label for="retype-laundry-owner-password-input" class="form-label">Retype New Password</label>
                  <input type="password" placeholder="Retype New Password" maxlength="50" class="form-control" id="retype-laundry-owner-password-input" required>
                  <div id="retype-laundry-owner-password-input-error-feedback" class="invalid-feedback">
                  </div>
              </div>

              <!-- Phone -->
              <div class="col-md-12">
                <label for="laundry-owner-phone" class="form-label">Phone</label>
                <input type="text" placeholder="Phone" maxlength="15" class="form-control" id="laundry-owner-phone" required>
                <div id="laundry-owner-phone-error-feedback" class="invalid-feedback">
                </div>
              </div>

            </div>
            
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">Close</button> -->
            <button type="button" class="btn btn-primary" id="add-laundry-owner-submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <!-- customer reg -->
    <div class="modal fade" id="addCustomerModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCustomerModalLabel">Customer Form</h5>
            <button type="button" id="laundry-customer-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

            <div class="row g-3 needs-validation">
              <!-- First Name -->
              <div class="col-md-6">
                <label for="laundry-customer-first-name" class="form-label">First Name</label>
                <input type="text" placeholder="First Name" maxlength="50" class="form-control" id="laundry-customer-first-name" required>
                <div id="laundry-customer-first-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <label for="laundry-customer-Last-name" class="form-label">Last Name</label>
                <input type="text" placeholder="Last Name" maxlength="50" class="form-control" id="laundry-customer-Last-name" required>
                <div id="laundry-customer-Last-name-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Username -->
              <div class="col-md-6">
                <label for="laundry-customer-username" class="form-label">Username</label>
                <input type="text" placeholder="Username" maxlength="50" class="form-control" id="laundry-customer-username" required>
                <div id="laundry-customer-username-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <label for="laundry-customer-email" class="form-label">Email</label>
                <input type="text" placeholder="Email" maxlength="100" class="form-control" id="laundry-customer-email" required>
                <div id="laundry-customer-email-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <!-- Address -->
              <div class="col-md-12">
                <label for="laundry-customer-adress" class="form-label">Address</label>
                <input type="text" placeholder="Address" maxlength="255" class="form-control" id="laundry-customer-adress" required>
                <div id="laundry-customer-adress-error-feedback" class="invalid-feedback">
                </div>
              </div>

               <!-- Password -->
               <div class="col-md-6">
                <label for="laundry-customer-password" class="form-label">Password</label>
                <input type="password" placeholder="Password" maxlength="50" value="" class="form-control" id="laundry-customer-password" required>
                <div id="laundry-customer-password-error-feedback" class="invalid-feedback">
                </div>
              </div>

              
              <!-- Re Type New Password -->
              <div class="col-md-6 col-sm-12">
                  <label for="retype-laundry-customer-password-input" class="form-label">Retype New Password</label>
                  <input type="password" placeholder="Retype New Password" maxlength="50" class="form-control" id="retype-laundry-customer-password-input" required>
                  <div id="retype-laundry-customer-password-input-error-feedback" class="invalid-feedback">
                  </div>
              </div>

              <!-- Phone -->
              <div class="col-md-12">
                <label for="laundry-customer-phone" class="form-label">Phone</label>
                <input type="text" placeholder="Phone" maxlength="15" class="form-control" id="laundry-customer-phone" required>
                <div id="laundry-customer-phone-error-feedback" class="invalid-feedback">
                </div>
              </div>

            </div>
            
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">Close</button> -->
            <button type="button" class="btn btn-primary" id="add-laundry-customer-submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Area -->


    <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card-group d-block d-md-flex row">
              <div class="card col-md-7 p-4 mb-0">
                <div class="card-body">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <div class="input-group mb-3"><span class="input-group-text">
                      <svg class="icon">
                        <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
                      </svg></span>
                    <input class="form-control" maxlength="50" id="username-field" type="text" placeholder="Username">
                    <div id="username-field-error-feedback" class="invalid-feedback">
                     
                    </div>
                  </div>
                  <div class="input-group mb-4"><span class="input-group-text">
                      <svg class="icon">
                        <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-lock-locked"></use>
                      </svg></span>
                    <input class="form-control" maxlength="50" id="password-field" type="password" placeholder="Password">
                    <div id="password-field-error-feedback" class="invalid-feedback">
                     
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary px-4" id="login-button" type="button">Login</button>
                    </div>
                    <div class="col-6 text-end">
                      <a class="btn btn-link px-0 hoverBlack" type="button" href="landingpage/">Go to landing page</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card col-md-5 text-white bg-primary py-5">
                <div class="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Streamline Your Laundry Business with Cutting-Edge Management and POS Solutions.</p>
                    <button data-coreui-toggle="modal" data-coreui-target="#create-user-account-modal" class="btn btn-lg btn-outline-light mt-3" id="create-customer-button"  type="button">Create User Account</button>
                    <div class="col-12 text-center">
                      <a data-coreui-toggle="modal" data-coreui-target="#account-recovery-modal"  class="btn btn-link px-0 hoverBlack" id="" type="button" style="color: white;">Forgot Password</a>

                      <style>
                        .hoverBlack:hover {
                              color: black !important;            /* Change text color to white */
                              cursor: pointer;         /* Change the cursor to pointer for better UX */
                          }

                        
                      </style>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <script src="js/login.js"></script>


  </body>
</html>