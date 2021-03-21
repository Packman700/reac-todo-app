import React from "react";
import "components/Navigation.css"

function Navigation(props){
    const changeNavigationState = props.changeNavigationState
    const navigationState = props.navigationState
    console.log(navigationState)
    return(
        <nav>
            <ul>
                <li
                    onClick={changeNavigationState}
                    data-navigation-section="all"
                    className={navigationState === "all"?"selected":''}>
                    All
                </li>

                <li
                    onClick={changeNavigationState}
                    data-navigation-section="active"
                    className={navigationState === "active"?"selected":''}>
                    Active
                </li>
                <li
                    onClick={changeNavigationState}
                    data-navigation-section="completed"
                    className={navigationState === "completed"?"selected":''}>
                    Completed
                </li>
            </ul>
            <hr/>
        </nav>

    )
}

export default Navigation