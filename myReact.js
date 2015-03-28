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
        if(response.artists.items.length > 0) {
          me.success(response.artists.items[0])
        } else {
          me.failure();
        }
      },
    });
  },
  success: function(artist) {
    var popularity = artist.popularity;
    var genre = artist.genres[0];
    var pair = [ artist.images[0].url, artist.name + " (" + popularity + ")" ];
    var nextItems = this.state.items.concat([pair]);
    var nextGenres = this.state.genres.concat(genre ? genre : "none");
    this.setState({items: nextItems, text: '', genres: nextGenres});
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
