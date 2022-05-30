# min-route
![npm](https://img.shields.io/npm/v/min-route)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/min-route)
[![install size](https://packagephobia.com/badge?p=min-route)](https://packagephobia.com/result?p=min-route)

* [Description](#description)
* [Installation](#install)
* [Basic Usage](#basic-usage)
    * [Server Index File](#server-index-file)
    * [Controller File](#controller-file)
    * [Client Side](#function-call-from-client-side)
* [Advanced Usage](#advanced-usage)
* [License](#license)

## Description
A simple and lightweight library to manage server side routes. It uses only 4 routes for whole project. It is based on Rest API and it is not a replacement of GraphQL but similar to it

## Install
```sh
$ npm i min-route
```

## Basic Usage
### Server index file
```sh
const express = require('express');
const minRoute = require('min-route')

const app = express();

minRoute.api(app, [<path of controller file 1>, <path of controller file 2>, ...... <path of controller file n>])

app.listen(<port-number>, () => {});
```
### Controller file
Add the name of the controller in all your controller file's first line.

```sh
Syntax - /** @controller = <name> **/
```
Example-
```sh
/** @controller = controller001 **/

//require all the libraries below @controller line
const someLibrary = require('some-library');


const getUser = async (req, res) => {
  //your logic here
    return res.status(200).send({message: "Message"});
}

const postUser = async (req, res) => {
  //your logic here
    return res.status(200).send({message: "Message"});

}

module.exports = {
    getUser,
    postUser
}
```
### Function call from client side

Here- \
3000 is the server's port number \
controller001 is name of controller file which we defined in server's controller file \
getUser is the function defined in the controller file \
{"param1":"value1", "param2": "value2"} is the object of paramters

### Note -
1. seperate controller name and function name with a dot (.)
2. parameters should be in an object


```sh
let baseUrl = "http://localhost:3000/";
let config = {
	serverFunction:"controller001.getUser/",
  //seperate the controller name and the function name with a dot
	params: {"param1":"value1", "param2": "value2"},
  //parameters should be in an object
	method: "GET"
  }
let reqOptions = {
  url: config.baseUrl + config.serverFunction + config.params,
  method: config.method
  headers: headersList,
  data: bodyContent,
}

axios.request(reqOptions).then(function (response) {
  console.log(response.data);
})
```
### Shorthand
```sh
axios.request(url: "http://localhost:3000/controller001.getUser/{"param1":"value1", "param2": "value2"}",
  method: "GET"
  headers: headersList,
  data: bodyContent,).then(function (response) {
  console.log(response.data);
})
```

## Advanced Usage
### Custom Middleware
From Client side send middleware array in the parameter object like this-

### Note -
1. Parameter name should be middleware
2. seperate controller name and function name with a dot (.)

```sh
let baseUrl = "http://localhost:3000/";
let config = {
	serverFunction:"controller001.postUser/",
  //seperate the controller name and the function name with a dot
	params: {"param1":"value1", "param2": "value2", "middleware": ["controller002.multerFunction", "controller003.authenticateFunction"]},
  //add a middleware key and pass the middleware functions in an array.
  //seperate the controller name and function name with a dot.
	method: "POST"
  }
let reqOptions = {
  url: config.baseUrl + config.serverFunction + config.params,
  method: config.method
  headers: headersList,
  data: bodyContent,
}

axios.request(reqOptions).then(function (response) {
  console.log(response.data);
})
```
### Shorthand
```sh
axios.request(url: "http://localhost:3000/controller001.postUser/{"param1":"value1", "param2": "value2", "middleware": ["controller002.multerFunction", "controller003.authenticateFunction"]}",
  method: "POST", // or GET/PUT/DELETE
  headers: headersList,
  data: bodyContent,).then(function (response) {
  console.log(response.data);
})
```

## License

[MIT](LICENSE)