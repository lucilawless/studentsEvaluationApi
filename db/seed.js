const request = require('superagent')
const user = require('./fixtures/user.json')
const batches = require('./fixtures/batches.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

const createbatches = (token) => {
  return batches.map((batch) => {
    return request
      .post(createUrl('/batches'))
      .set('Authorization', `Bearer ${token}`)
      .send(batch)
      .then((res) => {
        console.log('batch seeded...', res.body.title)
      })
      .catch((err) => {
        console.error('Error seeding batch!', err)
      })
  })
}
const authenticate = (email, password) => {
request
  .post(createUrl('/sessions'))
  .send({ email, password })
  .then((res) => {
    console.log('Authenticated!')
    return createbatches(res.body.token)
  })
  .catch((err) => {
    console.error('Failed to authenticate!', err.message)
  })
}

request
  .post(createUrl('/users'))
  .send(user)
  .then((res) => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })
