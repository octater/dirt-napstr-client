'use strict'

const config = require('../config')
const store = require('../store')

const createRemain = (data) => {
  // console.log('createRemain(), token = ', store.user.token)
  // console.log('createRemain(), data = ', data)
  return $.ajax({
    url: config.apiOrigin + '/remains',
    method: 'POST',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getRemains = function () {
  // console.log('getRemains(), token = ', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/remains',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateRemain = (data) => {
  // console.log('updateRemain(), token = ', store.user.token)
  // console.log('updateRemain(), data = ', data)
  return $.ajax({
    url: config.apiOrigin + '/remains/' + data.remain.id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteRemain = (id) => {
  // console.log('deleteRemain(), token = ', store.user.token)
  return $.ajax({
    url: config.apiOrigin + '/remains/' + id,
    method: 'DELETE',
    // data: data,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getDynamicRemains = function () {
  return $.ajax({
    url: config.apiOrigin + '/remains',
    method: 'GET' // ,
    // headers: {
    //   Authorization: 'Token token=' + 'abc'
    // }
  })
}

const getOneDynamicRemain = (remainId) => {
  return $.ajax({
    url: config.apiOrigin + '/remains/' + remainId,
    method: 'GET' // ,
    // data: remainId // ,
    // headers: {
    //   Authorization: 'Token token=' + 'abc'
    // }
  })
}

// Exported since used in other code like events.js
module.exports = {
  createRemain,
  getRemains,
  updateRemain,
  deleteRemain,
  // getResponses,
  getDynamicRemains,
  getOneDynamicRemain
}
