import React from 'react';
import ScrollView from 'devextreme-react/scroll-view';
import './single-card.scss';

export default ({ children,height,width,marginRight,className,zindex}) => (
    <ScrollView showScrollbar={"always"} scrollByContent={true} rtlEnabled={true}  margin-right={marginRight} float={'right'} className={'dx-card single-card '+ className} height={height} width={width} >
        <div className={'content'} >{children}</div>
    </ScrollView>
);


/*
<ScrollView rtlEnabled={true} height={height} width={width}  margin-right={marginRight} display={display} className={'dx-card single-card'} >
    <div className={'content'}>{children}</div>
  </ScrollView>
 */