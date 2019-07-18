import jalaali from 'jalaali-js';
export var NUMBER_FORMAT_FARSI = 'FARSI';
export var NUMBER_FORMAT_LATIN = 'LATIN';
export var DATE_SEPERATOR = '/'; // this is arabic date seperator ' ؍' but it is right to left glyph and as the numbers are left to right there will be caret position problem

export var MIDDLE_SEPERATOR = '\xa0';
export var TIME_SEPERATOR = ':';
export var SEPERATORES_REGEX = new RegExp("[ ".concat(DATE_SEPERATOR, "]"), 'g');
export function isEqualDate(m1, m2) {
  if (m1 && !m2 || !m1 && m2 || m1 && m2 && m1.getTime() !== m2.getTime()) {
    return true;
  }

  return false;
}
export function mapToFarsi(str) {
  if (!str) return str;
  return str.toString().replace(/[1234567890]/gi, function (e) {
    return String.fromCharCode(e.charCodeAt(0) + 1728);
  });
}
export function mapToLatin(str) {
  if (!str) return str;
  return str.toString().replace(/[۱۲۳۴۵۶۷۸۹۰]/gi, function (e) {
    return String.fromCharCode(e.charCodeAt(0) - 1728);
  });
}
export function stripAnyThingButDigits(str) {
  if (!str) return str;
  return str.toString().replace(/[^1234567890۱۲۳۴۵۶۷۸۹۰]/gi, '');
}
export function inspectDay(day, selectionStart, seperatorPosition, max) {
  var newDay = day.trim() === '' ? day : day.replace(/ /g, '0');
  var newStartPosition = selectionStart;
  var caretPosition = selectionStart - seperatorPosition - 1;

  if (newDay.length > 2) {
    if (caretPosition <= 2) {
      newDay = newDay.substring(0, 2);
      newStartPosition = 8 + caretPosition;
    } else if (caretPosition > 2) {
      newDay = newDay.substring(caretPosition - 2, caretPosition);
      newStartPosition = 10;
    }
  }

  if (newDay > max) {
    if (caretPosition === 0) {
      newDay = '  ';
      newStartPosition = 10;
    } else {
      newDay = day.substring(caretPosition - 1, caretPosition);
      newStartPosition = 9;
    }
  }

  return {
    newDay: newDay,
    newStartPosition: newStartPosition
  };
}
export function inspectMonth(month, selectionStart, seperatorPosition) {
  var newMonth = month.trim() === '' ? month : month.replace(/ /g, '0');
  var newStartPosition = selectionStart;
  var caretPosition = selectionStart - seperatorPosition - 1;

  if (newMonth.length > 2) {
    if (caretPosition <= 2) {
      newMonth = newMonth.substring(0, 2);
      newStartPosition = 5 + caretPosition;
    } else if (caretPosition > 2) {
      newMonth = newMonth.substring(caretPosition - 2, caretPosition);
      newStartPosition = 7;
    }
  }

  if (newMonth > 12) {
    if (caretPosition === 0) {
      newMonth = '  ';
      newStartPosition = 7;
    } else {
      newMonth = month.substring(caretPosition - 1, caretPosition);
      newStartPosition = 6;
    }
  }

  return {
    newMonth: newMonth,
    newStartPosition: newStartPosition
  };
}
export function inspectYear(year, selectionStart) {
  var newYear = year;
  var newStartPosition = selectionStart;
  var caretPosition = selectionStart;

  if (newYear.length > 4) {
    if (caretPosition <= 4) {
      newYear = newYear.substring(0, 4);
      newStartPosition = caretPosition;
    } else if (caretPosition > 4) {
      newYear = newYear.substring(caretPosition - 4, caretPosition);
      newStartPosition = 4;
    }
  }

  return {
    newYear: newYear,
    newStartPosition: newStartPosition
  };
}
export function inspectHour(hour, selectionStart, seperatorPosition) {
  var newHour = hour.trim() === '' ? hour : hour.replace(/ /g, '0');
  var newStartPosition = selectionStart;
  var caretPosition = selectionStart - seperatorPosition - 1;

  if (newHour.length > 2) {
    if (caretPosition <= 2) {
      newHour = newHour.substring(0, 2);
      newStartPosition = 11 + caretPosition;
    } else if (caretPosition > 2) {
      newHour = newHour.substring(caretPosition - 2, caretPosition);
      newStartPosition = 13;
    }
  }

  if (newHour > 23) {
    if (caretPosition === 0) {
      newHour = '  ';
      newStartPosition = 13;
    } else {
      newHour = hour.substring(caretPosition - 1, caretPosition);
      newStartPosition = 12;
    }
  }

  return {
    newHour: newHour,
    newStartPosition: newStartPosition
  };
}
;
export function inspectMinute(minute, selectionStart, seperatorPosition) {
  var newMinute = minute.trim() === '' ? minute : minute.replace(/ /g, '0');
  var newStartPosition = selectionStart;
  var caretPosition = selectionStart - seperatorPosition - 1;

  if (newMinute.length > 2) {
    if (caretPosition <= 2) {
      newMinute = newMinute.substring(0, 2);
      newStartPosition = 14 + caretPosition;
    } else if (caretPosition > 2) {
      newMinute = newMinute.substring(caretPosition - 2, caretPosition);
      newStartPosition = 16;
    }
  }

  if (newMinute > 59) {
    if (caretPosition === 0) {
      newMinute = '  ';
      newStartPosition = 16;
    } else {
      newMinute = minute.substring(caretPosition - 1, caretPosition);
      newStartPosition = 15;
    }
  }

  return {
    newMinute: newMinute,
    newStartPosition: newStartPosition
  };
}
export function readDateFromValue(value) {
  if (!value) return '';

  if (typeof value === 'string') {
    value = mapToLatin(value);
    var v = new Date(value);

    if (v.toString() === 'Invalid Date') {
      var d = isValueValidDateTime(value, true);

      if (d) {
        v = d;
      } else {
        d = isValueValidDate(value, true);

        if (d) {
          v = d;
        }
      }
    }

    if (v.getFullYear() < 1700) {
      var _d = isValueValidDateTime(value, false);

      if (_d) {
        v = _d;
      } else {
        _d = isValueValidDate(value, false);

        if (_d) {
          v = _d;
        }
      }
    }

    var j = jalaali.toJalaali(v);
    return {
      j: j,
      value: v
    };
  } else if (value instanceof Date) {
    if (value.toString() === 'Invalid Date') return '';

    var _j = jalaali.toJalaali(value);

    return {
      j: _j,
      value: value
    };
  } else {
    console.warn('unknown value type ', value);
  }

  return '';
}
export function hasStringACharToGoToNext(str) {
  if (str.indexOf('.') >= 0) return true;
  if (str.indexOf(',') >= 0) return true; // if(str.indexOf('/')>=0) return true;

  if (str.indexOf('-') >= 0) return true;
  if (str.indexOf(';') >= 0) return true;
  if (str.indexOf('*') >= 0) return true;
  if (str.indexOf('#') >= 0) return true;
  if (str.indexOf(' ') >= 0) return true;
  if (str.indexOf('،') >= 0) return true;
  return false;
}
export function maxDayFor(month, year) {
  if (!month) return 31;
  month = Number(month);
  if (month < 7) return 31;
  if (month > 7 && month < 12) return 30;
  if (!year) return 30;
  year = Number(year);
  if (month === 12 && jalaali.isLeapJalaaliYear(year)) return 30;
  return 29;
}
var jalaaliBaseYear = jalaali.toJalaali(new Date()).jy.toString();
var gregorianBaseYear = new Date().getFullYear().toString();
export function baseYear(gregorian) {
  return gregorian ? gregorianBaseYear : jalaaliBaseYear;
}
export function formatJalaali(j) {
  if (j instanceof Date) {
    j = jalaali.toJalaali(j);
  }

  return constructdate(j.jy, j.jm, j.jd, '/');
}
export function formatGregorian(g) {
  return constructdate(g.getFullYear(), g.getMonth() + 1, g.getDate(), '/');
}
export function formatTime(date) {
  var seperator = ':';

  var _minutes = date.getMinutes().toString();

  _minutes = '00'.substring(0, 2 - _minutes.length) + _minutes;

  var _hours = date.getHours().toString();

  _hours = '00'.substring(0, 2 - _hours.length) + _hours;
  return _hours + seperator + _minutes;
}
export function constructdate(_year, _month, _day, seperator) {
  var _yeary, _monthm, _dayd;

  _dayd = _day.toString();
  _dayd = '00'.substring(0, 2 - _dayd.length) + _dayd;
  _monthm = _month.toString();
  _monthm = '00'.substring(0, 2 - _monthm.length) + _monthm;
  _yeary = _year.toString();
  _yeary = '0000'.substring(0, 4 - _yeary.length) + _yeary;
  return _yeary + seperator + _monthm + seperator + _dayd;
}
export var isValueValidDate = function isValueValidDate(value, gregorian) {
  if (!value) return false;
  var splittedValue = splitDateValue(value);

  if (splittedValue === '' || !splittedValue) {
    return false;
  }

  var year = splittedValue.year,
      month = splittedValue.month,
      day = splittedValue.day;
  year = Number(year);
  month = Number(month);
  day = Number(day);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (!gregorian && (year < 1300 || year > 1450)) return false;
  if (gregorian && (year < 1800 || year > 2150)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (month > 6 && day > 30) return false;
  if (!gregorian && month === 12 && day > 29 && !jalaali.isLeapJalaaliYear(year)) return false;

  if (gregorian) {
    var date = new Date(year, month - 1, day, 0, 0);

    if (date.toString() === 'Invalid Date') {
      return false;
    }

    return date;
  } else {
    if (!jalaali.isValidJalaaliDate(year, month, day)) return false;
    var g = jalaali.toGregorian(year, month, day);

    var _date = new Date(g.gy, g.gm - 1, g.gd, 0, 0);

    return _date;
  }
};
export var isValueValidDateTime = function isValueValidDateTime(value, gregorian) {
  if (!value) return false;
  var splittedValue = splitDateTimeValue(value);

  if (splittedValue === '' || !splittedValue) {
    return false;
  }

  var year = splittedValue.year,
      month = splittedValue.month,
      day = splittedValue.day,
      hour = splittedValue.hour,
      minute = splittedValue.minute;
  if (hour.trim() === '' || minute.trim() === '') return false;
  year = Number(year);
  month = Number(month);
  day = Number(day);
  hour = Number(hour);
  minute = Number(minute);
  if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(hour) || isNaN(minute)) return false;
  if (!gregorian && (year < 1300 || year > 1450)) return false;
  if (gregorian && (year < 1800 || year > 2150)) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (month > 6 && day > 30) return false;
  if (!gregorian && month === 12 && day > 29 && !jalaali.isLeapJalaaliYear(year)) return false;
  if (hour < 0 || hour >= 24) return false;
  if (minute < 0 || minute >= 60) return false;

  if (gregorian) {
    var date = new Date(year, month - 1, day, hour, minute);

    if (date.toString() === 'Invalid Date') {
      return false;
    }

    return date;
  } else {
    if (!jalaali.isValidJalaaliDate(year, month, day)) return false;
    var g = jalaali.toGregorian(year, month, day);

    var _date2 = new Date(g.gy, g.gm - 1, g.gd, hour, minute);

    return _date2;
  }
};
export var isValueEmpty = function isValueEmpty(value) {
  if (value.replace(SEPERATORES_REGEX, '') === '') return true;
  return false;
};
export var splitDateValue = function splitDateValue(value) {
  if (isValueEmpty(value)) {
    return '';
  }

  var seperator1 = value.indexOf(DATE_SEPERATOR);
  var seperator2 = value.indexOf(DATE_SEPERATOR, seperator1 + 1);

  if (seperator1 === -1 || seperator2 === -1) {
    return null;
  }

  var year = value.substring(0, seperator1);
  var month = value.substring(seperator1 + 1, seperator2);
  var day = value.substring(seperator2 + 1);
  return {
    year: year,
    month: month,
    day: day,
    seperator1: seperator1,
    seperator2: seperator2
  };
};
export var splitDateTimeValue = function splitDateTimeValue(value) {
  if (isValueEmpty(value)) {
    return '';
  }

  var seperator1 = value.indexOf(DATE_SEPERATOR);
  var seperator2 = value.indexOf(DATE_SEPERATOR, seperator1 + 1);
  var seperator3 = value.indexOf(MIDDLE_SEPERATOR, seperator2 + 1);
  var seperator4 = value.indexOf(TIME_SEPERATOR, seperator3 + 1);

  if (seperator1 === -1 || seperator2 === -1 || seperator3 === -1 || seperator4 === -1) {
    return null;
  }

  var year = value.substring(0, seperator1);
  var month = value.substring(seperator1 + 1, seperator2);
  var day = value.substring(seperator2 + 1, seperator3);
  var hour = value.substring(seperator3 + 1, seperator4);
  var minute = value.substring(seperator4 + 1);
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    seperator1: seperator1,
    seperator2: seperator2,
    seperator3: seperator3,
    seperator4: seperator4
  };
};
export function calcFirstDayOfMonth(year, month, gregorian) {
  year = +year;
  month = +month;
  var fistDayDate;

  if (gregorian) {
    fistDayDate = new Date(year, month - 1, 1);
  } else {
    var firstDayJ = jalaali.toGregorian(year, month, 1);
    fistDayDate = new Date(firstDayJ.gy, firstDayJ.gm - 1, firstDayJ.gd);
  }

  return (fistDayDate.getDay() + 1) % 7;
}
export function gregorianMonthLength(year, month) {
  return new Date(year, month, 0).getDate();
}