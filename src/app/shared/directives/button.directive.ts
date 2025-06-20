import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowEffectClick]'  
})
export class ShowEffectClickDirective {

  @Input() appShowAlert: string = '¡Botón o enlace clickeado!';

  constructor(private el: ElementRef, private renderer: Renderer2){

  }


  // Usamos el decorador HostListener para escuchar el evento de clic
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    // alert(this.appShowAlert); // Mostramos el mensaje proporcionado
    const button = this.el.nativeElement; 
    
    // Crear el elemento span para la onda
    const ripple = this.renderer.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Establecer el tamaño y la posición de la onda
    this.renderer.setStyle(ripple, 'width', `${size}px`);
    this.renderer.setStyle(ripple, 'height', `${size}px`);
    this.renderer.setStyle(ripple, 'left', `${x}px`);
    this.renderer.setStyle(ripple, 'top', `${y}px`);

    // Añadir la clase para la animación
    this.renderer.addClass(ripple, 'ripple');
    
    // Añadir la onda al botón
    this.renderer.appendChild(button, ripple);
    
    // Eliminar el ripple después de la animación
    ripple.addEventListener('animationend', () => {
      this.renderer.removeChild(button, ripple);
    });




  }
 

}