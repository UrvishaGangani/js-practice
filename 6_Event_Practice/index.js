// // circle trail effect

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const circles = new Array;

//   // Resize canvas to full screen
//     function resizeCanvas() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     }
//     window.addEventListener("resize", resizeCanvas);
//     resizeCanvas();
    
//  // Function to generate a random color
//     function randomColor() {
//       const r = Math.floor(Math.random() * 256);
//       const g = Math.floor(Math.random() * 256);
//       const b = Math.floor(Math.random() * 256);
//       return `rgb(${r}, ${g}, ${b})`;
// }
    
// canvas.addEventListener("mousemove", function (event) {
//     const x = event.clientX;
//     const y = event.clientY;

//     const radius = Math.random() * 30 + 10;
//     ctx.beginPath();
//     ctx.arc(x, y, radius, 0, Math.PI * 2);
//     ctx.fillStyle = randomColor();
//     ctx.fill();
   
//     setTimeout(() => {
//         ctx.clearRect(x - radius - 2, y - radius - 2, radius * 2 + 4, radius * 2 + 4)
//     }, 1000);
// })


// // Particle effect

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// // Resize canvas to fill window
// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();

// // Particle array
// const particles = [];

// // Random color
// function randomColor() {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   return `rgba(${r}, ${g}, ${b}, 1)`;
// }

// // Particle class
// class Particle {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 8 + 2;
//     this.speedX = (Math.random() - 0.5) * 4;
//     this.speedY = (Math.random() - 0.5) * 4;
//     this.color = randomColor();
//     this.life = 1;
//   }

//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//     this.size *= 0.96; // shrink
//     this.life -= 0.02; // fade out
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fillStyle = this.color;
//     ctx.globalAlpha = this.life;
//     ctx.fill();
//     ctx.globalAlpha = 1;
//   }
// }

// // Mouse event
// canvas.addEventListener("mousemove", (e) => {
//   for (let i = 0; i < 8; i++) {
//     particles.push(new Particle(e.x, e.y));
//   }
// });

// // Animate loop
// function animate() {
//   ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   for (let i = 0; i < particles.length; i++) {
//     const p = particles[i];
//     p.update();
//     p.draw();

//     if (p.life <= 0 || p.size < 0.5) {
//       particles.splice(i, 1);
//       i--;
//     }
//   }

//   requestAnimationFrame(animate);
// }

// animate();

// // galaxy particle effect

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// // Resize canvas to window
// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();

// // Particle container
// const particles = [];

// // Random color
// function randomColor() {
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   return `rgba(${r}, ${g}, ${b}, 1)`;
// }

// // Particle class
// class Particle {
//   constructor(x, y, explosion = false) {
//     this.x = x;
//     this.y = y;
//     this.size = Math.random() * 8 + 2;
//     const speed = explosion ? Math.random() * 8 : Math.random() * 2;
//     this.speedX = (Math.random() - 0.5) * speed * 2;
//     this.speedY = (Math.random() - 0.5) * speed * 2;
//     this.color = randomColor();
//     this.life = 1;
//   }

//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//     this.size *= 0.96; // shrink
//     this.life -= 0.02; // fade
//   }

//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fillStyle = this.color;
//     ctx.globalAlpha = this.life;
//     ctx.fill();
//     ctx.globalAlpha = 1;
//   }
// }

// // Mouse move = trailing particles
// canvas.addEventListener("mousemove", (e) => {
//   for (let i = 0; i < 5; i++) {
//     particles.push(new Particle(e.x, e.y));
//   }
// });

// // Mouse click = explosion
// canvas.addEventListener("click", (e) => {
//   for (let i = 0; i < 50; i++) {
//     particles.push(new Particle(e.x, e.y, true));
//   }
// });

// // Animation loop
// function animate() {
//   // Fade background for trail effect
//   ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);

//   for (let i = 0; i < particles.length; i++) {
//     const p = particles[i];
//     p.update();
//     p.draw();

//     if (p.life <= 0 || p.size < 0.5) {
//       particles.splice(i, 1);
//       i--;
//     }
//   }

//   requestAnimationFrame(animate);
// }

// animate();


    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Resize canvas
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = [];
    const mouse = { x: null, y: null, radius: 100 };

    // Track mouse position
    canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
      // small trail
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.x, e.y));
      }
    });

    canvas.addEventListener("click", (e) => {
      for (let i = 0; i < 60; i++) {
        particles.push(new Particle(e.x, e.y, true));
      }
    });

    function randomColor() {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }

    class Particle {
      constructor(x, y, explosion = false) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 8 + 2;
        const speed = explosion ? Math.random() * 6 : Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * speed * 2;
        this.speedY = (Math.random() - 0.5) * speed * 2;
        this.color = randomColor();
        this.life = 1;
        this.gravity = 0.15;
      }

      update() {
        // Gravity
        this.speedY += this.gravity;

        // Repel effect
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - dist) / mouse.radius;
          const repel = force * 3; // push strength
          this.speedX += Math.cos(angle) * repel;
          this.speedY += Math.sin(angle) * repel;
        }

        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.97;
        this.life -= 0.01;

        // Bounce off edges
        if (this.y + this.size > canvas.height) {
          this.y = canvas.height - this.size;
          this.speedY *= -0.6; // bounce
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX *= -1;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0 || p.size < 0.5) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    animate();