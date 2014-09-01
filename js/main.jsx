/** @jsx React.DOM */

var React = require('react'),
    AlbumStore = require('./store'),
    actions = require('./actions'),
    Fluxxor = require('fluxxor'),
    Application = require('./application');
    
var flux = new Fluxxor.Flux({ albumStore: new AlbumStore() }, actions);

React.renderComponent(<Application flux={flux} />, document.getElementsByClassName('media')[0]);