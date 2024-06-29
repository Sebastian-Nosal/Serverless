const _200 = (data) =>{
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
} 

const _201 = (data) =>{
    return {
        statusCode: 200,
        body: JSON.stringify({msg: 'Resource created',resource: data})
    }
} 

const _202 = (data) =>{
    return {
        statusCode: 200,
        body: JSON.stringify({msg: data})
    }
} 
const _204 = (id) =>{
    return {
        statusCode: 200,
        body: JSON.stringify({msg: `Resource not exist ${id}`,})
    }
} 

const _400 = (info) =>{
    return {
        statusCode: 400,
        body: JSON.stringify({msg: info})
    }
} 

const _404 = () =>{
    return {
        statusCode: 400,
        body: JSON.stringify({msg: 'Not found'})
    }
}

const _500 = (err='') =>{
    return {
        statusCode: 500,
        body: JSON.stringify({msg: 'internal problem',err:err})
    }
} 

module.exports = {
    _200: _200,
    _201: _201,
    _202: _202,
    _204: _204,
    _400: _400,
    _404: _404,
    _500: _500
}