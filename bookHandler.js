'use strict';

const AWS = require('aws-sdk');
const crypto = require('crypto');
const { checkIfDbExist, setupDb } = require('./utils');
const Response = require('./responses');


const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = "Books"

const bookBuilder = data => {
  if (data.title&&data.author&&data.genre)
  {
    return {
      title: data.title,
      author: data.author,
      genre: data.genre
    } 
  }
  else return null
}

module.exports.list = async (event) =>
{
  const query = event.queryStringParameters
  let searchParameters = {}
  let flag = false
  if(query.genre)
  {
    searchParameters.genre = query.genre
    flag = true;
  }

  if(query.author)
    {
      searchParameters.author = query.author
      flag = true;
    }

  if(query.title)
    {
      searchParameters.title = query.title
      flag = true;
    }

  try
  {
    let list
    if(flag) list = docClient.scan({TableName: tableName, Key:searchParameters}).promise();
    else list = await docClient.scan({TableName: tableName}).promise();
    return Response._200(list.Items)
  }
  catch(error)
  {
    return Response._500(err)
  }
}

module.exports.get = async (event) =>{
  if (event.pathParameters&&event.pathParameters.id)
  {
    const id = event.pathParameters.id;
    try
    {
      const user = await docClient.get({
        TableName:tableName,
        Key: {id: id}
      }).promise()

      if(user)
      {
        return Response._200(user)
      }
      else
      {
        return Response._404()
      }
    }
    catch(err)
    {
      return Response._500(err)
    }
  }
  return Response._400('Missing required path parameter: id')
}

module.exports.create = async (event) =>
{
  if(!(await checkIfDbExist(tableName)))
  {
    setupDb(tableName,'id')
  }

  const body = JSON.parse(event.body)
  let book = bookBuilder(body)
  if(book)
  {
    book.id = crypto.randomUUID()
    
      const data = await docClient.put({
        TableName: tableName,
        Item: book
      }).promise()

      return Response._200(book)
  }
  else
  {
    return Response._400('Missing one of required values')
  }
}

module.exports.createOrUpdate = async (event) =>
{
  if (event.pathParameters&&event.pathParameters.id)
    {
      const id = event.pathParameters.id;
      let isString = ( typeof id === 'string' || value instanceof String);
      if(isString&&id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{11}$/i))
      {
        const body = JSON.parse(event.body)
        let book = bookBuilder(body)

        if(!book) return Response._400('Missing one of required values')
        
        book.id = id
        
        try
        {
          const data = await docClient.put({
            TableName: tableName,
            Item: book
          }).promise()

          return Response._200(data)
        }
        catch(err)
        {
          return Response._500(err)
        }
      }
      else return Response._400('ID is improper '+isString)
      
    }
    return Response._400('Missing required path parameter: id')
}

module.exports.deleteById = async (event) =>
{
  if (event.pathParameters&&event.pathParameters.id)
  {
    const id = event.pathParameters.id;

    try
    {
      const toDelete = await docClient.get({
        TableName:tableName,
        Key: {id:id}
      }).promise()

      if(toDelete)
        {
          await docClient.delete({
            TableName: tableName,
            Key: {
              id: id,
            },
          }).promise();
          return Response._202(`Deleting resource with id: ${id} `)
        }
        else return Response._204(id)
    }
    catch(err)
    {
      return Response._500(err)
    }
  }
  return Response._400('Missing required path parameter: id')
}