import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo';
  inputValue ='';
  tableData=[];
  dt = new Date();
  day: any;
  cells: any[];
  today: any;
  endDate: any;
  prevDate: number;
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

daysOfWeek = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
]
  currentMonth: any;
  currentYear: any;
  editMode: boolean;
  currentEditIndex: number;
  editValue: any;

  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
constructor(){}

addData(){
  this.tableData.push({task:this.inputValue , completed:false})
  this.inputValue='';
  console.log(this.tableData);
} 
ngOnInit(){
  this.renderDate()
}
ngAfterViewInit() {
  this.scrollToToday();
}
renderDate(){
  this.cells=[];
  this.dt.setDate(1);
  this.day = this.dt.getDay();
  this.today = new Date().getDate();

  this.endDate = new Date(this.dt.getFullYear(),this.dt.getMonth()+1,0).getDate();

  this.prevDate = new Date(this.dt.getFullYear(),this.dt.getMonth(),0).getDate();
  
  this.currentMonth = this.months[this.dt.getMonth()];

  this.currentYear = this.dt.getFullYear();
  let i:any;
  let j:any;
  for (j=1;j<=this.endDate;j++){
    let objData={};
    let statusColor;
    
    let Daydate = new Date(this.currentYear,this.dt.getMonth(),j)
    let currDate =new Date();
    if(currDate.toDateString() == Daydate.toDateString())
      statusColor = true
    else
      statusColor=false
  const dayOfWeek = this.daysOfWeek[Daydate.getDay()];
  objData={date: j,day:dayOfWeek,isToday:statusColor}
  this.cells.push(objData);
  
  console.log(this.cells)

}


}
nextMonth() {
  this.dt.setMonth(this.dt.getMonth() + 1);
  this.renderDate();
}

pevMonth() {
  this.dt.setMonth(this.dt.getMonth() - 1);
  this.renderDate();
}
deleteTask(index: number) {
  this.tableData.splice(index, 1);
}
startEditing(index){
this.editMode=true;
this.currentEditIndex=index;
this.editValue = this.tableData[index].task;
}
saveEditing() {
  if (this.currentEditIndex !== null) {
    this.tableData[this.currentEditIndex].task = this.editValue;
    this.editMode = false;
    this.currentEditIndex = null;
    this.editValue = '';
  }
}
handleKey(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    this.saveEditing();
  }

}
scrollToToday(){
   // Get the element that corresponds to the current date
   const todayElement = this.calendarContainer.nativeElement.querySelector('.today');
   if (todayElement) {
     // Scroll to the element
     todayElement.scrollIntoView({ behavior: 'smooth', block: 'center',  inline: 'center' });
   }
}
}
