/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({
    render: function() {
        var loading = null;

        if(this.props.loading) {
            loading = <div className="loading"></div>
        }

        return loading
    }
});