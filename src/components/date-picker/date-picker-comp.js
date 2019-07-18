import React from 'react';
import './date-picker.scss';
import {Popup} from "devextreme-react";
import {SingleCard} from '../../layouts'
import {SingleCardDatePicker} from '../../layouts'
import {DateTimeInput, DateTimeInputSimple, DateInput, DateInputSimple} from '../../components/persian-calendar/index';
import {Footer} from "../index";
import ScrollView from "devextreme-react";
import { useState } from 'react';

// import '../persian-date-picker/index.css';
import '../persian-date-picker/DatePicker.css';
import { Calendar } from '../persian-date-picker/Calendar';
import DatePicker from '../persian-date-picker/DatePicker';
import { Popover } from 'devextreme-react/popover';
import {TextBox, Button as TextBoxButton} from 'devextreme-react/text-box';
// import {validationGroup} from 'devextreme-react/text-box';
import {formatJalaali} from "../persian-calendar/dateUtils";
import Background1 from "../../assets/img/bg_main.jpg";

const animationConfig = {
    show: {
        type: 'pop',
        from: {
            scale: 0
        },
        to: {
            scale: 1
        }
    },
    hide: {
        type: 'fade',
        from: 1,
        to: 0
    }
};
const maskRules= {

        'Y1': '1',
        'Y2': [3,4],
        'Y3': [9,0],
        'Y4': [0,1,2,3,4,5,6,7,8,9],
        'S1': '/',
        'M1': [0,1],
        'M2': [0,1,2,3,4,5,6,7,8,9],
        'S2': '/',
        'D1': [0,1,2,2],
        'D2': [0,1,2,3,4,5,6,7,8,9]

};

// const [selectedDay, setValue] ={"",""}
class DatePickerComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showNavButtons: true,popupVisible: false, showIndicator: true, type: 'line'};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        // const [selectedDay, setValue] = useState({ from: null, to: null });

        this.state = {
            defaultVisible: false,
            withTitleVisible: false,
            withAnimationOptionsVisible: false,
            withShadingOptionsVisible: false,
            id:props.id
            // selectedDay:useState({ from: null}),
            // setValue:useState({ to: null}),
            // setValue:""
        };
        this.toggleDefault = this.toggleDefault.bind(this);
        this.toggleWithTitle = this.toggleWithTitle.bind(this);
        this.toggleWithAnimationOptions = this.toggleWithAnimationOptions.bind(this);
        this.showWithShadingOptions = this.showWithShadingOptions.bind(this);
        this.hideWithShadingOptions = this.hideWithShadingOptions.bind(this);
        this.handleTextBoxChangeChange = this.handleTextBoxChangeChange.bind(this);

        this.todayButton = {

            icon: 'chevrondown',
            //stylingMode:'contained',

            onClick: () => {
                this.showWithShadingOptions(this);
            }
        };

    }

    render() {
        const { top, left} = this.state;
        // const { selectedDay, setValue} = this.state;

        return (

            <React.Fragment>

                <TextBox
                    value={this.state.selectedJalaliDate}
                    id={this.state.id}

                    placeholder={''}
                    className={'date-Picker-text-box'}
                    // onValueChanged={this.valueChanged}
                    onValueChanged={this.handleTextBoxChangeChange}
                    onChang={this.handleTextBoxChangeChange}
                    // mask={'Y1Y2Y3S1M1M2S2D1D2'}
                    // showMaskMode={"onFocus"}

                >

                    <TextBoxButton
                        name={'dateTextBox-'+this.state.id}
                        location={'after'}
                        text={'...'}
                        options={this.todayButton}
                        width={'10px'}

                    />


                </TextBox>

                <Popover
                    target={'#'+this.state.id}
                    position={'bottom'}
                    width={300}
                    height={350}
                    visible={this.state.withShadingOptionsVisible}
                    onHiding={this.hideWithShadingOptions}
                    shading={false}
                    // style={{padding:0}}
                    shadingColor={'rgba(0, 0, 0, 0.5)'}
                >

                    <SingleCard height={350} width={300} className={'date-picker'}>
                        <DateInput
                            value={this.state.myDateTime}
                            // formatted={formatJalaali}
                            name={'myDateTime'}
                            onChange={this.handleChange}/>
                    </SingleCard>


                    {/*<DatePicker  isDayRange />*/}


                    {/*<DatePicker selectedDayRange={selectedDay} onChange={setValue} isDayRange />;*/}
                    {/*<DatePicker />;*/}


                </Popover>
              {/*  <SingleCard height={400} width={250}>
                    <DateInput
                        value={this.state.myDateTime}
                        name={'myDateTime'}
                        onChange={this.handleChange}/>
                </SingleCard>
*/}





                {/* <DateTimeInput
                       value={this.state.myDateTime}
                       name={'myDateTime'}
                       onChange={this.handleChange}/>
                       <DateTimeInputSimple
                       value={this.state.myDateTime}
                       name={'myDateTime'}
                       onChange={this.handleChange}/>*/}
                {/*<DateInput
                    value={this.state.myDateTime}
                    name={'myDateTime'}
                    onChange={this.handleChange}/>*/}
                {/* <DateInputSimple
                       value={this.state.myDateTime}
                       name={'myDateTime'}
                       onChange={this.handleChange}/>*/}
            </React.Fragment>



        );
    }
    handleChange = (event) => {
        // const newState = {};
        // let jalaliDate=formatJalaali(event.target.value);
        // newState[event.target.name] = event.target.formatted;
        console.log(event.target.formatted);
       /* let selectedJalaliDate=event.target.formatted;
        this.setState(selectedJalaliDate);
*/
        this.setState({
            selectedJalaliDate: event.target.formatted,
            withShadingOptionsVisible: false

        });


        // this.setState(newState);
        // console.log(this.state.event.target.name);
    };
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
    toggleDefault() {
        this.setState({
            defaultVisible: !this.state.defaultVisible
        });
    }

    toggleWithTitle() {
        this.setState({
            withTitleVisible: !this.state.withTitleVisible
        });
    }

    toggleWithAnimationOptions() {
        this.setState({
            withAnimationOptionsVisible: !this.state.withAnimationOptionsVisible
        });
    }

    showWithShadingOptions() {
        this.setState({
            withShadingOptionsVisible: true
        });
    }

    hideWithShadingOptions() {
        this.setState({
            withShadingOptionsVisible: false
        });
    }
    handleTextBoxChangeChange(data) {
        console.log(data);
        this.setState({
            textBoxChangedValue: data
        });
    }
}

export default DatePickerComp;
