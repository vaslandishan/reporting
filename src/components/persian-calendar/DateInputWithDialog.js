import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import DateInput from './DateInput';
import { CalendarIcon, DeleteIcon } from './Picker/Icons';
import DatePicker from './DatePicker';
import './DateInputWithDialog.css';
import { formatGregorian, formatJalaali } from './dateUtils';

var DateInputWithDialog =
/*#__PURE__*/
function (_Component) {
  _inherits(DateInputWithDialog, _Component);

  function DateInputWithDialog(props) {
    var _this;

    _classCallCheck(this, DateInputWithDialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateInputWithDialog).call(this, props));

    _this.handleCalendar = function (e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      _this.setState({
        openDialog: !_this.state.openDialog
      }, function () {
        if (_this.state.openDialog && _this.props.onShow) {
          _this.props.onShow();
        }
      });
    };

    _this.handleDateChange = function (date) {
      var newState = _this.createState(date);

      _this.setState(newState, function () {
        _this.fireOnChange();
      });
    };

    _this.createState = function (date) {
      var newState = {};

      if (!date) {
        newState.date = null;
        newState.iso = '';
        newState.formatted = '';
      } else {
        newState.date = date;
        newState.iso = date.toISOString();
        newState.formatted = _this.props.gregorian ? formatGregorian(date) : formatJalaali(date);
      }

      return newState;
    };

    _this.handleEmpty = function () {
      _this.handleDateChange('');
    };

    _this.fireOnChange = function () {
      if (_this.props.onChange) {
        var e = {
          target: {
            name: _this.props.name,
            value: _this.state.iso,
            formatted: _this.state.formatted,
            date: _this.state.date
          }
        };

        _this.props.onChange(e);
      }
    };

    var _date = null;

    if (props.value) {
      _date = new Date(props.value);

      if (_date.toString() === 'Invalid Date') {
        _date = null;
      }
    }

    _this.state = _this.createState(_date);
    _this.state.openDialog = false;
    return _this;
  }

  _createClass(DateInputWithDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly,
          className = _this$props.className,
          value = _this$props.value,
          dialogContainerStyle = _this$props.dialogContainerStyle,
          dialogContainerClassName = _this$props.dialogContainerClassName,
          closeLabel = _this$props.closeLabel,
          autoOk = _this$props.autoOk,
          onDismiss = _this$props.onDismiss,
          style = _this$props.style,
          filterDate = _this$props.filterDate,
          gregorian = _this$props.gregorian,
          rest = _objectWithoutProperties(_this$props, ["disabled", "readOnly", "className", "value", "dialogContainerStyle", "dialogContainerClassName", "closeLabel", "autoOk", "onDismiss", "style", "filterDate", "gregorian"]);

      var date = this.state.date;
      return React.createElement(DatePicker, {
        gregorian: gregorian,
        onChange: function onChange(e) {
          _this2.handleDateChange(e.target.value);

          if (autoOk) {
            _this2.handleCalendar();
          }
        },
        cancelHandler: this.handleCalendar,
        selectedDay: date,
        style: dialogContainerStyle,
        className: dialogContainerClassName,
        closeLabel: closeLabel,
        onDismiss: onDismiss,
        filterDate: filterDate
      });
    }
  }]);

  return DateInputWithDialog;
}(Component);

export default DateInputWithDialog;

/*
  _createClass(DateInputWithDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          disabled = _this$props.disabled,
          readOnly = _this$props.readOnly,
          className = _this$props.className,
          value = _this$props.value,
          dialogContainerStyle = _this$props.dialogContainerStyle,
          dialogContainerClassName = _this$props.dialogContainerClassName,
          closeLabel = _this$props.closeLabel,
          autoOk = _this$props.autoOk,
          onDismiss = _this$props.onDismiss,
          style = _this$props.style,
          filterDate = _this$props.filterDate,
          gregorian = _this$props.gregorian,
          rest = _objectWithoutProperties(_this$props, ["disabled", "readOnly", "className", "value", "dialogContainerStyle", "dialogContainerClassName", "closeLabel", "autoOk", "onDismiss", "style", "filterDate", "gregorian"]);

      var date = this.state.date;
      return React.createElement("div", {
        className: "date-input-with-dialog-main"
      }, React.createElement(DateInput, Object.assign({
        className: "date-input-with-dialog-input ".concat(this.props.className ? this.props.className : ''),
        gregorian: gregorian,
        disabled: disabled,
        readOnly: readOnly,
        value: value,
        onShowDialog: this.handleCalendar
      }, rest)), React.createElement("div", {
        className: 'date-input-with-dialog-input-buttons date-input-with-dialog-calendar',
        onClick: this.handleCalendar
      }, React.createElement(CalendarIcon, null)), React.createElement("div", {
        className: 'date-input-with-dialog-input-buttons date-input-with-dialog-empty',
        onClick: this.handleEmpty
      }, React.createElement(DeleteIcon, null)), this.state.openDialog && React.createElement(React.Fragment, null, React.createElement("div", {
        className: 'OutSideClick',
        onClick: this.handleCalendar
      }, " "), React.createElement(DatePickerComp, {
        gregorian: gregorian,
        onChange: function onChange(e) {
          _this2.handleDateChange(e.target.value);

          if (autoOk) {
            _this2.handleCalendar();
          }
        },
        cancelHandler: this.handleCalendar,
        selectedDay: date,
        style: dialogContainerStyle,
        className: dialogContainerClassName,
        closeLabel: closeLabel,
        onDismiss: onDismiss,
        filterDate: filterDate
      })));
    }
  }]);

 */