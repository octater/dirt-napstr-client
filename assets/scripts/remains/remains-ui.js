'use strict'

const store = require('../store')
const showRemainsTemplate = require('../templates/remains.handlebars')
const api = require('./remains-api')

const getRemains = (event) => {
  api.getRemains()
    .then(getRemainsSuccess)
    .catch(getRemainsFailure)
}

const clearRemainModal = function () {
  $('#title').val('')
}

const createRemainSuccess = (data) => {
  // console.log('createRemainSuccess')
  $('.list-group').empty()
  getRemains()
}

const createRemainFailure = (error) => {
  $('#CreateRemainError').show().html('Check your values and please try again.')
  setTimeout(function () {
    $('#CreateRemainError').fadeOut(800)
  }, 1000)
  console.error(error)
}

const updateRemainSuccess = (data) => {
  // store.remain = data.remain
  // console.log('updateRemainSuccess')
  getRemains()
}

const updateRemainFailure = (error) => {
  // console.log('updateRemainSuccess, error = ', error)
  $('#UpdateRemainError').show().html('Check your values and please try again.')
  setTimeout(function () {
    $('#UpdateRemainError').fadeOut(800)
  }, 1000)
  console.error(error)
}

// const getRemainsSuccess = (data) => {
//   const showRemainsHtml = showRemainsTemplate({ remains: data.remains })
//   store.remains = data.remains
//   // console.log('>>>>> store.remains = ', store.remains)
//   $('.list-group').empty()
//   $('#remains-content').html(showRemainsHtml)
// }

const getRemainsSuccess = (data) => {
  $('#remains-content').hide()
  $('#remains-content-text').hide()
  console.log(data)
  console.log(data.remains)
  console.log(data.remains.length)
  // if (data.remains.length !== undefined)
  if (data.remains[0] !== undefined) {
    const showRemainsHtml = showRemainsTemplate({ remains: data.remains })
    store.remains = data.remains
    // console.log('>>>>> store.remains = ', store.remains)
    $('#remains-content').show()
    $('.list-group').empty()
    $('#remains-content').html(showRemainsHtml)
  } else {
    store.remains = data.remains
    $('#remains-content-text').show()
    $('#remains-content-text').text('you have no gravesite entries (◕︵◕)')
  }
}

const getRemainsFailure = (error) => {
  console.error(error)
}

// const getResponsesSuccess = (data) => {
//   // store.user = data.user
//   console.log(data)
//   console.log(data.responses[0])
//   console.log('text:', data.responses[0].text)
//   console.log('title:', data.responses[0].title)
//   console.log('remain_id:', data.responses[0].remain_id)
//   console.log('question_id:', data.responses[0].question_id)
//   console.log('respondent_id:', data.responses[0].respondent_id)
//   const showRemainsHtml = showRemainsTemplate({ responses: data.responses })
//   // debugger;
//   $('.content').html(showRemainsHtml) // .order
//   // $('.errors-create-item').empty()
//   // $('#create-item').show()
//   // $('#spacer1').text('List')
// }
//
// const getResponsesFailure = (error) => {
//   console.error(error)
// }

const getDynamicRemainsSuccess = (data) => {
  // store.user = data.user
  // console.log(data)
  // console.log(data.remains[0])
  // console.log('title:', data.remains[0].title)
  // console.log('url:', data.remains[0].url)
  // console.log('_owner:', data.remains[0]._owner)
  // console.log('length:', data.remains[0].length)
  // console.log('length:', data.remains[0].question)
  const showRemainsHtml = showRemainsTemplate({ remains: data.remains })
  // debugger;
  $('.dynamic-content').html(showRemainsHtml) // .order
  // $('.errors-create-item').empty()
  // $('#create-item').show()
  // $('#spacer1').text('List')
}

const getDynamicRemainsFailure = (error) => {
  console.error(error)
}

const getOneDynamicRemainSuccess = (data) => {
  // store.user = data.user
  // console.log(data)
  // console.log(data.remain)
  $('#default-display-text').text(data.remain.title)
  // $('#remain_id').html(data.remain.id)
  // $('#remain_id').val(data.remain.id)
  $('#create-response').attr('data-id', data.remain.id)
  // console.log('innerHTML: ', $('#create-response').attr('data-id'))
  $('#remain_question').text(data.remain.question)
  // $('#remain_owner').text(data.remain._owner)

  if (data.remain.response_type === 'Number') {
    $('#res-number').show()
    $('#res-string').hide()
    $('#res-boolean').hide()
  }
  if (data.remain.response_type === 'String') {
    $('#res-number').hide()
    $('#res-string').show()
    $('#res-boolean').hide()
  }
  if (data.remain.response_type === 'Boolean') {
    $('#res-number').hide()
    $('#res-string').hide()
    $('#res-boolean').show()
  }
}

const getOneDynamicRemainFailure = (error) => {
  console.error(error)
}

const deleteRemainSuccess = (data) => {
  // store.remain = data.remain
  // console.log('deleteRemainSuccess')
  getRemains()
  $('#responses-content').hide()
  $('#responses-content-text').hide()
}

const deleteRemainFailure = (error) => {
  // console.log('deleteRemainFailure, error = ', error)
  console.error(error)
}

module.exports = {
  clearRemainModal,
  createRemainSuccess,
  createRemainFailure,
  updateRemainSuccess,
  updateRemainFailure,
  getRemainsSuccess,
  getRemainsFailure,
  getDynamicRemainsSuccess,
  getDynamicRemainsFailure,
  getOneDynamicRemainSuccess,
  getOneDynamicRemainFailure,
  deleteRemainSuccess,
  deleteRemainFailure,
  getRemains
}
