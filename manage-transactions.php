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
    <title>Manage Transactions</title>
  </head>
  <body>
    <script>
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
        <div class="container-lg px-4">

        <div class="row g-4 pb-4  align-items-center" id="shop-list-container">

        <!-- <div class="col-sm-6 col-xl-3" >
          <div class="card rounded-4 overflow-hidden" >
            <div class="card-img-top rounded-top-4" >
            <img src="https://wisebusinessplans.com/wp-content/uploads/2023/03/snack-shop-business-plan-sample-1.jpg"
            width="100%"
            height="300"
            style="object-fit: cover;"
            class="card-img-top rounded-top-4"
            alt="...">

            </div>
            <div class="card-body " >
              
              <div class=" overflow-y-scroll mb-3" style="height: 10vh;">
              <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              
              <a href="#" class="btn btn-primary">Service and more</a>
            </div>
          </div>
        </div> -->

       
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
    <script src="js/manage-transactions.js"></script>
    <!-- <script src="js/main.js"></script> -->

  </body>
</html>