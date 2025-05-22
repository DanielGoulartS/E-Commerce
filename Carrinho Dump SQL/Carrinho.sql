USE base ;

CREATE TABLE Orders (`code` char(15), `totalPrice` float, PRIMARY KEY (`code`));

CREATE TABLE Wares (`name` char(40), `price` float, PRIMARY KEY (`name`));

CREATE TABLE OrdersWares (`ordersCode` char(15), `waresName` char(40), `waresAmount` int,
PRIMARY KEY (`ordersCode`, `waresName`),
FOREIGN KEY (`ordersCode`) REFERENCES `Orders` (`code`));

CREATE TABLE `base`.`images`(`index` int UNIQUE, `ìmagesurl` char(60) UNIQUE,
PRIMARY KEY (`index`));

CREATE TABLE `base`.`waresimages`(`waresname` char(40), `imagesindex` int,
PRIMARY KEY (`waresname`, `imagesindex`),
FOREIGN KEY (`waresname`) REFERENCES `wares` (`name`),
FOREIGN KEY (`imagesindex`) REFERENCES `images` (`index`));