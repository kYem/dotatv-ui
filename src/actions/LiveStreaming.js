export default class LiveStreaming {

  constructor(wsUri, onConnect) {
    this.isOpen = false
    this.connectionString = wsUri

    /** The number of milliseconds to delay before attempting to reconnect. */
    this.reconnectInterval = 1000
    /** The maximum number of milliseconds to delay a reconnection attempt. */
    this.maxReconnectInterval = 30000
    /** The rate of increase of the reconnect delay. Allows reconnect attempts to back off when problems persist. */
    this.reconnectDecay = 1.5
    /** The maximum time in milliseconds to wait for a connection to succeed before closing and retrying. */
    this.timeoutInterval = 4000
    /** The maximum number of reconnection attempts to make. Unlimited if null. */
    this.maxReconnectAttempts = null

    // Track events
    this.events = {}
    this.subscriptions = {}


  }

  sockedOpen = (onConnect) => {
    this.isOpen = true
    window.addEventListener('beforeunload', () => this.socket.close())
    if (typeof onConnect === 'function') {
      onConnect()
    }
  }

  onClose = (e) => {
    console.log(`connection closed (${e.code})`)
    this.isOpen = false
    this.events = {}
    this.reconnect()
      .then(() => console.log('Reconnected'))
      .catch((e) => {
        this.subscriptions = {}
        console.log(e)
      })
  }

  reconnect = () => this.connect().then(() => {
    for (const prop in this.subscriptions) {
      if (this.subscriptions.hasOwnProperty(prop)) {
        const sub = this.subscriptions[prop]
        this.subscribe(sub.serviceName, sub.parameters, sub.reference, sub.callback)
      }
    }
  })

  onMessage = (e) => {
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

  emit(event, params, reference) {
    this.connect().then(() => this.socket.send(JSON.stringify({ event, params, reference })))
  }

  connect = () => new Promise((resolve, reject) => {
      // Already opened
    if (this.isOpen) {
      resolve()
      return
    }

    if (!this.socket || this.socket.readyState !== WebSocket.CONNECTING || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(this.connectionString)
      this.socket.onopen = this.sockedOpen.bind(this)
      this.socket.onmessage = this.onMessage.bind(this)
      this.socket.onclose = this.onClose.bind(this)
    }

    const internal = setInterval(() => {
      if (this.isOpen) {
        clearInterval(internal)
        resolve()
      }
    }, 10)
    setTimeout(() => {
      clearInterval(internal)
      reject(`Failed to reconnect within ${this.timeoutInterval}`)
    }, this.timeoutInterval)
  })

  /**
   * @param event
   * @param callback
   */
  once(event, callback) {
    this.events[event] = { callback }
  }

  /**
   * @param serviceName
   * @param parameters
   * @param reference
   * @param callback
   */
  subscribe(serviceName, parameters, reference, callback) {
    this.connect().then(() => {
      this.socket.send(JSON.stringify({
        event: serviceName,
        params: parameters,
        reference
      }))
      const event = `${serviceName}.${reference}`
      this.subscriptions[event] = { serviceName, parameters, reference, callback }
    }
   )
  }
}

