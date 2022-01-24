'use strict'

'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'userId')
  }
}
