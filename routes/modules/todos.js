const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// edit page

// put edit

// create page

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
