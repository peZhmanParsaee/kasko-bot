const request = require('request')
const EventEmitter = require('events')

module.exports = class Bot extends EventEmitter {
  init (TOKEN) {
    this.TOKEN = TOKEN

    return new Promise((resolve, reject) => {
      console.log('TOKEN', TOKEN)
      let url = `https://api.telegram.org/bot${TOKEN}/getMe`

      request(url, (err, res, body) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        const botInfo = JSON.parse(body).result
        console.log('botInfo: ', botInfo)
        if (!botInfo) {
          reject(new Error('Response body is empty'))
        }
        this.id = botInfo.id || ''
        this.first_name = botInfo.first_name || ''
        this.last_name = botInfo.last_name || ''
        this.username = botInfo.username || ''
        this.language_code = botInfo.language_code || ''
        resolve()
      })
    })
  }

  getName () {
    if (this.last_name) {
      return `${this.first_name} ${this.last_name}`
    } else {
      return `${this.first_name}`
    }
  }

  introduceYourself () {
    console.log(`Hello, my name is ${this.getName()}. You can talk to me through my username: @${this.username}`)
  }

  getUpdates () {
    return new Promise((resolve, reject) => {
      const url = `https://api.telegram.org/bot${this.TOKEN}/getUpdates`
      request(url, (err, res, body) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        const updates = JSON.parse(body).result
        resolve(updates)
      })
    })
  }

  sendMessage (chatId, message) {
    return new Promise((resolve, reject) => {
      const url = `https://api.telegram.org/bot${this.TOKEN}/sendMessage`
      const formData = {
        chat_id: chatId,
        text: message
      }

      request.post({ url: url, formData: formData }, (err, httpRes, body) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        console.log(body)
        resolve(body)
      })
    })
  }

  on (event, eventHandler) {
    super.on(event, eventHandler)
  }
}
