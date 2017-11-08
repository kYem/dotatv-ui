export default class LiveStreaming {

  constructor(wsuri = 'ws://127.0.0.1:1234/socket', onConnect) {
    this.isOpen = false
    this.socket = new WebSocket(wsuri)

    this.socket.onopen = () => {
      console.log(`connected to ${this.uri}`)
      this.isOpen = true
      if (typeof onConnect === 'function') {
        onConnect()
      }
    }

    this.socket.onclose = (e) => {
      console.log(`connection closed (${e.code})`)
      this.isOpen = false
    }

    this.socket.onmessage = (e) => {
      console.log(`message received: ${e.data}`)
    }
  }

  emit(event, params, reference) {
    this.socket.send(JSON.stringify({
      event,
      params,
      reference
    }))
  }

  send(msg) {
    this.socket.send(msg)
  }
}

