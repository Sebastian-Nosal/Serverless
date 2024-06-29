const AWS = require('aws-sdk'); 
const dynamodb = new AWS.DynamoDB();

const checkIfDbExist = async tableName => {
    if(tableName)
      {
        try
        {
            await dynamodb.describeTable({
            TableName: tableName
            }).promise()
            return true
        }
        catch(err)
        {
            if (err.code === 'ResourceNotFoundException') {
                return false;
            } else {
                throw err;
            }
        }
      }
    else
    {
        throw "Missing tablename"
    }
      
  }
  
const setupDb = async (tableName,key) => {
    await dynamodb.createTable({
      TableName: tableName,
      KeySchema: [
        { AttributeName: key, KeyType: 'HASH' },  
      ],
      AttributeDefinitions: [
        { AttributeName: key, AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    }).promise()
  }

  module.exports = { checkIfDbExist, setupDb };