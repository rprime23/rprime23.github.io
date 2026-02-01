(() => {
  const WHEELS = {
    "martial-arts": [
      "Brazilian Jiu-Jitsu (BJJ)",
      "Karate",
      "Taekwondo",
      "Muay Thai",
      "Boxing",
      "Kickboxing"
    ],
    "soccer": ["Forward", "Goalkeeper", "Midfielder", "Defender"],
    "mass-effect": [
      "I'm gonna take your head and mount it in the Normandy's CIC! Then I'm gonna mount her head next to yours! Then I'm gonna take both of your heads and space them out the airlock!",
      "Emergency induction port.",
      "You big, STUPID jellyfish.",
      "Amusing. Asari has finally mastered writing.",
      "Careful there goes the next Shadow Broker.",
      "It's a taxi, Shepard. It has a fare meter.",
      "Nobody alive, maybe--but technically, I died."
    ],
    "lego": ["3in1", "Formula 1", "City Style", "Race Cars"],
    "yosemite": ["Mist Trail", "Half Dome Trail", "Valley Loop", "Mariposa Grove Trail", "Mirror Lake"]
  };

  const normAngle = (a) => ((a % (Math.PI * 2)) + (Math.PI * 2)) % (Math.PI * 2);

  const shortLabel = (s, max = 18) => {
    const clean = String(s).replace(/^"+|"+$/g, "");
    return clean.length > max ? clean.slice(0, max - 1) + "…" : clean;
  };

  // Bright evenly-spaced colors
  function sliceColor(i, n) {
    const hue = Math.round((360 / n) * i);
    return `hsl(${hue} 85% 55%)`;
  }

  function equalizeWheelCardHeights() {
    const cards = Array.from(document.querySelectorAll(".wheel-section"));
    if (!cards.length) return;

    // reset first so measurement is accurate
    cards.forEach(c => (c.style.minHeight = ""));

    const maxH = Math.max(...cards.map(c => c.getBoundingClientRect().height));
    cards.forEach(c => (c.style.minHeight = `${Math.ceil(maxH)}px`));
  }

  function makeWheel(section) {
    const canvas = section.querySelector("canvas.spin-wheel");
    const centerBtn = section.querySelector(".wheel-center-btn");
    const resultEl = section.querySelector(".wheel-result-text");
    if (!canvas || !centerBtn || !resultEl) return;

    const key = canvas.dataset.wheel;
    const items = WHEELS[key];
    if (!items || items.length < 2) return;

    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const r = size / 2;
    const wedge = (Math.PI * 2) / items.length;

    let angle = 0;
    let spinning = false;

    function draw(a = angle) {
      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(r, r);
      ctx.rotate(a);

      for (let i = 0; i < items.length; i++) {
        const start = i * wedge;
        const end = (i + 1) * wedge;

        // slice
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, r - 6, start, end);
        ctx.closePath();

        ctx.fillStyle = sliceColor(i, items.length);
        ctx.fill();

        ctx.strokeStyle = "rgba(255,255,255,0.92)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // label
        ctx.save();
        ctx.rotate(start + wedge / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px Roboto, system-ui, sans-serif";

        // subtle shadow for readability (this is canvas text, not image shadow)
        ctx.shadowColor = "rgba(0,0,0,0.35)";
        ctx.shadowBlur = 6;

        ctx.fillText(shortLabel(items[i]), r - 18, 5);
        ctx.restore();
      }

      // center hub ring
      ctx.beginPath();
      ctx.arc(0, 0, 44, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, 36, 0, Math.PI * 2);
      ctx.fillStyle = "#3b6eef";
      ctx.fill();

      ctx.restore();
    }

    // FIX: compute which slice is under the pointer at the top (12 o'clock)
    function pick(finalAngle) {
      // pointer is at -90deg (top). Wheel rotated by finalAngle.
      const pointerInWheelCoords = normAngle((-Math.PI / 2) - finalAngle);
      const index = Math.floor(pointerInWheelCoords / wedge);
      return items[index];
    }

    function spin() {
      if (spinning) return;
      spinning = true;
      centerBtn.disabled = true;

      const startAngle = angle;

      // more spins + randomness looks natural
      const spins = 7 + Math.random() * 5; // 7–12
      const extra = Math.random() * wedge; // land within a slice
      const targetAngle = startAngle + spins * Math.PI * 2 + extra;

      const start = performance.now();
      const dur = 3000; // smooth + natural

      // natural ease-out
      const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

      function tick(now) {
        const t = Math.min(1, (now - start) / dur);
        const eased = easeOutQuint(t);

        angle = startAngle + (targetAngle - startAngle) * eased;
        draw(angle);

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          angle = targetAngle;
          draw(angle);

          // update result immediately (no delay)
          resultEl.textContent = String(pick(angle)).replace(/^"+|"+$/g, "");

          spinning = false;
          centerBtn.disabled = false;

          // result text might change height slightly (but we reserve space)
          // still re-equalize to keep everything perfect
          equalizeWheelCardHeights();
        }
      }

      requestAnimationFrame(tick);
    }

    draw();
    centerBtn.addEventListener("click", spin);
  }

  // init all wheels
  document.querySelectorAll(".wheel-section").forEach(makeWheel);

  // equalize heights after load + after resize
  window.addEventListener("load", () => {
    // small delay helps if fonts load slightly after layout
    setTimeout(equalizeWheelCardHeights, 50);
  });

  window.addEventListener("resize", () => {
    clearTimeout(window.__wheelEQ);
    window.__wheelEQ = setTimeout(equalizeWheelCardHeights, 100);
  });
})();
