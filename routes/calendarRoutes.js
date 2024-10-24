// routes/calendarRoutes.js

const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/CalendarController');

/**
 * @swagger  
 * components:
 *  schemas:
 *      Calendar:
 *          type: object
 *          properties:
 *              startDate:
 *                  type: date
 *                  description: The start date of calendar
 *              endDate:
 *                  type: date
 *                  description: The end date of calendar
 *              slug:
 *                  type: string
 *                  description: the link to calendar   
 *              startTime:
 *                  type: time
 *                  description: the start time of calendar (schedule)
 *              endTime:
 *                  type: time
 *                  description: the end time of calendar (schedule)
 *              bookingDuration:
 *                  type: integer
 *                  description: The minutes that an appointment will last (schedule) 
 *              idUser:
 *                  type: integer
 *                  description: the id of the user who belongs to this calendar 
 *          required:
 *              - startDate
 *              - endDate
 *              - slug
 *              - startTime
 *              - endTime
 *              - bookingDuration
 *              - idUser
 *          example:
 *              startDate: 2024-10-16
 *              endDate: 2024-11-16
 *              slug: http://localhost:4000/linktocalendar
 *              startTime: 09:00
 *              endTime: 18:00
 *              bookingDuration: 30
 *              idUser: 1
 */

/**
 * @swagger
 * /api/calendars:
 *  get:
 *      summary: return all calendars
 *      tags: [Calendar]
 *      responses:
 *          200:
 *              description: all calendars
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Calendar'
 *          500:
 *              description: Error interno al obtener los calendars
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los calendarios
router.get('/', CalendarController.getCalendars);

/**
 * @swagger
 * /api/calendars:
 *  post:
 *      summary: create a new calendar
 *      tags: [Calendar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Calendar'
 *      responses:
 *          200:
 *              description: new calendar created
 *          500:
 *              description: Error interno al crear un calendar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo calendario
router.post('/', CalendarController.createCalendar);

/**
 * @swagger
 * /api/calendars/{id}:
 *  get:
 *      summary: return a calendar
 *      tags: [Calendar]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the calendar id
 *      responses:
 *          200:
 *              description: return a calendar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Calendar'
 *          404:
 *              description: Calendar no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener un calendar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un calendario por su ID
router.get('/:id', CalendarController.getCalendarById);

/**
 * @swagger
 * /api/calendars/{id}:
 *  put:
 *      summary: update a calendar
 *      tags: [Calendar]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the calendar id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Calendar'
 *      responses:
 *          200:
 *              description: The calendar was updated
 *          404:
 *              description: Calendar no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar un calendar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un calendario por ID
router.put('/:id', CalendarController.updateCalendar);

/**
 * @swagger
 * /api/calendars/{id}:
 *  delete:
 *      summary: delete a calendar
 *      tags: [Calendar]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the calendar id
 *      responses:
 *          200:
 *              description: The calendar was deleted
 *          404:
 *              description: Calendar no encontrada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar un calendar
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un calendario por ID
router.delete('/:id', CalendarController.deleteCalendar);

module.exports = router;
