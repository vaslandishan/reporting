import React from 'react';
import ContextMenu from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import './header.scss';

export default class UserPanel extends React.Component {
    render() {
        return (
            <div className={'user-panel'}>
                <div className={'user-info'}>
                    <div className={'image-container'}>
                        <div className={'user-image'} />
                    </div>
                </div>

            </div>
        );
    }
}
