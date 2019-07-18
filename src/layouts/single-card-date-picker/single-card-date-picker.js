import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import './single-card-date-picker.scss';

export default ({ children,height,width,marginRight,className,zindex,top,left}) => (

    <ScrollView
        rtlEnabled={true}
        margin-right={marginRight}
        className={'dx-card single-card '+ className}
        height={height}
        style={{top:top,left:left}}
        width={width} >
        <div className={'content'} >{children}</div>
    </ScrollView>
);