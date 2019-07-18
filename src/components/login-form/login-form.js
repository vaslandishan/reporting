import React from 'react';
import TextBox from 'devextreme-react/text-box';
import ValidationGroup from 'devextreme-react/validation-group';
import Validator, { RequiredRule } from 'devextreme-react/validator';
import Button from 'devextreme-react/button';
import CheckBox from 'devextreme-react/check-box';
import './login-form.scss';
import appInfo from '../../app-info';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };
  }

  render() {
    const { login, password } = this.state;
    return (
          <div>
              <ValidationGroup >
                  <div className={'login-header'}>
                      <div className={'title'}>{appInfo.title}</div>
                      <div>ورود به سامانه</div>
                  </div>
                  <div className={'dx-field-login'}>
                      <TextBox

                          value={login}
                          onValueChanged={this.loginChanged}
                          placeholder={'نام کاربری'}
                          width={'100%'}
                          rtlEnabled={true}

                      >
                          <Validator rtlEnabled={true}>
                              <RequiredRule message={'ورود نام کاربری الزامیست'} />
                          </Validator>
                      </TextBox>
                  </div>
                  <div className={'dx-field-login'}>
                      <TextBox

                          mode={'password'}
                          value={password}
                          onValueChanged={this.passwordChanged}
                          placeholder={'رمز عبور'}
                          width={'100%'}
                          rtlEnabled={true}

                      >
                          <Validator rtlEnabled={true}>
                              <RequiredRule message={'ورورد رمز عبور الزامیست'} />
                          </Validator>
                      </TextBox>
                  </div>
                  {/*  <div className={'dx-field'}>
          <CheckBox defaultValue={false} text={'Remember me'} />
        </div>*/}
                  <div className={'dx-field-login'}>
                      <Button

                          type={'default'}
                          text={'ورود'}
                          onClick={this.onLoginClick}
                          width={'100%'}
                      />
                  </div>
                  <div className={'dx-field-login'}>
                      <Link to={'/recovery'} onClick={e => e.preventDefault()} >رمز عبور خود را فراموش نموده اید؟</Link>
                  </div>
                  {/*  <div className={'dx-field'}>
          <Button type={'normal'} text={'Create an account'} width={'100%'} />
        </div>*/}
              </ValidationGroup>

          </div>


    );
  }

  loginChanged = e => {
    this.setState({ login: e.value });
  };

  passwordChanged = e => {
    this.setState({ password: e.value });
  };

  onLoginClick = args => {
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    const { login, password } = this.state;
    this.props.onLoginClick(login, password);

    args.validationGroup.reset();
  };
}
