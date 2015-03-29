/** @jsx React.DOM */
var ArtistApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: '', genres: []};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  onSubmit: function(e) {
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
        if(response.artists.items.length > 0) {
          me.success(response.artists.items[0]);
        } else {
          me.failure();
        }
      },
    });
  },
  success: function(artist) {
    var genre = artist.genres[0];
    var pair = [ artist.images[0].url, artist.name ];
    var nextItems = this.state.items.concat([pair]);
    var nextGenres = this.state.genres.concat(genre ? genre : "not specified");
    this.setState({items: nextItems, text: '', genres: nextGenres});
  },
  failure: function() {
    alert("can't find artist");
  },
  render: function() {
    return (
      <div>
        <form className='form-inline' onSubmit={this.onSubmit}>
          <input className='form-control' onChange={this.onChange} value={this.state.text} placeholder="Enter an artist you like and then press enter" />
        </form>
        <hr />
        <div className='row'>
          <div className='col-md-6'>
            <h3>Artists</h3>
            <ArtistList items={this.state.items} />
          </div>
          <div className='col-md-6'>
            <h3>Genres</h3>
            <GenreList items={this.state.genres} />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<ArtistApp />, document.getElementById('content'));
