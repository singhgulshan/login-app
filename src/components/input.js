import React from 'react';

const button = (props) => {
  const { error, placeholder, name, autoComplete, change, type, blur } = props;
  return (
    <div className="input-container">
      <input
        className="input"
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={change}
        onBlur={blur}
      />
      <div className="input-line"></div>
      <div className={`error${error ? ' show' : ''}`}>{error ? error : ''}</div>
    </div >
  );
};

export default button;