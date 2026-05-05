import React, { Component, ErrorInfo } from 'react';

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '3rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            maxWidth: '500px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#9888;</div>
            <h2 style={{
              color: '#1a237e',
              margin: '0 0 0.5rem 0',
              fontFamily: "'Inter', sans-serif",
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: '#666',
              margin: 0,
              fontFamily: "'Inter', sans-serif",
            }}>
              Please check the console for more details and try refreshing the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
