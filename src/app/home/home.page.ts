import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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


  constructor() {}

}
