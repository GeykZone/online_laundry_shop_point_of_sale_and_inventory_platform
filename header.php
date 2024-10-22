
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
<!-- Modal Area -->

<header class="header header-sticky p-0 mb-4">

<div class="container-fluid border-bottom px-4">
    <button class="header-toggler" type="button" onclick="coreui.Sidebar.getInstance(document.querySelector('#sidebar')).toggle()" style="margin-inline-start: -14px;">
    <svg class="icon icon-lg">
        <use xlink:href="vendors/@coreui/icons/svg/free.svg#cil-menu"></use>
    </svg>
    </button>

    <ul class="header-nav ms-auto">
        <h6 id="user-title-head">User</h6>
    </ul>

    <ul class="header-nav">
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