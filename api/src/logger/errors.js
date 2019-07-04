export class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.code = 401
    this.message = 'Autentification not found, you have to be authentificated to perform this action.'
  }
}

export class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.code = 404
    this.message = `Resource Error: ${this.message}`
  }
}

export class ApolloError extends Error {
  constructor(message) {
    super(message)
    this.code = 409
    this.message = `Resource already exists: ${this.message}`
  }
}

export class WrongArgumentsError extends Error {
  constructor(message) {
    super(message)
    this.code = 400
    this.message = `Wrong arguments : ${this.message}`
  }
}

export class ServiceUnavailableError extends Error {
  constructor(message) {
    super(message)
    this.code = 503
    this.message = `At least one service is unresponding ${this.message}`
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.code = 404
    this.message = `Conflict error: ${this.message}`
  }
}
