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
    <title>Service and More</title>
  </head>
  <body>
    <script>
    showLoader();
    </script>  
    
    <!-- Modal Area -->
      <!-- service-->
        <div class="modal fade" id="createTransactionMadal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="createTransactionMadalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="createTransactionMadalLabel">Transaction Creation</h5>
                <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="container">
                <div class="row g-4 mb-4" id="transaction-service-container">
                </div>
                <nav aria-label="Page navigation" id="service-pagination">
                  <ul class="pagination pagination"></ul>
                </nav>
                <div class="d-flex justify-content-center d-none" id="empty-service-identifier">
                  <p>Shop does not have any service yet.</p>
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

        <!-- product -->
        <div class="modal fade" id="selectOrderProductModal" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="selectOrderProductModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="selectOrderProductModalLabel"><h6>Please select a product for <span id="product-service-name"></span> Laundry Service.</h6></h5>
                <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">

                <div class="container">

                  <div class="row g-4 mb-4 " id="order-process-container">
                  </div>

                  <nav aria-label="Page navigation" id="product-pagination">
                    <ul class="pagination pagination" id="product-pagination-ui"></ul>
                  </nav>
                  <div class="d-flex justify-content-center d-none" id="empty-product-identifier">
                    <p>Shop does not have any products yet.</p>
                  </div>
                </div>

                
              </div>
              

              <div class="modal-footer">
                <button id="checkout" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center ">Checkout <i class="fa-solid fa-cart-arrow-down"></i></button>
                <div id="submit-laundry-shop-service-update-container"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction Finalization -->
        <div class="modal fade" id="transactionFinalization" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="transactionFinalizationLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="transactionFinalizationLabel">Transaction Finalization</h5>
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
                        <h5 class="card-title" id="check-out-selected-service">Decolor Clothes</h5>
                        <p class="card-text" id="check-out-selected-service-description">Minimum 1kg to 5kg</p>
                        <p class="card-text" id="check-out-selected-service-price">40</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="add-laundry-shop-requirements-form-container" class="row g-3 mb-3 needs-validation">
                  <!-- Clothes Weight -->
                  <div class="col-12">
                    <label for="clothes-weight-input" class="form-label">Clothes Weight (Kg)</label>
                    <input type="text" placeholder="Clothes Weight" maxlength="50" class="form-control" id="clothes-weight-input" required>
                    <div id="clothes-weight-input-error-feedback" class="invalid-feedback">
                    </div>
                  </div>
                </div>

                <style>
                 /* General card styling */
                  .responsive-card {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                  }

                  /* Default image size */
                  .product-image {
                    width: 200px;
                    height: 200px;
                    object-fit: cover;
                    margin: auto;
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

                </style>

 
                <h4 id="selected-product-container-label">Selected Product</h4>
                <div  class=" overflow-y-hidden rounded-3 mt-3 mb-3 px-3" >
                  <div id="selected-products-container" class="row overflow-y-scroll g-3" style="max-height: 500px;">

                  </div>
                </div>

                <h4 id="selected-product-container-label">Discount List</h4>
                <div  class=" overflow-y-hidden rounded-3 mt-3 mb-3 px-3" >
                  <div id="checkout-discount-container" class=" overflow-y-scroll g-3" style="max-height: 500px;">

                  <!-- <div class="card mb-3 responsive-card">
                    <div class="row g-0">
                      <div class="col img-container bg-info">
                        <img src="https://cdn-icons-png.flaticon.com/512/9528/9528844.png" alt="User" class="product-image">
                      </div>
                      <div class="col content-container d-flex flex-wrap flex-column">
                        <div class="card-body ">
                          <h5 class="card-title">Discount Name here</h5>
                          <p class="card-text">Discount Description here</p>
                          <p class="card-text">Discount percent here</p>
                          <labe type="button" class="btn btn-info d-flex justify-content-center gap-2 text-white" for="productSelect${product.product_id}">
                              <input class="form-check-input" type="checkbox" value="${product.product_id}" id="selectedDisountInput">
                              <span id="selectedDisountInputText">Select</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div> -->
  
                  
                  </div>
                </div>             
                
              </div>
              

              <div class="modal-footer">
                <button id="back-to-product-modal-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center ">Back to Products</button>
                <button id="finalize-transaction-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center ">Finalize Transaction</button>
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

        <div class="card mb-3" >
          <div class="row g-0">
            <div class="col-md-4 pt-0">
            <img id="laundry-shoup-service-more-image" src="https://st2.depositphotos.com/2763494/9362/v/450/depositphotos_93625124-stock-illustration-laundry-service-concept-design.jpg" alt="User" class="sidebar-brand-full shadow" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="col-md-8">
              <div class="card-body px-4">

                <h1 class="card-title" id="service-and-more-shop-name">Laundry Shop Name</h1>
                <h1 class="Stars" style="--rating: 5.0;" aria-label=""></h1>
                <h4>5.0</h4>

                <div class="mt-3">
                    <p class="card-text service-more-elements opacity-75">- ${shop.shop_address}</p>
                    <p class="card-text service-more-elements opacity-75">- ${shop.contact_number}</p>
                    <p class="card-text service-more-elements opacity-75">- Open Time: <span>00:00 AM</span></p>
                    <p class="card-text service-more-elements opacity-75">- Close Time: <span>00:00 PM</span></p>
                    <p class="card-text service-more-elements opacity-75">- Days Open: <span>Loading...</span></p>
                    <p class="card-text service-more-elements opacity-75">- Other Schedule Details: <span>N/A</span></p>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button id="open-transaction-creation-modal" class="btn btn-primary me-md-2  d-none costumer" data-coreui-toggle="modal" data-coreui-target="#createTransactionMadal" type="button">Create Transaction <span class="fa-solid fa-money-check ms-2"></span></button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            Comments & Ratings
          </div>
          <div class="card-body">

          <!-- <div id="comment-form-container" class="needs-validation row g-3">
              <div class="mb-12">
                <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
                <textarea class="form-control" placeholder="Comment" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="col-12">
                <label for="rating-input" class="form-label">Rating (0 - 5)</label>
                <input class="form-control" placeholder="Rating" type="number" id="rating-input" name="rating" step="0.1" min="0" max="5" required>
                <div id="rating-input-error-feedback" class="invalid-feedback">
                </div>
              </div>

              <div class="col-12"><a  class="btn btn-primary isClickable">Submit Response</a></div>
          </div> -->

          <div id="comment-list-container" class="gap-3 d-flex flex-column overflow-y-scroll px-4" style="height:500px;">

              <div class="card">
                <h5 class="card-header">Customer</h5>
                <div class="card-body">

                  <h5 class="card-title">Shop is good and clothes are very clean.</h5>
                  <h6 class="Stars" style="--rating: 5.0;" aria-label=""></h6>
                  <h6>5.0</h6>
                  <p>Oct 20, 2024 8:53 PM</p>
                  
                </div>
              </div>

              <div class="card">
                <h5 class="card-header">Customer</h5>
                <div class="card-body">

                  <h5 class="card-title">Shop is good and clothes are very clean.</h5>
                  <h6 class="Stars" style="--rating: 5.0;" aria-label=""></h6>
                  <h6>5.0</h6>
                  <p>Oct 20, 2024 8:53 PM</p>
                  
                </div>
              </div>


              <div class="card">
                <h5 class="card-header">Customer</h5>
                <div class="card-body">

                  <h5 class="card-title">Shop is good and clothes are very clean.</h5>
                  <h6 class="Stars" style="--rating: 5.0;" aria-label=""></h6>
                  <h6>5.0</h6>
                  <p>Oct 20, 2024 8:53 PM</p>
                  
                </div>
              </div>

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
    <script src="js/service-and-more.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>