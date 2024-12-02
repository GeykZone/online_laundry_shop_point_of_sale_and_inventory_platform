
<!-- Modal Area -->
    <!-- configuration modal -->
    <div class="modal fade" id="configModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="configModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="configModalLabel">Configuration</h5>
                <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                <div class="row g-3 needs-validation px-3">

                    <div class="col-12 align-items-center d-flex flex-column gap-2 px-0">
                        <button id="change-main-logo" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-camera"></span>Change Profile Image</button>

                        <!-- Hidden file input -->
                        <input type="file" id="logo-input" style="display: none;" accept="image/*">

                        <!-- Image preview container -->
                        <div id="image-preview-container" class="d-flex flex-column align-items-start mt-2">
                            <img src="" alt="User" width="100%" height="300" id="default-image-preview" class="sidebar-brand-full shadow rounded-4">
                        </div>

                        <!-- logo change buttons -->
                        <div id="logo-change-button-container" class="d-flex flex-row align-items-start mt-2 gap-2">
                        </div>
                    </div>

                    <div class="col-12  needs-validation row g-3  px-0">

                        <!-- New First Name -->
                        <div class="col-md-6 col-sm-12 admin d-none">
                            <label for="new-first-name-input" class="form-label">New First Name</label>
                            <input type="text" placeholder="New First Name" maxlength="50" class="form-control" id="new-first-name-input" required>
                            <div id="new-first-name-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Last Name -->
                        <div class="col-md-6 col-sm-12 admin d-none">
                            <label for="new-last-name-input" class="form-label">New Last Name</label>
                            <input type="text" placeholder="New Last Name" maxlength="50" class="form-control" id="new-last-name-input" required>
                            <div id="new-last-name-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Username -->
                        <div class="col-12">
                            <label for="new-username-input" class="form-label">New Username</label>
                            <input type="text" placeholder="New Username" maxlength="50" class="form-control" id="new-username-input" required>
                            <div id="new-username-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Password -->
                        <div class="col-md-6 col-sm-12">
                            <label for="new-password-input" class="form-label">New Password</label>
                            <input type="password" placeholder="New Password" maxlength="50" class="form-control" id="new-password-input" required>
                            <div id="new-password-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- Re Type New Password -->
                        <div class="col-md-6 col-sm-12">
                            <label for="retype-new-password-input" class="form-label">Retype New Password</label>
                            <input type="password" placeholder="Retype New Password" maxlength="50" class="form-control" id="retype-new-password-input" required>
                            <div id="retype-new-password-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Address -->
                        <div class="col-12">
                            <label for="new-address-input" class="form-label">New Address</label>
                            <input type="text" placeholder="New Address" maxlength="50" class="form-control" id="new-address-input" required>
                            <div id="new-address-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Email -->
                        <div class="col-md-6 col-sm-12">
                            <label for="new-email-input" class="form-label">New Email</label>
                            <input type="text" placeholder="New Email" maxlength="50" class="form-control" id="new-email-input" required>
                            <div id="new-email-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <!-- New Phone -->
                        <div class="col-md-6 col-sm-12">
                            <label for="new-phone-input" class="form-label">New Phone</label>
                            <input type="text" placeholder="New Phone" maxlength="50" class="form-control" id="new-phone-input" required>
                            <div id="new-phone-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                    
                        <!-- logo change buttons -->
                        <div id="update-userinfo-button-container" class="d-flex flex-row align-items-start mt-2 py-3 gap-2">
                            <button id="update-userinfo-button" class=" btn btn-primary text-white">Submit Changes</button>
                        </div>

                    </div>

                    <!-- Shop Config -->
                    <div class="col-12 align-items-center laundry-owner is-shop d-none d-flex flex-column gap-2 px-0">
                        <button id="change-main-logo-shop" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center"><span class="fa-solid fa-camera"></span>Change/Add Shop Logo</button>

                        <!-- Hidden file input -->
                        <input type="file" id="logo-input-shop" style="display: none;" accept="image/*">

                        <!-- Image preview container -->
                        <div id="image-preview-container-shop" class="d-flex flex-column align-items-start mt-2">
                            <img src="" alt="User" width="100%" height="300" id="default-image-preview-shop" class="sidebar-brand-full shadow rounded-4">
                        </div>

                        <!-- logo change buttons -->
                        <div id="logo-change-button-container-shop" class="d-flex flex-row align-items-start mt-2 gap-2">
                        </div>
                    </div>

                </div>
                
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>

    <!-- transaction list -->
    <div class="modal fade" id="viewNoftiicationList" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="viewNoftiicationListLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl" style="max-width: 1400px;">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="viewNoftiicationListLabel">Transaction List</h5>
                <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="row g-3" id="transaction-list-modal-table-container">

                    <div class="text-center"><p id="transaction-list-info-message" class="">There is no unread transaction at the moment.</p></div>

                    <div id="transaction-list-table-container" class="row g-3 px-4"> 
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
                        

                        <div class="col-6 col-12-504px align-items-center d-flex flex-wrap gap-2 px-0" id="notif-nav-btn-container">
                        </div>

                        <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="notif-nav-search-container">
                        </div>


                        <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="laundry-owners-table-container">
                        <table class="table table-striped nowrap content-table" id="notif-customer-transaction-table" width="100%">
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

                        <div class="col-12 mt-3 px-0 dataTables_wrapper" id="notif-nav-footer-container">
                        </div>
                    </div>

                </div>
                
            </div>
            

            <div class="modal-footer">
            </div>
            </div>
        </div>
    </div>

    <!-- manage transaction modal -->
    <div class="modal fade" id="manageTransactionModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="manageTransactionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="manageTransactionModalLabel">Transaction Details</h5>
                <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body mb-3">

                <h4>Selected Service</h4>
                <div class="card mb-3 responsive-card">
                    <div class="row g-0">
                        <div class="col img-container bg-dark-subtle">
                        <img src="https://cdn-icons-png.flaticon.com/512/4727/4727225.png" alt="User" class="product-image">
                        </div>
                        <div class="col content-container d-flex flex-wrap flex-column">
                        <div class="card-body">
                            <h5 class="card-title" id="notify-checkout-selected-service">Decolor Clothes</h5>
                            <p class="card-text" id="notify-checkout-selected-service-description">Minimum 1kg to 5kg</p>
                            <p class="card-text" id="notify-checkout-selected-service-price">40</p>
                        </div>
                        </div>
                    </div>
                </div>

                <div class=" d-flex mt-3 mb-4 gap-2">
                        <button id="change-service-from-notif-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">Change Service</button>
                </div>

                <div class="row g-3 mb-3 needs-validation">
                    <div class="col-12">
                        <label for="notify-checkout-clothes-weight-input" class="form-label">Estimated Clothes Weight (Kg)</label>
                        <input type="text" placeholder="Estimated Clothes Weight (Optional)" maxlength="50" class="form-control" id="notify-checkout-clothes-weight-input" required>
                        <div id="notify-checkout-clothes-weight-input-error-feedback" class="invalid-feedback">
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3 needs-validation">
                    <div class="col-12">
                        <label for="notify-checkout-initial-input" class="form-label">Initial</label>
                        <input type="text" placeholder="Clothes Weight" maxlength="50" class="form-control" id="notify-checkout-initial-input" required>
                        <div id="notify-checkout-initial-input-error-feedback" class="invalid-feedback">
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3 needs-validation">
                    <div class="col-12">
                        <label for="details-transaction-status" class="form-label">Transaction Status</label>
                        <select id="details-transaction-status" class="form-select form-select" aria-label=".form-select-sm example" >
                        <option value='' selected>Select Option...</option>
                        <option value="Approved">Approved</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Ready-to-Pick-Up">Ready to Pick-Up</option>
                        <option value="Picked-Up">Picked-Up</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                        </select>
                        <div id="details-transaction-status-error-feedback" class="invalid-feedback">
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3 needs-validation">
                    <div class="col-12">
                        <label for="notify-checkout-total-input" class="form-label">Total Payable</label>
                        <input type="text" disabled placeholder="Clothes Weight" maxlength="50" class="form-control" id="notify-checkout-total-input" required>
                        <div id="notify-checkout-total-input-error-feedback" class="invalid-feedback">
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3 needs-validation">
                    <div class="col-12">
                        <label for="other-transaction-changes-description" class="form-label">Other Transaction Changes Description</label>
                        <textarea class="form-control" id="other-transaction-changes-description" rows="3"></textarea>
                    </div>
                </div>

                <style>
                /* General card styling */
                .responsive-card {
                    display: flex;
                    flex-direction: row;
                }

                /* Default image size */
                .product-image {
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                    margin: auto;
                }

                .img-container {
                    max-width: 200px;
                }

                /* Media Query for screen widths of 1199px or smaller */
                @media (max-width: 1199px) {
                    .responsive-card {
                    flex-direction: column;
                    text-align: center;
                    }

                    .img-container, .content-container {
                    width: 100%;
                    }

                    .product-image {
                    width: 150px;
                    height: 150px;
                    }
                }

                @media (max-width: 1199px) {

                    .img-container {
                        max-width: 100%;
                    }
                }

                </style>


                <h4 id="notify-checkout-product-container-label">Selected Product</h4>
                <div  class=" overflow-y-hidden rounded-3 mt-3 mb-3 px-3" >
                    <div id="notify-checkout-product-container" class="row overflow-y-scroll g-3" style="max-height: 500px;">
                    </div>

                    <div class=" d-flex mt-3 gap-2">
                        <button id="add-more-product" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">More Products</button>
                    </div>
                </div>

                <h4 id="notify-checkout-more-product-container-label" class="added-more-product d-none">Added Product</h4>
                <div  class=" overflow-y-hidden rounded-3 mt-3 mb-3 px-3 added-more-product d-none" >
                    <div id="added-more-product-container" class="row overflow-y-scroll g-3" style="max-height: 500px;">
                    </div>
                </div>

                <h4>Discount List</h4>
                <div  class=" overflow-y-hidden rounded-3 mt-3 mb-3 px-3" >
                    <div id="notify-checkout-discount-container" class=" overflow-y-scroll g-3" style="max-height: 500px;">                
                    </div>
                    <!-- <div class=" d-flex gap-2">
                        <button id="add-more-discount" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">Add More Discount</button>
                    </div> -->
                </div>             

                </div>                
                <div class="modal-footer">
                     <button id="rate-shop" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Rate Shop</button>
                     <button id="mark-as-read-notification" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Mark as Read</button>
                     <button id="back-to-notification-list" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Back</button>
                     <button id="transaction-submit-changes" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <!-- service-->
    <div class="modal fade" id="changeService" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="changeServiceLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="changeServiceLabel">Change Service</h5>
                <button type="button" id="changeService-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">

                        <div class="container">
                        <div class="row g-4 mb-4" id="change-transaction-service-container">
                        </div>
                        <nav aria-label="Page navigation" id="change-transaction-service-pagination">
                            <ul class="pagination pagination"></ul>
                        </nav>
                        <div class="d-flex justify-content-center d-none" id="change-transaction-empty-service-identifier">
                            <p>Shop does not have any service yet.</p>
                        </div>
                        
                        </div>
                    </div>
                <div class="modal-footer">
                <button id="submit-laundry-shop-service-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Change Service</button>
                <div id="submit-laundry-shop-service-update-container"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- product -->
    <div class="modal fade" id="addMoreProductModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addMoreProductModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addMoreProductModalLabel"><h6>Please select a product for <span id="product-service-name"></span> Laundry Service.</h6></h5>
                <button type="button" id="add-more-product-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="container">

                  <div class="row g-4 mb-4 " id="add-more-order-process-container">
                  </div>

                  <nav aria-label="Page navigation" id="add-more-product-pagination">
                    <ul class="pagination pagination addMore" id="add-more-product-pagination-ui"></ul>
                  </nav>
                  <div class="d-flex justify-content-center d-none" id="add-more-empty-product-identifier">
                    <p>Shop does not have any products yet.</p>
                  </div>
                </div>

                
              </div>
              <div class="modal-footer">
                <button id="add-more-checkout" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center ">Checkout <i class="fa-solid fa-cart-arrow-down"></i></button>
              </div>
            </div>
          </div>
    </div>

    <!-- rating -->
    <div class="modal fade" id="rateShop" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="rateShopLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="rateShopLabel"><h6>Please select a product for <span id="product-service-name"></span> Laundry Service.</h6></h5>
                <button type="button" id="add-more-product-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="container">
                    <div id="comment-form-container" class="needs-validation row g-3">
                        <div class="mb-12">
                            <label for="comment-box-for-rating" class="form-label">Comment</label>
                            <textarea class="form-control" placeholder="Comment" id="comment-box-for-rating" rows="3"></textarea>
                            <div id="comment-box-for-rating-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <div class="col-12">
                            <label for="rating-input" class="form-label">Rating (0 - 5)</label>
                            <input class="form-control" placeholder="Rating" type="number" id="rating-input" name="rating" step="0.1" min="0" max="5" required>
                            <div id="rating-input-error-feedback" class="invalid-feedback">
                            </div>
                        </div>

                        <div class="col-12" ><a  class="btn btn-primary isClickable" id="submit-rating-button">Submit Response</a></div>
                    </div>
                </div>

                
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
    </div>
