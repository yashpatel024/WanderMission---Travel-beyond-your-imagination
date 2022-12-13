CREATE DATABASE IF NOT EXISTS WanderMission CHARACTER SET utf8 COLLATE utf8_general_ci;

USE WanderMission;

CREATE TABLE IF NOT EXISTS UserOrderDetails (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id varchar(50) NOT NULL,
  customer_first_name varchar(25),
  customer_last_name varchar(25),
  customer_passport_number varchar(25),
  customer_citizenship varchar(25),
  customer_dob timestamp,
  order_status varchar(25) DEFAULT 'Pending',
  net_total decimal(50),
  tax_amount decimal(50),
  gas_fees decimal(50),
  gross_total decimal(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS OrderPaymentDetails (
  id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  amount decimal(50),
  user_public_key TEXT,
  payment_status varchar(25) DEFAULT 'Pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_payment_userorderdetails FOREIGN KEY (order_id)  
  REFERENCES UserOrderDetails(id) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS OrderItemDetails (
  id int(11) NOT NULL AUTO_INCREMENT,
  service_id varchar(50) NOT NULL,
  order_id int(11) NOT NULL,
  quantity int(10),
  unit_price decimal(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_item_userorderdetails FOREIGN KEY (order_id)  
  REFERENCES UserOrderDetails(id) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

CREATE TABLE IF NOT EXISTS OrderTravelDateDetails (
  id int(11) NOT NULL AUTO_INCREMENT,
  order_id int(11) NOT NULL,
  travel_date timestamp,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_travel_userorderdetails FOREIGN KEY (order_id)  
  REFERENCES UserOrderDetails(id) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;