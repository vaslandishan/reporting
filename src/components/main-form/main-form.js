import React from 'react';
// import loadableUtil from 'react-loadable'
import { Router , withRouter} from 'react-router-dom';

// import TabPanel from 'devextreme-react/tab-panel';
import CompanyItem from './CompanyItem.js';
import formItem from './formItem.js';
import profile from '../../pages/profile/profile';
import form213 from  '../../pages/form-213/form-213';
import form313 from  '../../pages/form-313/form-313';
import CheckBox from 'devextreme-react/check-box';
import { TabPanel, Item } from "devextreme-react/tab-panel";
import './main-form.scss';
import display from "../../pages/display/display";
import home from "../../pages/home/home";
import dashboard from "../../pages/dashboard/dashboard";
import * as components from "../../pages";
import { createStore } from 'devextreme-aspnet-data-nojquery';

import Background from '../../assets/img/bg_main.jpg';
import {subscribe} from "../../utils/media-query";
import {StaticHtml} from "../../pages";
let sectionStyle = {
    width: "100%",
    height: "100%",
    paddingRight:"0"


};

const serviceUrl = "../../pages/";
const store = createStore({
    key: "ID",
    loadUrl:   serviceUrl + "form-213/form-213",
    insertUrl: serviceUrl + "dashboard/dashboard",
    updateUrl: serviceUrl + "profile/profile",
});
export default class mainForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            animationEnabled: true,
            swipeEnabled: false,
            loop: true,
            selectedIndex: 0
        };
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onTitleHold = this.onTitleHold.bind(this);
        this.onLoopChanged = this.onLoopChanged.bind(this);
        this.onAnimationEnabledChanged = this.onAnimationEnabledChanged.bind(this);
        this.onSwipeEnabledChanged = this.onSwipeEnabledChanged.bind(this);
    }

    render() {

        const { animationEnabled, loop, selectedIndex, swipeEnabled } = this.state;

        let pathOfForm =null;
        let nameOfForm =null;
        let temp =null;
        let tabList=null;

        tabList=localStorage.getItem("Tabs");
        try{
            temp=this.props.history.location.search;
            let arrayData=temp.split("^",2);
            if (arrayData.length>1){
                pathOfForm = arrayData[0].substr(1);
                nameOfForm = arrayData[1];
                if (pathOfForm==="undefined"){
                    pathOfForm="!";
                }
                if (nameOfForm.includes('%')){
                    pathOfForm="!";
                }
            }else{
                pathOfForm="!";
            }

        }catch(e){
            pathOfForm="!";
        }
        if (pathOfForm==="!"){
            console.log("url:!");


            if (tabList===null){

            }else{
                tabList = JSON.parse(tabList);
            }


        }else{

                tabList= this.prepareTabList(pathOfForm,nameOfForm);

        }
        let itemsOfPanel= this.createItemsStatic(tabList,pathOfForm);
        // let itemsOfPanel= this.createItems(tabList,pathOfForm);


        return(
            <section style={sectionStyle}>
                <div className={'divStyle'} >




                    <TabPanel className={'divStyle'}
                        for
                        deferRendering={false}
                        scrollingEnabled={true}
                        scrollByContent={true}
                        showNavButtons={true}
                        activeStateEnabled={true}
                        // dataSource={store}
                        // repaintChangesOnly={true}
                        // items={itemsOfPanel}
                        rtlEnabled={true}
                        loop={loop}
                        noDataText={"گزارشی برای نمایش وجود ندارد"}

                        // itemTitleRender={this.itemTitleRender}
                        // itemComponent={CompanyItem}
                        animationEnabled={animationEnabled}
                        swipeEnabled={swipeEnabled}
                        selectedIndex={selectedIndex}
                        onOptionChanged={this.onSelectionChanged}
                        onTitleHold={this.onTitleHold}
                        // itemTemplate={dashboard}
                    >

                        {itemsOfPanel}

                    </TabPanel>




                </div>


            </section>


        );


    }


    createItemsStatic = (formList,pathOfForm) => {

        let items =[];


        items.push(<Item title={"صفحه اصلی"} component={dashboard} />);
        items.push(<Item title={"گزارش تراکنش های حساب"} component={form213} />);
        // items.push(<Item title={"گزارش "} component={form313} />);

       /* let lastTab=localStorage.getItem("LastTab");
        // let lastTabJson=null;
        if (lastTab===null){

        }else{
            if (lastTab.includes("form213")){
                items.push(<Item title={"گزارش تراکنش های حساب"} component={form213} />);
                // lastTabJson=JSON.parse(lastTab);
            }
        }*/
        /*if (lastTabJson===null){
            return items;
        }

        if (pathOfForm==='/form213' || lastTabJson[0].url==="/form213"){

        }*/


        return items;
    };
    createItems_org = (formList,pathOfForm) => {
       /* if ((pathOfForm==="!")|| (formList.length<1)){
            return "";
        }*/
        if (formList.length<1){
            return "";
        }
        let savedComponents =formList;
        let items =[];
        let i=0;
        components.pages.map(function(item) {

            for (let i = 0; i < savedComponents.length; i++) {
                if (savedComponents[i].url.substr(1)===item.name){
                    items.push(<Item title={savedComponents[i].Name} component={item.component} />);
                    break;
                }
            }
        });

        return items;
    };
    createItems = (formList,pathOfForm) => {
       /* if ((pathOfForm==="!")|| (formList.length<1)){
            return "";
        }*/
        if (formList===null){
            return "";
        }
        if (formList.length<1){
            return "";
        }
        let savedComponents =formList;
        let items=[] ;
        let i=0;
        components.pages.map(function(item) {

            for (let i = 0; i < savedComponents.length; i++) {
                if (savedComponents[i].url.substr(1)===item.name){
                    // items=items+"\n"+<Item title={savedComponents[i].Name} component={item.component} />;
                    // items.push(<Item title={savedComponents[i].Name} component={item.component} />);
                    items.push(<Item title={savedComponents[i].Name} component={item.component} />);
                    break;
                }
            }
        });

        return items;
    };


    itemTitleRender(form) {
        return <span>{form.Name}</span>;
    }


    componentDidMount() {
        console.log("test");

        // this.setState(this.state);
        // this.forceUpdate();
    }

    componentWillReceiveProps(args) {
        console.log('rerender here');
        console.log(args);
        // this.yourFunction()
        // this.setState({})
    }

    onSelectionChanged(args) {

        if (args.name === 'selectedIndex') {
            this.setState({
                selectedIndex: args.value
            });
        }
       /* if (args.name === 'selectedItems') {
            this.setState({
                selectedItems: args.value
            });
        }*/
        /*if (args.name === 'items') {
            this.setState({
                repaintChangesOnly:true
            });

        }*/
    }

    onLoopChanged(args) {
        this.setState({
            loop: args.value
        });
    }

    onTitleHold(args) {
        console.log("title hold");
        console.log(args);
            this.setState({
                loop: args.value
            });
        }

    onAnimationEnabledChanged(args) {
        this.setState({
            animationEnabled: args.value
        });
    }

    onSwipeEnabledChanged(args) {
        this.setState({
            swipeEnabled: args.value
        });

        // this.forceUpdate();
    }

    prepareTabItem(tabName, tabIndex, url,Id){

        const tab = {
            ID:Id,
            Name: tabName,
            tabIndex: tabIndex,
            url: url

        };
        return JSON.stringify(tab);

    }

    prepareTabList(pathOfForm,nameOfForm){

        /*
               localStorage.removeItem('myData');
               localStorage.clear();
       */


        let tabList = null;
         // pathOfForm = this.props.location.url;
         // nameOfForm = this.props.location.formName;

        /*if (!pathOfForm){
            return
        }*/
        tabList=localStorage.getItem('Tabs');
        let tabListMap = new Map();
        if (tabList==="" || tabList===null || tabList==='null' ){
            let jsonItem=this.prepareTabItem(nameOfForm,0,pathOfForm,1);
            localStorage.setItem('Tabs', "["+jsonItem+"]");
            localStorage.setItem('LastTab',"["+jsonItem+"]");

            tabList = localStorage.getItem('Tabs');
            tabList=JSON.parse(tabList);
            // tabListMap.set(pathOfForm,jsonItem);

        }else {
            tabList = JSON.parse(tabList);

            let lastID=0;
            let firstID=0;
            let isInArray=false;
            if (tabList){
                const tabIndex=tabList.length;
                tabList.forEach(function (obj) {
                    // tabListMap.set(obj.url,obj);
                    lastID=obj.ID;
                    if (obj.ID===0){
                        firstID=obj.ID;
                    }
                    if (obj.url===pathOfForm){
                      isInArray=true;
                    }
                    // console.log(obj);
                });
                if (isInArray){
                    //TODO
                }else{

                    const jsonElement=this.prepareTabItem(nameOfForm,tabIndex,pathOfForm,lastID+1);
                    let jsonString=localStorage.getItem('Tabs');
                    jsonString=jsonString.substr(0,jsonString.length-1)+","+jsonElement+"]";
                    localStorage.setItem('Tabs', jsonString);
                    tabList = JSON.parse(jsonString);

                }
            }






        }

        return tabList;

    }




}
