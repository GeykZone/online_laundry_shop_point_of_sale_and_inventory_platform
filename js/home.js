let setPositionDisplay = userPosition;

if(!userPosition){
     setPositionDisplay = 'Customer';
}

dynamicHeaderLowerText('home.php', 'Home', setPositionDisplay);

let sidebarLogo = document.getElementById('sidebar-logo')
if(sidebarLogo){
    sidebarLogo.src = sideBarLogoQuery();
}

let headerAvatar = document.getElementById('header-avatar')
if(headerAvatar){
    headerAvatar.src = sideBarLogoQuery();
}

showHideFunctions();
manageServiceMoreSessionStorage(false, false);

let page = 1;
let loading = false;
let moreShopsAvailable = true; // Track if more shops are available
let hasShop = [];

function loadMoreShops() {
    if (loading || !moreShopsAvailable) return; // Prevent loading if no more shops

    loading = true;
    const data = { queryShops: true, 
                  page: page, };
    
    if(sessionStorage.getItem('viewAsLaundryShop') && sessionStorage.getItem('viewAsLaundryShop') == 'true'){
        data.shop_id = sessionStorage.getItem('sessionShopId');
    }
    else{

        if(userPosition == 'Laundry Owner'){
            data.user_id = userId;
        }

    }

    // Make the asynchronous request and handle the response
    const response = dynamicSynchronousPostRequest('php-sql-controller/home-controller.php', data);
    if(isValidJSON(response)){
        const shops = JSON.parse(response);

        // Log to debug if shops are loaded correctly
        console.log('Loaded Shops:', shops);
        console.log('Page:', page);

        // Toggle the empty state message
        const emptyMessage = document.getElementById('shop-list-is-empty');
        const shopListContainer = document.getElementById('shop-list-container');

        if (shops.length > 0) {
            hasShop.push(shops);
            emptyMessage.classList.add('d-none'); // Hide the empty message
            shopListContainer.classList.remove('d-none'); // Show shop list container

            shops.forEach(shop => {
                // [Add your existing code to create and append shop cards]
                let shopLogoLink = shop.image_link || 'https://img.freepik.com/premium-photo/3d-render-illustration-question-mark-grey-background_357322-704.jpg';
                let additionalScheduleDetails = '';

                if(shop.additional_schedule_details.length > 1){
                    additionalScheduleDetails = `<span class="card-text opacity-75">- ${shop.additional_schedule_details}</span>`;
                }

                const shopItem = document.createElement('div');
                shopItem.classList.add('col-sm-6', 'col-xl-3');
                shopItem.innerHTML = `
                    <div class="card rounded-4 overflow-hidden border-0 shadow">
                        <div class="card-img-top rounded-top-4 shadow-sm border-0">
                            <img src="${shopLogoLink}" width="100%" height="300" style="object-fit: cover;" class="card-img-top rounded-top-4" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${shop.shop_name}</h5>
                            <div class="overflow-y-scroll d-flex flex-column" style="height: 10vh;">
                                <span class="card-text opacity-75">- ${shop.shop_address}</span>
                                <span class="card-text opacity-75">- ${shop.contact_number}</span>
                                <span class="card-text opacity-75">- Open Time: ${convertToAMPM(shop.open_time)}</span>
                                <span class="card-text opacity-75">- Close Time: ${convertToAMPM(shop.close_time)}</span>
                                <span class="card-text opacity-75">- Days Open: ${shop.days_open}</span>
                                ${additionalScheduleDetails}
                            </div>
                            <h6 class="mt-3">${parseFloat(shop.overall_rating)}</h6>
                            <div class="d-grid mt-3 gap-2">
                                <a id="service-and-more-btn-${shop.shop_id}" class="btn btn-primary shadow-sm">Service and more</a>
                            </div>
                        </div>
                    </div>`;
                shopListContainer.appendChild(shopItem);

                const serviceMoreBtn = document.getElementById(`service-and-more-btn-${shop.shop_id}`);
                serviceMoreBtn.addEventListener('click', (e) => {
                    manageServiceMoreSessionStorage(shop, true);
                    if (areAllServiceMoreSessionStorageItemsSet()) {
                        window.location.href = 'service-and-more.php';
                    
                    } else {
                        console.log("Some session storage items are missing");
                    }
                });
            });

            page++; // Increment page only if new shops are loaded
        } else {
            // Show the empty message if no shops are found
            if (hasShop.length === 0) {
                emptyMessage.classList.remove('d-none');
                shopListContainer.classList.add('d-none');
            }
            moreShopsAvailable = false; // Disable further loading if no more shops are available
        }

        loading = false; // Reset loading flag

        // Check if content height is smaller than the viewport, trigger more loading
        if (document.body.scrollHeight <= window.innerHeight && moreShopsAvailable) {
            loadMoreShops();
        }
    }
}

// Initial load
loadMoreShops();

// Debounce function for scroll and resize events
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Scroll event listener
window.addEventListener('scroll', debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadMoreShops();
    }
}, 200));

// Resize event listener
window.addEventListener('resize', debounce(() => {
    if (document.body.scrollHeight <= window.innerHeight) {
        loadMoreShops();
    }
}, 200));

function areAllServiceMoreSessionStorageItemsSet() {
    const keys = [
        'service_more_shop_id',
        'service_more_shop_name',
        'service_more_shop_address',
        'service_more_contact_number',
        'service_more_user_id',
        'service_more_open_time',
        'service_more_close_time',
        'service_more_days_open',
        'service_more_additional_schedule_details',
        'service_more_image_link',
        'service_more_requirement_status',
        'service_more_rating'
    ];

    // Check if all keys have values in sessionStorage
    return keys.every(key => sessionStorage.getItem(key) !== null);
}
