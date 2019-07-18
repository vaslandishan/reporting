import React, {useState} from 'react';
import {SingleCard} from "../../layouts";
import {TextBox, Button as TextBoxButton} from 'devextreme-react/text-box';



import './form-313.scss'
import {DatePicker} from '../../components'

export default class extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            popupVisible: false,
            branch: '',
            filterRowVisible: false,
            groupVisible: false,
            dataSource: null

        };
        this.handleChange = this.handleChange.bind(this);

        this.todayButton = {
            icon: 'overflow',
            //stylingMode:'contained',

            onClick: () => {
                this.setState({
                    popupVisible: true
                });
            }
        };

    }


    render() {

        return (
            <React.Fragment>



            {/*<SingleCard >*/}
                <DatePicker id={"date1"}/>
                <DatePicker id={"date2"}/>
                {/*<DatePicker />*/}
            {/*</SingleCard>*/}
              {/*  <SingleCard height={100}>
                    <DatePicker id={"txt1"}/>
                </SingleCard>*/}
            </React.Fragment>
        );

    }

    handleChange = (event) => {
        const newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };


};
