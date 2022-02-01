 var server = http.createServer((req, res) => {
     //lodash
     const num = _.random(0, 20);
     console.log(num)


     res.setHeader('Content-Type', 'text/html')

     fs.readFile('./Car Game/Index.html', (err, data) => {

         if (err) {
             console.log(err)
             res.end()
         } else {
             res.write(data)
             res.end('ok')
         }
     })

 });