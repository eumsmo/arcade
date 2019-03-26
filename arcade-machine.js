class Joystick{
  constructor(selector){
    this.el = document.querySelector(selector);
  }

  removeAll(){
    this.el.classList.remove('to-left','to-right','to-top','to-bottom');
  }

  left(){
    this.removeAll();
    this.el.classList.add('to-left');
  }

  right(){
    this.removeAll();
    this.el.classList.add('to-right');
  }

  top(){
    this.removeAll();
    this.el.classList.add('to-top');
  }

  bottom(){
    this.removeAll();
    this.el.classList.add('to-bottom');
  }

  center(){
    this.removeAll();
  }
}

class Button{
  constructor(el){
    this.that = this;
    this.el = el;
    this.callbacks = {
      press: null,
      unpress: null,
      click: null
    };

    this.el.addEventListener('click',function(){
      if(this.callbacks.click) this.callbacks.click();
    }.bind(this));

    this.el.addEventListener('mousedown',function(){this.press}.bind(this));
    this.el.addEventListener('mouseup',function(){this.unpress}.bind(this));
  }

  press(){
    this.el.classList.add('active');
    if(this.callbacks.press) this.callbacks.press();
  }

  unpress(){
    this.el.classList.remove('active');
    if(this.callbacks.unpress) this.callbacks.unpress();
  }

  get ispressed(){
    return this.el.classList.contains('active');
  }

  set onpress(callback){this.callbacks.press=callback}
  get onpress(){return (this.callbacks.press==null)? null : true}
  set onunpress(callback){this.callbacks.unpress=callback}
  get onunpress(){return (this.callbacks.unpress==null)? null : true}
  set onclick(callback){this.callbacks.click=callback}
  get onclick(){return (this.callbacks.click==null)? null : true}

}

document.addEventListener('keydown',e=>{
  switch (e.key) {
    case "ArrowRight":
      joystick2.right();
      break;
    case "d":
    case "D":
      joystick1.right();
      break;
    case "ArrowLeft":
      joystick2.left();
      break;
    case "a":
    case "A":
      joystick1.left();
      break;
    case "ArrowUp":
      joystick2.top();
      break;
    case "w":
    case "W":
      joystick1.top();
      break;
    case "ArrowDown":
      joystick2.bottom();
      break;
    case "s":
    case "S":
      joystick1.bottom();
      break;
    case "1":
      button1.press();
      break;
    case "2":
      button2.press();
      break;
    case "3":
      button3.press();
      break;
    case "4":
      button4.press();
      break;

  }
});

document.addEventListener('keyup',e=>{
  joystick1.center();
  joystick2.center();
  switch (e.key) {
    case "1":
      button1.unpress();
      break;
    case "2":
      button2.unpress();
      break;
    case "3":
      button3.unpress();
      break;
    case "4":
      button4.unpress();
      break;
  }
});

let joystick1 = new Joystick('#joystick1'),
    joystick2 = new Joystick('#joystick2'),
    buttons = document.querySelectorAll('button'),
    button1 = new Button(buttons[0]),
    button2 = new Button(buttons[1]),
    button3 = new Button(buttons[2]),
    button4 = new Button(buttons[3]);
