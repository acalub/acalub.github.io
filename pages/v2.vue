<template>
  <div>
    <canvas id="v2" @click="clicked"></canvas>
  </div>
</template>

<script>
import Orb from '@/components/orb';

export default {
  data() {
    return {
      size: 50,
      counter: 0,
      expired: false,
      orbs: [],
      orbsHash: {},
      canvas: null,

      edges: {}
    }
  },
  mounted () {
    this.canvas = window.document.getElementById('v2');
    const width = window.innerWidth;
    this.canvas.width = width;
    let x = width % this.size;
    const numx = (width - x) / this.size;
    const height = window.innerHeight;
    this.canvas.height = height;
    let y = height % this.size;
    const numy = (height - y) / this.size;
    const context = this.canvas.getContext('2d');
    for(let n = 0; n < numy; n++) {
      for(let i = 0; i < numx; i++) {
        context.moveTo(x, y);
        context.beginPath();
        context.rect(x, y, this.size, this.size);
        context.fillStyle = this.getColor();
        context.fill();
        x += this.size;
      }
      x = height % this.size; 
      y += this.size;
    }
    //this.update();
  },
  methods: {
    clicked(e) {
     console.log('clicked x,y', e.clientX, e.clientY); 
    },
    getColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const a = Math.floor(Math.random() * 50)/100;
      const color = `rgba(${r}, ${g}, ${b}, ${a})`; 
      return color;
    },
    update() {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
      for(let i = 0; i < this.orbs.length; i++) {
        let orb1 = this.orbs[i];
        for(let n = 0; n < this.orbs.length; n++) {
          let orb2 = this.orbs[n]; 
          if (orb2.id !== orb1.id ) {
            //check for collision
            let dx = orb1.x - orb2.x;
            let dy = orb1.y - orb2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < orb1.radius + orb2.radius) {
              if( !this.edges[orb1.id] ) {
                this.edges[orb1.id] = [];
              }
              if ( this.edges[orb1.id].length > 3 ) {
                this.edges[orb1.id].shift();
              }
              this.edges[orb1.id].push(orb2);
              orb1.orbOpacity = 1;
              orb1.lineOpacity = 1;
              orb2.orbOpacity = 1;
            }
          }
        }
        orb1.animate();
        if (this.edges[orb1.id]) {
          this.edges[orb1.id].forEach((orb) => {
            orb1.connect(orb.x, orb.y);
          });
        }
      }
      if (!this.expired) {
        window.requestAnimationFrame(this.update);
      }
    }
  }
}
</script>
<style lang="scss">
  .name-plate {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 100;
    justify-content: center;
    align-items: center;
    & > div.r {

      width: 45%;
      height: 30%;
      background-image: url('/images/roku.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position:center center;
    }
  }

  canvas {
    background-image: radial-gradient(#542975, #20102D);
  }
</style>
