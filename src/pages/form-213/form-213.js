import React from 'react';
import {BranchList, Transactions, products} from './data.js';
import DataGrid, {
    Column,
    Pager,
    Paging,
    FilterRow,
    Grouping,
    Export,
    SearchPanel,
    GroupPanel,
    ColumnChooser,
    ColumnFixing,
    Sorting
} from 'devextreme-react/data-grid';
import {Button} from 'devextreme-react';
import {Lookup} from 'devextreme-react';
import {SingleCard} from "../../layouts";
import {DateBox} from 'devextreme-react';
import branchLookup from './BranchLookup'
import {Popup} from 'devextreme-react/popup';
import {TextBox, Button as TextBoxButton} from 'devextreme-react/text-box';
import Toolbar from 'devextreme-react/toolbar';
import notify from 'devextreme/ui/notify';
import {DatePicker} from '../../components'

let filterStyle = {
    equal: 'مساوی',
    between: 'بین',
    contains: 'شامل',
    endsWith: 'پایان با...',
    greaterThan: 'بزرگتر از',
    greaterThanOrEqual: 'بزرگتر و مساوی از',
    lessThan: 'کوچکتر از',
    lessThanOrEqual: 'کوجکتر و مساوی از',
    notContains: 'شامل نباشد',
    notEqual: 'مخالف',
    startsWith: 'شروع با...',
}
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popupVisible: false,
            branch: '',
            filterRowVisible: false,
            groupVisible: false,
            dataSource: null,
            sitems: [],
            sisLoaded: false,
            accno: '',
            fromdate: '',
            EXTCUSTID: '',
            OWNERNAME: '',
            PAN: '',
            ACCDESC: '',
            CREATEDATE: '',
            BRANCH: '',
        }

        this.ChangeAccNo = this.ChangeAccNo.bind(this);

        this.showPopup = this.showPopup.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.gridDbClick = this.gridDbClick.bind(this);

        this.todayButton = {
            icon: 'chevrondown',
            //stylingMode:'contained',

            onClick: () => {
                this.setState({
                    popupVisible: true
                });
            }
        };

        this.items = [{
            location: 'befor',
            widget: 'dxButton',
            locateInMenu: 'auto',
            options: {
                icon: 'refresh',
                width: '150px',
                type: 'default',
                text: 'مشاهده',
                stylingMode: 'contained',
                onClick: () => {
                    //notify('loading..');


                    this.setState({
                        accno: document.getElementsByName("txtAccNo")[0].value

                    });

                    this.getData();

                    console.log('fromdate:' + this.state.accno);
                }
            }
        },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'columnchooser',
                    hint: 'تنظیمات ستون',
                    onClick: () => {
                        this.refs.mainGrid.instance.showColumnChooser();
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'export',
                    hint: 'تبدیل به اکسل',
                    onClick: () => {
                        this.refs.mainGrid.instance.exportToExcel();
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'help',
                    hint: 'راهنما',
                    onClick: () => {
                        window.open('Help.html', '_blank');
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'print',
                    hint: 'پرینت',
                    onClick: () => {
                        notify('Add button has been clicked!');
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'search',
                    hint: 'جستجو',
                    onClick: () => {
                        this.setState({
                            filterRowVisible: !this.state.filterRowVisible
                        });
                    }
                }
            },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: 'group',
                    hint: 'گروه بندی',
                    onClick: () => {
                        this.setState({
                            groupVisible: !this.state.groupVisible
                        });
                    }
                }
            },
            {
                locateInMenu: 'always',
                text: 'ذخیره',
                onClick: () => {
                    notify('Save option has been clicked!');
                }
            },
            {
                locateInMenu: 'always',
                text: 'تنظیمات',
                onClick: () => {
                    notify('Settings option has been clicked!');
                }
            }];
    }


    gridDbClick(e) {
        this.setState({

            popupVisible: false,
            branch: e.data.BRANCHCODE,

        });

        console.log(e);
    }

    showPopup() {
        this.setState({
            popupVisible: true
        });
    }

    hideInfo() {
        this.setState({
            popupVisible: false
        });
    }


    ChangeAccNo(event) {
        this.setState({accno: event.value});
        console.log('my log:' + this.state.accno)
    }

    getData() {
        let pi_accno = this.state.accno;
        if (pi_accno !== '') {
            this.refs.mainGrid.instance.beginCustomLoading();
                fetch('http://172.20.147.124:7803/dmnFrd/fnrDeposit/srvTransactionsOfAccount', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify
                (
                    {
                        "inParam":
                            {
                                "FROMDATE": 13980101,
                                "TODATE": 13980328,
                                "FROMAMOUNT": 0,
                                "TOAMOUNT": "999999999",
                                "FROMBRANCH": 0,
                                "TOBRANCH": 999999,
                                "PAYERNAME": "",
                                "TRANSDESC": "",
                                "FROMTIME": 0,
                                "TOTIME": 120000,
                                "FROMROW": 1,
                                "TOROW": 5000,
                                "EXTACCNO": pi_accno,
                                "ISACCESSTOPMNG": 0,
                                "CURRENTUSER": 1111,
                                "ENVCODE": 3
                            }
                    }
                )
            })
                .then(res => res.json())
                .then(res => {
                    if (res.Transactions != undefined) {
                        this.setState({
                            sisLoaded: true,
                            sitems: res.Transactions,

                            EXTCUSTID: res.AccountInfo.EXTCUSTID,
                            OWNERNAME: res.AccountInfo.OWNERNAME,
                            PAN: res.AccountInfo.PAN,
                            ACCDESC: res.AccountInfo.ACCDESC,
                            CREATEDATE: res.AccountInfo.CREATEDATE,
                            BRANCH: res.AccountInfo.BRANCH,
                        });
                    }
                    else {
                        this.setState({
                            sisLoaded: true,
                            sitems: [],

                            EXTCUSTID: null,
                            OWNERNAME: null,
                            PAN:null,
                            ACCDESC: null,
                            CREATEDATE: null,
                            BRANCH: null,
                        });
                    }
                    this.refs.mainGrid.instance.endCustomLoading();
                });
        }
        else {
            notify('لطفا شماره حساب را وارد نمایید','error',600);
        }
    }


    render() {
        return (
            <form>
                <React.Fragment>

                    <SingleCard>


                        <div className={'dx-fieldset'}>
                            <div className={'dx-field'}>
                                <div className={'dx-field-label'}>از تاریخ</div>
                                <div className={'dx-field-value'}>
                                    <DatePicker id={"date1"}/>
                                </div>
                                <div className={'dx-field-label'}>تا تاریخ</div>
                                <div className={'dx-field-value'}>
                                    <DatePicker id={"date2"}/>
                                </div>
                                <div className={'dx-field-label'}>از ساعت</div>
                                <div className={'dx-field-value'}>
                                    <DateBox defaultValue={this.now}
                                             type={'time'}
                                             displayFormat={"HH:mm"}
                                    />
                                </div>
                                <div className={'dx-field-label'}>تا ساعت</div>
                                <div className={'dx-field-value'}>
                                    <DateBox defaultValue={this.now}
                                             type={'time'}
                                             displayFormat={"HH:mm"}
                                    />
                                </div>
                            </div>
                            <div className={'dx-field'}>
                                <div className={'dx-field-label'}>شماره حساب</div>
                                <div className={'dx-field-value'}>
                                    <TextBox name='txtAccNo' onValueChanged={this.ChangeAccNo}
                                             Value={this.state.accno}/>
                                </div>

                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>

                            </div>
                            <div className={'dx-field'}>
                                <div className={'dx-field-label'}>شعبه</div>
                                <div className={'dx-field-value'}>
                                    <TextBox value={this.state.branch}>
                                        <TextBoxButton
                                            name={'password'}
                                            location={'after'}
                                            onClick={this.showPopup}
                                            text={'...'}
                                            options={this.todayButton}
                                            width={'15px'}
                                        />
                                    </TextBox>
                                    <Popup
                                        className={'popup'}
                                        visible={this.state.popupVisible}
                                        onHiding={this.hideInfo}
                                        dragEnabled={true}
                                        showTitle={true}
                                        title={'لیست شعب'}
                                        width={500}
                                        height={460}
                                        rtlEnabled={true}
                                    >
                                        <DataGrid
                                            dataSource={BranchList}
                                            focusedRowEnabled={true}
                                            defaultFocusedRowIndex={-1}
                                            rtlEnabled={true}
                                            searchEnabled={true}
                                            keyExpr={'BRANCH'}
                                            width={'100%'}
                                            groupPaging={true}
                                            autoExpandAll={false}
                                            showBorders={true}
                                            allowColumnResizing={true}
                                            columnMinWidth={80}
                                            showColumnLines={true}
                                            rowAlternationEnabled={true}
                                            onCellDblClick={this.gridDbClick}
                                        >
                                            <Paging defaultPageSize={10}/>
                                            <Pager showPageSizeSelector={false} showInfo={false}/>
                                            <FilterRow visible={true} showOperationChooser={false} showAllText={false}/>
                                            <Column dataField={'BRANCH'} width={110} caption={'کد'}/>
                                            <Column dataField={'BRANCHCODE'} width={100} caption={'شرح'}/>
                                        </DataGrid>
                                    </Popup>
                                </div>

                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>

                            </div>
                            <div className={'dx-field'}>
                                <div className={'dx-field-label'}>از مبلغ</div>
                                <div className={'dx-field-value'}>
                                    <TextBox/>
                                </div>
                                <div className={'dx-field-label'}>تا مبلغ</div>
                                <div className={'dx-field-value'}>
                                    <TextBox/>
                                </div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}>

                                </div>
                                <div className={'dx-field-label'}></div>
                                <div className={'dx-field-value'}></div>
                            </div>

                        </div>
                    </SingleCard>

                    <SingleCard>

                        <Toolbar items={this.items} rtlEnabled={true}/>


                    </SingleCard>


                    <SingleCard>
                        <SingleCard>
                            <div style={{padding: "10px"}}>
                                <div className="dx-field">
                                    <div className="dx-field-label">شماره مشتری</div>
                                    {/*<div className="dx-field-value">{AccountInfo.EXTCUSTID}</div>*/}
                                    <div className="dx-field-value">{this.state.EXTCUSTID}</div>

                                    <div className="dx-field-label">نام صاحب حساب</div>
                                    <div className="dx-field-value">{this.state.OWNERNAME}</div>

                                    <div className="dx-field-label">شماره اکسس کارت</div>
                                    <div className="dx-field-value">{this.state.PAN}</div>
                                </div>
                                <div className="dx-field">
                                    <div className="dx-field-label">نوع حساب</div>
                                    <div className="dx-field-value">{this.state.ACCDESC}</div>

                                    <div className="dx-field-label">تاریخ افتتاح</div>
                                    <div className="dx-field-value">{this.state.CREATEDATE}</div>

                                    <div className="dx-field-label">شعبه افتتاح کننده</div>
                                    <div className="dx-field-value">{this.state.BRANCH}</div>
                                </div>
                            </div>

                        </SingleCard>

                        <DataGrid
                            // dataSource={this.state.sitems}
                            dataSource={Transactions}
                            focusedRowEnabled={true}
                            defaultFocusedRowIndex={-1}
                            rtlEnabled={true}
                            searchEnabled={true}
                            keyExpr={'TRANSNO'}
                            width={'100%'}
                            groupPaging={true}
                            autoExpandAll={false}
                            showBorders={true}
                            allowColumnResizing={true}
                            columnMinWidth={80}
                            showColumnLines={true}
                            rowAlternationEnabled={true}
                            ref={"mainGrid"}
                            noDataText={''}

                        >
                            <Export enabled={false} customizeExcelCell={this.customizeExcelCell}/>

                            <SearchPanel rtlEnabled={true} highlightSearchText={true} placeholder={'جستجو'}
                                         visible={this.state.filterRowVisible}/>
                            <GroupPanel visible={this.state.groupVisible}
                                        emptyPanelText={'برای گروه بندی هدر ستون را در این قسمت بکشید'}/>
                            <Paging defaultPageSize={5}/>
                            <Pager showPageSizeSelector={true} showInfo={true}/>
                            <FilterRow visible={this.state.filterRowVisible} showOperationChooser={true}
                                       showAllText={true}
                                       betweenEndText={'پایان'} betweenStartText={'شروع'}
                                       resetOperationText={'تنظیم مجدد'}
                                       operationDescriptions={filterStyle}/>

                            <Sorting ascendingText={'صعودی'} descendingText={'نزولی'} clearText={'تنظیم مجدد'}/>
                            <ColumnChooser enabled={false} emptyPanelText={''} title={' ستون'}/>

                            <Column dataField={'TRANSNO'} width={110} caption={'شماره تراكنش'}/>
                            <Column
                                dataField={'TRANSDATE'}
                                width={100}
                                caption={'تاريخ تراكنش'}
                                hidingPriority={10}
                            />
                            <Column
                                dataField={'TRANSTIME'}
                                caption={'زمان تراكنش'}
                                width={100}
                                hidingPriority={9}
                            />
                            <Column
                                dataField={'TRANSDESC'}
                                caption={'شرح تراكنش'}
                                hidingPriority={1}
                                width={150}
                            >
                            </Column>
                            <Column
                                dataField={'DOCDESC'}
                                caption={'نوع تراكنش'}
                                allowSorting={false}
                                hidingPriority={2}
                                width={150}
                            />
                            <Column
                                dataField={'BRANCH'}
                                caption={'كد شعبه'}
                                width={80}
                                hidingPriority={8}
                            />
                            <Column
                                dataField={'BRANCHDESC'}
                                caption={'شعبه'}
                                hidingPriority={4}
                                width={150}
                            />
                            <Column
                                dataField={'DBAMNT'}
                                caption={'مبلغ بدهكارتراكنش'}
                                width={135}
                                hidingPriority={7}
                            />
                            <Column
                                dataField={'CRAMNT'}
                                caption={'مبلغ بستانكار تراكنش'}
                                width={135}
                                hidingPriority={7}
                            />
                            <Column
                                dataField={'BALANCE'}
                                caption={'مانده'}
                                width={130}
                            />

                            <Column
                                dataField={'DOCSERIAL'}
                                caption={'شماره مستند'}
                                hidingPriority={4}
                                width={110}

                            />
                            <Column
                                dataField={'USERID'}
                                caption={'كاربر'}
                                width={110}
                                hidingPriority={6}
                            />
                            <Column
                                dataField={'PAYERID'}
                                caption={'شناسه واریز'}
                                width={110}
                                hidingPriority={5}
                            />
                            <Column
                                dataField={'PAYERNAME'}
                                caption={'شماره حساب يا نام مشتري دريافت کننده/پرداخت کننده'}
                                hidingPriority={0}
                                width={250}
                            />
                        </DataGrid>

                    </SingleCard>


                </React.Fragment>
            </form>
        );

    }

    onCellPrepared(e) {
        if (e.rowType === 'data') {
            if (e.data.OrderDate < new Date(2014, 2, 3)) {
                e.cellElement.style.color = '#AAAAAA';
            }
            if (e.data.SaleAmount > 15000) {
                if (e.column.dataField === 'OrderNumber') {
                    e.cellElement.style.fontWeight = 'bold';
                }
                if (e.column.dataField === 'SaleAmount') {
                    e.cellElement.style.backgroundColor = '#FFBB00';
                    e.cellElement.style.color = '#000000';
                }
            }
        }

        if (e.rowType === 'group') {
            if (e.row.groupIndex === 0) {
                e.cellElement.style.backgroundColor = '#BEDFE6';
            }
            if (e.row.groupIndex === 1) {
                e.cellElement.style.backgroundColor = '#C9ECD7';
            }
            e.cellElement.style.color = '#000';
            if (e.cellElement.firstChild && e.cellElement.firstChild.style) {
                e.cellElement.firstChild.style.color = '#000';
            }
        }

        if (e.rowType === 'groupFooter' && e.column.dataField === 'SaleAmount') {
            e.cellElement.style.fontStyle = 'italic';
        }
    }

    customizeExcelCell(options) {
        var gridCell = options.gridCell;
        if (!gridCell) {
            return;
        }

        if (gridCell.rowType === 'data') {
            if (gridCell.data.OrderDate < new Date(2014, 2, 3)) {
                options.font.color = '#AAAAAA';
            }
            if (gridCell.data.SaleAmount > 15000) {
                if (gridCell.column.dataField === 'OrderNumber') {
                    options.font.bold = true;
                }
                if (gridCell.column.dataField === 'SaleAmount') {
                    options.backgroundColor = '#FFBB00';
                    options.font.color = '#000000';
                }
            }
        }

        if (gridCell.rowType === 'group') {
            if (gridCell.groupIndex === 0) {
                options.backgroundColor = '#BEDFE6';
            }
            if (gridCell.groupIndex === 1) {
                options.backgroundColor = '#C9ECD7';
            }
            if (gridCell.column.dataField === 'Employee') {
                options.value = `${gridCell.value} (${gridCell.groupSummaryItems[0].value} items)`;
                options.font.bold = false;
            }
            if (gridCell.column.dataField === 'SaleAmount') {
                options.value = gridCell.groupSummaryItems[0].value;
                options.numberFormat = '&quot;Max: &quot;$0.00';
            }
        }

        if (gridCell.rowType === 'groupFooter' && gridCell.column.dataField === 'SaleAmount') {
            options.value = gridCell.value;
            options.numberFormat = '&quot;Sum: &quot;$0.00';
            options.font.italic = true;
        }

        if (gridCell.rowType === 'totalFooter' && gridCell.column.dataField === 'SaleAmount') {
            options.value = gridCell.value;
            options.numberFormat = '&quot;Total Sum: &quot;$0.00';
        }
    }


}
;
