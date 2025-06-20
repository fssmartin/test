import {  ChangeDetectionStrategy, Component, Renderer2  } from '@angular/core'; 
 

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.html' ,
  standalone: false,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent  {
  
  constructor(
     private renderer: Renderer2,
  ){
    
  }

  ngOnInit(): void { 
    this.renderer.removeClass(document.body, 'noCanvas'); 
  }
  
}
