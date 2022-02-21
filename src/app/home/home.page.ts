import { Component, Renderer2, ViewChild } from '@angular/core';
import { AnimationController, Animation, Platform, Gesture, GestureController, GestureDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  @ViewChild('blocks') blocks: any;
  @ViewChild('background') background: any;
  @ViewChild('swipeDown') swipeDown: any;
  public options: Array<any> = [    
    { 
      icon: 'log-in', 
      text: "Entrar na fila"
    },
    { 
      icon: 'log-out', 
      text: "Sair da fila"
    },  
    { 
      icon: 'storefront', 
      text: "Serviços"
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
  private gesture: Gesture
  public swiping: boolean = false;

  constructor(private animationCtrl: AnimationController,
    private plataform: Platform, 
    private render: Renderer2,
    private gestureCtrl: GestureController
    ) 
    {
      this.maxTranslate = this.plataform.height() - 180;
    }

    ngAfterViewInit(){   
      this.createAnimation();
      this.detectSwipe();
    }

    detectSwipe() {
      this.gesture = this.gestureCtrl.create(
        {
          el: this.swipeDown.el,
          gestureName: 'swipe-down',
          threshold: 0,
          onMove: ev => this.onMove(ev),
          onEnd: ev => this.onEnd(ev)
        }, true);

        this.gesture.enable(true);
    }

    onMove(ev: GestureDetail) {
        if(!this.swiping){
          this.animation.direction('normal').progressStart(true);
          this.swiping = true;
        }

        const step: number = this.getStep(ev);
        this.animation.progressStep(step);
        this.setBackGroundOapacity(step);
    }

    getStep(ev: GestureDetail): number{
      return (this.initialStep + ev.deltaY) / this.maxTranslate;
    }
    
    onEnd(ev: GestureDetail) {
      if (!this.swiping) return;

      this.gesture.enable(false);
      
      const step: number = this.getStep(ev);
      const shouldComplete: boolean = step > 0.5;

      this.animation.progressEnd(shouldComplete ? 1 : 0, step);

      this.initialStep = shouldComplete ? this.maxTranslate : 0;
      this.setBackGroundOapacity();
      this.swiping = false;

    }

   toggleBlocks() {     
     this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;
     this.gesture.enable(false);
     this.animation.direction(this.initialStep === 0 ? 'reverse': 'normal').play();

     this.setBackGroundOapacity();
   } 

  setBackGroundOapacity(value: number = null) {
    this.render.setStyle(this.background.nativeElement, 'opacity', value ? value: this.initialStep === 0 ? '0' : '1');
  }

  createAnimation() {    
    this.animation = this.animationCtrl.create()
    .addElement(this.blocks.nativeElement)
    .duration(300)
    .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
    .onFinish(() => this.gesture.enable(true));
  }

  fixedBlocks() : boolean {
    return this.swiping || this.initialStep === this.maxTranslate;
  }
}
