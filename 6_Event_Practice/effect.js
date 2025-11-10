const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");
    const restartBtn = document.getElementById("restartBtn");
    const effectTitle = document.getElementById("effectTitle");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const grid = document.getElementById("effectsGrid");

    let animationId, particles = [], effectType = null;

    const effects = [
      { name: "Circle Trail", id: "circles", desc: "Draws colorful circles following your mouse." },
      { name: "Particle Burst", id: "particles", desc: "Generates expanding, fading particles." },
      { name: "Gravity + Repel", id: "gravity", desc: "Particles fall and react to your mouse." },
      { name: "Connected Lines", id: "lines", desc: "Particles connect with glowing lines." },
      { name: "Fireflies", id: "firefly", desc: "Glowing orbs float gently around." },
      { name: "Orbit Rings", id: "orbit", desc: "Hypnotic orbiting circles animation." },
      { name: "Snowfall", id: "snow", desc: "Peaceful falling snow effect." },
    ];

    // Populate grid dynamically
    grid.innerHTML = effects
      .map(
        (e) => `
      <div class="effect-card">
        <h2>${e.name}</h2>
        <p>${e.desc}</p>
        <button data-effect="${e.id}">Try Demo</button>
      </div>`
      )
      .join("");

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    document.querySelectorAll(".effect-card button").forEach((btn) => {
      btn.addEventListener("click", () => {
        effectType = btn.dataset.effect;
        grid.style.display = "none";
        overlay.classList.add("active");
        effectTitle.textContent = effects.find((e) => e.id === effectType).name;
        initEffect(effectType);
      });
    });

    closeBtn.onclick = () => stopEffect();
    restartBtn.onclick = () => restartEffect();

    function stopEffect() {
      overlay.classList.remove("active");
      grid.style.display = "grid";
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
      document.onmousemove = null;
      document.onclick = null;
    }

    function restartEffect() {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = [];
      initEffect(effectType);
    }

    // EFFECTS REGISTRY
    function initEffect(type) {
      if (type === "circles") startCircles();
      if (type === "particles") startParticles();
      if (type === "gravity") startGravityRepel();
      if (type === "lines") startLines();
      if (type === "firefly") startFireflies();
      if (type === "orbit") startOrbit();
      if (type === "snow") startSnow();
    }

    // 1️⃣ Circle Trail
    function startCircles() {
      document.onmousemove = (e) => {
        const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      };
    }

    // 2️⃣ Particle Burst
    function startParticles() {
      document.onmousemove = (e) => {
        for (let i = 0; i < 8; i++) {
          particles.push({
            x: e.x, y: e.y,
            size: Math.random() * 8 + 2,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            life: 1,
          });
        }
      };

      function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
          p.x += p.speedX; p.y += p.speedY;
          p.size *= 0.97; p.life -= 0.02;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.fill();
          ctx.globalAlpha = 1;
          if (p.life <= 0 || p.size < 0.5) particles.splice(i, 1);
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // 3️⃣ Gravity + Repel
    function startGravityRepel() {
      const mouse = { x: null, y: null, radius: 100 };
      document.onmousemove = (e) => {
        mouse.x = e.x; mouse.y = e.y;
        for (let i = 0; i < 3; i++) particles.push(new Particle(e.x, e.y));
      };
      document.onclick = (e) => {
        for (let i = 0; i < 60; i++) particles.push(new Particle(e.x, e.y, true));
      };

      class Particle {
        constructor(x, y, explosion = false) {
          this.x = x; this.y = y;
          this.size = Math.random() * 8 + 2;
          const speed = explosion ? Math.random() * 6 : Math.random() * 2;
          this.speedX = (Math.random() - 0.5) * speed * 2;
          this.speedY = (Math.random() - 0.5) * speed * 2;
          this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
          this.life = 1; this.gravity = 0.15;
        }
        update() {
          this.speedY += this.gravity;
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            const repel = force * 3;
            this.speedX += Math.cos(angle) * repel;
            this.speedY += Math.sin(angle) * repel;
          }
          this.x += this.speedX; this.y += this.speedY;
          this.size *= 0.97; this.life -= 0.01;
          if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.speedY *= -0.6;
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
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
          p.update(); p.draw();
          if (p.life <= 0 || p.size < 0.5) particles.splice(i, 1);
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // 4️⃣ Connected Lines
    function startLines() {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 1,
          speedY: (Math.random() - 0.5) * 1,
        });
      }

      function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.speedX; p.y += p.speedY;
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
          ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fillStyle = "#00f5ff"; ctx.fill();
        });

        // connect lines
        for (let a = 0; a < particles.length; a++) {
          for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0,245,255,${1 - dist / 100})`;
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // 5️⃣ Fireflies
    function startFireflies() {
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
        });
      }

      function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.speedX; p.y += p.speedY;
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
          ctx.beginPath();
          const glow = `hsl(${Math.random() * 60 + 50}, 100%, 70%)`;
          ctx.fillStyle = glow;
          ctx.shadowBlur = 20;
          ctx.shadowColor = glow;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // 6️⃣ Orbit Rings
    function startOrbit() {
      let t = 0;
      function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 10; i++) {
          const angle = t + (i * Math.PI) / 5;
          const x = canvas.width / 2 + Math.cos(angle) * 150;
          const y = canvas.height / 2 + Math.sin(angle) * 150;
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${i * 36 + t * 50}, 100%, 60%)`;
          ctx.fill();
        }
        t += 0.02;
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    // 7️⃣ Snowfall
function startSnow() {
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 4 + 1,
            speedY: Math.random() * 1 + 0.5,
            speedX: Math.random() * 0.5 - 0.25,
        });
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        particles.forEach((p) => {
            p.y += p.speedY;
            p.x += p.speedX;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        animationId = requestAnimationFrame(animate);
    }
    animate();
}