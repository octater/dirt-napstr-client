'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUpClick = function (event) {
  $('#signUpModal').show()

  $('.form-control').val('')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#signInModal').hide()
}

const onSignInClick = function (event) {
  $('#signUpModal').hide()
  $('.form-control').val('')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#signInModal').show()
}

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()

  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.changePassword(data)
  .then(ui.changePasswordSuccess)
  .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
  .then(ui.signOutSuccess)
  .catch(ui.signOutFailure)
}

const addHandlers = () => {
  $('#sign-up-form').on('click', onSignUpClick)
  $('#return-to-log-in').on('click', onSignInClick)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-up').on('submit', onSignUp)
  $('#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
