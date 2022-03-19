const mailjet = require ('node-mailjet')
.connect('f08a6e9ca0a87d2efaa3439546b042be', '04b5eee8e5c90c5ac296e806870a1971')
const request = mailjet
.post("send", {'version': 'v3.1'})
.request({
  "Messages":[
    {
      "From": {
        "Email": "solocurioso123@gmail.com",
        "Name": "Harshdeep"
      },
      "To": [
        {
          "Email": "solocurioso123@gmail.com",
          "Name": "Harshdeep"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })

module.exports = mailjet;