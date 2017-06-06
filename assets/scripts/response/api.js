'use strict'

const config = require('../config')
const store = require('../store')

const createResponse = (data) => {
  // console.log('createResponse(), token = ', store.user.token)
  // console.log('createResponse(), data = ', data)
  return $.ajax({
    url: config.apiOrigin + '/responses',
    method: 'POST',
    data: data
  })
}

const getResponses = function (data) {
  // console.log('data,', data)
  // console.log('getResponses(), token = ', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/responses',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

// Exported since used in other code like events.js
module.exports = {
  createResponse,
  getResponses
}
