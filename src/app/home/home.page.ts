import { Component, Renderer2, ViewChild } from '@angular/core';
import { AnimationController, Animation, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  @ViewChild('blocks') blocks: any;
  @ViewChild('background') background: any;
  public options: Array<any> = [
    { 
      icon: 'people', 
      text: "Filas"
    },
    { 
      icon: 'log-in', 
      text: "Entrar na fila"
    },
    { 
      icon: 'storefront', 
      text: "Serviços"
    }
    ,
    { 
      icon: 'chatbubbles', 
      text: "Chat"
    },
    { 
      icon: 'log-out', 
      text: "Sair da fila"
    }   
  ]

  public slideOptions: any = 
  { 
    slidesPerView: 2.5, 
    freeMode: true
  };
  
  public items: Array<any> = [
    { 
      icon: 'people', 
      text: "Perfil"
    },
    { 
      icon: 'log-in', 
      text: "Configurações"
    },
    { 
      icon: 'chatbubbles', 
      text: "Me ajuda"
    }
  ]

  public initialStep: number = 0;
  private maxTranslate:  number;
  private animation: Animation;

  constructor(private animationCtrl: AnimationController,
    private plataform: Platform, 
    private render: Renderer2
    ) 
    {
      this.maxTranslate = this.plataform.height() - 100;
    }

    ngAfterViewInit(){   
      this.createAnimation();
    }

   toggleBlocks() {     
     this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;
     this.animation.direction(this.initialStep === 0 ? 'reverse': 'normal').play();

     this.setBackGroundOapacity();
   } 

  setBackGroundOapacity() {
    this.render.setStyle(this.background.nativeElement, 'opacity', this.initialStep === 0 ? '0' : '1');
  }

  createAnimation() {    
    this.animation = this.animationCtrl.create()
    .addElement(this.blocks.nativeElement)
    .duration(300)
    .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
  }
}
