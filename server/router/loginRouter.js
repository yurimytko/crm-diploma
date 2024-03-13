const Router = require('express')


const loginRout = new Router

const loginController = require('../controller/loginController')

loginRout.post('/login', loginController.login)

module.exports =  loginRout