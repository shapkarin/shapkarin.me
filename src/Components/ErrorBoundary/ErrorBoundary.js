import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.location !== this.props.location) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    return <div style={{ color: 'red', fontSize: 18, padding: 10, width: 742 }}>
      <details>
        <summary style={{ fontSize: 22, fontWeight: 'bold' }}>Error :-(</summary>
        <div>
          {error.message}<br/>
          {error.response?.data?.message}
        </div>
      </details>
    </div>;
  }
}

export default ErrorBoundary;