import React from 'react';

function Error({ statusCode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </h1>
        <p className="mb-4">Please try again later or contact support if the problem persists.</p>
        <a 
          href="/"
          className="inline-block px-5 py-3 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 