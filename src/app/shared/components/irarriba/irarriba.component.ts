import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-irarriba',
  templateUrl: './irarriba.component.html',
  styleUrls: ['./irarriba.component.css'],  
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class IrArribaComponent {

  showButtonLimit:number = 350;
  btn_scroll = document.querySelector(".scroll-top-btn");
  @ViewChild("scrolltopbtn") scrolltopbtn: ElementRef | undefined;

  @HostListener('window:scroll' , ['$Event'])
  onScroll(event:KeyboardEvent){ 
    if (this.scrollContainer().scrollTop > this.showButtonLimit) {  
      this.renderer.removeClass(this.scrolltopbtn!.nativeElement, "hidden");
    } else {  
      this.renderer.addClass(this.scrolltopbtn!.nativeElement, "hidden"); 
    }
  }


  constructor( 
    private renderer: Renderer2 
  ) {    
  }

  @HostListener('mouseenter' )
  onEnter(){
    console.log("MOUSE ENTER desde hostlistener")
  }

  @HostListener('click' )
  onClick(){
    this.goTop();
  }


  scrollContainer = () => {
    return document.documentElement || document.body;
  };
  // constructor(){
  
  //     //this.irArriba()  
  // }

  goTop = () => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };
  
   

}
