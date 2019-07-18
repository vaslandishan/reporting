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
                    <span>پیشرو در ارائه خدمات نوین ارتباطی</span>

                </div>
                <div className={'description'}>
                    <br/>
                    <span>جهت مطرح نمودن سوالات و پیشنهادات خود با مدیر سیستم تماس حاصل نمائید</span>
                    {/*<span>:</span>*/}


                </div>
                <div className={'description'}>
                    <br/>
                    <span>09125182469</span>
                    <br/>
                    <span>09379707473</span>
                    <br/>
                    <span>09124727720</span>

                </div>
                <div className={'description'}>
                    <br/>
                    <span>آدرس پست الکترونیکی </span>
                    <span>:</span>


                </div>
                <div className={'description'}>
                    <br/>
                    {/*<span>support@behsazan.com</span>*/}
                    <span>suport@sepidvas.com</span>

                </div>
            </React.Fragment>
        );
    }
}

export default AboutUs;
