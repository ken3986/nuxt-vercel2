// 環境変数の読み込み
require('dotenv').config()

const express = require('express')
const app = express()

// ルーティング
const router = express.Router()

  router.get('/', (req, res) => {
    res.json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
      test: 'api'
    })
  })

  router.get('/test', (req, res) => {
    res.json({
      body: req.body,
      query: req.query,
      cookies: req.cookies,
      test: 'test',
      key1: process.env.KEY1
    })
  })

app.use('/api', router)

module.exports = app
