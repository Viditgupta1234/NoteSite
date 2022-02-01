const express = require('express');
const res = require('express/lib/response')
const req = require('express/lib/request')
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
//express application
const app = express();

//conecting to DB using ip adress
const uri = "mongodb+srv://vidit:vidit@Viditcluster.keuto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("connected to db"))
    .catch((err) => console.error(err))

app.listen(3000)

app.set('view engine', 'ejs')
    //listen to request broh
    //middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })


    .catch((err) => {
        console.log(err)
    })
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
})
app.get('/blogs', (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.post('/blogs', (req, res) => {
    const blogs = new Blog(req.body)
    blogs.save()
        .then((result) => {
            res.redirect('/blogs/')
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
        // Yes, it's a valid ObjectId, proceed with `findById` call.
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
})
app.get('/', (req, res) => {
    //res.send('<p> LELO CHUTIYO</p>')
    res.redirect('/blogs');
})

app.get('/about', (req, res) => {
    //res.send('about page chutiyo')
    res.render('about', { title: 'About' })
})


app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})