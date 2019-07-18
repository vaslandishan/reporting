import React, { useState } from 'react';
import './profile.scss';
import img from '../../assets/img/mohammadAliyari.jpg';
import Form from 'devextreme-react/form';

export default () => {
  const [notes, setNotes] = useState(
    'آقای محمد علی یاری از کارمندان نمونه بانک ملت می باشند.'
  );
  const employee = {
    ID: 7,
    FirstName: 'شهریار',
    LastName: 'اکبریه',
    Prefix: 'آقا.',
    Position: 'Controller',
    Picture: 'images/employees/06.png',
    BirthDate: new Date('1974/11/15'),
    HireDate: new Date('2005/05/11'),
    Notes: notes,
    Address: '4600 N Virginia Rd.'
  };

  return (
    <React.Fragment>
      <h2 className={'content-block'}>مشخصات کاربر</h2>

      <div className={'content-block dx-card responsive-paddings'}>
        <div className={'form-avatar'}>
          {/*<img
            alt={''}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${
              employee.Picture
            }`}
          />*/}
            <img
            alt={''}

            src={img}
          />
        </div>
        <span>{notes}</span>
      </div>

      <div className={'content-block dx-card responsive-paddings'}>
        <Form
          id={'form'}
          defaultFormData={employee}
          onFieldDataChanged={e => e.dataField === 'Notes' && setNotes(e.value)}
          labelLocation={'top'}
          minColWidth={233}
          colCount={'auto'}
        />
      </div>
    </React.Fragment>
  );
};
