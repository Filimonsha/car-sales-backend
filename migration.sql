-- Таблица Status
INSERT INTO status (status)
VALUES 
('Новый'),
('Используется'),
('В ремонте');

-- Таблица DriveType
INSERT INTO drive_type ("driveType")
VALUES 
('Прежде всего'),
('Адаптивная');

-- Таблица EngineType
INSERT INTO engine_type ("engineType")
VALUES 
('Дискретная'),
('Хер знает');
('Офигенный');
-- Таблица Model
INSERT INTO model ("base64ImageSrc", "modelCar", "maxSpeed", "fuelEconomy", "length", width, height, "doorsCount", "seatCount", "bagSpace", "maxWeight", "wheelBase", clearance)
VALUES 
('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABLAGGA...0', 'Король Ролльс', 250, 15.5, 4800, 1900, 1450, 4, 5, 500, 1800, 2800, 150),
('Мерседес-Бенц E-класс', 220, 16.5, 4700, 1950, 1890, 1490, 4, 5, 600, 1850, 2850, 140);

-- Таблица Configuration
INSERT INTO configuration (configuration, "showPriceFrom", "priceCar", "acceleration", "battery", "powerCar", "range", "gearBox", "exteriorColor", "interiorColor", "maxTorque", "maxPower", "breakType", "typeSuspension", "engineTypeId", "modelId", "driveTypeId")
VALUES 
('Базовая конфигурация', TRUE, 150000, 7.5, NULL, 200, 250, NULL, 'Серый металлик', 'Черный кожаный интерьер', NULL, 220, 'Дискретная', 'Прежде всего', 1, 1, 1),
('Комфорт', FALSE, 170000, 7.8, NULL, 230, 280, NULL, 'Белый металлик', 'Кожаный салон', NULL, 240, 'Адаптивная', 'Прежде всего', 2, 2, 2),
('Спорт', TRUE, 200000, 8.2, NULL, 260, 300, NULL, 'Черный металлик', 'Кожаный салон', 350, 280, 'Дискретная', 'Прежде всего', 3, 2, 2);

-- Таблица Brand
INSERT INTO brand ("carName")
VALUES 
('Ролль'),
('Мерседес');

-- Таблица Car
INSERT INTO car ("showOnMain", rating, "manufactureCountry", "yearOfProduction", "brandId", "modelId", "statusId")
VALUES 
(TRUE, 4.5, 'Германия', 2022, 1, 1, 1),
(FALSE, 4.2, 'Франция', 2023, 2, 2, 2),
(TRUE, 4.8, 'Германия', 2021, 1, 1, 3);
