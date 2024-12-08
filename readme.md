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
•Password Recovery kanang ma forgot dayun ma send sa email para marecover ang acct 😀
•sms verification of user kanang mo text sa owner ug laundry shop nga approve ba or dli ang ilang ge register 😀
•auto activate laundry owner out no need na e activate ni super admin si owner dapat direct na ang kinahanglan ra e activate si laundry shop 😀
•makita ang status sa owner  staff ug laundry shop 😀
•customer registration no need to create acct 😀
•Staff can set treshold in every item
•usbon nako ang transaction gikan service padung prduct breakdown all payment  nga makita sa ubos ang summary sa mabayaran ayha total


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
product unit_measurement  (ex if type = Liquid (ML SACHET), if type = Powder (KG CUP Grams))
product unit_measurement_amount 30 KG
product type (ex Liquid (ML SACHET), Powder (KG CUP Grams))


order Product

order product
order unit_measurement ex grams (ang kg ra ang pwedi gamitag gramsa ug cup)
product unit_measurement_amount 10

formula

P30 peer KG



-Ang una sir kay mga common info sa customer kanang tulo dayun mamili dayun siya anang lima ka dot. Ug all iyang pilion maka fillout siya ana dayun naay price ang sabon per kilo nga unsa iyang services
-Ug dry lang sir iyang pilion ang ma fill out niya ana kay services, kilo ug price dayun the rest ana kay ma default
-Ug fold lang kay services ug price ra ang ma fillout niya ma default nanang uban
-If package lang sir kay kini dli na siya mo bayad sa sabon kanang murag free lang ang sabon niya kay naa may laundry shop nga free sabon na. So ma defualt ani ang laundry staff, dayun kanang type sa sabon apil na kanang kilo,gram, cup sachet and ml
-Dayun sir ug mag select powder or liquid siya sir ug powder gani iya pilion ma defualt ng Ml ug liquid iyang pilion ma default ang  kilo,gram ug cup
-Dayun kana sa ubos sir kay dapat dha makita tanan nga ge order sa customer sir

stack in out formula

stock 100

price P30 per 1KG

customer buy 2KG

1KG - 2KG = -1KG => 100Stock - 1Stock = 99Stock => 1KG - 1KG = 0KG => 99Stock - 1Stock = 98Stock => 1Kg




# Default Creds

-Super Admin
    -Username : Admin
    -Password : admin1234