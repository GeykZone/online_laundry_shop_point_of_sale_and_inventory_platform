// syncronousQuery sample
const url = "php-sql-controller/manage-laundry-shop-controller.php";
const data = {
    shopId: sessionStorage.getItem('sessionShopId'),
    queryServicesFromSpicificShop: true,
};

const detailsList = dynamicSynchronousPostRequest(url, data);

if(isValidJSON(detailsList)){

    const details = JSON.parse(detailsList);

    if(Object.keys(details).length > 0){

        $('#serviceCardModal').modal('show')

    }
    
}
else{
    console.error(detailsList);
    dynamicAlertMessage('Something went wrong. Please see the error logs for additional information.', 'error', 3000);
}

// validation using dynamic error message
if(serviceNameInput.value.length < 1){
    isValid = false;
    dynamicFieldErrorMessage(serviceNameInput.id, 'Please input a valid Laundry Shop Service Name.');
}
else {
    dynamicFieldErrorMessage(serviceNameInput.id, '');
}

//sample hide modal
$('#laundryShopDetailsModal').modal('hide');

//sample reload table
if(laundryShopTableVar){
    laundryShopTableVar.ajax.reload(null, false); // `null, false` ensures that the current page is not reset
}