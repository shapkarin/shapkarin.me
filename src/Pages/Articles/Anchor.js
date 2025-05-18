import React from 'react';

const flatten = (text, child) => {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
};

const HeadingRenderer = props => {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W+/g, (match, index, str) => 
    index + match.length === str.length ? '' : '-'
  );
  return React.createElement('h' + props.level, { id: slug }, props.children);
};

export default HeadingRenderer;
