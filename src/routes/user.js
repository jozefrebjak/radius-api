const express = require('express')
const router = express.Router()
const getConnection = require('../database.js')

/**
 * @swagger
 * /user-all/:
 *   get:
 *     tags:
 *     - USERS
 *     summary: Show all users
 *     description: It will show all users added to system
 *     produces:
 *     - application/json
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-all/', (req, res) => {

    const queryString = "SELECT R.id,R.username,U.firstname,U.lastname,R.value,UG.groupname FROM radcheck R INNER JOIN userinfo U ON R.username=U.username INNER JOIN radusergroup UG ON R.username=UG.username ORDER BY R.id"

    getConnection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Successfully loaded users")

        const users = rows.map((row) => {
            return { id: row.id, firstname: row.firstname, lastname: row.lastname, groupname: row.groupname, username: row.username, password: row.value }
        })

        res.json(users)
    })
})

/**
 * @swagger
 * /user-id/{id}:
 *   get:
 *     tags:
 *     - USERS
 *     summary: View user based on user ID
 *     description: View user based on user ID
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Enter the ID of the desired user
 *       required: true
 *       type: integer
 *       format: int64
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-id/:id', (req, res) => {

    const userId = req.params.id

    const queryString = "SELECT R.id,R.username,U.firstname,U.lastname,R.value,UG.groupname FROM radcheck R INNER JOIN userinfo U ON R.username=U.username INNER JOIN radusergroup UG ON R.username=UG.username WHERE R.id = ?"
    getConnection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for " + err)
            res.sendStatus(500)
            return
            // throw err
        }

        console.log("Successfully loaded user")

        const users = rows.map((row) => {
            return { id: row.id, firstname: row.firstname, lastname: row.lastname, groupname: row.groupname, username: row.username, password: row.value }
        })

        res.json(users)
    })
})

/**
 * @swagger
 * /user-username/{username}:
 *   get:
 *     tags:
 *     - USERS
 *     summary: Display user based on USERNAME
 *     description: Display user based on USERNAME
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: username
 *       in: path
 *       description: Enter the USERNAME of the desired user
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-username/:username', (req, res) => {

    const userName = req.params.username

    const queryString = "SELECT R.id,R.username,U.firstname,U.lastname,R.value,UG.groupname FROM radcheck R INNER JOIN userinfo U ON R.username=U.username INNER JOIN radusergroup UG ON R.username=UG.username WHERE R.username = ?"
    getConnection.query(queryString, [userName], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for " + err)
            res.sendStatus(500)
            return
            // throw err
        }

        console.log("Successfully loaded user")

        const users = rows.map((row) => {
            return { id: row.id, firstname: row.firstname, lastname: row.lastname, groupname: row.groupname, username: row.username, password: row.value }
        })

        res.json(users)
    })
})

/**
 * @swagger
 * /user-group/{groupname}:
 *   get:
 *     tags:
 *     - USERS
 *     summary: View users by GROUPNAME
 *     description: View users by GROUPNAME
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: groupname
 *       in: path
 *       description: Enter the GROUPNAME
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.get('/user-group/:groupname', (req, res) => {

    const groupName = req.params.groupname

    const queryString = "SELECT R.id,R.username,U.firstname,U.lastname,R.value,UG.groupname FROM radcheck R INNER JOIN userinfo U ON R.username=U.username INNER JOIN radusergroup UG ON R.username=UG.username WHERE UG.groupname = ? ORDER BY R.id"
    getConnection.query(queryString, [groupName], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for " + err)
            res.sendStatus(500)
            return
            // throw err
        }

        console.log("Successfully loaded user")

        const users = rows.map((row) => {
            return { id: row.id, firstname: row.firstname, lastname: row.lastname, groupname: row.groupname, username: row.username, password: row.value }
        })

        res.json(users)
    })
})

/**
 * @swagger
 * /user-delete-id/{id}:
 *   delete:
 *     tags:
 *     - USERS
 *     summary: Delete user based on his ID
 *     description: Delete user based on his ID
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: id
 *       in: path
 *       description: Enter the ID of the user
 *       type: integer
 *       format: int64
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.delete('/user-delete-id/:id', (req, res) => {

    const userId = req.params.id

    const queryString = "DELETE radcheck,userinfo,userbillinfo,radusergroup FROM radcheck INNER JOIN userinfo ON userinfo.username = radcheck.username INNER JOIN userbillinfo ON userbillinfo.username = radcheck.username INNER JOIN radusergroup ON radusergroup.username = radcheck.username WHERE radcheck.id = ?"
    getConnection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for: " + err)
            res.sendStatus(500)
            return
            // throw err
        }

        console.log("Successfully deleted user")

        res.send('Successfully deleted user with ID ' + req.params.id)
    })
})

/**
 * @swagger
 * /user-delete-username/{username}:
 *   delete:
 *     tags:
 *     - USERS
 *     summary: Delete user based on user USERNAME
 *     description: Delete user based on user USERNAME
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: username
 *       in: path
 *       description: ZEnter the USERNAME of the user
 *       type: string
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.delete('/user-delete-username/:username', (req, res) => {

    const userName = req.params.username

    const queryString = "DELETE radcheck,userinfo,userbillinfo,radusergroup FROM radcheck INNER JOIN userinfo ON userinfo.username = radcheck.username INNER JOIN userbillinfo ON userbillinfo.username = radcheck.username INNER JOIN radusergroup ON radusergroup.username = radcheck.username WHERE radcheck.username = ?"
    getConnection.query(queryString, [userName], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for: " + err)
            res.sendStatus(500)
            return
            // throw err
        }

        console.log("Successfully deleted user")

        res.send('Successfully deleted user with ' + req.params.username)
    })
})

/**
 * @swagger
 * /user-create/:
 *   post:
 *     tags:
 *     - USERS
 *     summary: Create a new user
 *     description: Create a new user
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: body
 *       in: body
 *       description: Enter parameters for new user, ID will be added automatically
 *       required: true
 *       schema:
 *          type: object
 *          $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.post('/user-create/', (req, res) => {
    const { username, value, firstname, lastname, groupname } = req.body
    console.log(username, value, firstname, lastname, groupname)
    const query = `
    SET @username = ?;
    SET @value = ?;
    SET @firstname = ?;
    SET @lastname = ?;
    SET @groupname = ?;
    CALL userAddOrEdit(@username, @value, @firstname, @lastname, @groupname);
  `
    getConnection.query(query, [username, value, firstname, lastname, groupname], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'New user was added' })
        } else {
            console.log(err)
        }
    })
})

/**
 * @swagger
 * /user-update/{username}:
 *   put:
 *     tags:
 *     - USERS
 *     summary: Editing a user based on user USERNAME
 *     description: Editing a user based on user USERNAME
 *     produces:
 *     - application/json
 *     parameters:
 *     - name: username
 *       in: path
 *       description: Select the user to edit
 *       required: true
 *       type: string
 *     - in: body
 *       name: body
 *       description: Modified user
 *       required: true
 *       schema:
 *          $ref: '#/definitions/User-Edit'
 *     responses:
 *       200:
 *         description: Ok
 *       500:
 *         description: Internal Server Error
 */
router.put('/user-update/:username', (req, res) => {
    const { value, firstname, lastname, groupname } = req.body
    const { username } = req.params
    console.log(username, value, firstname, lastname, groupname)
    const query = `
    SET @username = ?;
    SET @value = ?;
    SET @firstname = ?;
    SET @lastname = ?;
    SET @groupname = ?;
    CALL userAddOrEdit(@username, @value, @firstname, @lastname, @groupname);
  `
    getConnection.query(query, [username, value, firstname, lastname, groupname], (err, rows, fields) => {
        if (!err) {
            res.json({ status: 'User was edited' })
        } else {
            console.log(err)
        }
    })
})

module.exports = router