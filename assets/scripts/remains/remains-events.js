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

const viewItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // console.log('viewItem() : id is: ' + id)
  // console.log('store is: ', store)
  populateViewForm(id)
}

const populateViewForm = function (id) {
  const remain = findRemainById(id)
  // console.log('>> remain returned is ', remain)
  // console.log('>> remain.entombment returned is ', remain.entombment)
  $('#viewId').val(remain.id)
  $('#viewGivenName').val(remain.given_name)
  $('#viewSurName').val(remain.sur_name)
  $('#viewEntombment').val(remain.entombment)
  $('#viewLocation').val(remain.location)
  $('#viewComments').val(remain.comments)
  $('#viewDob').val(remain.dob)
  $('#viewDod').val(remain.dod)
  $('#viewRelationDesc').val(remain.relation_desc)
  onShowViewRemain()
}

const updateItem = function () {
  event.preventDefault()
  const id = $(this).attr('data-id')
  // console.log('updateItem() : id is: ' + id)
  // console.log('store is: ', store)
  populateUpdateForm(id)
}

const populateUpdateForm = function (id) {
  const remain = findRemainById(id)
  // console.log('>> remain returned is ', remain)
  // console.log('>> remain.entombmenbt returned is ', remain.entombment)
  $('#updateId').val(remain.id)
  $('#updateGivenName').val(remain.given_name)
  $('#updateSurName').val(remain.sur_name)
  $('#update-entombment-id').val(remain.entombment)
  $('#updateLocation').val(remain.location)
  $('#updateComments').val(remain.comments)
  $('#updateDob').val(remain.dob)
  $('#updateDod').val(remain.dod)
  $('#updateRelationDesc').val(remain.relation_desc)
  onShowUpdateRemain()
}

const findRemainById = function (idToCompare) {
  let result
  let i
  for (i in store.remains) {
    // console.log('in findRemainById and i is: ', i)
    const myObj = store.remains[i]
    // console.log('in findRemainById and myObj is: ', myObj)
    // console.log('in findRemainById and myObj.id is: ', myObj.id)
    const id = myObj.id
    // console.log('in findRemainById and id is: ', id)
    // console.log('in findRemainById and store.remains[i] is: ', store.remains[i])
    // console.log('in findRemainById and id is: ', typeof id)
    // console.log('in findRemainById and idToCompare is: ', typeof idToCompare)

    if (+id === +idToCompare) {
      return store.remains[i]
    }
  }
  result
}

const onShowViewRemain = function () {
  $('#viewRemain').modal('show')
}

const onShowUpdateRemain = function () {
  $('#updateRemain').modal('show')
}

const onGetRemains = (event) => {
  api.getRemains()
    .then(ui.getRemainsSuccess)
    .catch(ui.getRemainsFailure)
}

// function getParameterByName () {
//   // print url
//   // console.log(window.location.href)
//   // true or false, there are parameters as indicated by a "?"
//   // console.log(window.location.href.split('?')[1] === undefined)
//   if (window.location.href.split('?')[1] === undefined) {
//     return ''
//   } else {
//     const arr = $.map(window.location.href.split('?')[1].split('&'), function (e, i) {
//       return e.split('=')[1]
//     })
//     // console.log('array: ', arr)
//     // console.log('remain_id: ', arr[1])
//     // console.log('parameters, will load Respondent Page')
//     return arr
//   }
// }
// // Give the parameter a variable name, to be passed to index.js
// const dynamicContent = getParameterByName()

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
  $(document).on('click', '.view-remain', viewItem)
  $(document).on('click', '#get-remain-button', onGetRemains)
  $(document).on('click', '.remove-remain', deleteItem)
}

module.exports = {
  addHandlers
  // addHandlers,
  // dynamicContent
}
