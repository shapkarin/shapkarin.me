import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{}}>
        Could not fetch :-(<br />
        {' '}
        Please, let me know <a href="mailto:yury@shapkarin.me?subject=Home Page Error">yury@shapkarin.me</a>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;