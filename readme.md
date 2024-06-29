Endpoints:
    GET - https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books
    GET - https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}
    POST - https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books
    PUT - https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}
    DELETE - https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}

Table Schema:
    id (String) | author | genre | title

POST/PUT body :

{
    "genre": "Book's genre",
    "title": "Book's title",
    "author": "Book's author"
}