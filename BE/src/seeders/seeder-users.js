'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users",[{
      email:"admin@gmail.com",
      firstName:"Bao",
      lastName:"Duy",
      address:"USA",
      gender:1,
      typeRole:'ROLE',
      keyRole:'R1',
      createdAt : new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
