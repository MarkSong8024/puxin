const subject = {
  Y: '语',
  S: '数',
  E: '英',
  W: '物',
  H: '化',
  C: '生',
  Z: '政',
  L: '历',
  D: '地',
  Q: '其'
}

export const filterQuarter = (value) => {
  if (value == 'C') {
    return '春';
  } else if (value == 'X') {
    return '暑';
  } else if (value == 'Q') {
    return '秋';
  } else if (value == 'D') {
    return '寒';
  }
}
export const filterSub = (val, type) => {
  return subject[val] || '综'
  // if (val == 'Y') {
  //   return '语';
  // } else if (val == 'S') {
  //   return '数';
  // } else if (val == 'E') {
  //   return '英';
  // } else if (val == 'W') {
  //   return '物';
  // } else if (val == 'H') {
  //   return '化';
  // } else if (val == 'C') {
  //   return '生';
  // } else if (val == 'Z') {
  //   return '政';
  // } else if (val == 'L') {
  //   return '历';
  // } else if (val == 'D') {
  //   return '地';
  // } else if (val == 'Q') {
  //   return '其'
  // } else {
  //   return '总'
  // }
}
export const filterSeason = (value) => {
  if (value == 2) {
    return '小';
  } else if (value == 3) {
    return '初';
  } else if (value == 4) {
    return '高';
  }
}
export const filTime = (val, type, isMilliSecond) => {
  if (val) {
    if (val.toString().length < 5) {
      return '无效时间'
    }
    const time = isMilliSecond ? new Date(parseInt(val)) : new Date(parseInt(val) * 1000);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = time.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = time.getHours();
    h = h < 10 ? ('0' + h) : h;
    let mm = time.getMinutes();
    mm = mm < 10 ? ('0' + mm) : mm;
    let s = time.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    let week = time.getDay();
    let arr = ["日", "一", "二", "三", "四", "五", "六"]

    switch (type) {
      case 1:   //年 月 日  时 分 秒
        //return  y+'/'+m+'/'+'/'+' '+h+':'+mm+':'+s;
        //return time.replace(/\/(\d+)\/(\d+)\ (\d+):(\d+):(\d+)/,'年$1月$2日 $3时$4分$5秒');
        return y + '年' + m + '月' + d + '日' + ' ' + h + '时' + mm + '分' + s + '秒';
      case "yy-mm-dd":   //返回 年 月 日
        return y + '/' + m + '/' + d;
      case "y-m-d":   //返回 年 月 日
        return y + '-' + m + '-' + d;
      case "mm-dd":   //返回 月 日
        return m + '月' + d + '日';
      case "hh-mm-ss":
        return h + '时' + mm + '分' + s + '秒';
      case "h-m-s":
        return h + ':' + mm + ':' + s;
      case "hh-mm":
        //console.log("hh--mmm",hms.replace(/:[^:]+$/,''));
        return h + ':' + mm;
      case "week":
        return arr[week];
      case "YY-MM-DD":   //返回 年 月 日
        return y + '-' + m + '-' + d;
      case "yy-mm":
        return y + '年' + m + '月';
        break;
      default:
        return time
    }
    return val;
  }
}

export const getWeekDate = (time) => {
  let new_Date = time || new Date();
  let timesStamp = new_Date.getTime();
  let currenDay = new_Date.getDay();
  let dates = [];
  for (let i = 0; i < 7; i++) {
    let data = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString();
    // const reg = /([0-9]+)\/([0-9]+)\/([0-9]+)/g;
    data = filTime(new Date(data).getTime(), 'y-m-d', '1');
    // dates.push(data.replace(reg, '$1-$2-$3'));
    dates.push(data);
  }

  let [first, , , , , , last] = dates;
  return [first, last];
}
