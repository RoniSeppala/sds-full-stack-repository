//http, static files and JSON API demo

import http from "http";
import fs from "fs";

//in memory demo data for json api demo
const books = [
    { id: 1, title: "Book One" },
    { id: 2, title: "Book Two" },
    { id: 3, title: "Book Three" }
];

const server = http.createServer(async (req, res) => {
    try {
        const { method, url} = req;

        //GET demo
        if(method === "GET" && url === "/") {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("<h1>HTTP get demo</h1><br>Hello World");
            return
        }

        //GET demo for a different route
        if(method === "GET" && url === "/about") {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end("<h1>About page</h1><br>This is a simple HTTP server demo");
            return
        }

        //static file serving demo
        if(method === "GET" && url === "/home") {
            const html = await fs.readFileSync("/public/index.html", "utf-8");
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
            return
        }

        //static file serving demo about
        if(method === "GET" && url === "/aboutpage") {
            const html = await fs.readFileSync("/public/about.html", "utf-8");
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
            return
        }

        //POST demo which returns the body of the request
        if(method === "POST" && url === "/echo") {
            let body = "";

            req.on("data", chunk => {
                body += chunk;
            });

            req.on("end", () => {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end(body);
            });
        }

        //JSON API demo
        if(method === "GET" && url === "/api/allBooks") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(books));
            return
        }

        //JSON API demo for single book (/api/books/:id)
        if(method === "GET" && url.startsWith("/api/books/")) {
            const id = parseInt(url.split("/").pop());
            const book = books.find(b => b.id === id);

            if(book) {
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify(book));
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ message: "Book not found" }));
            }
            return
        }

        //JSON API demo for creating a new book
        if(method === "POST" && url === "/api/books") {
            let body = "";
            req.on("data", chunk => {
                body += chunk;
            });
            req.on("end", () => {
                const newBook = JSON.parse(body);
                books.push(newBook);
                res.writeHead(201, {"Content-Type": "application/json"});
                res.end(JSON.stringify(newBook));
            });
            return
        }

        //fallback
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Not Found");
    } catch (error) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Internal Server Error");
    }

});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});