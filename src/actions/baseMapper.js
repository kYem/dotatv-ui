import moment from 'moment'
import { getSocket } from 'iiSocket'

export default class BaseMapper {
  constructor(socket) {
    this.urg = new UniqueRequestGeneratorService()
    this.socket = socket || getSocket('default')
  }

    /**
     * Get service promise.
     * @param serviceName
     * @param parameters
     * @return {Promise} a promise that may be resolved
     * with the given resolve and reject functions,
     * or rejected by a thrown exception in resolver
     */
  getRequest(serviceName, parameters) {
    return new Promise((resolve, reject) => {
      const reference = this.urg.generate()
      const data = {
        parameters,
        reference
      }

      this.socket.emit(serviceName, data)
      this.socket.once(`${serviceName}.${reference}`, (response) => {
        if (response && response.success) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  }

  generate() {
    return `${moment().format('YYYYMMDD-HHmmss')}-${Math.round(Math.random() * 10000000)}`
  }

  getRequestData(serviceName, parameters) {
    return new Promise((resolve, reject) => {
      const reference = this.urg.generate()
      const data = {
        parameters,
        reference
      }

      this.socket.emit(serviceName, data)
      this.socket.once(`${serviceName}.${reference}`, (response) => {
        if (response && response.success) {
          resolve(response.data)
        }
        reject(response)
      })
    })
  }
}
