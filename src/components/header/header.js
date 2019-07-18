import React from 'react';
import Toolbar, {Item} from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import UserPanel from '../user-panel/user-panel';
import logoPanel from './logo';
import './header.scss';
import {Template} from 'devextreme-react/core/template';
import headerImage from '../../assets/img/mellatLogo.png'

export default ({menuToggleEnabled, title, toggleMenu, userMenuItems}) => (
    <header className={'header-component'}>
        <Toolbar className={'header'}  rtlEnabled={true}>
            <Item
                visible={menuToggleEnabled}

                location={'before'}
                widget={'dxButton'}
                cssClass={'menu-button'}
                options={{
                    icon: 'menuI',
                    stylingMode: 'text',
                    onClick: toggleMenu
                }}
            />
            <Item
                location={'before'}
                cssClass={'header-title'}
                text={title}
                visible={!!title}

            />
            <Item >
                <div className={'header-toolbar'}/>
            </Item>
            <Item
                location={'after'}
                locateInMenu={'left'}
                menuItemTemplate={'userPanelTemplate'}
            >
                <Button
                    className={'user-button authorization'}
                    width={170}
                    height={'100%'}
                    stylingMode={'text'}
                >
                    <UserPanel menuItems={userMenuItems} menuMode={'context'}/>
                </Button>
            </Item>
            <Template name={'userPanelTemplate'}>
                <UserPanel class={'menu-toggle'} menuItems={userMenuItems} menuMode={'list'}/>
            </Template>
        </Toolbar>
    </header>
);

