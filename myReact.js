/** @jsx React.DOM */
var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var TodoApp = React.createClass({
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
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input className="form-control col-md-4" onChange={this.onChange} value={this.state.text} />
        </form>
        <TodoList items={this.state.items} />
      </div>
    );
  }
});

React.render(<TodoApp />, document.getElementById("content"));
