const fs = require('fs');

let users = ["Demo user1"];

const requestHandler = (req,resc) => {

    route = req.url;
    method = req.method;
    data = req.data;
    method = req.method;

    if(route === '/')
    {
        console.log(users);
        resc.write(`<html>`)
        resc.write(`<head><title>Create New User</title></head>`)
        resc.write(`<body><form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Create</button></form></body>`)
        resc.write(`</html>`)
        return resc.end()
    }
    else if(route === '/users')
    {
        resc.write(`<html>`)
        resc.write(`<head><title>Registered Users</title></head>`)
        resc.write(`<body>`)
        resc.write(`<h3>List of Users</h3><ul>`)
        users.forEach(user => resc.write(`<li>${user}</li>`))
        resc.write(`</ul></body>`)
        resc.write(`</html>`)
        return resc.end()
    }
    else if(route === '/create-user' && method === 'POST')
    {
        const body = [];
        req.on('data',(chunk)=> {
            body.push(chunk)
        })
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            let user = parsedBody.split("=")[1]
            users.push(user)
            console.log(`User ${user} created Successfully !`);
            resc.statusCode = 302;
            resc.setHeader('Location','/users');
            return resc.end()
        })
    }
    else
    {
        resc.statusCode = 302;
        resc.setHeader('Location','/');
        return resc.end()
    }
}

module.exports = requestHandler