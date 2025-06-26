import React from 'react';

export default function ErrorAlert({ message }) {
  return (
    <div className="alert alert-danger text-center mt-5">
      {message}
    </div>
  );
}
