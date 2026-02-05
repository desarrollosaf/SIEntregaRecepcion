-- CreateTable
CREATE TABLE `registro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rfc_entrega` VARCHAR(191) NOT NULL,
    `rfc_recibe` VARCHAR(191) NOT NULL,
    `id_departamento` INTEGER NOT NULL,
    `fecha_movimiento` DATETIME(3) NOT NULL,
    `rfc_movimiento` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
