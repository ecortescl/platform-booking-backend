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
          model: "Role",
          key: "id",
        },
      },
      idPermission: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "permissions",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PermissionsRoles");
  },
};
