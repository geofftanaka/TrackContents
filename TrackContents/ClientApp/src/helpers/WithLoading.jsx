import { React } from 'react';

export default function WithLoading(WrappedComponent) {
  return function WithLoading({ loading, ...props }) {

    if (loading) {
      return <div className="main" style={{ width: '100%', padding: 50, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
}