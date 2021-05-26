// 環境変数の読み込み
require('dotenv').config()

const express = require('express')
const app = express()



if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
}

const usersRef = admin.database().ref("users");
  // const channelsRef = admin.database().ref('channels');

  const getData = (ref) => {
    return new Promise((resolve, reject) => {
      const onDataCallback = snapshot => resolve(snapshot.val())
      ref.on('value', onDataCallback)
    });
  }

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
