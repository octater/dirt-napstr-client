'use strict'

const store = require('../store.js')

const resetPwValidation = function () {
  const message = document.getElementById('confirmMessage')
  const pass2 = document.getElementById('password2')
  pass2.style.backgroundColor = ''
  message.style.color = ''
  message.innerHTML = ''
}
const signUpSuccess = (data) => {
  $('.form-control').val('')
  $('#signUpModal').hide()
  $('#signInModal').show()
  // $('.header-message').show().html('Congratulations, you have a new account.')
  $('.sign-in-msg').html('Log in.')
  $('#sign-in').trigger('reset')
  resetPwValidation()
}

const signUpFailure = (error) => {
  $('.form-control').val('')

  $('#signUpError').show().html('Something\'s wrong with your signup. Please try again.')
  setTimeout(function () {
    $('#signUpError').fadeOut(900)
  }, 1000)
  $('#sign-up').trigger('reset')
  console.error('SignUp failed ran data is:', error)
}

const signInSuccess = (data) => {
  store.user = data.user
  // console.log('sign in token = ', data.user.token)
  $('#signUpModal').hide()
  $('#signInModal').hide()
  $('#title-message').html('Survey Creation Tool')
  // $('.nav-message').hide()
  $('#ChangePasswordSuccess').hide()
  $('#change-password').trigger('reset')
  $('.nav-btns').show()
// show main page buttons
  $('.create-a-survey').show()
  $('.update-a-survey').show()
  $('.get-surveys').show()
  $('#survey-list-table').show()
  $('#get-survey-button').show()
  $('#add-survey-button').show()
}

const signInFailure = (error) => {
  $('.form-control').val('')
  $('#signInError').show().html('Something\'s wrong with your login. Please try again.')
  setTimeout(function () {
    $('#signInError').fadeOut(700)
  }, 1000)
  $('#sign-in').trigger('reset')
  console.error('signInFailure(), error: ', error)
}

const signOutSuccess = () => {
  store.user = null
  $('.form-control').val('')
  $('#confirm-logout').modal('hide')
  $('.nav-btns').hide()
  $('#signUpModal').hide()
  $('#signUpModal').trigger('reset')
  $('#signInModal').trigger('reset')
  $('#signInModal').show()
  $('#survey-list-table').hide()
  $('#get-survey-button').hide()
  $('#add-survey-button').hide()
  $('.list-group').empty()
}

const signOutFailure = (error) => {
  $('.form-control').val('')
  $('#change-password').trigger('reset')
  console.error('signOutFailure ran:', error)
}

const changePasswordSuccess = () => {
  $('.form-control').val('')
  $('#ChangePasswordError').hide()
  $('#ChangePasswordSuccess').show().html('Password changed! Close Screen to continue.')
  $('#change-password').trigger('reset')
  $('.form-group-pw').hide()
  // $('.list-group').empty()
}

const changePasswordFailure = (error) => {
  $('.form-control').val('')
  $('#ChangePasswordError').show().html('Check your password and please try again.')
  setTimeout(function () {
    $('#ChangePasswordError').fadeOut(700)
  }, 1000)
  $('#change-password').trigger('reset')
  console.error('changePasswordFailure ran:', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
