const mongoose = require('mongoose')
const Post = require('./src/models/post')

// Connection URL and connecting
const uri = 'mongodb://localhost:27017/demo'
mongoose.connect(uri)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

//demo
async function demo() {
    let posts = await Post.find({})

    console.log("Initial posts:", posts)

    await Post.deleteMany({})

    posts = await Post.find({})
    console.log('Posts after clearing and before adding new ones:', posts)

    const post1 = new Post({ title: 'First Post', body: 'This is the body of the first post.' })
    const post2 = new Post({ title: 'Second Post', body: 'This is the body of the second post.' })
    await post1.save()
    await post2.save()

    posts = await Post.find({})
    console.log('Posts after adding new ones:', posts)
    console.log('Demo finished, you can see the two posts in the database now.')
}

demo().then(() => mongoose.disconnect())