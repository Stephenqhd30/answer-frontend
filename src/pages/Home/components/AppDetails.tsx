import React from 'react';

const AppDetails:React.FC = () => {
  

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">App Details</h1>
        <p className="text-lg mb-4">
          This app is a simple to-do list that allows users to add, edit, and
          delete tasks. It uses React, TypeScript, and Tailwind CSS to build a
          responsive and user-friendly interface.
        </p>
        <p className="text-lg mb-4">
          The app is built using
        </p>
      </div>
    </div>
  )
}

export default AppDetails;
