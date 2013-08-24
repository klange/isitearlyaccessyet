function calcage(secs, num1, num2) {
  s = ((Math.floor(secs/num1))%num2).toString();
  if (LeadingZero && s.length < 2)
    s = "0" + s;
  return s;
}
var secs = 0;
function CountBack() {
  if (secs < 0) {
    document.getElementById("cntdwn").innerHTML = FinishMessage;
    return;
  }
  var tsecs = secs / 100;
  DisplayStr = DisplayFormat.replace(/%%D%%/g, calcage(tsecs,86400,100000));
  DisplayStr = DisplayStr.replace(/%%H%%/g, calcage(tsecs,3600,24));
  DisplayStr = DisplayStr.replace(/%%M%%/g, calcage(tsecs,60,60));
  DisplayStr = DisplayStr.replace(/%%S%%/g, calcage(tsecs,1,60));
  DisplayStr = DisplayStr.replace(/%%F%%/g, tsecs);
  var msecs = (secs % 100).toString();
  if (LeadingZero && msecs.length < 2)
    msecs = "0" + msecs;
  DisplayStr = DisplayStr.replace(/%%MS%%/g, msecs);
  secs += CountStepper;
  document.getElementById("cntdwn").innerHTML = DisplayStr;
  if (CountActive)
    setTimeout("CountBack()", SetTimeOutPeriod);
}

function Resync() {
    var dthen = new Date(TargetDate);
    var dnow = new Date();
    if(CountStepper>0)
      ddiff = new Date(dnow-dthen);
    else
      ddiff = new Date(dthen-dnow);
    secs = Math.floor(ddiff.valueOf()/10);
    setTimeout("Resync()", 100);
}

if (typeof(TargetDate)=="undefined")
  TargetDate = "12/31/2020 5:00 AM";
if (typeof(DisplayFormat)=="undefined")
  DisplayFormat = "%%H%%時間%%M%%分%%S%%秒%%MS%%ミリ秒";
if (typeof(CountActive)=="undefined")
  CountActive = true;
if (typeof(CountStepper)!="number")
  CountStepper = -1;
if (typeof(LeadingZero)=="undefined")
  LeadingZero = true;


CountStepper = Math.ceil(CountStepper);
if (CountStepper == 0)
  CountActive = false;
var SetTimeOutPeriod = 10;
Resync();
CountBack();
