import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { 
      error,
      hasError: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetCheck !== this.props.resetCheck) {
      this.setState({
        hasError: false,
      });
    }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error);
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError && (!error || !error.message)) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    } if (hasError) {
      return (
        <div>
          <pre>{error.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
        </div>
      );
    }

    return this.props.children; 
  }
}