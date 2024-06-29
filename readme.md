# Books API

## Endpoints

- **GET** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books)
- **GET** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id})
- **POST** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books)
- **PUT** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id})
- **DELETE** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id}](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books/{id})

## Table Schema

| Field  | Type   |
|--------|--------|
| id     | String (UUID) |
| author | String |
| genre  | String |
| title  | String |

## POST/PUT Body

```json
{
    "genre": "Book's genre",
    "title": "Book's title",
    "author": "Book's author"
}
```
## GET search params 

 - **By genre** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?genre=Fantastyka](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?genre=Fantastyka)
 - **By title** - [https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?title=Pożegnalny ukłon](https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?title=Pożegnalny ukłon)
 - **By author** -[https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?author=J.K.%20Rowling] (https://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?author=J.K.%20Rowlinghttps://5583k7tci5.execute-api.eu-central-1.amazonaws.com/dev/books?author=J.K.%20Rowling)



