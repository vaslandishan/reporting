import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import shallowEqualObjects from 'shallow-equal/objects';
import { isValueEmpty, isValueValidDate, splitDateValue, formatGregorian, formatJalaali, inspectYear, inspectMonth, inspectDay, mapToLatin, mapToFarsi, readDateFromValue, hasStringACharToGoToNext, maxDayFor, baseYear, NUMBER_FORMAT_LATIN, NUMBER_FORMAT_FARSI } from './dateUtils';
import jalaali from 'jalaali-js';
var DATE_SEPERATOR = '/'; // this is arabic date seperator ' ؍' but it is right to left glyph and as the numbers are left to right there will be caret position problem

var EMPTY_VALUE = "    ".concat(DATE_SEPERATOR, "  ").concat(DATE_SEPERATOR, "  ");

var DateInput =
/*#__PURE__*/
function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput(_props) {
    var _this;

    _classCallCheck(this, DateInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateInput).call(this, _props));

    _this.readValuesFromProps = function (props) {
      var j = readDateFromValue(props.value);
      var valueIsValid = !!j;
      var value = valueIsValid ? props.gregorian ? formatGregorian(j.value) : formatJalaali(j.j) : '';
      var date = valueIsValid ? j.value : null;
      var iso = valueIsValid ? j.value.toISOString() : '';

      var valueToShow = _this.mapValue(value, props.numberFormat);

      return {
        value: value,
        valueToShow: valueToShow,
        valueIsValid: valueIsValid,
        iso: iso,
        date: date,
        selectionStart: undefined,
        selectionEnd: undefined
      };
    };

    _this.handleFocus = function (event) {
      if (isValueEmpty(_this.values.value)) {
        _this.jumpToDay();
      }

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    };

    _this.handleBlur = function (event) {
      var splittedValue = splitDateValue(_this.values.value);

      _this.updateState(_this.sanitizeValues(splittedValue, _this.values, true, true, true));

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    };

    _this.jumpToNext = function () {
      var selectionStart = _this.inputRef.current.selectionStart;
      var splittedValue = splitDateValue(_this.values.value);

      if (_this.isCaretAtDay(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, true, false, false));

        _this.jumpToMonth();

        return true;
      } else if (_this.isCaretAtMonth(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, false, true, false));

        _this.jumpToYear();

        return true;
      } else if (_this.isCaretAtYear(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, false, false, true));
      }

      return false;
    };

    _this.jumpToPrevious = function () {
      var selectionStart = _this.inputRef.current.selectionStart;
      var splittedValue = splitDateValue(_this.values.value);

      if (_this.isCaretAtDay(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, true, false, false));
      } else if (_this.isCaretAtMonth(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, false, true, false));

        _this.jumpToDay();

        return true;
      } else if (_this.isCaretAtYear(splittedValue, selectionStart)) {
        _this.updateState(_this.sanitizeValues(splittedValue, _this.values, false, false, true));

        _this.jumpToMonth();

        return true;
      }

      return false;
    };

    _this.jumpToDay = function () {
      _this.values.selectionStart = 10;
      _this.values.selectionEnd = 10;

      _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
    };

    _this.jumpToMonth = function () {
      _this.values.selectionStart = 7;
      _this.values.selectionEnd = 7;

      _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
    };

    _this.jumpToYear = function () {
      _this.values.selectionStart = 4;
      _this.values.selectionEnd = 4;

      _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
    };

    _this.handleKeyDown = function (event) {
      // console.log('keyCode: ', event.keyCode, 'key: ', event.key);
      if (event.keyCode === 8) {
        //backspace
        event.preventDefault();

        _this.updateState(_this.deleteValue(event.target, -1));
      } else if (event.keyCode === 46) {
        //delete
        event.preventDefault();

        _this.updateState(_this.deleteValue(event.target, 1));
      } else if (event.keyCode >= 48 && event.keyCode <= 57) {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, (event.keyCode - 48).toString(), _this.props.numberFormat));
      } else if (event.keyCode >= 96 && event.keyCode <= 105) {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, (event.keyCode - 96).toString(), _this.props.numberFormat));
      } else if (event.key >= '۰' && event.key <= '۹') {
        //digits
        event.preventDefault(); // console.log('digit');

        _this.updateState(_this.updateValue(event.target, event.key, _this.props.numberFormat));
      } else if (event.key === '.' || event.key === '/' || event.key === '-' || event.key === '*' || event.key === '#' || event.keyCode === 188 || event.keyCode === 189 || event.keyCode === 190 || event.keyCode === 191) {
        event.preventDefault();

        if (event.ctrlKey || event.shiftKey || event.metaKey || event.key === '#') {
          _this.jumpToPrevious();
        } else {
          _this.jumpToNext();
        }
      } else if (event.keyCode >= 35 && event.keyCode <= 40) {//arrows
      } else if (event.keyCode === 9) {
        //tab
        if (Math.abs(_this.inputRef.current.selectionStart - _this.inputRef.current.selectionEnd) === _this.inputRef.current.value.length) {
          return;
        }

        if (event.ctrlKey || event.shiftKey || event.metaKey) {
          if (_this.jumpToPrevious()) event.preventDefault();
        } else {
          if (_this.jumpToNext()) event.preventDefault();
        }
      } else if (event.keyCode === 13) {
        //return
        _this.hideKeyboard();
      } else if ((event.ctrlKey || event.metaKey) && (event.keyCode === 67 || event.keyCode === 86)) {//copy/paste
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {//refresh key
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 73) {//inspector
      } else if ((event.ctrlKey || event.metaKey) && event.keyCode === 65) {//select all
      } else if (event.keyCode === 115) {
        // F4
        if (_this.props.onShowDialog) {
          event.preventDefault();

          _this.props.onShowDialog();
        }
      } else if (event.keyCode >= 112 && event.keyCode <= 123) {// All other F keys
      } else if (event.keyCode === 229) {
        //android bug workaround
        //K1 : I guess that we have to save the caret position as the input will change it, we need it to know where we have to jump to in handleInput function
        _this.values.selectionStart = _this.inputRef.current.selectionStart;
        _this.values.selectionEnd = _this.inputRef.current.selectionEnd; //  this.rr.current.innerText = `setting ss to ${this.values.selectionStart}  ${this.values.selectionEnd}`;
      } else {
        // console.log('other');
        // console.log('keyCode: ', event.keyCode, 'key: ', event.key, 'ctrlKey: ', event.ctrlKey);
        //  this.rr.current.innerText = `keyCode: ${event.keyCode} key:  ${event.key} ctrlKey: ${event.ctrlKey}`;
        event.preventDefault();
      }
    };

    _this.hideKeyboard = function () {
      _this.inputRef.current.blur();
    };

    _this.handlePaste = function (event) {
      event.preventDefault();
      var d = (event.clipboardData || window.clipboardData).getData('text').trim();

      _this.stringArrived(d);
    };

    _this.handleInput = function (event) {
      event.preventDefault();
      if (_this.values.valueToShow === event.target.value) return;
      var d = event.target.value;

      _this.stringArrived(d);

      if (_this.inputRef.current.value !== _this.values.valueToShow) {
        _this.inputRef.current.value = _this.values.valueToShow;

        _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
      }

      if (hasStringACharToGoToNext(d)) {
        _this.jumpToNext();
      }
    };

    _this.stringArrived = function (d) {
      d = mapToLatin(d);
      var date = isValueValidDate(d, _this.props.gregorian);

      if (!date) {
        date = new Date(d);

        if (date.toString() === 'Invalid Date') {
          date = false;
        }
      }

      if (!!date) {
        var value;

        if (_this.props.gregorian) {
          value = formatGregorian(date);
        } else {
          var j = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
          value = formatJalaali(j);
        }

        var valueIsValid = true;
        var iso = date.toISOString();

        var valueToShow = _this.mapValue(value, _this.props.numberFormat);

        var newState = {
          value: value,
          valueToShow: valueToShow,
          valueIsValid: valueIsValid,
          iso: iso,
          date: date,
          selectionStart: undefined,
          selectionEnd: undefined
        };

        _this.updateState(newState);
      }
    };

    _this.mapValue = function (value, numberFormat) {
      if (numberFormat === NUMBER_FORMAT_FARSI) {
        var _mapped = mapToFarsi(value);

        return _mapped;
      } else if (numberFormat === NUMBER_FORMAT_LATIN) {
        var _mapped2 = mapToLatin(value);

        return _mapped2;
      }

      var mapped = mapToFarsi(value);
      return mapped;
    };

    _this.updateState = function (newState) {
      if (!newState) return;
      _this.values = newState;

      if (!_this.values.value) {
        _this.values.iso = '';
        _this.values.date = null;
        _this.values.valueIsValid = false;
      } else {
        if (newState.date) {
          _this.values.valueIsValid = true;
          _this.values.date = newState.date;
          _this.values.iso = newState.iso ? newState.iso : _this.values.date.toISOString();
        } else {
          var date = isValueValidDate(_this.values.value, _this.props.gregorian);
          _this.values.valueIsValid = !!date;

          if (_this.values.valueIsValid) {
            _this.values.date = date;
            _this.values.iso = _this.values.date.toISOString();
          } else {
            _this.values.date = null;
            _this.values.iso = '';
          }
        }
      }

      var fireOnChangeInTheEnd = false; //console.log('values on updateState', this.values)

      if (_this.inputRef.current.value !== _this.values.valueToShow) {
        fireOnChangeInTheEnd = true;
        _this.inputRef.current.value = _this.values.valueToShow;
      }

      if (_this.inputRef.current === document.activeElement) {
        // console.log('has focus :D');
        _this.inputRef.current.setSelectionRange(_this.values.selectionStart, _this.values.selectionEnd);
      } else {// console.log('has not focus :(');
      }

      if (fireOnChangeInTheEnd) {
        _this.fireOnChange();
      }
    };

    _this.updateValue = function (element, enteredValue, numberFormat) {
      var enteredValueMapped = _this.mapValue(enteredValue, numberFormat);

      var valueToShow = element.value;
      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd;

      if (valueToShow === '') {
        valueToShow = EMPTY_VALUE;
        selectionStart = 10;
        selectionEnd = 10;
      }

      valueToShow = valueToShow.substring(0, selectionStart) + enteredValueMapped + valueToShow.substring(selectionEnd);
      selectionStart += enteredValueMapped.length;
      selectionEnd = selectionStart;
      var value = mapToLatin(valueToShow);

      var values = _this.inspectValues({
        value: value,
        valueToShow: valueToShow,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      });

      return values;
    };

    _this.isCaretAtDay = function (splittedValue, selectionStart) {
      return splittedValue && selectionStart > splittedValue.seperator2;
    };

    _this.isCaretAtMonth = function (splittedValue, selectionStart) {
      return splittedValue && selectionStart <= splittedValue.seperator2 && selectionStart > splittedValue.seperator1;
    };

    _this.isCaretAtYear = function (splittedValue, selectionStart) {
      return splittedValue && selectionStart <= splittedValue.seperator1;
    };

    _this.sanitizeValues = function (splittedValue, values, sanitizeDay, sanitizeMonth, sanitizeYear) {
      var value = values.value;

      if (splittedValue === '') {
        return null;
      }

      if (!splittedValue) {
        return _this.resetValues();
      }

      var year = splittedValue.year,
          month = splittedValue.month,
          day = splittedValue.day;

      if (sanitizeDay) {
        if (day.length === 0) {
          day = '  ';
        } else if (day.length === 1) {
          if (day === '0' || day === ' ') {
            day = '  ';
          } else {
            day = '0' + day;
          }
        }
      }

      if (sanitizeMonth) {
        if (month.length === 0) {
          month = '  ';
        } else if (month.length === 1) {
          if (month === '0' || month === ' ') {
            month = '  ';
          } else {
            month = '0' + month;
          }
        }
      }

      if (sanitizeYear) {
        year = year.trim();
        year = baseYear(_this.props.gregorian).substring(0, 4 - year.length) + year;
      }

      var newValue = "".concat(year).concat(DATE_SEPERATOR).concat(month).concat(DATE_SEPERATOR).concat(day);

      if (value !== newValue) {
        return _objectSpread({}, values, {
          value: newValue,
          valueToShow: _this.mapValue(newValue, _this.props.numberFormat)
        });
      }
    };

    _this.inspectValues = function (values) {
      var value = values.value;
      var splittedValue = splitDateValue(value);

      if (!splittedValue) {
        return _this.resetValues();
      }

      var year = splittedValue.year,
          month = splittedValue.month,
          day = splittedValue.day;
      var newStartPosition = values.selectionStart;

      if (_this.isCaretAtDay(splittedValue, values.selectionStart)) {
        var inspected = inspectDay(day, values.selectionStart, splittedValue.seperator2, maxDayFor(month));
        newStartPosition = inspected.newStartPosition;
        day = inspected.newDay;
      } else if (_this.isCaretAtMonth(splittedValue, values.selectionStart)) {
        var _inspected = inspectMonth(month, values.selectionStart, splittedValue.seperator1);

        newStartPosition = _inspected.newStartPosition;
        month = _inspected.newMonth;
      } else if (_this.isCaretAtYear(splittedValue, values.selectionStart)) {
        var _inspected2 = inspectYear(year, values.selectionStart);

        newStartPosition = _inspected2.newStartPosition;
        year = _inspected2.newYear;
      }

      var newValue = "".concat(year).concat(DATE_SEPERATOR).concat(month).concat(DATE_SEPERATOR).concat(day);
      return {
        value: newValue,
        valueToShow: _this.mapValue(newValue, _this.props.numberFormat),
        selectionStart: newStartPosition,
        selectionEnd: newStartPosition
      };
    };

    _this.resetValues = function () {
      var value = '';
      return {
        value: value,
        valueToShow: _this.mapValue(value, _this.props.numberFormat),
        selectionStart: 10,
        selectionEnd: 10
      };
    };

    _this.deleteValue = function (element, qty) {
      var valueToShow = element.value;
      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd;

      if (selectionStart === selectionEnd) {
        if (qty < 0) {
          if (selectionStart === 0) return;
          if (valueToShow.substring(selectionStart + qty, selectionStart) === DATE_SEPERATOR) return;
          valueToShow = valueToShow.substring(0, selectionStart + qty) + valueToShow.substring(selectionEnd);
          selectionStart += qty;
        } else {
          if (selectionEnd === valueToShow.length) return;
          if (valueToShow.substring(selectionStart, selectionStart + qty) === DATE_SEPERATOR) return;
          valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd + qty);
        }
      } else {
        valueToShow = valueToShow.substring(0, selectionStart) + valueToShow.substring(selectionEnd);
      }

      selectionEnd = selectionStart;
      var value = mapToLatin(valueToShow);

      var values = _this.inspectValues({
        value: value,
        valueToShow: valueToShow,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
      });

      return values;
    };

    _this.fireOnChange = function () {
      if (_this.props.onChange) {
        var value = _this.values.valueIsValid ? _this.values.value : '';

        if (_this.previousValue !== value) {
          _this.previousValue = value;
          var target = !_this.values.valueIsValid ? {
            name: _this.props.name,
            formatted: '',
            value: '',
            date: null
          } : {
            name: _this.props.name,
            value: _this.values.iso,
            formatted: _this.values.value,
            date: _this.values.date
          };

          _this.props.onChange({
            target: target
          });
        }
      }
    };

    _this.emptyValue = _this.emptyValue.bind(_assertThisInitialized(_this));
    var ref;

    if (_props.inputRef && typeof _props.inputRef === 'function') {
      ref = _props.inputRef();
    } else if (_props.inputRef && typeof _props.inputRef === 'object') {
      ref = _props.inputRef;
    }

    _this.inputRef = ref ? ref : React.createRef(); // this.rr = React.createRef();

    _this.values = _this.readValuesFromProps(_props);
    _this.previousValue = _this.values.value;
    return _this;
  }

  _createClass(DateInput, [{
    key: "emptyValue",
    value: function emptyValue() {
      this.updateState(this.resetValues());
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.value !== this.values.iso || nextProps.gregorian !== this.props.gregorian || nextProps.numberFormat !== this.props.numberFormat) {
        this.updateState(this.readValuesFromProps(nextProps));
      }

      if (!shallowEqualObjects(nextProps.style, this.props.style)) {
        return true;
      }

      if (nextProps.className !== this.props.className) {
        this.inputRef.current.className = nextProps.className;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          gregorian = _this$props.gregorian,
          value = _this$props.value,
          onChange = _this$props.onChange,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur,
          onInput = _this$props.onInput,
          onPaste = _this$props.onPaste,
          onKeyDown = _this$props.onKeyDown,
          onShowDialog = _this$props.onShowDialog,
          pattern = _this$props.pattern,
          inputMode = _this$props.inputMode,
          defaultValue = _this$props.defaultValue,
          type = _this$props.type,
          inputRef = _this$props.inputRef,
          numberFormat = _this$props.numberFormat,
          rest = _objectWithoutProperties(_this$props, ["gregorian", "value", "onChange", "onFocus", "onBlur", "onInput", "onPaste", "onKeyDown", "onShowDialog", "pattern", "inputMode", "defaultValue", "type", "inputRef", "numberFormat"]);

      var valueToShow = this.values.valueToShow; // const localInputMode = this.props.type === 'tel' ? 'tel' : 'numeric'; // as we use type=tel, then we do not need it any more
      // const localPattern = '[0-9]*'; // it has problem with the form checking, as we insert persian digit, it is not acceptable for the browser

      return React.createElement("input", Object.assign({
        ref: this.inputRef,
        type: "tel" // I tried to use text and using inputMode, but it does not work on Safari
        // inputMode={localInputMode}
        // xInputMode={localnputMode} // in firefox OS it is x-inputmode, I do not know how to handle it
        ,
        dir: "ltr" // pattern={localPattern}
        ,
        defaultValue: valueToShow,
        onKeyDown: this.handleKeyDown,
        onPaste: this.handlePaste,
        onInput: this.handleInput,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      }, rest)); //<p ref={this.rr} type={"text"}>empty</p></div>
    }
  }]);

  return DateInput;
}(Component);

export default DateInput;