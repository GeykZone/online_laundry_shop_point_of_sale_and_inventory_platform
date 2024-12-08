
<html lang="en">
  <head>
    <!-- Resources -->
    <?php include ("resources.php"); ?>
    <!-- Resources -->
    <title>Manage Products</title>
  </head>
  <body>
    <script>
    if (!sessionStorage.getItem('viewAsLaundryShop') || sessionStorage.getItem('viewAsLaundryShop') !== 'true') {
      window.location = 'home.php';
    }
    showLoader();
    </script>

    <!-- Modal Area -->
      <!-- add laundry shop product-->
      <div class="modal fade" id="addLaundryShopProduct" data-coreui-backdrop="static" data-coreui-keyboard="false" tabindex="-1" aria-labelledby="addLaundryShopProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addLaundryShopProductLabel">Add Product</h5>
              <button type="button" id="laundry-form-close-btn" class="btn-close" data-coreui-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <!-- create laundry shop form -->
              <div class="row g-3 needs-validation">

                  <!-- Product Name -->
                  <div class="col-md-6">
                    <label for="product-name" class="form-label">Product Name</label>
                    <input type="text" placeholder="Product Name" maxlength="50" class="form-control" id="product-name" required>
                    <div id="product-name-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Product Brand -->
                  <div class="col-md-6">
                    <label for="product-brand" class="form-label">Product Brand</label>
                    <input type="text" placeholder="Product Brand" maxlength="50" class="form-control" id="product-brand" required>
                    <div id="product-brand-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Product Type -->
                  <div class="col-md-6">
                    <label for="product-type" class="form-label">Product Type</label>
                    <select id="product-type" class="form-select form-select" aria-label=".form-select-sm example" >
                      <option value="Powder">Powder</option>
                      <option value="Liquid">Liquid</option>
                    </select>
                     <div id="product-type-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Unit of Measurement -->
                  <div class="col-md-6">
                    <label for="product_measurement" class="form-label">Unit of Measurement</label>
                    <select id="product_measurement" class="form-select form-select" aria-label=".form-select-sm example" >
                      <option value="Kg">KG</option>
                      <option value="Ml">ML</option>
                      <option value="Cup">CUP</option>
                      <option value="Grams">GRAMS</option>
                      <option value="Sachet">SACHET</option>
                    </select>
                     <div id="product_measurement-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                   <!-- Amount Per Stock -->
                   <div class="col-md-6">
                    <label for="amount_per_stock" class="form-label">Amount per Stock</label>
                    <input type="text" placeholder="Amount per Stock" maxlength="10" class="form-control" id="amount_per_stock" required>
                    <div id="amount_per_stock-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                   <!-- Amount Per Price -->
                   <div class="col-md-6">
                    <label for="amount_per_price" class="form-label">Amount per Price</label>
                    <input type="text" placeholder="Amount per Price" maxlength="10" class="form-control" id="amount_per_price" required>
                    <div id="amount_per_price-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Price -->
                  <div class="col-md-6">
                    <label for="product-price" class="form-label">Price</label>
                    <input type="text" placeholder="Price" maxlength="10" class="form-control" id="product-price" required>
                    <div id="product-price-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="col-md-6">
                    <label for="product-quantity" class="form-label">Stock</label>
                    <input type="text" placeholder="Stock" maxlength="10" class="form-control" id="product-quantity" required>
                    <div id="product-quantity-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Product Status -->
                  <div class="col-md-6" id="product-status-container" >
                    <label for="product-status" class="form-label">Product Status</label>
                    <select id="product-status" class="form-select form-select" aria-label=".form-select-sm example" >
                      <option value='' selected>Select Option...</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                     <div id="product-status-error-feedback" class="invalid-feedback">
                    </div>
                  </div>

                  <!-- Image Upload with Preview and Remove Icon -->
                  <div class="col-md-6" id="product-image-upload-container">
                  <label for="product-image-upload" class="form-label">Upload Product Image</label>
                  <input type="file" accept="image/*" class="form-control" id="product-image-upload" required>
                  <div id="image-error-feedback" class="invalid-feedback"></div>
                  <!-- Preview Section with Remove Icon -->
                  <div id="product-image-preview-container" class="mt-2 position-relative" style="width: 100px;">
                      <img id="product-image-preview" src="" alt="Image Preview" style="display: none; width: 100px; height: 100px; object-fit: cover;">
                      <i id="product-image-remove-btn" class="fa fa-trash-alt" style="display:none; position: absolute; top: 0; right: 0; background-color: rgba(0,0,0,0.5); color: white; cursor: pointer; font-size: 0.9rem; padding: 10px; border-radius: 50%;"></i>
                  </div>
                  <div id="product-image-upload-error-feedback" class="invalid-feedback">wew</div>
                  </div>

              </div>
              
            </div>
            

            <div class="modal-footer">
              <button id="submit-laundry-shop-product-btn" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center d-none">Submit Product</button>
              <div id="submit-laundry-shop-product-update-container"></div>
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
          <h5 class="card-header">Product List</h5>
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
            <button data-coreui-toggle="modal" id="create-laundry-shop-product-btn" data-coreui-target="#addLaundryShopProduct" class="btn btn-primary text-white d-flex flex-row gap-2 align-items-center laundry-owner is-shop d-none"><span class="fa-solid fa-circle-plus"></span>Add Product</button>
            </div>

            <div class="col-6 col-12-504px justify-content-end justify-content-start-504px align-items-center d-flex flex-wrap gap-2 px-0" id="nav-search-container">
            </div>


            <div class="col-12 d-flex flex-wrap gap-4 px-0 overflow-x-auto overflow-y-auto py-0 rounded-3 border-2 border mt-4" id="product-list-table-container">
            <table class="table table-striped nowrap content-table" id="product-list-table" width="100%">
              <thead class=" table-dark">
                <tr>
                  <th scope="col">Action</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Type</th>
                  <th scope="col">Unit of Measurement</th>
                  <th scope="col">Amount per Stock</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Price</th>
                  <th scope="col">Amount per Price</th>
                  <th scope="col">Product Status</th>
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
    <script src="js/manage-products.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>