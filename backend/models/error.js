import { HTTP_STATUS } from '../constants/httpStatus.js'
import { USER_MESSAGES } from '../constants/messages.js'

export class ErrorWithStatus {
  message
  status

  constructor({ message, status }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors

  constructor({ message = USER_MESSAGES.VALIDATION_ERROR, errors }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
