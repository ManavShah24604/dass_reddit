import React from 'react';




const Dashboard = () => {
 

  return (
    <div className="container" style={{marginTop: '50px'}}>
  <div className="card" style={{width: '345px', margin: 'auto'}}>
    <div className="card-header d-flex justify-content-between">
      <img src="https://via.placeholder.com/100x100" className="avatar" />
      <div className="d-flex align-items-center">
        <h5 className="card-title m-0">Username</h5>
        <i className="fas fa-ellipsis-v ml-3"></i>
      </div>
    </div>
    <div className="card-body">
      <p className="card-text">This is a short description</p>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
