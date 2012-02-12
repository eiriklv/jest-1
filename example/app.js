var express = require('express')
    , Resource = require('express-resource')
    , util = require('util')
    , api = require('../api')
    , resources = require('../resource')
    , app = express.createServer();

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/api_db');

// create mongoose model
var User = mongoose.model('user', new Schema({
    username: String,
    email: String,
    password : String,
    index:Number
}));

// create api with path
var rest_api = new api.Api('/api/',app);

// create mongoose-resource for User model
var UserResource = function()
{
    UserResource.super_.call(this,User);
    this.fields = ['username','index'];
    this.default_query = function(query)
    {
        return query.where('index').gte(10);
    };
    this.filtering = {'index':0};
};

util.inherits(UserResource,resources.MongooseResource);

// register resource to api
rest_api.register_resource('users',new UserResource());


app.listen(80);