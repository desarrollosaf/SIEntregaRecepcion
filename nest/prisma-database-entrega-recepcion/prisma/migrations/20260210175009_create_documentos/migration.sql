-- CreateTable
CREATE TABLE `documentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_departamento` INTEGER NOT NULL,
    `path_marco` VARCHAR(191) NULL,
    `path_manual` VARCHAR(191) NULL,
    `path_doc1` VARCHAR(191) NULL,
    `path_doc2` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
