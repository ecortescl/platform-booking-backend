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
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Role", // Debe coincidir con el nombre de la tabla creada en `createTable('Roles', {...})`
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      permissionId: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PermissionsRoles");
  },
};
