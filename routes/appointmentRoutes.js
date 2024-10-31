// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      Appointment:
 *          type: object
 *          properties:
 *              state:
 *                  type: string
 *                  description: The state of appointment
 *              category:
 *                  type: string
 *                  description: The category of appointment
 *              description:
 *                  type: string
 *                  description: The description of category
 *              idUserClient:
 *                  type: integer
 *                  description: The id of client user
 *              idUserProfessional:
 *                  type: integer
 *                  description: The id of professional user
 *              idSlot:
 *                  type: integer
 *                  description: The id of appointment slot
 *          required:
 *              - state
 *              - category
 *              - description
 *              - idUserClient
 *              - idUserProfessional
 *              - idSlot
 *          example:
 *              state: Completada
 *              category: No recuerdo
 *              description: Cita de [user] ...
 *              idUserClient: 1
 *              idUserProfessional: 2
 *              idSlot: 20
 */

/**
 * @swagger
 * /api/appointments:
 *  get:
 *      summary: return all appointment
 *      tags: [Appointment]
 *      responses:
 *          200:
 *              description: all appointment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Appointment'
 *          500:
 *              description: Error interno al obtener las appointments
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todas las citas
router.get('/', authenticateToken, AppointmentController.getAppointments);

/**
 * @swagger
 * /api/appointments:
 *  post:
 *      summary: create a new appointment
 *      tags: [Appointment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Appointment'
 *      responses:
 *          200:
 *              description: new appointment created
 *          500:
 *              description: Error interno al crear un apponintment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear una nueva cita
router.post('/', authenticateToken, AppointmentController.createAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *  get:
 *      summary: return an appointment
 *      tags: [Appointment]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the appointment id
 *      responses:
 *          200:
 *              description: return a appointment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Appointment'
 *          404:
 *              description: Appointment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un appointment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener una cita por su ID
router.get('/:id', authenticateToken, AppointmentController.getAppointmentById);

/**
 * @swagger
 * /api/appointments/{id}:
 *  put:
 *      summary: update an appointment
 *      tags: [Appointment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the appointment id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Appointment'
 *      responses:
 *          200:
 *              description: The appointment was updated
 *          404:
 *              description: Appointment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar un appointment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar una cita por ID
router.put('/:id', authenticateToken, AppointmentController.updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *  delete:
 *      summary: delete an appointment
 *      tags: [Appointment]
 *      parameters:
 *          - in: header
 *            name: CSRF-Token
 *            required: true
 *            description: CSRF token for protection against cross-site request forgery
 *            schema:
 *              type: string
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the appointment id
 *      responses:
 *          200:
 *              description: The appointment was deleted
 *          404:
 *              description: Appointment no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar un appointment
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar una cita por ID
router.delete('/:id', authenticateToken, AppointmentController.deleteAppointment);

module.exports = router;
