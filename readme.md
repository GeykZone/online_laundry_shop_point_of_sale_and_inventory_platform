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
•sms verification of user kanang mo text sa owner ug laundry shop nga approve ba or dli ang ilang ge register 😀
•auto activate laundry owner out no need na e activate ni super admin si owner dapat direct na ang kinahanglan ra e activate si laundry shop
•Staff can set treshold in every item
•revice implementation of inventory/stocking/stockout makita ang individual transaction ayha ma total tanan
•makita ang status sa owner  staff ug laundry shop
•customer registration no need to create acct 😀
•breakdown all payment  nga makita sa ubos ang summary sa mabayaran ayha total
* Separate price for comforter
* Can handle both regular clothes\comforter
* Change format sale

structure 

sa service

service name
service price ex 80
service description ex Peer KG
service unit_measurement ex KG 
service load ex 8

Formula

P80 peer 8KG
so meaning if clothes weight is 2KG customer will pay P80
if clothes weight is more than 8KG ex 10kg customer will pay P160 because P80 + P80 is P160


Product (KG G CUP SACHET ML) e static

product name
product price 30
product quantity(stock) 100
product unit_measurement ex KG
product unit_measurement_amount 30 KG
product type (ex Liquid (ML SACHET), Powder (KG CUP Grams))


order Product

order product
order unit_measurement ex grams (ang kg ra ang pwedi gamitag gramsa ug cup)
product unit_measurement_amount 10

formula

P30 peer KG
example ning kuha si customer ug product nga tide by 10 grams. so e divide nato ang product price into P30/10g = P3, bali P3 iyang ma bayad
dayun kay 30KG ang unit measurement amount minusan ug 10 grams 30kg (30KG - 10g), ang amount nalang kay 29.99KG. Tapos kung ma zero na ang  unit 
measurement amount sa product ayha ra ma kaltasan ang stock. So meaning kay ang stock nato kay 100 man tas exampla na zero na ang unit 
measurement amount ang ma bilin nalang nga stock kay 99 nalang.







# Default Creds

-Super Admin
    -Username : Admin
    -Password : admin1234