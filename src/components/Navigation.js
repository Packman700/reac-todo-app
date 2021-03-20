import React from "react";

function Navigation(props){
    const changeNavigationState = props.changeNavigationState
    return(
        <ul>
            <li onClick={changeNavigationState} data-navigation-section="all">
                All
            </li>

            <li onClick={changeNavigationState} data-navigation-section="active">
                Active
            </li>

            <li onClick={changeNavigationState} data-navigation-section="completed">
                Completed
            </li>

        </ul>
    )
}

export default Navigation