function TimeSpan(showText, searchText){
  this.showText = showText;
  this.searchText = searchText;
}

export const TIME_SPANS = [
  new TimeSpan('今 天', 'since=today'),
  new TimeSpan('本 周', 'since=week'),
  new TimeSpan('本 月', 'since=month')
];
