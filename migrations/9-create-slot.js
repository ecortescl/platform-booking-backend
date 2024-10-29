"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Slots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: Sequelize.TIME,
      },
      endTime: {
        type: Sequelize.TIME,
      },
      state: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      idCalendar: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Calendars",
          key: "id",
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Slots");
  },
};
