-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: my2
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `doctor_infors`
--

DROP TABLE IF EXISTS `doctor_infors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_infors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` int DEFAULT NULL,
  `priceId` int DEFAULT NULL,
  `provinceId` int DEFAULT NULL,
  `paymentId` int DEFAULT NULL,
  `addressClinic` varchar(255) DEFAULT NULL,
  `nameClinic` varchar(255) DEFAULT NULL,
  `note` longtext,
  `count` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT (now()),
  `updatedAt` datetime NOT NULL DEFAULT (now()),
  `specialtyId` int DEFAULT NULL,
  `clinicId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `priceId` (`priceId`),
  KEY `provinceId` (`provinceId`),
  CONSTRAINT `doctor_infors_ibfk_1` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_10` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_11` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_12` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_13` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_14` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_15` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_16` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_2` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_3` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_4` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_5` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_6` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_7` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_8` FOREIGN KEY (`provinceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_infors_ibfk_9` FOREIGN KEY (`priceId`) REFERENCES `allcodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_infors`
--

LOCK TABLES `doctor_infors` WRITE;
/*!40000 ALTER TABLE `doctor_infors` DISABLE KEYS */;
INSERT INTO `doctor_infors` VALUES (1,91,27,35,43,'Số 88, Đường số 8, Khu dân cư Trung Sơn, Xã Bình Hưng, Huyện Bình Chánh, TP. Hồ Chí Minh','Bệnh viện Đa khoa Quốc Tế Nam Sài Gòn','Bảo hiểm y tế nhà nước\nÁp dụng với Bảo hiểm y tế hạng 3 (bao gồm BHYT ở Phường, Quận TPHCM và Tỉnh)\nBảo hiểm bảo lãnh\nĐối với các đơn vị bảo hiểm không bảo lãnh trực tiếp: Bệnh viện xuất hoá đơn tài chính (hoá đơn điện tử) và hỗ trợ bệnh nhân hoàn thiện hồ sơ',0,'2024-10-11 20:52:33','2024-10-25 13:10:37',3,1),(8,90,24,31,41,'Số 05, Đường 17A, Khu phố 11, Phường Bình Trị Đông B, Quận Bình Tân, TP.HCM','Bệnh viện Gia An 115','Bảo hiểm y tế nhà nước \nBệnh viện có áp dụng bảo hiểm y tế khi đến khám (chỉ cần có thẻ bảo hiểm y tế) \nBảo hiểm bảo lãnh \nĐối với các đơn vị bảo hiểm không bảo lãnh trực tiếp: Bệnh viện xuất hoá đơn tài chính (hoá đơn) và hỗ trợ bệnh nhân hoàn thiện hồ sơ ',0,'2024-10-11 23:09:31','2024-10-25 13:10:31',3,1),(9,89,30,38,43,'52 Bà Triệu - Hoàn Kiếm - Hà Nội','Phòng khám Đa khoa Meditec','Bảo hiểm Y tế nhà nước\nKhông áp dụng\nBảo hiểm bảo lãnh trực tiếp\nHiện phòng khám chưa có bảo hiểm bảo lãnh trực tiếp, phòng khám xuất hoá đơn tài chính (hoá đơn đỏ) và hỗ trợ bệnh nhân hoàn thiện hồ sơ',0,'2024-10-11 23:31:09','2024-10-25 13:10:22',3,1),(10,87,24,31,42,'Số 1A Phương Mai, Đống Đa, Hà Nội','Bệnh viện Lão khoa Trung ương','Bảo hiểm y tế nhà nước \nKhoa Yêu cầu không áp dụng khám theo bảo hiểm y tế \nBảo hiểm bảo lãnh\nĐối với các đơn vị bảo hiểm không bảo lãnh trực tiếp: Bệnh viện xuất hoá đơn tài chính (hoá đơn điện tử) và hỗ trợ bệnh nhân hoàn thiện hồ sơ',0,'2024-10-15 06:16:15','2024-10-25 13:10:02',7,1),(13,88,29,31,42,'391/8 Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh','Phòng khám Chuyên khoa Nội An Phước','Bảo hiểm y tế nhà nước \nHiện tại phòng khám chưa áp dụng bảo hiểm y tế nhà nước \nBảo hiểm bảo lãnh \nPhòng khám không áp dụng bảo hiểm bảo lãnh. Phòng khám có xuất hóa đơn điện tử về tiền khám và dịch vụ cận lâm sàng, không xuất VAT về thuốc ',0,'2024-10-24 14:56:54','2024-10-28 20:46:28',5,3),(14,129,30,36,41,'391/8 Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh','Phòng khám Chuyên khoa Nội An Phước','Bảo hiểm y tế nhà nước \nHiện tại phòng khám chưa áp dụng bảo hiểm y tế nhà nước \nBảo hiểm bảo lãnh \nPhòng khám không áp dụng bảo hiểm bảo lãnh. Phòng khám có xuất hóa đơn điện tử về tiền khám và dịch vụ cận lâm sàng, không xuất VAT về thuốc ',0,'2024-10-24 15:00:35','2024-10-25 13:10:44',4,1),(15,130,24,31,41,'14 Trần Bình Trọng, Hoàn Kiếm Hà Nội ','Phòng khám Vietlife MRI Trần Bình Trọng ','Khoảng thời gian từ năm 1994-1995 và năm 2000-2002 ông đã sang Pháp tu nghiệp với chuyên khoa Phẫu thuật thần kinh, cột sống.\n\nBên cạnh công tác quản lý và chuyên môn, Phó Giáo sư Kiều Đình Hùng thường xuyên tham gia các hội nghị, hội thảo về chuyên ngành phẫu thuật cột sống trên thế giới.',0,'2024-10-24 15:04:30','2024-10-25 13:10:48',3,1),(16,131,28,31,42,'182b Lê Văn Sỹ, Phường 10, Quận Phú Nhuận, Thành phố Hồ Chí Minh','Phòng khám Cơ Xương Khớp Bác sĩ Dương Minh Trí','Giá khám cho người Việt \nGiá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm\n300.000đ\nGiá khám cho người nước ngoài\nGiá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm\n400.000đ',0,'2024-10-24 15:06:08','2024-10-28 20:47:00',5,1),(17,132,27,31,41,'TT 20-21-22 Số 204 Nguyễn Tuân, phường Nhân Chính, quận Thanh Xuân, TP Hà Nội','Phòng Khám Đa Khoa MSC Clinic','Bảo hiểm y tế nhà nước \nPhòng khám chưa áp dụng bảo hiểm nhà nước \nBảo hiểm bảo lãnh \nPhòng khám chưa áp dụng bảo hiểm bảo lãnh. Phòng khám có xuất hóa đơn điện tử (tùy thuộc từng loại bảo hiểm áp dụng) ',0,'2024-10-24 15:08:51','2024-10-25 13:11:03',3,1);
/*!40000 ALTER TABLE `doctor_infors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-03 23:21:52
