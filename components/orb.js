export default class Orb {
  constructor(canvas) {
    this.id = Math.round(Math.random() * 1000000000000);
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.radius = Math.floor(Math.random() * 5) + 1;
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius; 
    this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius; 
    this.dx = (Math.random() * 2.5) + 1;
    this.dx *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    this.dy = (Math.random() * 2.5) + 1;
    this.dy *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
    this.lineOpacity = 0;
    this.orbOpacity = 0;
  }
  getLineColor() {
    this.lineOpacity = (this.lineOpacity <= 0) ? 0 : this.lineOpacity - .025; 
    return `rgba(164, 81, 229, ${this.lineOpacity})`;
  }

  getColor() {
    this.orbOpacity = (this.orbOpacity <= 0) ? 0 : this.orbOpacity - .045; 
    return `rgba(164, 81, 229, ${this.orbOpacity})`;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = this.getColor();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fill();
  }

  connect(x, y) {
    this.context.beginPath();
    //this.context.filter = 'blur(4px)';
    this.context.moveTo(this.x,this.y);
    this.context.lineTo(x, y);
    this.context.strokeStyle = this.getLineColor();
    this.context.stroke();
  }

  animate() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
  }
}
