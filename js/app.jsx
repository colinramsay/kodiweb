/** @jsx React.DOM */

var Status = require('./status'),
    Albums = require('./albums'),
    React = require('react');

window.kodi = new Xbmc.Controller({
    host:'pi.local',
    port: 80,
    onInit: function() {
        React.renderComponent(
            <div><Status kodi={window.kodi} /><Albums kodi={window.kodi} /></div>,
            document.getElementsByClassName('media')[0]
        );    
    }
});