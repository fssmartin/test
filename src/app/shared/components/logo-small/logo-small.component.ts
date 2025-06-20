import { ChangeDetectionStrategy, Component, Input } from '@angular/core'; 

@Component({
  selector: 'app-logo-small',
  templateUrl: './logo-small.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class LogoSmallComponent { 
  
  @Input() cssClass!:string;

  

}
