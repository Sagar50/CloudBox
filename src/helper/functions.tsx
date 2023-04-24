export function removeBannerAd(num: string | number){
      const bannerAd = document.getElementById("bannerAd" + num)!;
      bannerAd.style.display = "none";
  }

export const convTime = (time: string) => {
    if(time === undefined) return time;
    const timeArr = time.split(":");
    var hour = parseInt(timeArr[0]);
    const min = timeArr[1];
    var AmOrPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    const newTime = hour + ':' + min + ' ' + AmOrPm;
    return newTime;
}
export function convBytes(x:any, units= ['bytes', 'KB', 'MB', 'GB']){
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
