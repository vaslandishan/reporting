import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import 'devextreme/dist/css/dx.common.css';
import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import appInfo from './app-info';
import { navigation } from './app-navigation';
import singleCard from './layouts/single-card/single-card';
import './App.scss';
import './dx-styles.scss';
import { Footer, LoginForm,MainForm } from './components';
import {onLineUsers, maxDate} from './pages/dashboard/data';
import Background1 from './assets/img/bg_main.jpg';
import {
SideNavOuterToolbar as SideNavBarLayout,
SingleCard
} from './layouts';
import { sizes, subscribe, unsubscribe } from './utils/media-query';

import Background from './assets/img/bg_login.jpg';
let sectionStyle = {
    width: "100%",
    height: "100%",
    display:"flex",
    webkitBackgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundImage: `url(${Background})`

};

let sectionStyle1 = {
    width: "100%",
    height: "100%",
    webkitBackgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top center',
    backgroundImage: `url(${Background1})`

};

const LoginContainer = ({ logIn }) => <LoginForm onLoginClick={logIn} />;

const NotAuthPage = (props) => (
    <section style={sectionStyle}>
        <SingleCard className={"frm-login-center"} >
            <Route render={() => <LoginContainer {...props} />} />
        </SingleCard>
    </section>
);

const AuthPage = (props) => (
    <section style={sectionStyle1}>
  <SideNavBarLayout menuItems={navigation} title={appInfo.title} {...props} >

      {/*<SingleCard >*/}

          <Switch>
              <Route path="/" component={MainForm} />
          </Switch>

      {/*</SingleCard>*/}



  </SideNavBarLayout>
    </section>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: true,
      screenSizeClass: this.getScreenSizeClass()
    };

    this.userMenuItems = [
      {
        text: 'مشخصات کاربر',
        icon: 'user'
      },
      {
        text: 'خروج',
        icon: 'runner',
        onClick: this.logOut
      }
    ];
  }

  componentDidMount() {
    subscribe(this.screenSizeChanged);
  }

  componentWillUnmount() {
    unsubscribe(this.screenSizeChanged);
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <div className={`app ${this.state.screenSizeClass}`}>
        <Router>{loggedIn ? <AuthPage userMenuItems={this.userMenuItems} /> : <NotAuthPage  logIn={this.logIn} />}</Router>
      </div>
    );
  }

  getScreenSizeClass() {
    const screenSizes = sizes();
    return Object.keys(screenSizes).filter(cl => screenSizes[cl]).join(' ');
  }

  screenSizeChanged = () => {
    this.setState({
      screenSizeClass: this.getScreenSizeClass()
    });
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  };

  logOut = () => {
    this.setState({ loggedIn: false });
  };
}

export default App;
