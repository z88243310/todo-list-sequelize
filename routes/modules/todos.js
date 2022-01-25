const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId }, raw: true, nest: true })
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
  return Todo.findOne({ where: { id, userId } })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => res.status(422).json(error))
})

// create page
router.get('/new', (req, res) => {
  return res.render('new')
})

// post create

// detail page
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, userId }, raw: true, nest: true })
    .then(todo => res.render('detail', { todo }))
    .catch(error => res.status(422).json(error))
})

// delete item
router.delete('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.destroy({ where: { id, userId } })
    .then(() => res.redirect('/'))
    .catch(error => res.status(422).json(error))
})

module.exports = router
