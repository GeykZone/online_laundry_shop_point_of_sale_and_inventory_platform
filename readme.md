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


# online_laundry_shop_point_of_sale_and_inventory_platform

to do
•Password Recovery kanang ma forgot dayun ma send sa email para marecover ang acct
•sms verification of user kanang mo text sa owner ug laundry shop nga approve ba or dli ang ilang ge register
•auto activate laundry owner out no need na e activate ni super admin si owner dapat direct na ang kinahanglan ra e activate si laundry shop
•Staff can set treshold in every item
•revice implementation of inventory/stocking/stockout makita ang individual transaction ayha ma total tanan
•makita ang status sa owner  staff ug laundry shop
•customer registration no need to create acct
•breakdown all payment  nga makita sa ubos ang summary sa mabayaran ayha total
* Separate price for comforter
* Can handle both regular clothes\comforter
* Change format sale

# Default Creds

-Super Admin
    -Username : Admin
    -Password : admin1234