CREATE DATABASE  IF NOT EXISTS `webdev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `webdev`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: webdev
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `username` varchar(100) DEFAULT NULL,
  `date created` datetime DEFAULT NULL,
  `message` varchar(400) DEFAULT NULL,
  `ownership` enum('user','admin') DEFAULT NULL,
  `admin checked` enum('yes','no') DEFAULT 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES ('abc','2025-06-06 15:42:18','hello admin','user','yes'),('abc','2025-06-06 15:42:20','hello admin','user','yes'),('abc','2025-06-06 15:42:20','hello admin','user','yes'),('abc','2025-06-12 15:41:50','c4k','user','yes'),('abc','2025-06-12 16:00:32','dw','user','yes'),('abc','2025-06-14 22:31:02','xds','user','yes'),('abc','2025-06-15 21:29:33','d3','user','yes'),('abc','2025-06-15 22:05:35','c4k','admin','yes'),('abc','2025-06-15 15:06:34','lol','user','yes'),('abc','2025-06-15 22:06:41','e3','admin','yes'),('abc','2025-06-15 15:48:11',';>','user','yes'),('abc','2025-06-15 15:48:38','e','user','yes'),('abc','2025-06-15 15:49:40','Test1','user','yes'),('abc','2025-06-15 16:21:19','hi','user','yes'),('abc','2025-06-15 23:25:11','adminTest','admin','yes'),('abc','2025-06-15 16:25:40','clientTest1125','user','yes'),('abc','2025-06-16 15:16:44','10:16PM','user','yes'),('abc','2025-06-16 15:28:12','10:28PM','user','yes'),('abc','2025-06-16 15:37:43','rr','user','yes'),('abc','2025-06-16 22:52:04','yes','admin','yes'),('abc','2025-06-16 22:52:47','hi again','user','yes'),('abc','2025-06-16 22:53:31','Hi from admin','admin','yes'),('abc','2025-06-16 22:53:44','OK','user','yes'),('abc','2025-06-16 22:57:22','GG','admin','yes'),('abc','2025-06-16 22:58:23','rr','user','yes'),('abc','2025-06-16 23:01:43','fr','admin','yes'),('abc','2025-06-16 23:01:51','e33','user','yes'),('abc','2025-06-18 23:53:59','Hi again','user','yes'),('abc','2025-06-19 00:16:52',':>>','user','yes'),('abc','2025-06-19 10:35:22','eew','user','yes'),('abcde','2025-06-24 10:42:05','Hi','user','yes'),('abc','2025-06-24 10:42:17','Hello','user','yes'),('abc','2025-06-24 10:42:27','ee','user','yes'),('abc','2025-06-24 10:43:06','admin respond to abc','admin','yes'),('abcde','2025-06-24 10:43:13','Hi','admin','yes');
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `name` varchar(100) NOT NULL,
  `date of occurence` datetime DEFAULT NULL,
  `date of ending` datetime DEFAULT NULL,
  `image link` varchar(500) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('First event','2025-04-28 00:00:00','2025-04-28 00:00:00','https://media.istockphoto.com/id/978975308/vector/upcoming-events-neon-signs-vector-upcoming-events-design-template-neon-sign-light-banner-neon.jpg?s=612x612&w=0&k=20&c=VMCoJJda9L17HVkFOFB3fyDpjC4Qu2AsyYn3u4T4F4c=','Event testing'),('First event2','2025-04-28 00:00:00','2025-04-28 00:00:00','https://media.istockphoto.com/id/978975308/vector/upcoming-events-neon-signs-vector-upcoming-events-design-template-neon-sign-light-banner-neon.jpg?s=612x612&w=0&k=20&c=VMCoJJda9L17HVkFOFB3fyDpjC4Qu2AsyYn3u4T4F4c=','Event testing');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodinfo`
--

