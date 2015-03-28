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
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
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
