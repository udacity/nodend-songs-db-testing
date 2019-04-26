'use strict'

const test = require('tape')
const SongsDb = require('../songs-db')
const { setupDatabase, wipeDatabase } = require('./util/storage')

async function setup () {
  wipeDatabase()
  await setupDatabase()
}

test('songs-db: list songs by artist', async t => {
  // Setup
  await setup()

  // Teardown
  t.on('end', () => {
    wipeDatabase()
  })

  // Test
  try {
    const db = await SongsDb.at()
    const results = await db.listSongsByArtist('Komiku')
    t.ok(results, 'should not be undefined')
    t.ok(Array.isArray(results), 'should be an array')
    t.equal(results.length, 2, 'should contain 2 songs')
  } catch (err) {
    t.error(err, 'should not fail')
  }
  t.end()
})

test('songs-db: list songs by artist - not existant', async t => {
  // Setup
  await setup()

  // Teardown
  t.on('end', () => {
    wipeDatabase()
  })

  // Test
  try {
    const db = await SongsDb.at()
    const results = await db.listSongsByArtist('Dio')
    t.ok(results, 'should not be undefined')
    t.ok(Array.isArray(results), 'should be an array')
    t.equal(results.length, 0, 'not contain songs')
  } catch (err) {
    t.error(err, 'should not fail')
  }
  t.end()
})
