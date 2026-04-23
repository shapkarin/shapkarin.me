import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

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

    return <div className={styles.container}>
        {error.message}<br/>
        {error.response?.data?.message}
    </div>;
  }
}

export default ErrorBoundary;