import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import {NotesService} from '../../../services/NotesService/notes.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy, Renderer2} from '@angular/core';
import {NoteDisplayComponent} from '../../note-display/note-display.component';
import {NoteCreateComponent} from '../../note-create/note-create.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnChanges {  
myDate=Date.now();
    updating: boolean = false;
    mobileQuery: MediaQueryList;
    value = 'Search';
    notes!: Array<{title:string, description:string, body:any,reminder:any, color:any,image:any,archived:any,trash:any,pin:any,createdDate:any,modifiedDate:any, noteID:any}>;
    title : string;
    //description:string;
    

    updateNote : any
    @ViewChild("upnote")  upNote! : ElementRef;
    top: number = 0;
    left : number = 0;
    more : boolean = false;
    private _mobileQueryListener: () => void;
    deleteNoteId: number = 0;
    prevNoteID : number = 0;

   constructor(private renderer: Renderer2, private elRef:ElementRef, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private NotesService: NotesService ,public route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title = 'FunDooNotes';
  }

  @ViewChild('updateNote') set updatedNote(element: any) {
    if (element) {
      this.upNote.nativeElement.focus();
    }
  }
  
  @HostListener('click', ['$event'])
  position($event: any){
    if($event.srcElement.id=="delete"){
  //    console.log($event.path[3].id);
      
      this.left = $event.target.offsetLeft + $event.path[5].offsetLeft;
      this.top = $event.path[5].offsetTop + $event.path[3].clientHeight;
      if( this.prevNoteID == 0)
      {
        this.prevNoteID = this.deleteNoteId
      }
      if(this.prevNoteID == this.deleteNoteId){
        this.more = !this.more;
        this.prevNoteID = this.deleteNoteId
      }
      else{
        this.more = true;
        this.prevNoteID = this.deleteNoteId
      }
      
    }
    else{
      this.more = false;
    }    
  }
  logout() {
    this.route.navigate(['login']);
  }

  Refresh(){
    
  }

  deleteNote()
  {
    let deletereq={
      notesId:this.updateNote.notesId
    }
    console.log(deletereq)

   // this.NotesService.NoteId(deletereq);
    
      
    this.NotesService.deleteNote(deletereq).subscribe(
      (response: any) => {
        console.log(response);
      this.loadActiveNotes();
    });;
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.updating)    
    console.log(changes)
  }
  ngOnInit(): void {
    this.loadActiveNotes();   
  }

  receiveMessage($event: any) {
    this.loadActiveNotes();
  }
     
  receiveMoreEvent($event: any) {
    this.deleteNoteId= $event;
  }

  loadActiveNotes(){
    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
        console.log(response);
      this.notes = response['data'];
      this.notes.reverse();
     console.log(":- ",this.notes)
      
    });
  }
  
  receiveNoteMessage($event: any) {
    this.updateNote = $event
    this.updating = true;
    console.log(this.updateNote)
  }
  focusNote(){
    this.upNote.nativeElement.focus();
  }


  // Date
Date=Date.now();
  
  // Color Changes
  getColor(color:any) 
  {
    
    let date: Date = new Date();
  
    
    
  }


  UpdateNote(){
    
    let reqData={
      //userId : 13,
      notesId : this.updateNote.notesId,
      title :(<HTMLInputElement>document.getElementById("up-title")).innerText.trim(),
      description : (<HTMLInputElement>document.getElementById("upnote")).innerText.trim(),
      modifiedDate: Date,
      body:"45454",
      color: "string",      
      image: "string",
      pin: true,
      archived: true, 
      trash: true,
     
      //createdDate: "2021-07-12T03:30:24.904Z",
      
      reminder: "2021-07-13T13:18:18.506Z",


      // "notesId": 13,
      // "title": "Omprakash",
      // "description": "Khawshi",
      // "body": "string",
      // "color": "string",
      // "image": "string",
      // "pin": true,
      // "archived": true,
      // "trash": true,
      // "modifiedDate": "2021-07-13T13:18:18.506Z",
      // "reminder": "2021-07-13T13:18:18.506Z"

    }
    console.log(":-",reqData);

    if(this.updateNote != reqData){
      this.NotesService.updateNote(reqData).subscribe(
        (response: any) => {
        this.loadActiveNotes();
      });;
    }
    this.updating = false;
  } 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {

  }

}
