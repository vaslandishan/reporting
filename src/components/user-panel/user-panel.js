import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import './user-panel.scss';
import Background from "../../assets/img/bg_main.jpg";
let user = {
    fontsize: "14px",
    // color: "ghostwhite",
    color: "#a8a8a8",
    margin: "0 9px"

};
export default class UserPanel extends React.Component {
  render() {
    const { menuMode, menuItems } = this.props;
    return (
      <div className={'user-panel'}>

        <div className={'user-info'}>
            <div style={user} >شهریار اکبریه</div>

          <div className={'image-container'}>
            <div className={'user-image'} />
          </div>
        </div>

        {menuMode === 'context' && (
          <ContextMenu
            items={menuItems}
            target={'.user-button'}
            showEvent={'dxclick'}
            width={170}
            position={{ my: 'top center', at: 'bottom center' }}
            cssClass={'user-menu'}
          />
        )}
        {menuMode === 'list' && (
          <List className={'dx-toolbar-menu-action'} items={menuItems} />
        )}
      </div>
    );
  }
}
