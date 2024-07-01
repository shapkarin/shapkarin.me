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
      return <div style={{ color: 'red', fontSize: 18, padding: 10, width: 742 }}>
        Could not fetch :-(<br />
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;