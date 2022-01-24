const express = require('express')
const router = express.Router()

// 載入資料庫模組
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  return User.create({ name, email, password }).then(user => res.redirect('/'))
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
