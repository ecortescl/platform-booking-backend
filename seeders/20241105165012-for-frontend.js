'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    if(!process.env.SEED_EXECUTE) return

    const permissions = await queryInterface.bulkInsert('Permissions', [
      { name: 'edit_profile' },
      { name: 'create_calendar' },
      { name: 'create_comment' },
    ], { returning: true});

    const roles = await queryInterface.bulkInsert('Roles', [
      { name: 'professional'},
      { name: 'client'}
    ], { returning: true})

    await queryInterface.bulkInsert('PermissionsRoles', [
      {
        idRole: roles[0].id,
        idPermission: permissions[0].id
      }, 
      {
        idRole: roles[1].id,
        idPermission: permissions[0].id
      },
      {
        idRole: roles[0].id,
        idPermission: permissions[1].id
      },
      {
        idRole: roles[0].id,
        idPermission: permissions[2].id
      }, {
        idRole: roles[1].id,
        idPermission: permissions[2].id
      }
    ])  

    const users = await queryInterface.bulkInsert('Users', [
      {
        run: '12345687-4',
        names: 'Juan Alfonso',
        email: 'jalfonso@test.cl',
        password: await bcrypt.hash('password', 10),
        specialty: 'Médico General',
        location: 'Av. San Pablo #8980, Pudahuel, Santiago',
        registered: true,
        idRole: roles[0].id
      },
      {
        run: '9876543-1',
        names: 'Pedro Andrés',
        email: 'pandres@test.cl',
        password: await bcrypt.hash('password', 10),
        registered: true,
        idRole: roles[1].id
      },
      {
        run: '12533345-1',
        names: 'Felipe Antonio',
        email: 'FAntonio@test.cl',
        password: await bcrypt.hash('password', 10),
        registered: true,
        idRole: roles[1].id
      },
      {
        run: '8765536-9',
        names: 'Almendra Rayen',
        email: 'arayen@test.cl',
        password: await bcrypt.hash('password', 10),
        specialty: 'Pediatra',
        location: 'Av. Vicuña Mackenna #1016, Renca, Santiago',
        registered: true,
        idRole: roles[0].id
      }
    ], { returning: true })

    const services = await queryInterface.bulkInsert('Services', [
      {
        name: 'Consulta médica general',
        description: 'Servicio de atención médica primaria que abarca la evaluación, diagnóstico y tratamiento de enfermedades comunes y problemas de salud generales. Ideal para chequeos de salud, orientación sobre prevención y atención de afecciones no complejas.'
      },
      {
        name: 'Dermatología Estética',
        description: 'Especialidad médica enfocada en el cuidado de la piel, tratamiento de afecciones dermatológicas y procedimientos estéticos como botox, peeling y eliminación de manchas o arrugas, mejorando la salud y apariencia de la piel.'
      }
    ], { returning: true })

    await queryInterface.bulkInsert('ServicesUsers', [
      {
        idUser: users[0].id,
        idService: services[0].id
      },
      {
        idUser: users[0].id,
        idService: services[1].id
      },
      {
        idUser: users[3].id,
        idService: services[0].id
      },
      {
        idUser: users[3].id,
        idService: services[1].id
      }
    ])

    await queryInterface.bulkInsert('Reviews', [
      {
        date: '2024-11-05',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.',
        idUserWriter: users[1].id,
        idUserReceiver: users[0].id
      },
      {
        date: '2024-11-05',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.',
        idUserWriter: users[2].id,
        idUserReceiver: users[0].id
      },
      {
        date: '2024-11-05',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.',
        idUserWriter: users[1].id,
        idUserReceiver: users[3].id
      },
      {
        date: '2024-11-05',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.',
        idUserWriter: users[2].id,
        idUserReceiver: users[3].id
      }
    ])

    const calendars = await queryInterface.bulkInsert('Calendars', [
      {
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        slug: `${users[0].names}-${users[0].surnames}-calendar-1`.replace(/\s+/g, '').toLowerCase(),
        startTime: '09:00:00',
        endTime: '18:00:00',
        bookingDuration: 60,
        idUser: users[0].id
      },
      {
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        slug: `${users[3].names}-${users[3].surnames}-calendar-1`.replace(/\s+/g, '').toLowerCase(),
        startTime: '09:00:00',
        endTime: '18:00:00',
        bookingDuration: 60,
        idUser: users[3].id
      }
    ], { returning: true })

    const slots = await queryInterface.bulkInsert('Slots', [
      {
        startTime: '09:00:00',
        endTime: '10:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[0].id
      },
      {
        startTime: '10:00:00',
        endTime: '11:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[0].id
      },
      {
        startTime: '11:00:00',
        endTime: '12:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[0].id
      },
      {
        startTime: '09:00:00',
        endTime: '10:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[0].id
      },
      {
        startTime: '10:00:00',
        endTime: '11:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[0].id
      },
      {
        startTime: '11:00:00',
        endTime: '12:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[0].id
      },
      {
        startTime: '09:00:00',
        endTime: '10:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[1].id
      },
      {
        startTime: '10:00:00',
        endTime: '11:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[1].id
      },
      {
        startTime: '11:00:00',
        endTime: '12:00:00',
        state: 'Disponible',
        date: '2024-12-01',
        idCalendar: calendars[1].id
      },
      {
        startTime: '09:00:00',
        endTime: '10:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[1].id
      },
      {
        startTime: '10:00:00',
        endTime: '11:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[1].id
      },
      {
        startTime: '11:00:00',
        endTime: '12:00:00',
        state: 'Disponible',
        date: '2024-12-02',
        idCalendar: calendars[1].id
      },
      {
        startTime: '13:00:00',
        endTime: '14:00:00',
        state: 'Ocupada',
        date: '2024-12-03',
        idCalendar: calendars[0].id
      },
      {
        startTime: '13:00:00',
        endTime: '14:00:00',
        state: 'Ocupada',
        date: '2024-12-03',
        idCalendar: calendars[1].id
      },
    ], { returning: true }) 

    const appointments = await queryInterface.bulkInsert('Appointments', [
      {
        state: 'Pendiente',
        category: 'Médica',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUserClient: users[1].id,
        idUserProfessional: users[0].id,
        idSlot: slots[12].id
      },
      {
        state: 'Pendiente',
        category: 'Médica',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUserClient: users[2].id,
        idUserProfessional: users[3].id,
        idSlot: slots[13].id
      }
    ], { returning: true })

    await queryInterface.bulkInsert('Comments', [
      {
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUser: users[1].id,
        idAppointment: appointments[0].id
      },
      {
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUser: users[0].id,
        idAppointment: appointments[0].id
      },
      {
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUser: users[2].id,
        idAppointment: appointments[1].id
      },
      {
        comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        idUser: users[3].id,
        idAppointment: appointments[1].id
      }
    ])

  },

  async down (queryInterface, Sequelize) {

  }
};
