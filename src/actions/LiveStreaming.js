export default class LiveStreaming {

  constructor(wsuri = 'ws://127.0.0.1:8008/socket', onConnect) {
    this.isOpen = false
    this.socket = new WebSocket(wsuri)

    // Track events
    this.events = {}
    this.subscriptions = {}

    this.socket.onopen = () => {
      console.log(`connected to ${wsuri}`)
      this.isOpen = true
      window.addEventListener('beforeunload', () => this.socket.close())
      if (typeof onConnect === 'function') {
        onConnect()
      }
    }

    this.socket.onclose = (e) => {
      console.log(`connection closed (${e.code})`)
      this.isOpen = false
      this.events = {}
      this.subscriptions = {}
    }

    this.socket.onmessage = (e) => {
      const msg = JSON.parse(e.data)

      if (this.subscriptions[msg.event]) {
        this.subscriptions[msg.event].callback(msg)
      } else if (this.events[msg.event]) {
        this.events[msg.event].callback(msg)
        delete this.events[msg.event]
      } else {
        console.log(`message received, not found handler: ${e.data}`)
      }
    }
  }

  emit(event, params, reference) {
    if (!this.isOpen) {
      const internal = setInterval(() => {
        if (this.isOpen) {
          clearInterval(internal)
          console.log('sending ', event)
          this.socket.send(JSON.stringify({ event, params, reference }))
        }
      }, 10)
    } else {
      this.socket.send(JSON.stringify({ event, params, reference }))
    }
  }

  /**
   * @param event
   * @param callback
   */
  once(event, callback) {
    this.events[event] = { callback }
  }

  /**
   * @param event
   * @param callback
   */
  subscribe(event, callback) {
    this.subscriptions[event] = { callback }
  }
}

