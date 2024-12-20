-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2024 at 09:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sipekatdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `idadmin` int(11) NOT NULL,
  `nama_admin` varchar(45) DEFAULT NULL,
  `email_admin` varchar(45) DEFAULT NULL,
  `nomor_hp_admin` varchar(45) DEFAULT NULL,
  `tanggalLahir_admin` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `datapelapor`
--

CREATE TABLE `datapelapor` (
  `user_id_user` int(11) NOT NULL,
  `namaPelapor` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `nomorWa` int(11) DEFAULT NULL,
  `alamat` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `laporanUser_id_laporan` int(11) NOT NULL,
  `laporanUser_dataPelapor_user_id_user` int(11) NOT NULL,
  `admin_idadmin` int(11) NOT NULL,
  `nomor_laporan` varchar(15) DEFAULT NULL,
  `pelapor` varchar(45) DEFAULT NULL,
  `kategori` varchar(45) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `status_laporan` varchar(45) DEFAULT NULL,
  `prioritas` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5 COLLATE=big5_chinese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `laporanuser`
--

CREATE TABLE `laporanuser` (
  `id_laporan` int(11) NOT NULL,
  `dataPelapor_user_id_user` int(11) NOT NULL,
  `judulLaporan` varchar(45) DEFAULT NULL,
  `kategori` varchar(45) DEFAULT NULL,
  `provinsi` varchar(45) DEFAULT NULL,
  `kabupatenKota` varchar(45) DEFAULT NULL,
  `kecamatan` varchar(45) DEFAULT NULL,
  `kelurahan` varchar(45) DEFAULT NULL,
  `tanggalKejadian` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=big5 COLLATE=big5_chinese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `user_id_user` int(11) NOT NULL,
  `admin_idadmin` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `lastLogin` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `nomor_hp` varchar(15) DEFAULT NULL,
  `tanggalLahir` date DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `email`, `nomor_hp`, `tanggalLahir`, `password`) VALUES
(1002, 'vina', 'vina1125@gmail.com', '085555555', '2007-02-18', 'vina123'),
(1004, 'tiara', 'tiara123@gmail.com', '08956745125', '2015-09-18', 'tiara123'),
(1008, 'kiel', 'kielpunyaharu1125@gmail.com', '085558888', '2007-02-18', 'kiel123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idadmin`);

--
-- Indexes for table `datapelapor`
--
ALTER TABLE `datapelapor`
  ADD PRIMARY KEY (`user_id_user`),
  ADD KEY `fk_dataPelapor_user1` (`user_id_user`);

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`laporanUser_id_laporan`,`laporanUser_dataPelapor_user_id_user`,`admin_idadmin`),
  ADD KEY `fk_laporanUser_has_admin_laporanUser1` (`laporanUser_id_laporan`,`laporanUser_dataPelapor_user_id_user`),
  ADD KEY `fk_laporanUser_has_admin_admin1` (`admin_idadmin`);

--
-- Indexes for table `laporanuser`
--
ALTER TABLE `laporanuser`
  ADD PRIMARY KEY (`id_laporan`,`dataPelapor_user_id_user`),
  ADD KEY `fk_laporanUser_dataPelapor1` (`dataPelapor_user_id_user`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`admin_idadmin`,`user_id_user`),
  ADD KEY `fk_pengguna_admin1` (`admin_idadmin`),
  ADD KEY `fk_pengguna_user1` (`user_id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `datapelapor`
--
ALTER TABLE `datapelapor`
  ADD CONSTRAINT `fk_dataPelapor_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `laporan`
--
ALTER TABLE `laporan`
  ADD CONSTRAINT `fk_laporanUser_has_admin_admin1` FOREIGN KEY (`admin_idadmin`) REFERENCES `admin` (`idadmin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_laporanUser_has_admin_laporanUser1` FOREIGN KEY (`laporanUser_id_laporan`,`laporanUser_dataPelapor_user_id_user`) REFERENCES `laporanuser` (`id_laporan`, `dataPelapor_user_id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `laporanuser`
--
ALTER TABLE `laporanuser`
  ADD CONSTRAINT `fk_laporanUser_dataPelapor1` FOREIGN KEY (`dataPelapor_user_id_user`) REFERENCES `datapelapor` (`user_id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD CONSTRAINT `fk_pengguna_admin1` FOREIGN KEY (`admin_idadmin`) REFERENCES `admin` (`idadmin`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pengguna_user1` FOREIGN KEY (`user_id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