DROP TABLE IF EXISTS `foodinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodinfo` (
  `FoodID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `Price` double DEFAULT NULL,
  `ImageLink` varchar(500) DEFAULT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Type` varchar(45) NOT NULL,
  `Detailed description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`FoodID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodinfo`
--

LOCK TABLES `foodinfo` WRITE;
/*!40000 ALTER TABLE `foodinfo` DISABLE KEYS */;
INSERT INTO `foodinfo` VALUES (1,'Mixed Pizza',100000,'https://t3.ftcdn.net/jpg/00/27/57/96/360_F_27579652_tM7V4fZBBw8RLmZo0Bi8WhtO2EosTRFD.jpg','Mixed Pizza','main dish','Fresh pizza with crabs, salami, cheese and herbs'),(2,'Soup',50000,'https://media.istockphoto.com/id/1092632852/photo/vegetable-soup.jpg?s=612x612&w=0&k=20&c=TLMWC8lshitbk8pONGpblEsmcsBy1wZVQ9jJC92Cvh4=','Soup with some herbs and seafood','supper','Delicious soup with seafood'),(3,'Salad',35000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzojxjclj_4ioTHYYPCj66BQH1Th2zJekLxw&s','Mixed fresh salad','side dish','Salad with vinegar and jambon'),(4,'Ice cream',15000,'https://www.shutterstock.com/image-photo/chocolate-ice-cream-strawberry-vanilla-600nw-460379134.jpg','Ice cream','dessert','Mixed ice cream balls with chocolate, vanilla, and strawberry flavor');
/*!40000 ALTER TABLE `foodinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_id` int NOT NULL,
  `timestamp_slot` datetime NOT NULL,
  `time_range_label` varchar(20) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `status` enum('available','non-available') DEFAULT 'available',
  PRIMARY KEY (`id`),
  CONSTRAINT `chk_table_id` CHECK ((`table_id` between 1 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,1,'2025-04-28 08:00:00','8-11',NULL,'available'),(2,1,'2025-04-28 12:00:00','12-15',NULL,'available'),(3,1,'2025-04-28 16:00:00','16-19',NULL,'available'),(4,1,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(5,2,'2025-04-28 08:00:00','8-11',NULL,'available'),(6,2,'2025-04-28 12:00:00','12-15',NULL,'available'),(7,2,'2025-04-28 16:00:00','16-19',NULL,'available'),(8,2,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(9,3,'2025-04-28 08:00:00','8-11',NULL,'available'),(10,3,'2025-04-28 12:00:00','12-15',NULL,'available'),(11,3,'2025-04-28 16:00:00','16-19',NULL,'available'),(12,3,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(13,4,'2025-04-28 08:00:00','8-11',NULL,'available'),(14,4,'2025-04-28 12:00:00','12-15',NULL,'available'),(15,4,'2025-04-28 16:00:00','16-19',NULL,'available'),(16,4,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(17,5,'2025-04-28 08:00:00','8-11',NULL,'available'),(18,5,'2025-04-28 12:00:00','12-15',NULL,'available'),(19,5,'2025-04-28 16:00:00','16-19',NULL,'available'),(20,5,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(21,6,'2025-04-28 08:00:00','8-11',NULL,'available'),(22,6,'2025-04-28 12:00:00','12-15',NULL,'available'),(23,6,'2025-04-28 16:00:00','16-19',NULL,'available'),(24,6,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(25,7,'2025-04-28 08:00:00','8-11',NULL,'available'),(26,7,'2025-04-28 12:00:00','12-15',NULL,'available'),(27,7,'2025-04-28 16:00:00','16-19',NULL,'available'),(28,7,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(29,8,'2025-04-28 08:00:00','8-11',NULL,'available'),(30,8,'2025-04-28 12:00:00','12-15',NULL,'available'),(31,8,'2025-04-28 16:00:00','16-19',NULL,'available'),(32,8,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(33,9,'2025-04-28 08:00:00','8-11',NULL,'available'),(34,9,'2025-04-28 12:00:00','12-15',NULL,'available'),(35,9,'2025-04-28 16:00:00','16-19',NULL,'available'),(36,9,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(37,10,'2025-04-28 08:00:00','8-11',NULL,'available'),(38,10,'2025-04-28 12:00:00','12-15',NULL,'available'),(39,10,'2025-04-28 16:00:00','16-19',NULL,'available'),(40,10,'2025-04-28 19:30:00','19:30-22:30',NULL,'available'),(41,1,'2025-04-29 08:00:00','8-11',NULL,'available'),(42,1,'2025-04-29 12:00:00','12-15',NULL,'available'),(43,1,'2025-04-29 16:00:00','16-19',NULL,'available'),(44,1,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(45,2,'2025-04-29 08:00:00','8-11',NULL,'available'),(46,2,'2025-04-29 12:00:00','12-15',NULL,'available'),(47,2,'2025-04-29 16:00:00','16-19',NULL,'available'),(48,2,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(49,3,'2025-04-29 08:00:00','8-11',NULL,'available'),(50,3,'2025-04-29 12:00:00','12-15',NULL,'available'),(51,3,'2025-04-29 16:00:00','16-19',NULL,'available'),(52,3,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(53,4,'2025-04-29 08:00:00','8-11',NULL,'available'),(54,4,'2025-04-29 12:00:00','12-15',NULL,'available'),(55,4,'2025-04-29 16:00:00','16-19',NULL,'available'),(56,4,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(57,5,'2025-04-29 08:00:00','8-11',NULL,'available'),(58,5,'2025-04-29 12:00:00','12-15',NULL,'available'),(59,5,'2025-04-29 16:00:00','16-19',NULL,'available'),(60,5,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(61,6,'2025-04-29 08:00:00','8-11',NULL,'available'),(62,6,'2025-04-29 12:00:00','12-15',NULL,'available'),(63,6,'2025-04-29 16:00:00','16-19',NULL,'available'),(64,6,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(65,7,'2025-04-29 08:00:00','8-11',NULL,'available'),(66,7,'2025-04-29 12:00:00','12-15',NULL,'available'),(67,7,'2025-04-29 16:00:00','16-19',NULL,'available'),(68,7,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(69,8,'2025-04-29 08:00:00','8-11',NULL,'available'),(70,8,'2025-04-29 12:00:00','12-15',NULL,'available'),(71,8,'2025-04-29 16:00:00','16-19',NULL,'available'),(72,8,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(73,9,'2025-04-29 08:00:00','8-11',NULL,'available'),(74,9,'2025-04-29 12:00:00','12-15',NULL,'available'),(75,9,'2025-04-29 16:00:00','16-19',NULL,'available'),(76,9,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(77,10,'2025-04-29 08:00:00','8-11',NULL,'available'),(78,10,'2025-04-29 12:00:00','12-15',NULL,'available'),(79,10,'2025-04-29 16:00:00','16-19',NULL,'available'),(80,10,'2025-04-29 19:30:00','19:30-22:30',NULL,'available'),(81,1,'2025-04-30 08:00:00','8-11',NULL,'available'),(82,1,'2025-04-30 12:00:00','12-15',NULL,'available'),(83,1,'2025-04-30 16:00:00','16-19',NULL,'available'),(84,1,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(85,2,'2025-04-30 08:00:00','8-11',NULL,'available'),(86,2,'2025-04-30 12:00:00','12-15',NULL,'available'),(87,2,'2025-04-30 16:00:00','16-19',NULL,'available'),(88,2,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(89,3,'2025-04-30 08:00:00','8-11',NULL,'available'),(90,3,'2025-04-30 12:00:00','12-15',NULL,'available'),(91,3,'2025-04-30 16:00:00','16-19',NULL,'available'),(92,3,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(93,4,'2025-04-30 08:00:00','8-11',NULL,'available'),(94,4,'2025-04-30 12:00:00','12-15',NULL,'available'),(95,4,'2025-04-30 16:00:00','16-19',NULL,'available'),(96,4,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(97,5,'2025-04-30 08:00:00','8-11',NULL,'available'),(98,5,'2025-04-30 12:00:00','12-15',NULL,'available'),(99,5,'2025-04-30 16:00:00','16-19',NULL,'available'),(100,5,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(101,6,'2025-04-30 08:00:00','8-11',NULL,'available'),(102,6,'2025-04-30 12:00:00','12-15',NULL,'available'),(103,6,'2025-04-30 16:00:00','16-19',NULL,'available'),(104,6,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(105,7,'2025-04-30 08:00:00','8-11',NULL,'available'),(106,7,'2025-04-30 12:00:00','12-15',NULL,'available'),(107,7,'2025-04-30 16:00:00','16-19',NULL,'available'),(108,7,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(109,8,'2025-04-30 08:00:00','8-11',NULL,'available'),(110,8,'2025-04-30 12:00:00','12-15',NULL,'available'),(111,8,'2025-04-30 16:00:00','16-19',NULL,'available'),(112,8,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(113,9,'2025-04-30 08:00:00','8-11',NULL,'available'),(114,9,'2025-04-30 12:00:00','12-15',NULL,'available'),(115,9,'2025-04-30 16:00:00','16-19',NULL,'available'),(116,9,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(117,10,'2025-04-30 08:00:00','8-11',NULL,'available'),(118,10,'2025-04-30 12:00:00','12-15',NULL,'available'),(119,10,'2025-04-30 16:00:00','16-19',NULL,'available'),(120,10,'2025-04-30 19:30:00','19:30-22:30',NULL,'available'),(121,1,'2025-05-01 08:00:00','8-11',NULL,'available'),(122,1,'2025-05-01 12:00:00','12-15',NULL,'available'),(123,1,'2025-05-01 16:00:00','16-19',NULL,'available'),(124,1,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(125,2,'2025-05-01 08:00:00','8-11',NULL,'available'),(126,2,'2025-05-01 12:00:00','12-15',NULL,'available'),(127,2,'2025-05-01 16:00:00','16-19',NULL,'available'),(128,2,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(129,3,'2025-05-01 08:00:00','8-11',NULL,'available'),(130,3,'2025-05-01 12:00:00','12-15',NULL,'available'),(131,3,'2025-05-01 16:00:00','16-19',NULL,'available'),(132,3,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(133,4,'2025-05-01 08:00:00','8-11',NULL,'available'),(134,4,'2025-05-01 12:00:00','12-15',NULL,'available'),(135,4,'2025-05-01 16:00:00','16-19',NULL,'available'),(136,4,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(137,5,'2025-05-01 08:00:00','8-11',NULL,'available'),(138,5,'2025-05-01 12:00:00','12-15',NULL,'available'),(139,5,'2025-05-01 16:00:00','16-19',NULL,'available'),(140,5,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(141,6,'2025-05-01 08:00:00','8-11',NULL,'available'),(142,6,'2025-05-01 12:00:00','12-15',NULL,'available'),(143,6,'2025-05-01 16:00:00','16-19',NULL,'available'),(144,6,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(145,7,'2025-05-01 08:00:00','8-11',NULL,'available'),(146,7,'2025-05-01 12:00:00','12-15',NULL,'available'),(147,7,'2025-05-01 16:00:00','16-19',NULL,'available'),(148,7,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(149,8,'2025-05-01 08:00:00','8-11',NULL,'available'),(150,8,'2025-05-01 12:00:00','12-15',NULL,'available'),(151,8,'2025-05-01 16:00:00','16-19',NULL,'available'),(152,8,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(153,9,'2025-05-01 08:00:00','8-11',NULL,'available'),(154,9,'2025-05-01 12:00:00','12-15',NULL,'available'),(155,9,'2025-05-01 16:00:00','16-19',NULL,'available'),(156,9,'2025-05-01 19:30:00','19:30-22:30',NULL,'available'),(157,10,'2025-05-01 08:00:00','8-11',NULL,'available'),(158,10,'2025-05-01 12:00:00','12-15',NULL,'available'),(159,10,'2025-05-01 16:00:00','16-19',NULL,'available'),(160,10,'2025-05-01 19:30:00','19:30-22:30',NULL,'available');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,'normal',1),(2,'normal',1),(3,'normal',1),(4,'normal',1),(5,'normal',1),(6,'normal',1),(7,'normal',1),(8,'VIP',1),(9,'VIP',1),(10,'VIP',1);
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','$2b$10$2hwZMPT9ju6XhbXawXSNguOCd4XlHG4dFpyGUfUgP7DkOHLA.6ovi'),('abc','$2b$10$u4OO0A8.YsLsYPX.r/4Ar..ootVD.WNmq5QPGrnKEbbvF.QPWzM8K'),('abcde','$2b$10$WDDA8U7IeFxoMQGqI0gdsOE4FT.HmccvxjHMjg1fN0KT8YGcKp2aO'),('C4k','$2b$10$mcuTzWc/J3CeNkeG73ha0.bdTOgwRo3YcsMOpP0AL2HYRrRD8sLuy'),('CuongCC ','$2b$10$g.lffdwuMl0k7RHt557ZVuQNTIL6oGULPGzQ4Vp42OVAfWBFiJIMe'),('e','$2b$10$hpKjb/u6Vz1j/impouysLekTO1UM5jGJUnfT3/IbIbRDRLpXaLzVe'),('Hello','$2b$10$dIjjf9SFdm2Cv.TknwUgCe633QGWk5rsNyWkVgbI0N1ZJgWhc.8hG');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-24 16:54:04
