import React from 'react';
import { Route } from 'react-router-dom';
import CurrentTeamContainer from '../team/current_team_container';


const Dashboard = () => {

  return (
    <section className='dashboard-main'>
      <nav className='dashboard-left'>
        left bar
      </nav>

      <section className='dashboard-right'>
        <div className='top-nav-bar'>
          <ul>
            <ul>
              <li>My Tasks</li>
              <li>Inbox</li>
              <li>Dashboard</li>
            </ul>

            <li>Search Bar</li>
            <li><Route path='/dashboard/teams/:teamId' component={CurrentTeamContainer}/></li>
          </ul>
        </div>

        <section className='dashboard-tasks'>
          tasks
        </section>
      </section>
    </section>
  );
};

export default Dashboard;