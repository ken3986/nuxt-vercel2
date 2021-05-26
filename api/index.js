// 環境変数の読み込み
require('dotenv').config()

const express = require('express')
const app = express()

// Firebase RealtimeDatabaseに接続
const admin = require('firebase-admin');
const serviceAccount = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, ('\n')),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
}

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

  router.get('/test2', async(req, res) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    // res.send({value: "テスト２"});
    const users = await getData(usersRef);
    res.send(users);
  });

app.use('/api', router)

module.exports = app
