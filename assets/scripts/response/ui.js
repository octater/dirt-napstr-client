'use strict'

const store = require('../store')
const showResponsesTemplate = require('../templates/response.handlebars')

const createResponseSuccess = (data) => {
  // console.log('createResponseSuccess')
  $('#response-list-table').hide()
  $('#default-display-text').text('Thanks for taking the remain! ¯\\_(ツ)_/¯')
}

const createResponseFailure = () => {
  // console.error(error)
}

const getResponsesSuccess = (data) => {
  $('#responses-content').hide()
  $('#responses-content-text').hide()
  // console.log(data)
  // console.log(data.responses)
  // console.log(data.responses.length)
  // console.log(data.responses[0])
  // if (data.responses.length !== undefined)
  if (data.responses[0] !== undefined) {
    // console.log('data after api call', data)
    const showResponsesHtml = showResponsesTemplate({ responses: data.responses })
    store.responses = data.responses
    // console.log('>>>>> store.responses = ', store.responses)
    // console.log('Data Boolean: ', data.responses)

    $('#responses-content').show()
    $('#responses-content').html(showResponsesHtml)
// build my array
    const arrTextResponse = []
    for (let i = 0; i < data.responses.length; i++) {
      if (data.responses[i].text) {
        arrTextResponse.push(data.responses[i].text)
        // console.log(arrTextResponse)
      }
    }
// arrTextResponse.sort()
// arrTextResponse.toLowerCast()

    // convert array to lowercase
    for (let i = 0; i < arrTextResponse.length; i++) {
      arrTextResponse[i] = arrTextResponse[i].toLowerCase()
    }

// Create Object with values of array and number of repeats

    const result = {}
    for (let i = 0; i < arrTextResponse.length; i++) {
      if (!result[arrTextResponse[i]])
        result[arrTextResponse[i]] = 0
      ++result[arrTextResponse[i]]
    }

// print out contents of Hash
    const total = Number(data.responses.length)

    for (const key in result) {
      const textResponseNum = Number(result[key])
      const ratingAnswers4percent = ((textResponseNum / total) * 100)
      const ratingAnswers4Percent = parseFloat(ratingAnswers4percent).toFixed(2)
      $(`.textResponseInfo`).append('<tr>' + '<th>' + key + '</th> ' + '<th>' + result[key] + '</th>' + '<th>' + ratingAnswers4Percent + '%' + '</th>' + '</tr>')
    }

    // console.log('object_Length: ', data.responses.length)
    let yesAnswers = 0
    let noAnswers = 0
    let ratingAnswers1 = 0
    let ratingAnswers2 = 0
    let ratingAnswers3 = 0
    let ratingAnswers4 = 0
    let ratingAnswers5 = 0
    let totalRatingCount = 0

    for (let i = 0; i < data.responses.length; i++) {
      // Boolean Metric Logic
      if (data.responses[i].boolean === true) {
        yesAnswers++
        const total = Number(data.responses.length)
        const yesAnswersResponseNum = Number(yesAnswers)
        const yesAnswerspercent = ((yesAnswersResponseNum / total) * 100)
        const yesAnswersPercent = parseFloat(yesAnswerspercent).toFixed(2)

        // $(`.count-true`).text(`${yesAnswers} respondent(s) selected "YES"`)
        // $(`.count-true-percent`).text(`${yesAnswersPercent}% of respondents selected "YES"`)
          // if (i === data.responses.length -1) {
        $(`.booleanResponseData1`).html('<tr>' + '<th>' + 'YES' + '</th> ' + '<th>' + `${yesAnswers}` + '</th>' + '<th>' + `${yesAnswersPercent}` + '%' + '</th>' + '</tr>')
          // }
      } else if (data.responses[i].boolean === false) {
        noAnswers++
        const total = Number(data.responses.length)
        const noAnswersResponseNum = Number(noAnswers)
        const noAnswerspercent = ((noAnswersResponseNum / total) * 100)
        const noAnswersPercent = parseFloat(noAnswerspercent).toFixed(2)

        // $(`.count-false`).text(`${noAnswers} respondent(s) selected "NO"`)
        // $(`.count-false-percent`).text(`${noAnswersPercent}% of respondents selected "NO"`)
        // if (i === data.responses.length -1) {
        $(`.booleanResponseData2`).html('<tr>' + '<th>' + 'NO' + '</th> ' + '<th>' + `${noAnswers}` + '</th>' + '<th>' + `${noAnswersPercent}` + '%' + '</th>' + '</tr>')
        // }
      }

      // Ratings Meric Logic
      if (data.responses[i].rating) {
        const total = Number(data.responses.length)
        if (data.responses[i].rating === 1) {
          ratingAnswers1++
          const ratingAnswers1ResponseNum = Number(ratingAnswers1)
          totalRatingCount = (totalRatingCount + 1)
          const ratingAnswers1percent = ((ratingAnswers1ResponseNum / total) * 100)
          const ratingAnswers1Percent = parseFloat(ratingAnswers1percent).toFixed(2)

          $(`.numberResponseData1`).html('<tr>' + '<th>' + 'One' + '</th> ' + '<th>' + `${ratingAnswers1}` + '</th>' + '<th>' + `${ratingAnswers1Percent}` + '%' + '</th>' + '</tr>')
        } else if (data.responses[i].rating === 2) {
          ratingAnswers2++
          const ratingAnswers2ResponseNum = Number(ratingAnswers2)
          totalRatingCount = (totalRatingCount + 2)
          const ratingAnswers2percent = ((ratingAnswers2ResponseNum / total) * 100)
          const ratingAnswers2Percent = parseFloat(ratingAnswers2percent).toFixed(2)

          $(`.numberResponseData2`).html('<tr>' + '<th>' + 'Two' + '</th> ' + '<th>' + `${ratingAnswers2}` + '</th>' + '<th>' + `${ratingAnswers2Percent}` + '%' + '</th>' + '</tr>')
        } else if (data.responses[i].rating === 3) {
          ratingAnswers3++
          const ratingAnswers3ResponseNum = Number(ratingAnswers3)
          totalRatingCount = (totalRatingCount + 3)
          const ratingAnswers3percent = ((ratingAnswers3ResponseNum / total) * 100)
          const ratingAnswers3Percent = parseFloat(ratingAnswers3percent).toFixed(2)

          $(`.numberResponseData3`).html('<tr>' + '<th>' + 'Three' + '</th> ' + '<th>' + `${ratingAnswers3}` + '</th>' + '<th>' + `${ratingAnswers3Percent}` + '%' + '</th>' + '</tr>')
        } else if (data.responses[i].rating === 4) {
          ratingAnswers4++
          const ratingAnswers4ResponseNum = Number(ratingAnswers4)
          totalRatingCount = (totalRatingCount + 4)
          const ratingAnswers4percent = ((ratingAnswers4ResponseNum / total) * 100)
          const ratingAnswers4Percent = parseFloat(ratingAnswers4percent).toFixed(2)

          $(`.numberResponseData4`).html('<tr>' + '<th>' + 'Four' + '</th> ' + '<th>' + `${ratingAnswers4}` + '</th>' + '<th>' + `${ratingAnswers4Percent}` + '%' + '</th>' + '</tr>')
        } else if (data.responses[i].rating === 5) {
          ratingAnswers5++
          const ratingAnswers5ResponseNum = Number(ratingAnswers5)
          totalRatingCount = (totalRatingCount + 5)
          const ratingAnswers5percent = ((ratingAnswers5ResponseNum / total) * 100)
          const ratingAnswers5Percent = parseFloat(ratingAnswers5percent).toFixed(2)

          $(`.numberResponseData5`).html('<tr>' + '<th>' + 'Five' + '</th> ' + '<th>' + `${ratingAnswers5}` + '</th>' + '<th>' + `${ratingAnswers5Percent}` + '%' + '</th>' + '</tr>')
        }
        const ratingaverage = (totalRatingCount / total)
        const ratingAverage = parseFloat(ratingaverage).toFixed(2)

        $(`.ratingAverage`).text(`Average Rating for this Remain Question: ${ratingAverage} `)
      }

      if (data.responses[i].rating) {
        $('#text-response-data').show()
      }
    }
  } else {
    store.responses = data.responses
    $('#responses-content-text').show()
    $('#responses-content-text').text('you have no responses (╯°□°）╯︵ ┻━┻')
  }
}

const getResponsesFailure = () => {
  // console.error(error)
}

module.exports = {
  createResponseSuccess,
  createResponseFailure,
  getResponsesSuccess,
  getResponsesFailure
}
