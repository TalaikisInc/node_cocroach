import express from 'express'
import bodyParser from 'body-parser'
import async from 'async'

const { pool, client } = require('./config/db')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/posts/', async (req, res) => {
  const query = 'SELECT * FROM node.posts'
  pool.connect((err, client, done) => {
    const finish = () => {
      done()
      // process.exit()
    }

    if (err) {
      console.error('Could not connect to cockroachdb', err)
      const response = { data: null, message: err.message }
      res.send(response)
      finish()
    }

    client.query(query, (err, results) => {
      if (err) {
        console.error('Error selecting from posts: ', err)
        const response = { data: null, message: err.message }
        res.send(response)
        finish()
      } else {
        const response = {
          data: results ? results.rows : null,
          message: 'All posts retrieved.'
        }
        res.send(response)
        finish()
      }
    })
  })
})

app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM posts WHERE id=${id}`
  pool.connect((err, client, done) => {
    const finish = () => {
      done()
      process.exit()
    }

    if (err) {
      console.error('Could not connect to cockroachdb', err)
      const response = { data: null, message: err.message }
      res.send(response)
      finish()
    } else {
      client.query(query, (err, results) => {
        if (err) {
          console.error('Error selecting from posts: ', err)
          const response = { data: null, message: err.message }
          res.send(response)
          finish()
        } else {
          const post = results[0]
          const response = {
            data: post,
            message: `Post ${post.title} retrieved.`
          }
          res.status(200).send(response)
          finish()
        }
      })
    }
  })
})

app.post('/post/', async (req, res) => {
  const { title, content, image } = req.body
  const query = `INSERT INTO posts (title, content, imaage) VALUES ('${title}', '${content}', '${image}')`

  pool.connect((err, client, done) => {
    const finish = () => {
      done()
      process.exit()
    }

    if (err) {
      console.error('Could not connect to cockroachdb', err)
      const response = { data: null, message: err.message }
      res.send(response)
      finish()
    } else {
      client.query(query, (err, results) => {
        if (err) {
          console.error('Error selecting from posts: ', err)
          const response = { data: null, message: err.message }
          res.send(response)
          finish()
        } else {
          const { id } = results
          const post = { id, title, content, image }
          const response = {
            data: post,
            message: `Post ${title} added.`
          }
          res.status(201).send(response)
          finish()
        }
      })
    }
  })
})

app.put('/post/:id', async (req, res) => {
  const { id } = req.params
  const query = `SELECT * FROM posts WHERE id=${id} LIMIT 1`

  pool.connect((err, client, done) => {
    const finish = () => {
      done()
      process.exit()
    }

    if (err) {
      console.error('Could not connect to cockroachdb', err)
      const response = { data: null, message: err.message }
      res.send(response)
      finish()
    } else {
      client.query(query, (err, results) => {
        if (err) {
          console.error('Error selecting from posts: ', err)
          const response = { data: null, message: err.message }
          res.send(response)
          finish()
        } else {
          const { id, title, content, image } = { ...results[0], ...req.body }
          const query = `UPDATE posts SET title='${title}', content='${content}', image='${image}' WHERE id='${id}'`
          client.query(query, (err, results) => {
            if (err) {
              const response = { data: null, message: err.message }
              res.send(response)
              finish()
            } else {
              const post = {
                id,
                title,
                content,
                image
              }
              const response = {
                data: post,
                message: `Post ${title} is updated.`
              }
              res.send(response)
              finish()
            }
          })
        }
      })
    }
  })
})

app.delete('/post/:id', async (req, res) => {
  const { id } = req.params
  const query = `DELETE FROM posts WHERE id=${id}`

  pool.connect((err, client, done) => {
    const finish = () => {
      done()
      process.exit()
    }

    if (err) {
      console.error('Could not connect to cockroachdb', err)
      const response = { data: null, message: err.message }
      res.send(response)
      finish()
    } else {
      client.query(query, (err, results) => {
        if (err) {
          console.error('Error selecting from posts: ', err)
          const response = { data: null, message: err.message }
          res.send(response)
          finish()
        } else {
          const response = {
            data: null,
            message: `Post with id: ${id} deleted.`
          }
          res.send(response)
          finish()
        }
      })
    }
  })
})

app.all('*', (req, res) => {
  const response = { data: null, message: 'Route not found!' }
  res.status(400).send(response)
})

app.listen(process.env.PORT, () => {
  console.log(`Server listens to ${process.env.PORT}`)
})
