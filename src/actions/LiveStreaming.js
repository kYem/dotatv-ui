export class LiveStreaming {

  constructor(wsuri = 'ws://127.0.0.1:1234/socket') {
    this.socket = null
    this.uri = wsuri
    this.isOpen = false
  }

  getSocket(cb) {
    this.socket = new WebSocket(this.uri)

    this.socket.onopen = () => {
      console.log(`connected to ${this.uri}`)
      this.isOpen = true
      if (typeof cb === 'function') {
        cb()
      }
    }

    this.socket.onclose = (e) => {
      console.log(`connection closed (${e.code})`)
    }

    this.socket.onmessage = (e) => {
      console.log(`message received: ${e.data}`)
    }
    return this.socket
  }

  send(msg) {
    this.socket.send(msg)
  }
}

