const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// create page
router.get('/new', (req, res) => {
  return res.render('new')
})

// post create
router.post('/', (req, res) => {
  const userId = req.user.id
  console.log(userId)
  const { name } = req.body // 取得表單 name 資料
  // 不能為空值
  if (name === '') {
    return res.redirect(`/todos/new`)
  }
  return Todo.create({ name, UserId: userId }) // 存入資料庫
    .then(() => res.redirect('/')) // 回到首頁
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, UserId: userId }, raw: true, nest: true })
    .then(todo => res.render('edit', { todo }))
    .catch(error => res.status(422).json(error))
})

// put edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  const { name, isDone } = req.body
  // 不能為空值
  if (name === '') {
    return res.redirect(`/todos/${id}`)
  }
  return Todo.findOne({ where: { id, UserId: userId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => res.status(422).json(error))
})

// detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, UserId: userId }, raw: true, nest: true })
    .then(todo => res.render('detail', { todo }))
    .catch(error => res.status(422).json(error))
})

// delete item
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.destroy({ where: { id, UserId: userId } })
    .then(() => res.redirect('/'))
    .catch(error => res.status(422).json(error))
})

module.exports = router
