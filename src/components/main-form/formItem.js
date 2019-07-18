import React from 'react';
import { Route , withRouter} from 'react-router-dom';
import {Component} from "devextreme-react";
import profile from '../../pages/profile/profile'
import home from '../../pages/home/home'
import display from '../../pages/display/display'
// import pageMainPath from '../../pages/index.js'

class formItem extends React.PureComponent{


    render() {
        const mainPath = '../../pages';
        const formData=this.props.data;
        const formItem = mainPath+formData.url+formData.url+".js";
        return (
            <Route component={display}/>
        );
    }
}

export default formItem;