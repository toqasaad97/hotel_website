import React from 'react';
import Loader from './Loader';

const Loadable = ({
  isLoading,
  children,
  type = 'clip',
  size = 60,
  overlayColor = 'rgba(255, 255, 255, 0.7)',
  overlay = false
}) => {
  if (!isLoading) {
    return children;
  }

  if (overlay) {
    return (
      <div className="relative">
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ backgroundColor: overlayColor }}
        >
          <Loader type={type} size={size} />
        </div>
        <div className="opacity-50">
          {children}
        </div>
      </div>
    );
  }

  return <Loader type={type} size={size} />;
};

export default Loadable;