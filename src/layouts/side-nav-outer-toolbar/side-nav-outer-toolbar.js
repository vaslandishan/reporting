import Drawer from 'devextreme-react/drawer';
import ScrollView from 'devextreme-react/scroll-view';
import React from 'react';
import { withRouter } from 'react-router';
import { Header, SideNavigationMenu, Footer } from '../../components';
import { AboutUs } from '../../pages';
import './side-nav-outer-toolbar.scss';
import { sizes, subscribe, unsubscribe } from '../../utils/media-query';
import { Template } from 'devextreme-react/core/template';
import { menuPreInitPatch } from '../../utils/patches';
import {maxDate, onLineUsers} from "../../pages/dashboard/data";
import Background from "../../assets/img/bg_login.jpg";
import {Link, Popover, Popup} from "devextreme-react";
import {SingleCard} from "../index";
import DateInput from "../../components/persian-calendar/DateInputWithDialog";

class SideNavOuterToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpened: sizes()['screen-large'],
      temporaryMenuOpened: false,
        popupVisible: false,
        withShadingOptionsVisible: false,
      ...this.drawerConfig
    };
      this.handleClick = this.handleClick.bind(this);
      this.hideInfo = this.hideInfo.bind(this);
      this.hideWithShadingOptions = this.hideWithShadingOptions.bind(this);
    this.menuPatch = menuPreInitPatch(this);
  }

  render() {
    const { menuItems, title, location, userMenuItems } = this.props;
    const {
      menuOpened,
      menuMode,
      shaderEnabled,
      menuRevealMode,
      minMenuSize
    } = this.state;
      let sectionStyle = {
          float: 'right',


      };
    return (
      <div className={'side-nav-outer-toolbar'}>
        <Header

              className={'layout-header'}
              menuToggleEnabled
              userMenuItems={userMenuItems}
              toggleMenu={() =>
                  this.setState({ menuOpened: !this.state.menuOpened })
              }
              title={title}
          />
        <Drawer
          className={'layout-body' + this.menuPatch.cssClass}
          // position={'before'}
            rtlEnabled={true}
          position={'right'}
          closeOnOutsideClick={this.closeDrawer}
          openedStateMode={menuMode}
          revealMode={menuRevealMode}
          minSize={minMenuSize}
          maxSize={313}
          shading={shaderEnabled}
          opened={menuOpened}
          template={'menu'}

        >



          {/*<ScrollView className={'with-footer'}/>*/}
          <ScrollView  showScrollbar={'never'}
                       scrollByContent={false}
                       reachBottomText={'never'}
                       bounceEnabled={false}
                       scrollByThumb={false}
              >
            <div className={'content'}>
              {React.Children.map(this.props.children, item => {
                return item.type !== Footer && item;
              })}
            </div>
           {/* <div className={'content-block'}>
              {React.Children.map(this.props.children, item => {
                return item.type === Footer && item;
              })}
            </div>*/}
          </ScrollView>
          <Template name={'menu'}>
            <SideNavigationMenu
                id={"mainMenuId"}
              items={menuItems}

              compactMode={!menuOpened}
              selectedItem={location.pathname}
              className={'dx-swatch-additional'}
              selectedItemChanged={this.navigationChanged}
              openMenu={this.navigationClick}
              onMenuReady={this.menuPatch.onReady}
            >
              <Popover
                  target={'#mainMenuId'}
                  position={'left'}
                  width={300}
                  height={100}
                  visible={this.state.withShadingOptionsVisible}
                  onHiding={this.hideWithShadingOptions}
                  shading={false}
                  // style={{padding:0}}
                  shadingColor={'rgba(0, 0, 0, 0.5)'}
              >
                  <div className={'dx-field-label'}> {location.pathname} </div>
              </Popover>
            </SideNavigationMenu>
          </Template>
        </Drawer>
        <Footer>

         {/* <div style={{float:'right'}}>
              <span>    تعداد کاربران آنلاین</span>
              <span> : </span>
              <span> {onLineUsers}</span>
              <span style={{padding:"0px 10px"}}>|</span>
              <span>  تاریخ ماکزیمم روز برای گزارشات خلاصه دفتر</span>
              <span> : </span>
              <span> {maxDate}</span>
          </div>*/}
          <div style={{float:'left'}} >
              <a  className={'behsazan-link' }
                  // key={index}
                  onClick={this.handleClick}
              >کلیه حقوق این نرم افزار متعلق به شرکت وصل اندیشان می باشد</a>
          </div>


            <Popup
                className={'popup'}
                visible={this.state.popupVisible}
                onHiding={this.hideInfo}
                dragEnabled={true}
                showTitle={false}
                title={''}
                width={500}
                height={460}
                rtlEnabled={true}
                closeOnOutsideClick={true}
            >
             <AboutUs/>
            </Popup>
          </Footer>
      </div>
    );
  }

    hideWithShadingOptions() {
        this.setState({
            withShadingOptionsVisible: false
        });
    }

  componentDidMount() {
    subscribe(this.updateDrawer);
  }

   handleClick() {
       this.setState({
           popupVisible: true
       });
        // event.preventDefault();
        // alert('you clicked me');

    }

    hideInfo() {
        this.setState({
            popupVisible: false
        });
    }

    componentWillUnmount() {
    unsubscribe(this.updateDrawer);
  }

  closeDrawer = () => {
    if (!this.state.shaderEnabled) {
      return false;
    }

    this.setState({ menuOpened: false });
    return true;
  }

  updateDrawer = () => {
    this.setState({ ...this.drawerConfig });
  };

  get drawerConfig() {
    const isXSmall = sizes()['screen-x-small'];
    const isLarge = sizes()['screen-large'];

    return {
      menuMode: isLarge ? 'shrink' : 'overlap',
      menuRevealMode: isXSmall ? 'slide' : 'expand',
      minMenuSize: isXSmall ? 0 : 60,
      shaderEnabled: !isLarge
    };
  }

  get hideMenuAfterNavigation() {
    const { menuMode, temporaryMenuOpened } = this.state;
    return menuMode === 'overlap' || temporaryMenuOpened;
  }

  navigationChanged = event => {
      const path = event.itemData.path;
      const pointerEvent = event.event;

      if (path && this.state.menuOpened) {
          if (event.node.selected) {
              pointerEvent.preventDefault();
          } else {
              this.props.history.push(path);
          }

          if (this.hideMenuAfterNavigation) {
              this.setState({
                  menuOpened: false,
                  temporaryMenuOpened: false
              });
              pointerEvent.stopPropagation();
          }
      } else {
          pointerEvent.preventDefault();
      }
  };

  navigationClick = () => {
    this.setState(({ menuOpened }) => {
      return !menuOpened
        ? {
          temporaryMenuOpened: true,
          menuOpened: true
        }
        : {};
    });
  };
}

export default withRouter(SideNavOuterToolbar);
