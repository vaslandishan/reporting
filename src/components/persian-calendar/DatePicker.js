import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import "./DateTimeInput.css";
import Years from './Picker/Years';
import Months from './Picker/Months';
import Days from './Picker/Days';
import jalaali from 'jalaali-js';
import { calcFirstDayOfMonth, isEqualDate, gregorianMonthLength } from './dateUtils';

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _this.cancelPicker = function (e) {
      e.preventDefault();

      if (_this.props.onDismiss) {
        _this.props.onDismiss();
      }

      _this.props.cancelHandler();
    };

    _this.daysClicked = function (dayDate) {
      if (isEqualDate(_this.state.selectedDay, dayDate)) {
        _this.setState({
          selectedDay: dayDate
        }, function () {
          _this.props.onChange({
            target: {
              name: _this.props.name,
              value: dayDate
            }
          });
        });
      } else {
        _this.props.cancelHandler();
      }
    };

    _this.monthsClicked = function (month) {
      var _this$state = _this.state,
          selectedYear = _this$state.selectedYear,
          gregorian = _this$state.gregorian;
      var currentMonth, daysCount, selectedMonthFirstDay;

      if (month === 0) {
        currentMonth = 12;
        selectedYear = selectedYear - 1;
      } else if (month === 13) {
        currentMonth = 1;
        selectedYear = selectedYear + 1;
      } else {
        currentMonth = month;
      }

      daysCount = gregorian ? gregorianMonthLength(selectedYear, currentMonth) : jalaali.jalaaliMonthLength(selectedYear, currentMonth);
      selectedMonthFirstDay = calcFirstDayOfMonth(selectedYear, currentMonth, gregorian);

      _this.setState({
        currentMonth: currentMonth,
        daysCount: daysCount,
        selectedYear: selectedYear,
        selectedMonthFirstDay: selectedMonthFirstDay
      });
    };

    _this.yearSelected = function (selectedYear) {
      var selectedMonthFirstDay, daysCount;
      selectedMonthFirstDay = calcFirstDayOfMonth(selectedYear, _this.state.currentMonth, _this.state.gregorian);
      daysCount = _this.state.gregorian ? gregorianMonthLength(selectedYear, _this.state.currentMonth) : jalaali.jalaaliMonthLength(selectedYear, _this.state.currentMonth);

      _this.setState({
        selectedYear: selectedYear,
        selectedMonthFirstDay: selectedMonthFirstDay,
        daysCount: daysCount
      });
    };

    _this.gregorianPicker = function () {
      var gregorian = !_this.state.gregorian;
      var selectedDay = _this.state.selectedDay;
      var currentMonth, daysCount, selectedYear, selectedMonthFirstDay;

      if (gregorian) {
        var j = selectedDay ? selectedDay : new Date();
        selectedYear = j.getFullYear();
        currentMonth = j.getMonth() + 1;
      } else {
        var _j = jalaali.toJalaali(selectedDay ? selectedDay : new Date());

        selectedYear = _j.jy;
        currentMonth = _j.jm;
      }

      daysCount = gregorian ? gregorianMonthLength(selectedYear, currentMonth) : jalaali.jalaaliMonthLength(selectedYear, currentMonth);
      selectedMonthFirstDay = calcFirstDayOfMonth(selectedYear, currentMonth, gregorian);

      _this.setState({
        gregorian: gregorian,
        currentMonth: currentMonth,
        daysCount: daysCount,
        selectedYear: selectedYear,
        selectedMonthFirstDay: selectedMonthFirstDay
      });
    };

    var _gregorian = props.gregorian,
        _selectedDay = props.selectedDay;

    if (!_selectedDay) {
      _selectedDay = new Date();
    } else {
      _selectedDay = new Date(_selectedDay.getTime());
    }

    _selectedDay.setHours(0);

    _selectedDay.setMinutes(0);

    _selectedDay.setSeconds(0);

    var _selectedYear, _currentMonth, _selectedMonthFirstDay, _daysCount;

    if (_gregorian) {
      var j = _selectedDay;
      _selectedYear = j.getFullYear();
      _currentMonth = j.getMonth() + 1;
    } else {
      var _j2 = jalaali.toJalaali(_selectedDay);

      _selectedYear = _j2.jy;
      _currentMonth = _j2.jm;
    }

    _daysCount = _gregorian ? gregorianMonthLength(_selectedYear, _currentMonth) : jalaali.jalaaliMonthLength(_selectedYear, _currentMonth);
    _selectedMonthFirstDay = calcFirstDayOfMonth(_selectedYear, _currentMonth, _gregorian);
    _this.state = {
      gregorian: _gregorian,
      selectedYear: _selectedYear,
      currentMonth: _currentMonth,
      selectedMonthFirstDay: _selectedMonthFirstDay,
      daysCount: _daysCount,
      selectedDay: _selectedDay ? _selectedDay : null
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          _this$props$closeLabe = _this$props.closeLabel,
          closeLabel = _this$props$closeLabe === void 0 ? 'بستن' : _this$props$closeLabe,
          style = _this$props.style,
          filterDate = _this$props.filterDate;
      var _this$state2 = this.state,
          gregorian = _this$state2.gregorian,
          daysCount = _this$state2.daysCount,
          selectedDay = _this$state2.selectedDay,
          currentMonth = _this$state2.currentMonth,
          selectedYear = _this$state2.selectedYear,
          selectedMonthFirstDay = _this$state2.selectedMonthFirstDay;
      return React.createElement("div", {
        className: "JDatePicker " + (className ? className : ""),
        style: style,
        onClick: function onClick(e) {
          e.preventDefault();
        }
      }, React.createElement(Years, {
        gregorian: gregorian,
        changeEvent: function changeEvent(returnedYear) {
          return _this2.yearSelected(returnedYear);
        },
        year: selectedYear
      }), React.createElement(Months, {
        gregorian: gregorian,
        clickEvent: function clickEvent(returnedMonth) {
          return _this2.monthsClicked(returnedMonth);
        },
        month: currentMonth
      }), React.createElement("div", {
        className: "days-titles"
      }, React.createElement("div", null, "شنبه"), React.createElement("div", null, "یکشنبه"), React.createElement("div", null, "دوشنبه"), React.createElement("div", null, "سه شنبه"), React.createElement("div", null, "چهارشنبه"), React.createElement("div", null, "پنجشنبه"), React.createElement("div", null, "جمعه")), React.createElement(Days, {
      // }, React.createElement("div", null, "\u0634"), React.createElement("div", null, "\u06CC"), React.createElement("div", null, "\u062F"), React.createElement("div", null, "\u0633"), React.createElement("div", null, "\u0686"), React.createElement("div", null, "\u067E"), React.createElement("div", null, "\u062C")), React.createElement(Days, {
        gregorian: gregorian,
        selectedYear: selectedYear,
        selectedDay: selectedDay,
        currentMonth: currentMonth,
        daysCount: daysCount,
        firstDay: selectedMonthFirstDay,
        clickEvent: this.daysClicked,
        filterDate: filterDate
      }),/* React.createElement("div", null, React.createElement("button", {
        className: "JD-Cancel",
        onClick: this.cancelPicker
      }, closeLabel), !gregorian && React.createElement("button", {
        className: "JD-Cancel",
        onClick: this.gregorianPicker
      }, 'میلادی'), gregorian && React.createElement("button", {
        className: "JD-Cancel",
        onClick: this.gregorianPicker
      }, 'شمسی'))*/);
    }
  }]);

  return DatePicker;
}(Component);

export default DatePicker;