<!-- Modal Area -->

<header class="header header-sticky p-0 mb-4">

<div class="container-fluid border-bottom px-4">
    <button class="header-toggler" type="button" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()" style="margin-inline-start: -14px;">
    <svg class="icon icon-lg">
        <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
    </svg>
    </button>

    <a id="open-notification-button" class="btn btn-ghost-primary position-relative laundry-owner-and-staff-customer is-shop d-none" data-coreui-toggle="modal" data-coreui-target="#viewNoftiicationList">
        <i class="fa-solid fa-cart-shopping">
        <span class="position-absolute top-0 mt-1 start-100 translate-middle badge rounded-pill bg-danger d-none" id="notif-badge-message">
            0
        </span>
        </i>
    </a>

    <ul class="header-nav ms-auto">
        <h6 id="user-title-head">Customer</h6>
    </ul>

    <ul class="header-nav profileAvatar">
    <li class="nav-item py-1">
        <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
    </li>
    <li class="nav-item dropdown"><a class="nav-link py-0 pe-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
        <div class="avatar avatar-md overflow-hidden"><img class="avatar-img " id="header-avatar" src="" alt="avatar logo"></div>
        </a>
        <div class="dropdown-menu dropdown-menu-end pt-0">
        <div class="dropdown-header bg-body-tertiary text-body-secondary fw-semibold mt-0 mb-2">
            <div class="fw-semibold">Settings</div>
        </div>
        <a class="dropdown-item isClickable" data-coreui-toggle="modal" data-coreui-target="#configModal">
            <svg class="icon me-2">
            <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-settings"></use>
            </svg> Configuration
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item isClickable" id="logout-btn" data-coreui-toggle="modal" data-coreui-target="#logout-confirmation-modal">
            <svg class="icon me-2 ">
                <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-account-logout"></use>
            </svg> Logout
        </a>
        </div>
    </li>
    
    </ul>
</div>
<div class="container-fluid px-3 py-2 border-bottom d-none is-shop laundry-owner-and-staff gap-2" id="user-avatar-container">
    <ul class="header-nav d-flex align-items-center gap-2">
        <div class="avatar avatar-md rounded bg-secondary overflow-hidden">
            <img class="avatar-img rounded" src="" alt="User" id="avatar-user-image">
        </div>
        <h6 class="mt-1" id="avatar-user-label">User</h6>
    </ul>
</div>
<div class="container-fluid header-lower-text-container">
</div>
</header>