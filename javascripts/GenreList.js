/** @jsx React.DOM */
var GenreList = React.createClass({
  render: function() {
    var items = this.props.items;
    var genres = {};

    for(var i = 0; i < items.length; i++) {
        var num = items[i];
        if (genres[num]) {
          genres[num] += 1;
        } else {
          genres[num] = 1;
        }
    }

    var returnValue = [];
    for (genre in genres) {
      returnValue.push(<li><p> {genre}: {genres[genre]} </p></li>);
    }

    return <div>
      <ul>{returnValue}</ul>
    </div>;
  }
});
