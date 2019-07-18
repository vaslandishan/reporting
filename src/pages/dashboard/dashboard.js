import React from "react";
import './dashboard.scss';

import DataGrid, {
    Column,
    Grouping,
    Pager,
    GroupPanel,
    Scrolling,
    Paging
} from 'devextreme-react/data-grid';
import {
    Chart,
    Tooltip,
    Legend,

    ArgumentAxis,
    CommonSeriesSettings,
    Grid
} from 'devextreme-react/chart';

import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from 'devextreme-react/pie-chart';

import userPhoto from './UserPhoto.png'
import {
    taskStatus,
    cartableCount,
    onLineUsers,
    indicator,
    cheatingList,
    inspectionType,
    employee,
    cartablData
} from './data.js';
import {SingleCard} from "../../layouts";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showNavButtons: true, showIndicator: true, type: 'line'};
    }

    render() {
        return (
            <React.Fragment>
                <div className={'dashboard'}>
                    <div className={'profile-grid-css'}>
                        <SingleCard width={'20%'} height={'100%'}>
                            <div className={'image-container'}/>
                            <div className={'profileCss'}>
                                <list className={'ul'}>

                                    <li> نام: {employee.FirstName}</li>
                                    <br/>
                                    <li> نام خانوادگی: {employee.LastName}</li>
                                    <br/>
                                    <li> تاریخ تولد: {employee.BirthDate}</li>
                                    <br/>
                                    <li> تاریخ استخدام: {employee.HireDate}</li>
                                    <br/>
                                    <li> سمت : {employee.Degree}</li>
                                </list>
                            </div>
                        </SingleCard>

                        <SingleCard width={'80%'} height={'100%'}>
                            <DataGrid
                                dataSource={cartablData}
                                rtlEnabled={true}
                                allowColumnReordering={false}
                                allowColumnResizing={true}
                                showBorders={true}>
                                <GroupPanel emptyPanelText={'گروه بندی بر اساس...'} visible={true}/>
                                <Grouping autoExpandAll={false}/>
                                <Pager showPageSizeSelector={true} showInfo={true}/>

                                <Scrolling/>
                                <Column dataField={'ROW'} hidingPriority={0} dataType={'string'}
                                        caption={'ردیف'}/>
                                <Column dataField={'TASKNO'} dataType={'string'} caption={'شماره'} width={100}/>
                                <Column dataField={'PATTERNNAME'} dataType={'string'} caption={'نام الگو'}
                                        width={350}/>
                                <Column dataField={'FRAUD'} hidingPriority={1} dataType={'string'}
                                        caption={'تقلب'}/>
                                <Column dataField={'SUS'} hidingPriority={2} dataType={'string'}
                                        caption={'مشکوک'}/>
                                <Column dataField={'ERROR'} hidingPriority={3} dataType={'string'}
                                        caption={'خطا'}/>
                                <Column dataField={'UNDEF'} hidingPriority={4} dataType={'string'}
                                        caption={'نامشخص'}/>
                                <Column dataField={'STATUS'} dataType={'string'} caption={'وضعيت'} width={150}/>
                                <Column dataField={'RECIEVETIME'} hidingPriority={5} dataType={'string'}
                                        caption={'زمان دريافت'}/>
                                <Paging defaultPageSize={3}/>
                            </DataGrid>
                        </SingleCard>

                    </div>
                    <div>
                        <div className={'chartDivCss'}>

                            <SingleCard width={'33.3%'}  >
                                <PieChart
                                    className={'pieChartCss'}
                                    dataSource={taskStatus}
                                    rtlEnabled={true}
                                    palette={'Bright'}>
                                    <Series
                                        argumentField={'status'}
                                        valueField={'value'}>
                                        <Label visible={true}>
                                            <Connector visible={true} width={1}/>
                                        </Label>
                                    </Series>
                                    <Legend
                                        verticalAlignment={'bottom'}
                                        horizontalAlignment={'center'}
                                        font={{family: "Bnazanin", size: "10px"}}
                                        itemTextPosition={'bottom'}/>
                                    <Size width={'280'} height={'238'}/>
                                </PieChart>
                            </SingleCard>

                            <SingleCard width={'33.3%'} height={'100%'}>
                                <Chart
                                    title={{
                                        font: {family: "Bnazanin", size: "12px"},
                                        text: 'گزارشات موردي کشف تقلب',
                                        margin: 'right'
                                    }}

                                    className={'lineChart'}
                                    dataSource={indicator}
                                    barGroupWidth={5}>
                                    <Series
                                        argumentField={'code'}
                                        valueField={'value'}
                                        type={'bar'}
                                        color={'black'}
                                    />
                                    <Export enabled={false}/>
                                    <Tooltip
                                        enabled={true}
                                        customizeTooltip={this.customizeTooltip}
                                    />
                                    <Legend
                                        verticalAlignment={'bottom'}
                                        horizontalAlignment={'center'}
                                        font={{family: "Bnazanin", size: "1px"}}
                                        itemTextPosition={'bottom'}/>
                                    <Size width={'280'} height={'238'}/>
                                </Chart>
                            </SingleCard>

                            <SingleCard width={'33.3%'} height={'100%'}>
                                <Chart
                                    className={'lineChart'}
                                    palette={"Material"}
                                    dataSource={cheatingList}
                                    rtlEnabled={true}
                                    title={{
                                        font: {family: "Bnazanin", size: "12px"},
                                        text: 'سال مالی 98',
                                        margin: 'right'
                                    }}>
                                    <CommonSeriesSettings
                                        argumentField={'Month'}
                                        type={this.state.type}/>
                                    {
                                        inspectionType.map(function (item) {
                                            return <Series key={item.value} valueField={item.value}
                                                           name={item.name}/>;
                                        })
                                    }
                                    <ArgumentAxis
                                        valueMarginsEnabled={false}
                                        discreteAxisDivisionMode={'crossLabels'}
                                        label={{font: {family: "Bnazanin"}}}>
                                        <Grid visible={true}/>
                                    </ArgumentAxis>
                                    <Export enabled={false}/>
                                    <Tooltip
                                        enabled={true}
                                        customizeTooltip={this.customizeTooltip}/>
                                    <Legend
                                        verticalAlignment={'bottom'}
                                        horizontalAlignment={'center'}
                                        font={{family: "Bnazanin", size: "10px"}}
                                        itemTextPosition={'bottom'}/>
                                    <Size width={'280'} height={'238'}/>
                                </Chart>
                            </SingleCard>

                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Dashboard;
