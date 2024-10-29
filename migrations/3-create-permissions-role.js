"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PermissionsRoles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idRole: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Roles", // Nombre correcto de la tabla
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      idPermission: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Permissions", // Nombre correcto de la tabla
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PermissionsRoles");
  },
};
