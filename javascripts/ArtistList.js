/** @jsx React.DOM */
var ArtistList = React.createClass({
  render: function() {
    var createItem = function(pair) {
      var image = pair[0];
      var artist = pair[1];

      return <li><img className='albumArt' height='64' src={image}/><p>{artist}</p></li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
