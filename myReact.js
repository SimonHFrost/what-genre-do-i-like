/** @jsx React.DOM */
var ArtistList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var ArtistApp = React.createClass({
  acceptableArtists: [
    'skrillex', 'odesza'
  ],
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var query = this.state.text;

    var reactLand = this;
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'artist'
      },
      success: function (response) {
        console.log(response);
        if(response.artists.items.length > 0) {
          var nextItems = reactLand.state.items.concat([reactLand.state.text + " " + response.artists.items[0].popularity]);
          var nextText = '';
          reactLand.setState({items: nextItems, text: nextText});
        } else {
          alert("can't find artist sorry");
        }
      },
      failure: function (response) {
        alert("can't find artist sorry");
      }
    });
  },
  render: function() {
    return (
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input className='form-control' onChange={this.onChange} value={this.state.text} />
        </form>
        <ArtistList items={this.state.items} />
      </div>
    );
  }
});

React.render(<ArtistApp />, document.getElementById('content'));
