var MyComponent = React.createClass({
    render: function(){
        return (
            <h1>Hello, world!</h1>
        );
    }
});

/** @jsx React.DOM */
React.render(
  <MyComponent/>,
  document.getElementById('mount-point')
);
