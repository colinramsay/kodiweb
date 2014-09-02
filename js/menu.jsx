/** @jsx React.DOM */

var React = require('react');

require('../css/menu.css');

module.exports = React.createClass({
    render: function() {
        return <ul className="menu">
            <li><span></span>
                <ul className="subMenu"> 
                    <li><a href="#albums">Albums</a></li>
                    <li><a href="#movies">Movies</a></li>
                </ul>
            </li>
        </ul>
    }
});