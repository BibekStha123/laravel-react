import React from 'react';
import { Outlet } from 'react-router-dom';

function GuestLayout(props) {
    return (
        <div>
            This is guest
            <Outlet/>
        </div>
    );
}

export default GuestLayout;