'use strict';

const AWS = require('aws-sdk'); 
const crypto = require('crypto')
const docClient = new AWS.DynamoDB.DocumentClient();

const builder = data => {
  if (data.title&&data.author&&data.genre)
  {
    return {
      id: crypto.randomUUID(),
      title: data.title,
      author: data.author,
      genre: data.genre
    } 
  }
  else {
    return false
  }
}

module.exports.get = async event => {

  return {
    statusCode: 200,
    body: "Hello World"
  };
}

module.exports.add = async event => {
    const body = JSON.parse(event.Body);
    const book = builder(body);
    if(!book)
    {
      return {
        statusCode: 400,
        body: JSON.stringify({
          msg: 'Missing Required Parameter(s)'
        })
      } 
    }
    docClient.put({
      TableName: 'books',
      Item: book
    })
    .then(data=>{
      return {
        statusCode: 200,
        body: JSON.stringify({
          book:book,
          data: data
        }),
      }
    })
    .catch(err=>{
      return {
        statusCode: 500,
        body: JSON.stringify({
          bd: body,
          err: err
        })
      }
    })
}

  
module.exports.put = async event => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      msg: "Not implemented"
    })
  }
}

  
module.exports.delete = async event => {
  return {
    statusCode: 404,
    body: JSON.stringify({
      msg: "Error Occured"
    })
  }
}


