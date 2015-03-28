/** @jsx React.DOM */
var GenreList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return itemText;
    };

    var genres = this.props.items;
    var counts = {};

    for(var i = 0; i < genres.length; i++) {
        var num = genres[i];
        if (counts[num]) {
          counts[num] += 1;
        } else {
          counts[num] = 1;
        }
    }

    var returnValue = "";
    var prepareReturn = function() {
      for (count in counts) {
        returnValue += " " + count + ": " + counts[count];
      }
    }();

    return <div>
      <p>{returnValue}</p>
    </div>;
  }
});
