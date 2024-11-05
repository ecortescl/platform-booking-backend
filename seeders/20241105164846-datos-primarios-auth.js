'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    if(!process.env.SEED_EXECUTE) return

    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin'
      },
    ], {});

    await queryInterface.bulkInsert('Users', [
      {
        run: '12345678-9',
        names: 'Administrador',
        email: 'admin@test.cl',
        password: await bcrypt.hash('admin123', 10),
        idRole: 1
      }
    ]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null);
    await queryInterface.bulkDelete('Roles', null, {});
    
  }
};

