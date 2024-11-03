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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `statusId` varchar(255) DEFAULT NULL,
  `doctorId` int DEFAULT NULL,
  `patientId` int DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `timeMap` varchar(255) DEFAULT NULL,
  `supportFirstName` varchar(255) DEFAULT NULL,
  `supportLastName` varchar(255) DEFAULT NULL,
  `supportPhoneNumber` varchar(255) DEFAULT NULL,
  `supportBirthDay` int DEFAULT NULL,
  `supportGender` varchar(255) DEFAULT NULL,
  `note` longtext,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT (curdate()),
  `updatedAt` datetime NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `patientId` (`patientId`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`patientId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (21,'S2',87,85,'1729270800000','T1','Tran','Minh','0912345678',2008,'M','Kham tong quat suc khoe dinh ky 6 thang. Can theo doi chi so BMI va huyet ap. Tien su gia dinh co benh tim mach.','a1b2c3d4-e5f6-4g7h-8i9j-k0l1m2n3o4p5','2024-10-28 00:00:00','2024-10-28 00:00:00'),(22,'S3',87,85,'1729270800000','T2','Le Thi','Hong','0923456789',2007,'F','Dau khop goi trai, lung goi bi sung, kho gap duoi. Benh nhan bi dau 2 tuan, chua dung thuoc giam dau. Can chup X-quang kiem tra.','b2c3d4e5-f6g7-5h8i-9j0k-l1m2n3o4p5q6','2024-10-28 00:00:00','2024-10-29 22:53:59'),(23,'S3',87,85,'1729270800000','T3','Pham Van','Duc','0934567890',2006,'M','Kho tho khi gay suc, tim dap nhanh. Tien su bi viem phoi 6 thang truoc. Can kham tim mach va chuc nang ho hap.','c3d4e5f6-g7h8-6i9j-0k1l-m2n3o4p5q6r7','2024-10-28 00:00:00','2024-10-29 22:51:10'),(24,'S2',87,85,'1729270800000','T4','Nguyen Thu','Ha','0945678901',2009,'F','Mat mo khi nhin xa, hay bi nhuc dau khi doc sach. Gia dinh co tien su can thi. Can do kinh va kham mat toan dien.','d4e5f6g7-h8i9-7j0k-1l2m-n3o4p5q6r7s8','2024-10-28 00:00:00','2024-10-28 00:00:00'),(25,'S2',87,85,'1729270800000','T5','Hoang','Nam','0956789012',2005,'M','Dau hong cap tinh, sot 38.5 do, ho co dam vang. Da dung thuoc ha sot Paracetamol. Can xet nghiem CRP va cong thuc mau.','e5f6g7h8-i9j0-8k1l-2m3n-o4p5q6r7s8t9','2024-10-28 00:00:00','2024-10-28 00:00:00'),(26,'S2',87,85,'1729270800000','T6','Vu Thi','Lan','0967890123',2008,'F','Sot cao 39 do, dau nguoi, met moi keo dai 3 ngay. Nghi ngo sot xuat huyet. Can xet nghiem NS1 va cong thuc mau gap.','f6g7h8i9-j0k1-9l2m-3n4o-p5q6r7s8t9u0','2024-10-28 00:00:00','2024-10-28 00:00:00'),(27,'S2',87,85,'1729270800000','T7','Do','Hung','0978901234',2007,'M','Chan thuong do tai nan xe may, tray xuoc nhe vung dau goi va khuyu tay phai. Can lam ve sinh va bang bo vet thuong, chup X-quang loai tru gay xuong.','g7h8i9j0-k1l2-0m3n-4o5p-q6r7s8t9u0v1','2024-10-28 00:00:00','2024-10-28 00:00:00'),(28,'S2',87,85,'1729270800000','T8','Tran Thu','Thao','0989012345',2006,'F','Kham dinh ky thai ky tuan 28. Thai nhi phat trien binh thuong, can nang me tang 8kg. Can lam xet nghiem duong huyet va sieu am thai.','h8i9j0k1-l2m3-1n4o-5p6q-r7s8t9u0v1w2','2024-10-28 00:00:00','2024-10-28 00:00:00'),(29,'S2',87,85,'1729270800000','T1','Le Van','Tuan','0990123456',2009,'M','Dau lung vung that lung, tang khi van dong, giam khi nghi ngoi. Tien su cong viec phai ngoi nhieu. Can chup MRI cot song that lung kiem tra.','i9j0k1l2-m3n4-2o5p-6q7r-s8t9u0v1w2x3','2024-10-28 00:00:00','2024-10-28 00:00:00'),(30,'S2',87,85,'1729270800000','T2','Pham Thi','Mai','0901234567',2005,'F','Nhuc dau vung tran va thai duong, co cam giac buon non. Tien su bi migraine. Can ke don thuoc giam dau va theo doi dieu tri.','j0k1l2m3-n4o5-3p6q-7r8s-t9u0v1w2x3y4','2024-10-28 00:00:00','2024-10-28 00:00:00'),(31,'S2',87,85,'1729270800000','T3','Nguyen','Binh','0912345670',2008,'M','Ho khan keo dai 2 tuan, dau rat hong, met moi. Nghi ngo viem duong ho hap tren. Can kham tai mui hong va chup X-quang phoi.','k1l2m3n4-o5p6-4q7r-8s9t-u0v1w2x3y4z5','2024-10-28 00:00:00','2024-10-28 00:00:00'),(32,'S2',87,85,'1729270800000','T4','Hoang Thi','Hien','0923456781',2007,'F','Dau bung vung thuong vi, tang sau khi an, co trieu chung trao nguoc. Can noi soi da day va xet nghiem vi khuan H.pylori.','l2m3n4o5-p6q7-5r8s-9t0u-v1w2x3y4z5a6','2024-10-28 00:00:00','2024-10-28 00:00:00'),(33,'S2',87,85,'1729270800000','T5','Vu Van','Long','0934567892',2006,'M','Met moi keo dai, kho tap trung, hay buon ngu. Xet nghiem mau cho thay thieu sat. Can bo sung sat va vitamin nhom B.','m3n4o5p6-q7r8-6s9t-0u1v-w2x3y4z5a6b7','2024-10-28 00:00:00','2024-10-28 00:00:00'),(34,'S2',87,85,'1729270800000','T6','Do Thi','Huong','0945678903',2009,'F','Kho ngu keo dai 1 thang, hay tinh giac giua dem, anh huong cong viec. Can tu van ve giac ngu va xem xet dieu tri bang thuoc.','n4o5p6q7-r8s9-7t0u-1v2w-x3y4z5a6b7c8','2024-10-28 00:00:00','2024-10-28 00:00:00'),(35,'S2',87,85,'1729270800000','T7','Tran','Phong','0956789014',2005,'M','Dau co vai gay, han che chuyen dong, co tien su choi the thao. Can chi dinh vat ly tri lieu va dieu tri bang thuoc giam dau.','o5p6q7r8-s9t0-8u1v-2w3x-y4z5a6b7c8d9','2024-10-28 00:00:00','2024-10-28 00:00:00'),(36,'S2',87,85,'1729270800000','T8','Le Kim','Anh','0967890125',2008,'F','Sot cao 39.5 do, phat ban toan than, dau hong. Nghi ngo benh Rubella. Can xet nghiem khang the va cach ly theo doi.','p6q7r8s9-t0u1-9v2w-3x4y-z5a6b7c8d9e0','2024-10-28 00:00:00','2024-10-28 00:00:00'),(37,'S2',87,85,'1729270800000','T1','Pham','Dung','0978901236',2007,'M','Dau rang ham duoi ben trai, sung nuu rang. Chan doan viem tuy rang so 36. Can dieu tri noi nha hoac nho rang tuy tinh trang.','q7r8s9t0-u1v2-0w3x-4y5z-a6b7c8d9e0f1','2024-10-28 00:00:00','2024-10-28 00:00:00'),(38,'S2',87,85,'1729270800000','T2','Nguyen Thi','Nga','0989012347',2006,'F','Chan thuong mu cam phai do nga xe dap. Vet thuong dai 3cm, can khau 5 mui. Can tiem phong uon van va ke khanh sinh.','r8s9t0u1-v2w3-1x4y-5z6a-b7c8d9e0f1g2','2024-10-28 00:00:00','2024-10-28 00:00:00'),(39,'S2',87,85,'1729270800000','T3','Hoang Van','Thanh','0990123458',2009,'M','Kham mat dinh ky, phat hien loan thi 1.5 dp. Thi luc: P 7/10, T 8/10. Can ke don kinh va tai kham sau 6 thang.','s9t0u1v2-w3x4-2y5z-6a7b-c8d9e0f1g2h3','2024-10-28 00:00:00','2024-10-28 00:00:00'),(40,'S2',87,85,'1729270800000','T4','Vu Hong','Nhung','0901234569',2005,'F','Viem hong man tinh, hay tai phat. Sieu am tuyen amidan to do 2. Can dieu tri noi khoa hoac xem xet cat amidan neu tai phat nhieu.','t0u1v2w3-x4y5-3z6a-7b8c-d9e0f1g2h3i4','2024-10-28 00:00:00','2024-10-28 00:00:00'),(42,'S2',87,123,'1730048400000','T4',NULL,NULL,NULL,NULL,NULL,'Viem hong man tinh, hay tai phat. Sieu am tuyen amidan to do 2. Can dieu tri noi khoa hoac xem xet cat amidan neu tai phat nhieu.','11a740b4-abb8-4185-8fc5-82a7c04dbd05','2024-10-28 20:40:06','2024-10-28 20:40:06'),(43,'S3',87,123,'1730048400000','T7',NULL,NULL,NULL,NULL,NULL,'Kham tong quat suc khoe dinh ky 6 thang. Can theo doi chi so BMI va huyet ap. Tien su gia dinh co benh tim mach.','20f05d06-a821-474a-b0a5-cbb1fbb5dbaf','2024-10-28 20:42:21','2024-10-29 22:52:29'),(44,'S1',131,126,'1730134800000','T2',NULL,NULL,NULL,NULL,NULL,'Viêm màng túi','c002b404-12ac-47e1-9508-7f69c32ccbc7','2024-10-28 20:48:52','2024-10-28 20:48:52'),(45,'S1',131,123,'1730134800000','T2',NULL,NULL,NULL,NULL,NULL,'Viêm màng túi','82d27ae6-ed2f-46d8-85f0-61a9bf47c18b','2024-10-28 20:49:44','2024-10-28 20:49:44'),(46,'S2',131,123,'1730134800000','T2',NULL,NULL,NULL,NULL,NULL,'Viêm màng túi','40402628-bd8b-43e9-8b8c-100cb3f8e707','2024-10-28 20:50:06','2024-10-28 20:50:42'),(47,'S2',129,123,'1730048400000','T3','Thùy','Thùy','091232132',2009,'F','1.1. Đói và mệt mỏi.\n1.2. Đi tiểu thường xuyên và liên tục khát nước.\n1.3. Khô miệng và ngứa da.\n1.4. Nhìn mờ\n2.1. Dễ bị nhiễm trùng và nhiễm nấm.\n2.2. Vết loét hoặc vết cắt lâu lành.\n2.3. Tê bì, mất cảm giác ở chân.\n3.1. Sụt cân bất thường.','1e12a613-b60a-452d-a0e3-45bf43c60674','2024-10-28 23:36:32','2024-10-28 23:37:06');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-03 23:21:40
