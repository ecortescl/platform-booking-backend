// routes/slotRoutes.js

const express = require('express');
const router = express.Router();
const SlotController = require('../controllers/SlotController');
const { authenticateToken }= require('../middleware/authMiddleware')

/**
 * @swagger  
 * components:
 *  schemas:
 *      Slot:
 *          type: object
 *          properties:
 *              startTime:
 *                  type: time
 *                  description: The start time of slot
 *              endTime:
 *                  type: time
 *                  description: The end time of slot
 *              state:
 *                  type: string
 *                  description: The state of slot
 *              date:
 *                  type: date
 *                  description: The date of slot 
 *              idCalendar:
 *                  type: integer
 *                  description: The calendar id to which the slot belongs
 *          required:
 *              - startTime
 *              - endTime
 *              - state
 *              - date
 *              - idCalendar
 *          example:
 *              startTime: 14:00
 *              endTime: 14:30
 *              state: Reservado
 *              date: 2024-10-17
 *              idCalendar: 1
 */

/**
 * @swagger
 * /api/slots:
 *  get:
 *      summary: return all slots
 *      tags: [Slot]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *              type: string
 *          required: false
 *          description: number of page (10 elements per page)
 *      responses:
 *          200:
 *              description: all slots
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#components/schemas/Slot'
 *          500:
 *              description: Error interno al obetner los slots
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener todos los slots
router.get('/', authenticateToken, SlotController.getSlots);

/**
 * @swagger
 * /api/slots:
 *  post:
 *      summary: create a new slot
 *      tags: [Slot]

 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Slot'
 *      responses:
 *          201:
 *              description: new slot created
 *          500:
 *              description: Error interno al crear el slot
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para crear un nuevo slot
router.post('/', authenticateToken, SlotController.createSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *  get:
 *      summary: return a slot
 *      tags: [Slot]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the slot id
 *      responses:
 *          200:
 *              description: return a slot
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Slot'
 *          404:
 *              description: Slot no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al obtener el slot
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para obtener un slot por su ID
router.get('/:id', authenticateToken, SlotController.getSlotById);

/**
 * @swagger
 * /api/slots/{id}:
 *  put:
 *      summary: update a slot
 *      tags: [Slot]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the slot id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Slot'
 *      responses:
 *          200:
 *              description: The slot was updated
 *          404:
 *              description: Slot no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al actualizar el slot
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para actualizar un slot por su ID
router.put('/:id', authenticateToken, SlotController.updateSlot);

/**
 * @swagger
 * /api/slots/{id}:
 *  delete:
 *      summary: delete a slot
 *      tags: [Slot]
 *      parameters:

 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: the slot id
 *      responses:
 *          200:
 *              description: The slot was deleted
 *          404:
 *              description: Slot no encontrado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/Message'
 *          500:
 *              description: Error interno al eliminar el slot
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#components/schemas/MessageError'
 */

// Ruta para eliminar un slot por su ID
router.delete('/:id', authenticateToken, SlotController.deleteSlot);

module.exports = router;
