-Transaction(One Transaction Can have multiple Order)
    -transaction_id
    -shop_id
    -user_id
    -transaction_name
    -transaction_date
    -pick_up_date
    -total
    -transaction_status
    -clothes_weight

-Order(One order One transaction, One order One Service)
    -order_id
    -order_name
    -transaction_id
    -service_id
    -product_id
    -order_created_date
    -product_item_quantity

-discounted_transaction
    -discounted_transaction_id
    -transaction_id
    -discount_id
    -discounted_transaction_status

-ayha ra maka comment ug maka rating if naka order na..
-after order maka pili si customer ug discount, like basin unsa, tas checkon ra ni admin if naka sulod ba sha sa discount
tas if approve sa discount kay ma kaltasan ang total bayaronon



# online_laundry_shop_point_of_sale_and_inventory_platform

to do
- e pa display ang mga transactions