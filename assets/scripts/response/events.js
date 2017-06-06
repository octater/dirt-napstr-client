'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onCreateResponse = function (event) {
  event.preventDefault()
  // console.log('createresponse')
  // console.log($(this).attr('data-id'))
  // const fieldData = getFormFields(this).response.text

  const textData = getFormFields(this).response.text
  // alert(textData)
  const booleanData = getFormFields(this).response.boolean
  // alert(booleanData)
  const ratingData = getFormFields(this).response.rating
  // alert(ratingData)

  // console.log(fieldData)
  const data = {
    'response': {
      'text': textData,
      'boolean': booleanData,
      'rating': ratingData,
      'remain_id': $(this).attr('data-id')
    }
  }

  api.createResponse(data)
  .then(function (data) {
    ui.createResponseSuccess(data)
  })
  .catch(ui.createResponseFailure)
}

const onGetResponses = function (event) {
  event.preventDefault()
  let string = {}
  string = { // should this be a constructor function to have one for each play?
    'remain_id': this.id
  }
  // console.log('string ', string)
  api.getResponses(string)
  .then(function (data) {
    ui.getResponsesSuccess(data)
  })
  .catch(ui.getResponsesFailure)
}

const addHandlers = () => {
  $('#create-response').on('submit', onCreateResponse)
  $(document).on('click', '.dashboard-button', onGetResponses)
}

module.exports = {
  addHandlers
}
