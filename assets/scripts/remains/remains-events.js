'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./remains-api')
const ui = require('./remains-ui')
// const authUi = require('../auth/ui')
const store = require('../store')

const onCreateRemain = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.createRemain(data)
  .then(function (data) {
    ui.createRemainSuccess(data)
    $('#createRemain').modal('hide')
  })
  .catch(ui.createRemainFailure)
  // Clear out existing text in modal text boxes when there is a failure
  // source: http://stackoverflow.com/questions/31022950/how-clear-bootstrap-modal-on-hide
  $('#createRemain').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  ui.clearRemainModal()
  onGetRemains()
  // console.log('++++ onCreateRemain(), token = ', store.user.token)
}

const onUpdateRemain = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log('>>>>>>>>onUpdateRemain: data = ', data)
  api.updateRemain(data)
  .then(function (data) {
    ui.updateRemainSuccess(data)
    $('#updateRemain').modal('hide')
  })
  .catch(ui.updateRemainFailure)
  // Clear out existing text in modal text boxes when there is a failure
  // source: http://stackoverflow.com/questions/31022950/how-clear-bootstrap-modal-on-hide
  $('#updateRemain').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  ui.clearRemainModal()
  onGetRemains()
}

const updateItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // console.log('updateItem() : id is: ' + id)
  populateUpdateForm(id)
}

const populateUpdateForm = function (id) {
  const remain = findRemainById(id)
  // console.log('>> remain.title is ', remain.title)
  $('#remainId').val(remain.id)
  $('#remainTitle').val(remain.title)
  $('#remainQ1').val(remain.question)
  onShowUpdateRemain()
}

const findRemainById = function (idToCompare) {
  let result
  let i
  for (i in store.remains) {
    const id = store.remains[i].id
    if (id === idToCompare) {
      return store.remains[i]
    }
  }
  result
}

const onShowUpdateRemain = function () {
  $('#updateRemain').modal('show')
}

const onGetRemains = (event) => {
  api.getRemains()
    .then(ui.getRemainsSuccess)
    .catch(ui.getRemainsFailure)
}

function getParameterByName () {
  // print url
  // console.log(window.location.href)
  // true or false, there are parameters as indicated by a "?"
  // console.log(window.location.href.split('?')[1] === undefined)
  if (window.location.href.split('?')[1] === undefined) {
    return ''
  } else {
    const arr = $.map(window.location.href.split('?')[1].split('&'), function (e, i) {
      return e.split('=')[1]
    })
    // console.log('array: ', arr)
    // console.log('remain_id: ', arr[1])
    // console.log('parameters, will load Respondent Page')
    return arr
  }
}
// Give the parameter a variable name, to be passed to index.js
const dynamicContent = getParameterByName()

const deleteItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // console.log('deleteItem() : id is: ' + id)
  api.deleteRemain(id)
    .done(ui.deleteRemainSuccess)
    .fail(ui.deleteRemainFailure)
  onGetRemains()
}

const addHandlers = () => {
  $('#create-remain').on('submit', onCreateRemain)
  $('#update-remain').on('submit', onUpdateRemain)
  $(document).on('click', '.update-remain', updateItem)
  $(document).on('click', '#get-remain-button', onGetRemains)
  $(document).on('click', '.remove-remain', deleteItem)
}

module.exports = {
  addHandlers,
  dynamicContent
}
