import { Component, effect, Renderer2} from '@angular/core'; 
import { AbstractControl, FormControl,FormGroup,ValidationErrors,ValidatorFn,Validators} from "@angular/forms";
import { Router } from '@angular/router'; 

import Swal from 'sweetalert2'

import { passwordStrengthValidator } from '../../shared/components/password/password.validator';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegisterDto } from 'src/app/core/interfaces/user.dto';


@Component({
  selector: 'app-register',
    standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {  

  loading:boolean  = true; 
  empresa:string= 'miempresa';

  protected form = new FormGroup({
        name: new FormControl("pepe", [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/)
        ]),
        email: new FormControl("asd@asd.es", [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
        ]),
        password: new FormControl("aaA1!aaaa",  [Validators.required, passwordStrengthValidator()]),
        confirmPassword: new FormControl("aaA1!aaaa",  [Validators.required]),
        termsAccepted : new FormControl("true",  [Validators.required]),
      },
      {
        validators: [this.matchPasswordsValidator()]
      }
  ); 

  constructor( 
     private router: Router, 
     private _authService: AuthService,){    

    effect(() => {       
      let pepe = this._authService.user(); 
      if(pepe.email!="") {
        this.router.navigate(['/home']);   
      }
    },{ allowSignalWrites: true }); 

    effect(() => {       
      this.loading = this._authService.loading(); 
    },{ allowSignalWrites: true }); 

  }

  allowOnlyLetters(event: KeyboardEvent): void {
      const key = event.key;
      const regex = /^[a-zA-Z\s]$/; 
      if (!regex.test(key)) {
        event.preventDefault();
      }
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    if (!control) return false; 
    return control.invalid && (control.touched || control.dirty);
  }

  matchPasswordsValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value; 
      return password === confirm ? null : { notMatching: true };
    };
  }  

  register(){

    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }
 
    const body: RegisterDto = {
      name: this.form.value.name ?? "",
      email: this.form.value.email ?? "",
      password: this.form.value.password ?? "",
    };
 

    this._authService.register(body) 
    // .subscribe(
    //   (response: any) => {   
    //     this.loading = false;
    //      console.log("response__",response)
    //     this.router.navigate(['/home']);     
    //   } 
    // );    
    //      }
  }

  showTerms(){
    console.log("show terms")
  }

  showPolitica(){
  
    let info = `
        <p class='tit'>1.- Introducción y definiciones</p>
        <p>La presente Política de Privacidad resulta de aplicación al uso, por parte del Usuario de los Servicios El País.</p>
        <p>Para el correcto entendimiento de esta Política de Privacidad y las condiciones de los Servicios El País, se realizan las siguientes  definiciones:</p>
        <p>El Usuario será aquella persona física o jurídica que acceda y/o use cualquiera de los Servicios El País por cualquier medio sin necesidad de registrarse.</p>
        <p>Grupo Prisa es el grupo empresarial encabezado por la mercantil PROMOTORA DE INFORMACIONES, S.A., sociedad española, con domicilio social en Madrid, C/ Gran Vía, nº 32 y titular de NIF A-28297059.</p>
        <p>Los Servicios El País, abarcan servicios, productos y acciones promocionales, ya sean gratuitos o de pago, que consisten en el acceso a diferentes informaciones, contenidos no publicitarios y/o publicitarios, comunicaciones comerciales, editoriales y corporativas, programas, aplicaciones, tiendas, sitios web, de ‘e-commerce’, audio y/o vídeo bajo demanda o similares. que El País pone a disposición de los Usuarios en Internet (en adelante, “Servicios El País”).</p>
        <p>Mediante la navegación en este Sitio Web, usted comprende y acepta esta Política de Privacidad como Usuario de cualquiera de los medios o Servicios El País.</p>
        <p>La Política de Privacidad de los Servicios El País es de aplicación a:</p>
        <p>La navegación como Usuario que se realice sobre cualquier página web de El País o aplicación móvil de El País.</p>
        <p>El acceso como Usuario a cualquiera de los contenidos a través de cualquier otro medio o Servicio de El País.</p>
        <p>La navegación que se pueda realizar desde cualquier dispositivo desde el que se permita el acceso a los contenidos o a los Servicios El País, como ordenadores, televisión digital, ‘Smart Tv’s’, PDA, Tabletas, teléfonos móviles, ‘Smartphones’, suscripciones vía RSS o cualquier otro medio de acceso a los contenidos puestos a disposición en internet.</p>
        <p>La navegación y disfrute de los Servicios El País que se realice desde cualquier parte del mundo, ya se trate de Servicios ubicados en el país de acceso o ubicados en otro país.</p>
        <p>Esta Política de Privacidad de los Servicios El País no resultará de aplicación a aquellos Servicios El País que requieran el registro de los Usuarios. Estos Servicios podrán conllevar la recogida de datos adicionales de los Usuarios cuyo tratamiento de datos será regulado en Políticas de Privacidad y condiciones de uso específicas.</p>
        <p class='tit'>2.- Cumplimiento de la normativa vigente</p>
        <p>Los responsables del sitio web, al estar ubicados en España, están sometidos al cumplimiento de la normativa española y europea en materia de protección de datos y servicios de la sociedad de la información.</p>
        <p>Por lo tanto, se garantiza al usuario, en todo momento el íntegro y pleno cumplimiento de las obligaciones dispuestas por la normativa de protección de datos y de servicios de la sociedad de la información, así como por cualquier otra Ley o norma que complemente o sustituya a las anteriores.</p>
        <p class='tit'>3.- Responsables del tratamiento</p>
        <p>Los datos personales recabados a través de los Servicios El País, serán tratados por:</p>
        <p>EDICIONES EL PAÍS, S.L.U., sociedad española con domicilio en la C/ Miguel Yuste, 40 – 28027 de Madrid, con número de N.I.F: B-85635910, inscrita en el Registro Mercantil de Madrid al tomo 26.455, folio 157, sección 8, hoja M-476760, inscripción 1 (en adelante, “El País”) como responsable de los Servicios El País y del tratamiento de datos personales incluidos en el contenido de las noticias.</p>
        <p>PRISA MEDIA, S.A.U. con domicilio en Calle Gran Vía, 32, 28013, Madrid, con número de N.I.F: A88096458 e inscrita en el Registro Mercantil de Madrid en el Tomo 37.338, Folio 200, Sección 8, Hoja M-665815, Inscripción 1ª, entidad que forma parte del Grupo PRISA, como comercializadora de los espacios publicitarios de los Servicios El País.</p>
        <p>Ambas entidades, como sociedades que forman parte del Grupo PRISA, han designado voluntariamente un Delegado de Protección de Datos a través del cual el Usuario podrá plantear consultas, quejas, reclamaciones y sugerencias relativas al tratamiento de sus datos personales, así como ejercer sus derechos. reconocidos en materia de protección de datos. Para ello, el Usuario podrá dirigirse a la siguiente dirección de correo electrónico: dpo@prisa.com.</p>
        <p class='tit'>4.- Finalidades del tratamiento de los datos personales de los Usuarios</p>
        <p>Los datos facilitados por el Usuario de los Servicios El País son utilizados con diversas finalidades que se enumeran a continuación:</p>
        <p>Facilitar al Usuario un acceso a los contenidos de El País.</p>
        <p>Gestionar las incidencias y el mantenimiento de los Servicios El País.</p>
        <p>Facilitar un Servicio personalizado para el Usuario, adecuando dicho Servicio a su perfil personal, geográfico, así como a sus preferencias y gustos.</p>
        <p>Definir tipologías, segmentaciones y perfiles de usuarios, así como prestar, gestionar, administrar, ampliar y mejorar los Servicios y/o contenidos ofrecidos en los Servicios El País, mediante el análisis de la utilización de los Servicios por parte de los Usuarios.</p>
        <p><p>Mostrar información editorial o comercial específicamente diseñada para el perfil inferido en función del uso de los Servicios El País por parte del Usuario, tanto en servicios propios como en servicios de terceros, pertenecientes a cualquiera de los Sectores, con los que El País llegue a acuerdos. Dicho perfil también podrá ser inferido en función de la navegación en otros sitios web de PRISA MEDIA y de la localización geográfica del dispositivo o terminal desde el que se utilizan los Servicios El País.</p>
        <p>Diseñar nuevos servicios que puedan resultar del interés de los Usuarios.</p>
        <p>Los responsables del tratamiento utilizarán los datos que resulten estrictamente necesarios para el cumplimiento de las finalidades anteriormente descritas.</p>
        <p>Algunas de las finalidades enumeradas requerirán de su consentimiento previo. Este consentimiento le será solicitado de manera específica con carácter previo al cumplimiento de las finalidades.</p>
        <p class='tit'>5.- Tipos de datos tratados a través de los Servicios El País</p>
        <p>Los responsables tratarán datos del Usuario recogidos o generados a través del uso de los Servicios El País.</p>
        <p>Para la prestación de los Servicios El País, los responsables del sitio web tratarán la dirección IP desde la que accede a los Servicios El País. Asimismo, se le asignará, de forma unilateral por El País. Estos datos podrán, un código de usuario, por cada dispositivo o navegador que acceda al Sitio web, que podrá ser considerado como dato personal en la medida en que permita identificarle o hacerle identificable.</p>
        <p>De esta forma, ambos responsables podrán vincular a dichos datos la siguiente información:</p>
        <p>Datos de uso y navegación. A efectos estadísticos y publicitarios, de control del uso de nuestras páginas, de control del acceso a servicios de terceros a través de Servicios El País y de mejorar el conocimiento sobre los intereses del Usuario, se recogerán datos de uso y navegación relativos acerca de qué Servicio utiliza el Usuario, cómo lo utiliza, cuándo, qué tipo de Usuario es, o si accede a un anuncio publicitario mostrado en cualquiera de los Servicios El País.</p>
        <p>Intereses y el perfil del Usuario inferidos de la navegación o uso que haga de los Servicios El País, así como información sobre el dispositivo de acceso, el modelo de equipo, la versión del sistema operativo, los identificadores únicos del dispositivo o de la conexión, datos sobre la red móvil, así como fallos, actividad del sistema, ajustes del hardware, tipo de navegador, idioma del navegador, fecha y hora de solicitud de conexión, URL de referencia, cookies y otros dispositivos de almacenamiento y recuperación de datos en equipos terminales (tal y como se explica en la POLÍTICA DE COOKIES), que permiten identificar el navegador y dispositivo del Usuario, así como hacer estudios analíticos y mostrar información personalizada en función del resultado de dichos estudios, tanto en servicios propios como ajenos.</p>
        <p>Los Servicios El País también utilizan tecnologías de identificación y seguimiento de usuarios, como por ejemplo, imágenes diminutas y transparentes insertas en páginas web y aplicaciones. Cuando el Usuario accede a uno de estos contenidos, las imágenes se descargan en su dispositivo y permiten conocer que el Usuario ha accedido al Servicio El País y reconocerle en caso de que acceda de nuevo. Esta información se utiliza para obtener estadísticas, realizar estudios analíticos sobre el uso de sus servicios por parte de los Usuarios, y mostrar información editorial o comercial personalizada en función del resultado de dichos estudios, tanto en servicios propios como ajenos.</p>
        <p>Los Servicios El País también pueden ofrecer enlaces a servicios de terceros que estén marcados mediante un código para que dichos terceros puedan reconocer que ese usuario procede de un Servicio El País.</p>
        <p>Información sobre el territorio desde el que se origina la conexión a los Servicios El País, para personalizar dichos servicios y, en su caso, verificar la disponibilidad de los derechos de audición y/o visualización de determinados contenidos de audio y/o de vídeo.</p>
        <p class='tit'>6.- Datos compartidos con terceros</p>
        <p>Los responsables no cederán los datos personales de los Usuarios a ningún tercero sin una base jurídica que legitime este tratamiento.</p>
        <p>Para la medición del uso de los Servicios, los responsables utilizan proveedores externos que emplean Cookies para realizar estudios analíticos del uso de los Servicios El País. El Usuario podrá consultar la POLÍTICA DE COOKIES en todo momento.</p>
        <p class='tit'>7.- Menores de edad</p>
        <p>Los menores de 14 años no deberán utilizar los Servicios El País sin consentimiento de sus padres o tutores.</p>
        <p>En caso de que los responsables detecten Usuarios que pudieran ser menores de 14 años, se reservan el derecho a validar su edad (mediante cualesquiera medios que resultando adecuados se hubieran implantado en dicho momento, incluso solicitarle una copia de su DNI o documento equivalente,), o, en su caso, recabar la autorización de sus padres o tutores.</p>
        <p class='tit'>8.- Plazo de conservación de los datos de los Usuarios</p>
        <p>Los datos personales del Usuario serán tratados de forma activa mientras ostente la condición de Usuario de los Servicios El País. Si el Usuario deja de ostentar tal condición, los datos serán conservados durante un plazo de 5 años.</p>
        <p>Adicionalmente, el Usuario puede ejercitar, en todo momento, su derecho de supresión. En ese caso, sus datos serán bloqueados y conservados de forma restringida a disposición de las autoridades competentes durante un plazo de 5 años para atender a las posibles responsabilidades nacidas del tratamiento.</p>
        <p class='tit'>9.- Legitimación para el tratamiento de los datos</p>
        <p>Las bases jurídicas que legitiman los tratamientos indicados son el interés legítimo de los responsables del tratamiento o el consentimiento otorgado por el Usuario.</p>
        <p class='tit'>10.- Personas noticiables</p>
        <p>Las noticias publicadas en este sitio web podrán contener datos personales de personas noticiables por ser de relevancia pública, por su notoriedad pública o por circunstancias sobrevenidas en hechos de interés público de los que son protagonistas.</p>
        <p>A través de este apartado, informamos a las personas noticiables sobre el tratamiento de sus datos conforme lo dispuesto en la normativa vigente, que establece que cuando resulte imposible o requiera un esfuerzo desproporcionado informar a los interesados sobre el tratamiento de sus datos se adopten medidas adecuadas para proteger sus derechos, libertades e intereses legítimos, inclusive haciendo publica la información, lo cual se cumple a través de la presente política de privacidad.</p>
        <p>Los datos personales serán obtenidos a través de la investigación y los recursos periodísticos a disposición de este medio de comunicación, consistiendo en los datos pertinentes para la elaboración de dichas noticias. Estas noticias estarán a disposición de todos los lectores y de terceras herramientas tecnológicas tales como buscadores de internet, agregadores de noticias y sistemas de aprendizaje automático, entre otros.</p>
        <p>La base jurídica que legitima el tratamiento de los datos personales de personas noticiables es la necesidad de dar cumplimiento a una misión realizada en interés público así como, eventualmente, el consentimiento del interesado y/o el interés legítimo de los responsables del tratamiento en base a las finalidades expresadas anteriormente.</p>
        <p>Los datos personales se tratarán de forma indefinida en el tiempo.</p>
        <p>Derechos de los Usuarios</p>
        <p>En caso de resultar de aplicación, el Usuario podrá ejercer los derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación, dirigiéndose a os responsables, a través de correo postal al domicilio de los responsables, acreditando suficientemente su identidad y especificando el derecho que desea ejercer. Se recomienda que el usuario facilite toda la información sobre los Servicios El País que utiliza o ha utilizado para poder atender adecuadamente su solicitud.</p>
        <p>El Usuario tendrá derecho a formular una queja o reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) y ante el Delegado de Protección de Datos del Grupo Prisa (dpo@prisa.com).</p>
        <p>© EDICIONES EL PAIS, S.L.U. Miguel Yuste, 40 – 28037 Madrid.</p>`


      const swalWithBootstrapButtons = Swal.mixin({ 
        customClass: {
            confirmButton: "btn btn--success",
             actions: 'center',
             htmlContainer: 'politica',
             container:'politica', 
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        title:'Política de privacidad ',
        icon: 'warning',
         html: info,
        showCancelButton: false,  
        showConfirmButton: true,  
        focusDeny:true,
        focusConfirm: false,
        focusCancel: false,
        cancelButtonText:  'Cerrar',   
        reverseButtons: true, 
      }).then((result:any) => {
        if (result.isConfirmed) { 
//          this._authService.logOut(); 
        }
      }); 
  
  }


}



