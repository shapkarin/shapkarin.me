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
        <details>
          <summary style={{ fontSize: 22, fontWeight: 'bold' }}>Error :-(</summary>
          <pre>
            {this.state.error.code
              && <><span style={{ fontWeight: 'bold' }}>Code: </span>{this.state.error.code}<br /></>}
            {this.state.error.message}
          </pre>
        </details>
      </div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;