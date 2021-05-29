// 環境変数の読み込み
require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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

const notesRef = admin.firestore().collection('notes')

// ルーティング
const router = express.Router()

  // メモの取得
  router.get('/note', async (req, res) => {
    const querySnapshot = await notesRef.get()
    let notes = new Array()
    querySnapshot.forEach(function(doc) {
      const note = Object.assign(doc.data(), {id: doc.id})
      notes.push(note)
    });
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send({notes: notes})
  })

  // メモの追加
  router.post('/note/add', async (req, res) => {
    const note = req.body.note
    await notesRef.add(note)
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.status(201).json({
      result: 'ok' + ' ' + req.body.note
    })
  })

  // メモの削除
  router.delete('/note/delete/:id', async (req, res) => {
    noteId = req.params.id
    await notesRef.doc(noteId).delete()
  })

app.use('/api', router)

module.exports = app
