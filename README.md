# min-route

* [Installation](#install)
* [Basic Usage](#basic-usage)
    * [Server Index File](#server-index-file)
    * [Controller File](#controller-file)
    * [Client Side](#function-call-from-client-side)
* [Advanced Usage](#advanced-usage)
* [License](#license)


## Install
```sh
$ npm i min-route
```

## Basic Usage
### Server index file
```sh
const express = require('express');
const MinRoute = require('min-route')

const app = express();

MinRoute.api(app, [<path of controller file 1>, <path of controller file 2>, ...... <path of controller file n>])

app.listen(<port-number>, () => {});
```
### Controller file
add the name of the controller in all your controller file's first line.

```sh
Syntax - /** @controller = <name> **/
```
example
```sh
/** @controller = control1 * */
const someLibrary = require('some-library');


const funtion1 = async (req, res) => {
    console.log('funtion1')
    return res.status(200).send({status: 0, message: "Messages"});
}

const function2 = async (req, res) => {
    console.log('function2')
    return res.status(200).send({status: 0, message: "Messages"});

}

module.exports = {
    funtion1,
    function2
}
```
### Function call from client side

Here- \
3000 is the server's port number \
control1 is name of controller file which we defined in server's controller file \
function 1 is the function defined in the controller file \
{"param1":"value1", "param2": "value2"} is the object of paramters

### Note -
1. seperate controller name and function name with a dot (.)
2. parameters should be in an object


```sh
let reqOptions = {
  url: "http://localhost:3000/control1.function1/{"param1":"value1", "param2": "value2"}",
  method: "GET", // or POST/PUT/DELETE
  headers: headersList,
  data: bodyContent,
}

axios.request(reqOptions).then(function (response) {
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
let reqOptions = {
  url: "http://localhost:3000/control1.testConttroller/{"param1":"value1", "param2": "value2", "middleware": ["control2.multerFunction", "control3.authenticateFunction"]}",
  method: "GET", // or POST/PUT/DELETE
  headers: headersList,
  data: bodyContent,
}

axios.request(reqOptions).then(function (response) {
  console.log(response.data);
})
```

## License

[MIT](LICENSE)