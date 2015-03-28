/** @jsx React.DOM */
var TextList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var ArtistApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', genres: []};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    if(this.state.text == '') {
      return;
    }

    this.searchArtist(this.state.text);
  },
  searchArtist: function(query) {
    var me = this;
    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'artist'
      },
      success: function (response) {
        console.log(response);
        if(response.artists.items.length > 0) {
          me.success(response.artists.items[0])
        } else {
          me.failure();
        }
      },
    });
  },
  success: function(artist) {
    console.log("Most popular genre is " + artist.genres[0]);
    var popularity = artist.popularity;
    var genre = artist.genres[0];
    var nextItems = this.state.items.concat([artist.name + " (" + popularity + ")"]);
    var nextGenres = this.state.genres.concat(genre ? genre : "None");
    var nextText = '';
    this.setState({items: nextItems, text: nextText, genres: nextGenres});
  },
  failure: function() {
    alert("can't find artist")
  },
  render: function() {
    return (
      <div>
        <form className='form-inline' onSubmit={this.handleSubmit}>
          <input className='form-control' onChange={this.onChange} value={this.state.text} />
        </form>
        <div className='row'>
          <h3>Artists</h3>
          <div className='col-md-6'>
            <TextList items={this.state.items} />
          </div>
          <h3>Genres</h3>
          <div className='col-md-6'>
            <TextList items={this.state.genres} />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<ArtistApp />, document.getElementById('content'));
