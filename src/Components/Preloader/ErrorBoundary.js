import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  static componentDidCatch(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', fontSize: 18, padding: 10 }}>
        Could not fetch :-(<br />
        { this.state.error?.message && <div>Error message: { this.state.error.message }</div>}
        Please, let me know <a href="mailto:yury@shapkarin.me?subject=Home Page Error">yury@shapkarin.me</a>
        <br />
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
