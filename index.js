const lineReader = require('./read-first');
const NodeCache = require("./cache");

const api = async function (app, constant) {
  if (typeof (app) !== 'function') {
    throw new TypeError("express object is incorrect")
  }
  if (!Array.isArray(constant)) {
    throw new TypeError("directory parameter is incorrect")
  }
  let obj = {}
  for (let i = 0; i < constant.length; i++) {
    const liner = new lineReader(constant[i]);
    // console.log(liner)
    let line = liner.next()
    obj[line.toString('ascii').replace(/(.*)=/, "").trim().split(' ')[0]] = constant[i]
    NodeCache.put("controllers", obj);
  }

  function controllerFunction(req, res, next) {
    try {
      if (!req.params.functionName.includes('.')) {
        throw new TypeError("Seperate controller name and function name with a dot")
      }
      let cacheObj = NodeCache.get("controllers")
      console.log("🚀 ~ file: index.js ~ line 27 ~ controllerFunction ~ cacheObj", cacheObj)
      let data = Object.keys(cacheObj).filter(key => key == req.params.functionName.split('.')[0])[0];
      if (!data) {
        throw new TypeError("Controller paramter does not match with any controller")
      }
      let controller = require(cacheObj[data])
      controller[req.params.functionName.split('.')[1]](req, res, next)
    } catch (err) {
      console.error(err)
    }
  };

  async function customMiddleware(req, res, next) {

    try {
      if (!req.params.payload) {
        next()
        return
      }
      let cacheObj = NodeCache.get("controllers")
      let reqObj = JSON.parse(req.params.payload)
      if (!reqObj.middleware) {
        next()
        return
      }
      for (let i = 0; i < reqObj.middleware.length; i++) {
        let data = Object.keys(cacheObj).filter(key => key == reqObj.middleware[i].split('.')[0])[0];
        if (!reqObj.middleware[i].includes('.')) {
          throw new TypeError("Seperate controller name and middleware function name with a dot")
        }
        let controller = require(cacheObj[data])
        await controller[reqObj.middleware[i].split('.')[1]](req, res, next);
      }
    } catch (err) {
      console.error(err)
    }
    next()
  }
  // Routes
  app.get('/:functionName/:payload?', customMiddleware, controllerFunction);
  app.post('/:functionName/:payload?', customMiddleware, controllerFunction);
  app.put('/:functionName/:payload?', customMiddleware, controllerFunction);
  app.delete('/:functionName/:payload?', customMiddleware, controllerFunction);

}

module.exports = {
  api: api,
};