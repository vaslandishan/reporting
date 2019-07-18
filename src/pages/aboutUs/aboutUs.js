import React from "react";
import './aboutUs.scss';



class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showNavButtons: true, showIndicator: true, type: 'line'};
    }

    render() {
        return (
            <React.Fragment>

                <div className={'user-image-container'}>
                    <div className={'logo-image'}/>
                </div>

                <div className={'description'}>
                    <br/>
                    <br/>
                    <span>پیشرو در ارائه خدمات نوین بانکی</span>

                </div>
                <div className={'description'}>
                    <br/>
                    <span>جهت مطرح نمودن سوالات و پیشنهادات خود با مدیر سیستم تماس حاصل نمائید</span>
                    {/*<span>:</span>*/}


                </div>
                <div className={'description'}>
                    <br/>
                    <span>داخلی 9350</span>

                </div>
                <div className={'description'}>
                    <br/>
                    <span>آدرس پست الکترونیکی </span>
                    <span>:</span>


                </div>
                <div className={'description'}>
                    <br/>
                    {/*<span>support@behsazan.com</span>*/}
                    <span>akbarieh@behsazan.net</span>

                </div>
            </React.Fragment>
        );
    }
}

export default AboutUs;
