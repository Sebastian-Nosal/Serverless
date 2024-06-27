'use strict';

const AWS = require('aws-sdk'); 
const crypto = require('crypto')
const docClient = AWS.DynamoDb.DocumentClient()

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
    StatusCode: 200,
    body: "Hello World"
  };
}

module.exports.add = async event => {
    const body = JSON.parse(event.body)
    const book = builder(body)
    try
    {
      await docClient.put({
        TableName: 'books',
        Item: book
      }).promise()
      return {
        StatusCode: 200,
        body: JSON.stringify({
          book
        })
      }
    }
    catch 
    {
      return {
        StatusCode: 400,
        body: JSON.stringify({
          msg: "Error Occured"
        })
    }
  }
}

  
module.exports.put = async event => {
  return {
    StatusCode: 404,
    body: JSON.stringify({
      msg: "Not implemented"
    })
  }
}

  
module.exports.delete = async event => {
  return {
    StatusCode: 404,
    body: JSON.stringify({
      msg: "Error Occured"
    })
  }
}


