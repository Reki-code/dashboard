import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/graduation.png"
      style={{width: 48}}
      {...props}
    />
  );
};

export default Logo;
