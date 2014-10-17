var AlbumStore = require('./album-store'),
    StatusStore = require('./status-store'),
    Fluxxor = require('fluxxor');

var actions = {
    album: require('./album-actions'),
    status: require('./status-actions'),
    control: require('./control-actions')
};

var stores = {
    album: new AlbumStore(),
    status: new StatusStore()
};

console.debug('Exporting Fluxxor instance as Flux!');

module.exports = new Fluxxor.Flux(stores, actions);