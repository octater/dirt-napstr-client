'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events.js')
const remainEvents = require('./remains/remains-events.js')
// on document ready return remains
const api = require('./remains/remains-api')
const ui = require('./remains/remains-ui')

// response:
const responseEvents = require('./response/events')

$(() => {
  setAPIOrigin(location, config)
  $('.form-control').val('')
  $('#add-task-modal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })
  $('#changePasswordModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#ChangePasswordError').hide()
    $('#ChangePasswordSuccess').hide()
    $('.form-group-pw').show()
  })
  $('#signUpModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#signInError').hide()
  })
  $('#signInModal').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
    $('#signUpError').hide()
    $('#signUpSuccess').hide()
  })
  $('#createRemain').on('hidden.bs.modal', function () {
    $(this).find('input,textarea,select').val('').end()
  })

  authEvents.addHandlers()
  remainEvents.addHandlers()
  responseEvents.addHandlers()
  $('.form-control').val('')  // This clears out all the form input fields when the document is first loaded
  $('#signUpModal').hide()
  $('.nav-btns').hide()
  $('.create-a-remain').hide()
  $('.update-a-remain').hide()
  $('.get-remains').hide()
})

// query parameters from URL
$(document).ready(function () {
  $('input:radio').attr('checked', false)
  $('input[typed="radio"]').removeAttr('checked')
// Check if the URL parameter is apples
  const dc = remainEvents.dynamicContent
  // console.log(dc)
  if (dc[0] === 'respondents' && dc[1] !== undefined) { // Check if the URL parameter is bananas
    $('#respondents').show()
    api.getOneDynamicRemain(dc[1])
      .then(ui.getOneDynamicRemainSuccess)
      .catch(ui.getOneDynamicRemainFailure)
    // Check if the URL parmeter is empty or not defined, display default content
  } else {
    $('#default-content').show()
  }
})

$(document).ready(function () {
  $('#respondents').bind('keypress', function (event) {
    if (event.keyCode === 13) {
      return false
    }
  })

    // Form submit crontrol for Rating question
  $(function () {
    $('#res-number').change(function () {
      $('#res-number-create_response').prop('disabled', false)
    })
  })

// Form submit crontrol for Yes-No question
  $(function () {
    $('#res-boolean').change(function () {
      $('#res-boolean-create_response').prop('disabled', false)
    })
  })

// Control for text box for response
  const $input = $('#responseq1')
  const $button = $('#res-string-create_response')

  setInterval(function () {
    if ($input.val().length > 0) {
      $button.attr('disabled', false)
    } else {
      $button.attr('disabled', true)
    }
  }, 100)
})
