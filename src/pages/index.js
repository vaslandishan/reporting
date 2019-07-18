import React from "react";


import profilePage from './profile/profile';
import displayDataPage from './display-data/display-data';
import display from './display/display';
import form213 from './form-213/form-213';
import form313 from './form-313/form-313';
import dashboard from './dashboard/dashboard';
import aboutUs from './aboutUs/aboutUs';


export {default as HomePage} from './home/home';
export {default as ProfilePage} from './profile/profile';
export {default as DisplayDataPage} from './display-data/display-data';
export {default as Display} from './display/display';
export {default as Form213} from './form-213/form-213';
export {default as Form313} from './form-313/form-313';
export {default as Dashboard} from './dashboard/dashboard';
export {default as AboutUs} from './aboutUs/aboutUs';


export const pages = [
    {
        name:"dashboard",
        component:dashboard,
        renderHtml:<dashboard/>
    }, {
        name:"profilePage",
        component:profilePage,
        renderHtml:<profilePage/>
    }, {
        name:"displayDataPage",
        component:displayDataPage,
        renderHtml:<displayDataPage/>
    }, {
        name:"display",
        component:display,
        renderHtml:<display/>
    }, {
        name:"form213",
        component:form213,
        renderHtml:<form213/>
    }, {
        name:"form313",
        component:form313,
        renderHtml:<form313/>
    }, {
        name:"aboutUs",
        component:aboutUs,
        renderHtml:<aboutUs/>
    }
];
export default {
    pages
}
// export const ListOfComponents = [HomePage,ProfilePage,DisplayDataPage,Display];
