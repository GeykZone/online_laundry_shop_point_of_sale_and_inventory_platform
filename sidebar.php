<div class="sidebar sidebar-dark sidebar-fixed border-end" id="sidebar">
    <div class="sidebar-header border-bottom">
    <div class="sidebar-brand d-flex justify-content-center">
        <img id='sidebar-logo' class="sidebar-brand-full rounded-4" width="100%" height="100" src="" alt="Your Logo Here">

        <svg class="sidebar-brand-narrow" width="32" height="32" alt="Narrow">
        <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-braille"></use>
        </svg>
    </div>
    <button class="btn-close d-lg-none" type="button" data-coreui-dismiss="offcanvas" data-coreui-theme="dark" aria-label="Close" onclick=`coreui.Sidebar.getInstance(document.querySelector(&quot;#sidebar&quot;)).toggle()`></button>
    </div>
    <ul class="sidebar-nav" data-coreui="navigation" data-simplebar="">
    <li class="nav-item"><a class="nav-link" href="home.php">
        <svg class="nav-icon">
            <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-home"></use>
        </svg> Home</a>
    </li>
    <li class="nav-title">MENU</li>
    <li class="nav-item admin d-none"><a class="nav-link" href="manage-owner.php">
        <svg class="nav-icon">
            <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-user"></use>
        </svg> Manage Owner</a>
    </li>
    <li class="nav-item admin-and-laundry-owner d-none"><a class="nav-link" href="manage-laundry-shop.php">
        <span class="fa-solid fa-store nav-icon"></span>  Manage Laundry Shop</a>
    </li>
    
    <li class="nav-item laundry-owner is-shop d-none"><a class="nav-link" href="manage-staff.php">
        <span class="fa-solid fa-elevator nav-icon"></span>  Manage Staff</a>
    </li>

    <li class="nav-item laundry-owner is-shop d-none"><a class="nav-link" href="manage-services.php">
        <span class="fa-solid fa-hard-drive nav-icon"></span>  Manage Services</a>
    </li>

    <li class="nav-item laundry-owner-and-staff is-shop d-none"><a class="nav-link" href="manage-products.php">
        <span class="fa-solid fa-box-open nav-icon"></span>  Manage Products</a>
    </li>

    <li class="nav-item laundry-owner-and-staff is-shop d-none"><a class="nav-link" href="manage-transactions.php">
        <span class="fa-solid fa-cart-flatbed nav-icon"></span>  Manage Transactions</a>
    </li>
    
    </ul>
    <div class="sidebar-footer border-top d-none d-md-flex">
    <button class="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
    </div>
</div>