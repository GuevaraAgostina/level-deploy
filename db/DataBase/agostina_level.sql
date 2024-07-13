-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-agostina.alwaysdata.net
-- Generation Time: Jul 13, 2024 at 04:31 AM
-- Server version: 10.6.17-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agostina_level`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id_categorias` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id_categorias`, `nombre`) VALUES
(1, 'computacion'),
(2, 'videojuegos'),
(3, 'consolas'),
(4, 'sillas gamer');

-- --------------------------------------------------------

--
-- Table structure for table `item_Pedidos`
--

CREATE TABLE `item_Pedidos` (
  `id_detalle` int(10) UNSIGNED NOT NULL,
  `id_producto` int(10) UNSIGNED NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `nro_pedido` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `nro_pedido` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `id_clientes` int(11) UNSIGNED NOT NULL,
  `total_pedido` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id_productos` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `precio` decimal(10,0) NOT NULL,
  `stock` int(10) UNSIGNED DEFAULT NULL,
  `id_categorias` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id_productos`, `nombre`, `descripcion`, `precio`, `stock`, `id_categorias`) VALUES
(1, 'notebook', 'intel i3', 4500, 15, 1),
(2, 'notebook hp ', 'intel i5', 6000, 400, 2),
(3, 'teclado', 'teclado inalambrico ', 2000, 40, 1);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_cliente` int(10) UNSIGNED NOT NULL,
  `dni` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_cliente`, `dni`, `nombre`, `apellido`, `telefono`, `fecha_nacimiento`) VALUES
(1, '42283585', 'agostina', 'guevara', '1161847533', '0000-00-00'),
(2, '42283585', 'Agostina', 'Guevara', '1161847533', '2024-07-03'),
(3, '22333444', 'matias', 'amado', '33444555', '2015-07-09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categorias`);

--
-- Indexes for table `item_Pedidos`
--
ALTER TABLE `item_Pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `nro_pedido` (`nro_pedido`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`nro_pedido`),
  ADD KEY `id_clientes` (`id_clientes`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_productos`),
  ADD KEY `id_categorias` (`id_categorias`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_cliente`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categorias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `item_Pedidos`
--
ALTER TABLE `item_Pedidos`
  MODIFY `id_detalle` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `nro_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_productos` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_cliente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_Pedidos`
--
ALTER TABLE `item_Pedidos`
  ADD CONSTRAINT `item_Pedidos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_productos`),
  ADD CONSTRAINT `nro_pedido` FOREIGN KEY (`nro_pedido`) REFERENCES `pedidos` (`nro_pedido`);

--
-- Constraints for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `id_clientes` FOREIGN KEY (`id_clientes`) REFERENCES `usuarios` (`id_cliente`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categorias`) REFERENCES `categorias` (`id_categorias`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
