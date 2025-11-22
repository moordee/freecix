// Avatar State
let avatarState = {
  gender: "neutral",
  style: "realistic",
  skinColor: "#f4c2a6",
  faceWidth: 80,
  faceHeight: 100,
  eyeColor: "#654321",
  eyeSize: 20,
  eyeShape: "normal",
  hairColor: "#4a3728",
  hairStyle: "short",
  headCoveringType: "none",
  headCoveringColor: "#8b4789",
  faceMaskType: "none",
  faceMaskColor: "#ffffff",
  animalMaskType: "none",
  glassesType: "none",
  mouthExpression: "smile",
  clothingColor: "#3498db",
  clothingStyle: "tshirt",
  bgColor: "#e0e0e0",
  beardStyle: "none",
  moustacheStyle: "none",
  facialHairColor: "#4a3728",
  molePosition: "none",
  moleSize: 4,
  bindiStyle: "none",
  bindiColor: "#dc143c",
  kohlStyle: "none",
};

// History for undo/redo
let history = [JSON.parse(JSON.stringify(avatarState))];
let historyIndex = 0;

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeControls();
  updateGenderButtonText();
  updateAvatar();
});

// Initialize all controls
function initializeControls() {
  // Style buttons
  document.querySelectorAll(".style-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".style-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      avatarState.style = btn.dataset.style;
      saveState();
      updateAvatar();
    });
  });

  // Facial Hair
  document.getElementById("beard-style").addEventListener("change", (e) => {
    avatarState.beardStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("moustache-style").addEventListener("change", (e) => {
    avatarState.moustacheStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("facialhair-color").addEventListener("input", (e) => {
    avatarState.facialHairColor = e.target.value;
    saveState();
    updateAvatar();
  });

  // Mole
  document.getElementById("mole-position").addEventListener("change", (e) => {
    avatarState.molePosition = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("mole-size").addEventListener("input", (e) => {
    avatarState.moleSize = parseInt(e.target.value);
    saveState();
    updateAvatar();
  });

  // Bindi
  document.getElementById("bindi-style").addEventListener("change", (e) => {
    avatarState.bindiStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("bindi-color").addEventListener("input", (e) => {
    avatarState.bindiColor = e.target.value;
    saveState();
    updateAvatar();
  });

  // Kohl
  document.getElementById("kohl-style").addEventListener("change", (e) => {
    avatarState.kohlStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  // Control buttons
  document.getElementById("gender-btn").addEventListener("click", () => {
    toggleGender();
    updateGenderButtonText();
  });
  document
    .getElementById("random-btn")
    .addEventListener("click", randomizeAvatar);
  document.getElementById("undo-btn").addEventListener("click", undo);
  document.getElementById("redo-btn").addEventListener("click", redo);
  document.getElementById("reset-btn").addEventListener("click", reset);
  document
    .getElementById("download-btn")
    .addEventListener("click", openDownloadModal);

  // Customization controls
  document.getElementById("skin-color").addEventListener("input", (e) => {
    avatarState.skinColor = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("face-width").addEventListener("input", (e) => {
    avatarState.faceWidth = parseInt(e.target.value);
    saveState();
    updateAvatar();
  });

  document.getElementById("face-height").addEventListener("input", (e) => {
    avatarState.faceHeight = parseInt(e.target.value);
    saveState();
    updateAvatar();
  });

  document.getElementById("eye-color").addEventListener("input", (e) => {
    avatarState.eyeColor = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("eye-size").addEventListener("input", (e) => {
    avatarState.eyeSize = parseInt(e.target.value);
    saveState();
    updateAvatar();
  });

  document.getElementById("eye-shape").addEventListener("change", (e) => {
    avatarState.eyeShape = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("hair-color").addEventListener("input", (e) => {
    avatarState.hairColor = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("hair-style").addEventListener("change", (e) => {
    avatarState.hairStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  document
    .getElementById("headcovering-type")
    .addEventListener("change", (e) => {
      avatarState.headCoveringType = e.target.value;
      saveState();
      updateAvatar();
    });

  document
    .getElementById("headcovering-color")
    .addEventListener("input", (e) => {
      avatarState.headCoveringColor = e.target.value;
      saveState();
      updateAvatar();
    });

  document.getElementById("facemask-type").addEventListener("change", (e) => {
    avatarState.faceMaskType = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("facemask-color").addEventListener("input", (e) => {
    avatarState.faceMaskColor = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("animalmask-type").addEventListener("change", (e) => {
    avatarState.animalMaskType = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("glasses-type").addEventListener("change", (e) => {
    avatarState.glassesType = e.target.value;
    saveState();
    updateAvatar();
  });

  document
    .getElementById("mouth-expression")
    .addEventListener("change", (e) => {
      avatarState.mouthExpression = e.target.value;
      saveState();
      updateAvatar();
    });

  document.getElementById("clothing-color").addEventListener("input", (e) => {
    avatarState.clothingColor = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("clothing-style").addEventListener("change", (e) => {
    avatarState.clothingStyle = e.target.value;
    saveState();
    updateAvatar();
  });

  document.getElementById("bg-color").addEventListener("input", (e) => {
    avatarState.bgColor = e.target.value;
    saveState();
    updateAvatar();
  });

  // Download modal
  document
    .querySelector(".close")
    .addEventListener("click", closeDownloadModal);
  window.addEventListener("click", (e) => {
    if (e.target.id === "download-modal") {
      closeDownloadModal();
    }
  });

  document.querySelectorAll(".download-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      const format = btn.dataset.format;
      const size = btn.dataset.size;
      downloadAvatar(format, size);
    });
  });
}

function updateGenderButtonText() {
  const btn = document.getElementById("gender-btn");
  if (avatarState.gender === "male") {
    btn.textContent = "👨 Male";
  } else if (avatarState.gender === "female") {
    btn.textContent = "👩 Female";
  } else {
    btn.textContent = "👤 Neutral";
  }
}

// Update avatar based on current state
function updateAvatar() {
  const svg = document.getElementById("avatar-svg");

  // Background
  document
    .getElementById("background")
    .setAttribute("fill", avatarState.bgColor);

  // Face
  const head = document.getElementById("head");
  head.setAttribute("rx", avatarState.faceWidth);
  head.setAttribute("ry", avatarState.faceHeight);
  head.setAttribute("fill", avatarState.skinColor);

  // Ears
  document
    .getElementById("ear-left")
    .setAttribute("fill", avatarState.skinColor);
  document
    .getElementById("ear-right")
    .setAttribute("fill", avatarState.skinColor);

  // Eyes
  updateEyes();

  // Hair
  updateHair();

  // Head covering
  updateHeadCovering();

  // Face mask
  updateFaceMask();

  // Animal mask
  updateAnimalMask();

  // Glasses
  updateGlasses();

  // Mouth
  updateMouth();

  // Clothing
  updateClothing();

  // Style
  applyStyle();

  // Facial Hair
  updateFacialHair();

  // Mole
  updateMole();

  // Bindi
  updateBindi();

  // Kohl
  updateKohl();

  // Gender features
  updateGenderFeatures();
}

function updateEyes() {
  const eyeLeftWhite = document.getElementById("eye-left-white");
  const eyeRightWhite = document.getElementById("eye-right-white");
  const eyeLeft = document.getElementById("eye-left");
  const eyeRight = document.getElementById("eye-right");

  eyeLeftWhite.setAttribute("rx", avatarState.eyeSize);
  eyeRightWhite.setAttribute("rx", avatarState.eyeSize);

  if (avatarState.eyeShape === "round") {
    eyeLeftWhite.setAttribute("ry", avatarState.eyeSize);
    eyeRightWhite.setAttribute("ry", avatarState.eyeSize);
  } else if (avatarState.eyeShape === "almond") {
    eyeLeftWhite.setAttribute("ry", avatarState.eyeSize * 1.2);
    eyeRightWhite.setAttribute("ry", avatarState.eyeSize * 1.2);
  } else {
    eyeLeftWhite.setAttribute("ry", avatarState.eyeSize * 1.25);
    eyeRightWhite.setAttribute("ry", avatarState.eyeSize * 1.25);
  }

  eyeLeft.setAttribute("fill", avatarState.eyeColor);
  eyeRight.setAttribute("fill", avatarState.eyeColor);
}

function updateHair() {
  const hairBack = document.getElementById("hair-back");
  const hairFront = document.getElementById("hair-front");
  const hairBackGroup = document.getElementById("hair-back-group");
  const hairFrontGroup = document.getElementById("hair-front-group");

  if (avatarState.hairStyle === "bald") {
    hairBackGroup.style.display = "none";
    hairFrontGroup.style.display = "none";
  } else {
    hairBackGroup.style.display = "block";
    hairFrontGroup.style.display = "block";
    hairBack.setAttribute("fill", avatarState.hairColor);
    hairFront.setAttribute("fill", avatarState.hairColor);

    if (avatarState.hairStyle === "long") {
      hairBack.setAttribute("ry", "80");
      hairFront.setAttribute(
        "d",
        "M120,140 Q115,120 130,110 Q150,100 170,105 Q190,95 210,105 Q230,100 250,110 Q265,120 260,140 L260,160"
      );
    } else if (avatarState.hairStyle === "curly") {
      hairBack.setAttribute("ry", "70");
      hairFront.setAttribute(
        "d",
        "M120,140 Q115,115 135,105 Q145,130 160,110 Q175,130 190,105 Q205,130 220,110 Q235,130 250,105 Q270,115 265,140"
      );
    } else {
      hairBack.setAttribute("ry", "60");
      hairFront.setAttribute(
        "d",
        "M120,140 Q115,120 130,110 Q150,100 170,105 Q190,95 210,105 Q230,100 250,110 Q265,120 260,140"
      );
    }
  }
}

function updateHeadCovering() {
  const headCoveringGroup = document.getElementById("headcovering-group");
  const headCovering = document.getElementById("headcovering");
  const hairBackGroup = document.getElementById("hair-back-group");
  const hairFrontGroup = document.getElementById("hair-front-group");

  if (avatarState.headCoveringType === "none") {
    headCoveringGroup.style.display = "none";
  } else {
    headCoveringGroup.style.display = "block";
    headCovering.setAttribute("fill", avatarState.headCoveringColor);

    // Hide hair when wearing head covering
    hairBackGroup.style.display = "none";
    hairFrontGroup.style.display = "none";

    if (avatarState.headCoveringType === "hijab") {
      headCovering.setAttribute(
        "d",
        "M115,120 Q115,80 200,80 Q285,80 285,120 L285,180 Q285,200 270,210 Q200,150 130,210 Q115,200 115,180 Z"
      );
    } else if (avatarState.headCoveringType === "turban") {
      headCovering.setAttribute(
        "d",
        "M120,110 Q115,90 140,85 Q160,80 180,85 Q200,80 220,85 Q240,80 260,85 Q285,90 280,110 L280,160 Q280,180 260,180 L140,180 Q120,180 120,160 Z"
      );
    } else if (avatarState.headCoveringType === "bandana") {
      headCovering.setAttribute(
        "d",
        "M125,130 Q120,110 140,105 Q160,100 180,105 Q200,100 220,105 Q240,100 260,105 Q280,110 275,130 L275,150 Q270,155 260,150 Q200,140 140,150 Q130,155 125,150 Z"
      );
    }
  }
}

function updateFaceMask() {
  const faceMaskGroup = document.getElementById("facemask-group");
  const faceMask = document.getElementById("facemask");
  const mouthGroup = document.getElementById("mouth-group");

  if (avatarState.faceMaskType === "none") {
    faceMaskGroup.style.display = "none";
    mouthGroup.style.display = "block";
  } else {
    faceMaskGroup.style.display = "block";
    mouthGroup.style.display = "none";
    faceMask.setAttribute("fill", avatarState.faceMaskColor);

    if (avatarState.faceMaskType === "surgical") {
      faceMask.setAttribute(
        "d",
        "M140,210 L260,210 L260,260 Q250,270 200,270 Q150,270 140,260 Z"
      );
    } else if (avatarState.faceMaskType === "cloth") {
      faceMask.setAttribute(
        "d",
        "M135,205 L265,205 L265,265 Q255,275 200,275 Q145,275 135,265 Z"
      );
    } else if (avatarState.faceMaskType === "n95") {
      faceMask.setAttribute(
        "d",
        "M145,215 L255,215 Q260,240 255,265 Q230,275 200,275 Q170,275 145,265 Q140,240 145,215 Z"
      );
    }
  }
}

function updateAnimalMask() {
  const animalMaskGroup = document.getElementById("animalmask-group");
  const animalMask = document.getElementById("animal-mask");
  const eyesGroup = document.getElementById("eyes-group");
  const mouthGroup = document.getElementById("mouth-group");
  const noseElement = document.getElementById("nose");

  if (avatarState.animalMaskType === "none") {
    animalMaskGroup.style.display = "none";
    eyesGroup.style.display = "block";
    mouthGroup.style.display =
      avatarState.faceMaskType === "none" ? "block" : "none";
    noseElement.style.display = "block";
  } else {
    animalMaskGroup.style.display = "block";
    eyesGroup.style.display = "none";
    mouthGroup.style.display = "none";
    noseElement.style.display = "none";

    // Clear previous content
    animalMaskGroup.innerHTML = "";

    if (avatarState.animalMaskType === "cat") {
      animalMaskGroup.innerHTML = `
                <ellipse cx="200" cy="200" rx="90" ry="85" fill="#ffa500"/>
                <ellipse cx="170" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="230" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="170" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="230" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="200" cy="220" rx="15" ry="12" fill="#333"/>
                <path d="M200,232 L190,245 M200,232 L210,245" stroke="#333" stroke-width="2"/>
                <path d="M185,250 Q200,258 215,250" stroke="#333" stroke-width="2" fill="none"/>
                <path d="M110,150 L130,160 L125,180 Z" fill="#ffa500"/>
                <path d="M290,150 L270,160 L275,180 Z" fill="#ffa500"/>
            `;
    } else if (avatarState.animalMaskType === "dog") {
      animalMaskGroup.innerHTML = `
                <ellipse cx="200" cy="200" rx="90" ry="85" fill="#8b5a3c"/>
                <ellipse cx="170" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="230" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="170" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="230" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="200" cy="225" rx="18" ry="15" fill="#333"/>
                <path d="M200,240 L180,255 M200,240 L220,255" stroke="#333" stroke-width="2"/>
                <path d="M182,260 Q200,270 218,260" stroke="#333" stroke-width="2" fill="none"/>
                <ellipse cx="130" cy="180" rx="20" ry="35" fill="#8b5a3c"/>
                <ellipse cx="270" cy="180" rx="20" ry="35" fill="#8b5a3c"/>
            `;
    } else if (avatarState.animalMaskType === "bunny") {
      animalMaskGroup.innerHTML = `
                <ellipse cx="200" cy="200" rx="90" ry="85" fill="#f0f0f0"/>
                <ellipse cx="170" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="230" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="170" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="230" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="200" cy="220" rx="8" ry="10" fill="#ffc0cb"/>
                <path d="M200,230 L195,240 M200,230 L205,240" stroke="#333" stroke-width="2"/>
                <path d="M192,242 L200,245 L208,242" stroke="#333" stroke-width="2" fill="none"/>
                <ellipse cx="150" cy="130" rx="15" ry="50" fill="#f0f0f0"/>
                <ellipse cx="250" cy="130" rx="15" ry="50" fill="#f0f0f0"/>
                <ellipse cx="150" cy="130" rx="10" ry="40" fill="#ffc0cb"/>
                <ellipse cx="250" cy="130" rx="10" ry="40" fill="#ffc0cb"/>
            `;
    } else if (avatarState.animalMaskType === "fox") {
      animalMaskGroup.innerHTML = `
                <ellipse cx="200" cy="200" rx="90" ry="85" fill="#ff6347"/>
                <ellipse cx="200" cy="220" rx="70" ry="60" fill="white"/>
                <ellipse cx="170" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="230" cy="190" rx="25" ry="30" fill="white"/>
                <ellipse cx="170" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="230" cy="195" rx="12" ry="15" fill="black"/>
                <ellipse cx="200" cy="225" rx="12" ry="10" fill="#333"/>
                <path d="M200,235 L190,245 M200,235 L210,245" stroke="#333" stroke-width="2"/>
                <path d="M185,250 Q200,258 215,250" stroke="#333" stroke-width="2" fill="none"/>
                <path d="M120,150 L140,170 L130,180 Z" fill="#ff6347"/>
                <path d="M280,150 L260,170 L270,180 Z" fill="#ff6347"/>
            `;
    } else if (avatarState.animalMaskType === "panda") {
      animalMaskGroup.innerHTML = `
                <ellipse cx="200" cy="200" rx="90" ry="85" fill="white"/>
                <ellipse cx="150" cy="180" rx="35" ry="40" fill="black"/>
                <ellipse cx="250" cy="180" rx="35" ry="40" fill="black"/>
                <ellipse cx="170" cy="190" rx="20" ry="25" fill="white"/>
                <ellipse cx="230" cy="190" rx="20" ry="25" fill="white"/>
                <ellipse cx="170" cy="195" rx="10" ry="12" fill="black"/>
                <ellipse cx="230" cy="195" rx="10" ry="12" fill="black"/>
                <ellipse cx="200" cy="225" rx="15" ry="12" fill="#333"/>
                <path d="M200,237 L185,250 M200,237 L215,250" stroke="#333" stroke-width="2"/>
                <path d="M182,255 Q200,263 218,255" stroke="#333" stroke-width="2" fill="none"/>
            `;
    }
  }
}

function updateGlasses() {
  const glassesGroup = document.getElementById("glasses-group");

  if (avatarState.glassesType === "none") {
    glassesGroup.style.display = "none";
  } else {
    glassesGroup.style.display = "block";

    if (avatarState.glassesType === "sunglasses") {
      glassesGroup.innerHTML = `
                <rect x="150" y="180" width="40" height="35" fill="#333" stroke="#333" stroke-width="3" rx="5"/>
                <rect x="210" y="180" width="40" height="35" fill="#333" stroke="#333" stroke-width="3" rx="5"/>
                <line x1="190" y1="197" x2="210" y2="197" stroke="#333" stroke-width="3"/>
            `;
    } else if (avatarState.glassesType === "round") {
      glassesGroup.innerHTML = `
                <circle cx="170" cy="197" r="20" fill="none" stroke="#333" stroke-width="3"/>
                <circle cx="230" cy="197" r="20" fill="none" stroke="#333" stroke-width="3"/>
                <line x1="190" y1="197" x2="210" y2="197" stroke="#333" stroke-width="3"/>
            `;
    } else {
      glassesGroup.innerHTML = `
                <rect x="150" y="180" width="40" height="35" fill="none" stroke="#333" stroke-width="3" rx="5"/>
                <rect x="210" y="180" width="40" height="35" fill="none" stroke="#333" stroke-width="3" rx="5"/>
                <line x1="190" y1="197" x2="210" y2="197" stroke="#333" stroke-width="3"/>
            `;
    }
  }
}

function updateMouth() {
  const mouth = document.getElementById("mouth");

  if (avatarState.mouthExpression === "smile") {
    mouth.setAttribute("d", "M180,250 Q200,260 220,250");
  } else if (avatarState.mouthExpression === "neutral") {
    mouth.setAttribute("d", "M180,250 L220,250");
  } else if (avatarState.mouthExpression === "sad") {
    mouth.setAttribute("d", "M180,260 Q200,250 220,260");
  } else if (avatarState.mouthExpression === "laugh") {
    mouth.setAttribute("d", "M180,245 Q200,265 220,245 Q200,255 180,245");
    mouth.setAttribute("fill", "#d4756b");
  }
}

function updateClothing() {
  const clothing = document.getElementById("clothing");
  clothing.setAttribute("fill", avatarState.clothingColor);

  if (avatarState.clothingStyle === "hoodie") {
    clothing.setAttribute(
      "d",
      "M100,350 Q100,300 120,280 L140,350 Z M280,350 L300,280 Q320,300 320,350 Z M140,350 L280,350 L280,400 L140,400 Z M180,280 Q190,270 200,270 Q210,270 220,280"
    );
  } else if (avatarState.clothingStyle === "formal") {
    clothing.setAttribute(
      "d",
      "M100,350 Q100,300 120,280 L140,350 Z M280,350 L300,280 Q320,300 320,350 Z M140,350 L200,320 L260,350 L280,350 L280,400 L140,400 Z"
    );
  } else {
    clothing.setAttribute(
      "d",
      "M100,350 Q100,300 120,280 L140,350 Z M280,350 L300,280 Q320,300 320,350 Z M140,350 L280,350 L280,400 L140,400 Z"
    );
  }
}

function updateFacialHair() {
  const beardGroup = document.getElementById("beard-group");
  const beard = document.getElementById("beard");
  const moustacheGroup = document.getElementById("moustache-group");
  const moustache = document.getElementById("moustache");

  // Update Beard
  if (avatarState.beardStyle === "none") {
    beardGroup.style.display = "none";
  } else {
    beardGroup.style.display = "block";
    beard.setAttribute("fill", avatarState.facialHairColor);

    if (avatarState.beardStyle === "full") {
      beard.setAttribute(
        "d",
        "M130,220 Q125,260 140,285 L260,285 Q275,260 270,220 Q260,240 240,250 Q220,260 200,260 Q180,260 160,250 Q140,240 130,220"
      );
    } else if (avatarState.beardStyle === "goatee") {
      beard.setAttribute(
        "d",
        "M180,250 Q180,270 190,280 L210,280 Q220,270 220,250 Q210,260 200,262 Q190,260 180,250"
      );
    } else if (avatarState.beardStyle === "stubble") {
      beard.setAttribute(
        "d",
        "M140,240 Q140,265 160,275 Q180,280 200,280 Q220,280 240,275 Q260,265 260,240"
      );
      beard.setAttribute("opacity", "0.3");
    } else if (avatarState.beardStyle === "chinstrap") {
      beard.setAttribute(
        "d",
        "M135,210 Q130,240 135,260 L140,260 Q135,240 140,210 M260,210 Q265,240 260,260 L265,260 Q270,240 265,210 M135,260 Q150,270 165,275 M235,275 Q250,270 265,260"
      );
    }
  }

  // Update Moustache
  if (avatarState.moustacheStyle === "none") {
    moustacheGroup.style.display = "none";
  } else {
    moustacheGroup.style.display = "block";
    moustache.setAttribute("fill", avatarState.facialHairColor);

    if (avatarState.moustacheStyle === "regular") {
      moustache.setAttribute(
        "d",
        "M170,240 Q180,235 200,235 Q220,235 230,240 Q225,245 215,245 Q205,247 200,247 Q195,247 185,245 Q175,245 170,240"
      );
    } else if (avatarState.moustacheStyle === "handlebar") {
      moustache.setAttribute(
        "d",
        "M160,240 Q165,235 175,235 Q185,235 195,238 L200,238 L205,238 Q215,235 225,235 Q235,235 240,240 Q245,235 248,230 M152,240 Q157,235 162,230"
      );
    } else if (avatarState.moustacheStyle === "pencil") {
      moustache.setAttribute(
        "d",
        "M175,238 Q185,236 200,236 Q215,236 225,238 Q220,240 210,240 Q205,241 200,241 Q195,241 190,240 Q180,240 175,238"
      );
    } else if (avatarState.moustacheStyle === "toothbrush") {
      moustache.setAttribute("d", "M185,235 L215,235 L215,245 L185,245 Z");
    } else if (avatarState.moustacheStyle === "chevron") {
      moustache.setAttribute(
        "d",
        "M170,235 Q180,232 200,232 Q220,232 230,235 Q225,248 215,248 Q205,250 200,250 Q195,250 185,248 Q175,248 170,235"
      );
    }
  }
}

function updateMole() {
  const moleGroup = document.getElementById("mole-group");
  const mole = document.getElementById("mole");

  if (avatarState.molePosition === "none") {
    moleGroup.style.display = "none";
  } else {
    moleGroup.style.display = "block";
    mole.setAttribute("r", avatarState.moleSize);

    switch (avatarState.molePosition) {
      case "above-mouth-left":
        mole.setAttribute("cx", "185");
        mole.setAttribute("cy", "240");
        break;
      case "above-mouth-right":
        mole.setAttribute("cx", "215");
        mole.setAttribute("cy", "240");
        break;
      case "below-mouth-left":
        mole.setAttribute("cx", "185");
        mole.setAttribute("cy", "265");
        break;
      case "below-mouth-right":
        mole.setAttribute("cx", "215");
        mole.setAttribute("cy", "265");
        break;
      case "left-cheek":
        mole.setAttribute("cx", "150");
        mole.setAttribute("cy", "220");
        break;
      case "right-cheek":
        mole.setAttribute("cx", "250");
        mole.setAttribute("cy", "220");
        break;
      case "chin":
        mole.setAttribute("cx", "200");
        mole.setAttribute("cy", "275");
        break;
    }
  }
}

function updateBindi() {
  const bindiGroup = document.getElementById("bindi-group");
  const bindi = document.getElementById("bindi");

  if (avatarState.bindiStyle === "none") {
    bindiGroup.style.display = "none";
  } else {
    bindiGroup.style.display = "block";

    // Clear previous bindi
    bindiGroup.innerHTML = "";

    if (avatarState.bindiStyle === "dot") {
      bindiGroup.innerHTML = `<circle cx="200" cy="170" r="5" fill="${avatarState.bindiColor}"/>`;
    } else if (avatarState.bindiStyle === "teardrop") {
      bindiGroup.innerHTML = `<path d="M200,165 Q205,170 200,178 Q195,170 200,165 Z" fill="${avatarState.bindiColor}"/>`;
    } else if (avatarState.bindiStyle === "diamond") {
      bindiGroup.innerHTML = `<path d="M200,165 L205,170 L200,175 L195,170 Z" fill="${avatarState.bindiColor}"/>`;
    }
  }
}

function updateKohl() {
  const kohlGroup = document.getElementById("kohl-group");
  const kohlLeft = document.getElementById("kohl-left");
  const kohlRight = document.getElementById("kohl-right");

  if (avatarState.kohlStyle === "none") {
    kohlGroup.style.display = "none";
  } else {
    kohlGroup.style.display = "block";

    if (avatarState.kohlStyle === "light") {
      kohlLeft.setAttribute("d", "M150,188 Q160,186 175,188");
      kohlRight.setAttribute("d", "M225,188 Q240,186 250,188");
      kohlLeft.setAttribute("stroke-width", "1.5");
      kohlRight.setAttribute("stroke-width", "1.5");
    } else if (avatarState.kohlStyle === "medium") {
      kohlLeft.setAttribute("d", "M148,187 Q160,184 177,187");
      kohlRight.setAttribute("d", "M223,187 Q240,184 252,187");
      kohlLeft.setAttribute("stroke-width", "2");
      kohlRight.setAttribute("stroke-width", "2");
    } else if (avatarState.kohlStyle === "heavy") {
      kohlLeft.setAttribute("d", "M145,186 Q160,182 180,186");
      kohlRight.setAttribute("d", "M220,186 Q240,182 255,186");
      kohlLeft.setAttribute("stroke-width", "3");
      kohlRight.setAttribute("stroke-width", "3");
    } else if (avatarState.kohlStyle === "winged") {
      kohlLeft.setAttribute("d", "M148,187 Q160,184 177,187 L182,184");
      kohlRight.setAttribute("d", "M223,187 Q240,184 252,187 L257,184");
      kohlLeft.setAttribute("stroke-width", "2");
      kohlRight.setAttribute("stroke-width", "2");
    }
  }
}

function updateGenderFeatures() {
  // Update face shape based on gender
  const head = document.getElementById("head");

  if (avatarState.gender === "male") {
    // More angular jaw
    head.setAttribute("rx", avatarState.faceWidth);
    head.setAttribute("ry", avatarState.faceHeight);

    // Show eyebrows slightly thicker
    const eyebrowLeft = document.getElementById("eyebrow-left");
    const eyebrowRight = document.getElementById("eyebrow-right");
    eyebrowLeft.setAttribute("stroke-width", "4");
    eyebrowRight.setAttribute("stroke-width", "4");
  } else if (avatarState.gender === "female") {
    // Softer, rounder face
    head.setAttribute("rx", avatarState.faceWidth);
    head.setAttribute("ry", avatarState.faceHeight);

    // Thinner eyebrows
    const eyebrowLeft = document.getElementById("eyebrow-left");
    const eyebrowRight = document.getElementById("eyebrow-right");
    eyebrowLeft.setAttribute("stroke-width", "2.5");
    eyebrowRight.setAttribute("stroke-width", "2.5");

    // Slightly fuller lips
    const mouth = document.getElementById("mouth");
    mouth.setAttribute("stroke-width", "4");
  } else {
    // Neutral - default settings
    const eyebrowLeft = document.getElementById("eyebrow-left");
    const eyebrowRight = document.getElementById("eyebrow-right");
    eyebrowLeft.setAttribute("stroke-width", "3");
    eyebrowRight.setAttribute("stroke-width", "3");

    const mouth = document.getElementById("mouth");
    mouth.setAttribute("stroke-width", "3");
  }
}

function applyStyle() {
  const svg = document.getElementById("avatar-svg");

  if (avatarState.style === "polygonal") {
    svg.style.filter = "contrast(1.2) saturate(1.3)";
  } else if (avatarState.style === "anime") {
    svg.style.filter = "brightness(1.1) saturate(1.4)";
  } else if (avatarState.style === "comic") {
    svg.style.filter = "grayscale(1) contrast(1.5)";
  } else {
    svg.style.filter = "none";
  }
}

// History management
function saveState() {
  historyIndex++;
  history = history.slice(0, historyIndex);
  history.push(JSON.parse(JSON.stringify(avatarState)));
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    avatarState = JSON.parse(JSON.stringify(history[historyIndex]));
    syncControlsWithState();
    updateAvatar();
  }
}

function redo() {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    avatarState = JSON.parse(JSON.stringify(history[historyIndex]));
    syncControlsWithState();
    updateAvatar();
  }
}

function reset() {
  avatarState = JSON.parse(JSON.stringify(history[0]));
  historyIndex = 0;
  history = [JSON.parse(JSON.stringify(avatarState))];
  syncControlsWithState();
  updateAvatar();
}

function syncControlsWithState() {
  document.getElementById("skin-color").value = avatarState.skinColor;
  document.getElementById("face-width").value = avatarState.faceWidth;
  document.getElementById("face-height").value = avatarState.faceHeight;
  document.getElementById("eye-color").value = avatarState.eyeColor;
  document.getElementById("eye-size").value = avatarState.eyeSize;
  document.getElementById("eye-shape").value = avatarState.eyeShape;
  document.getElementById("hair-color").value = avatarState.hairColor;
  document.getElementById("hair-style").value = avatarState.hairStyle;
  document.getElementById("headcovering-type").value =
    avatarState.headCoveringType;
  document.getElementById("headcovering-color").value =
    avatarState.headCoveringColor;
  document.getElementById("facemask-type").value = avatarState.faceMaskType;
  document.getElementById("facemask-color").value = avatarState.faceMaskColor;
  document.getElementById("animalmask-type").value = avatarState.animalMaskType;
  document.getElementById("glasses-type").value = avatarState.glassesType;
  document.getElementById("mouth-expression").value =
    avatarState.mouthExpression;
  document.getElementById("clothing-color").value = avatarState.clothingColor;
  document.getElementById("clothing-style").value = avatarState.clothingStyle;
  document.getElementById("bg-color").value = avatarState.bgColor;
  document.getElementById("beard-style").value = avatarState.beardStyle;
  document.getElementById("moustache-style").value = avatarState.moustacheStyle;
  document.getElementById("facialhair-color").value =
    avatarState.facialHairColor;
  document.getElementById("mole-position").value = avatarState.molePosition;
  document.getElementById("mole-size").value = avatarState.moleSize;
  document.getElementById("bindi-style").value = avatarState.bindiStyle;
  document.getElementById("bindi-color").value = avatarState.bindiColor;
  document.getElementById("kohl-style").value = avatarState.kohlStyle;
}

// Feature functions
function toggleGender() {
  if (avatarState.gender === "neutral") {
    avatarState.gender = "male";
  } else if (avatarState.gender === "male") {
    avatarState.gender = "female";
  } else {
    avatarState.gender = "neutral";
  }

  // Apply gender-specific defaults
  applyGenderDefaults();
  saveState();
  syncControlsWithState();
  updateAvatar();
}

function applyGenderDefaults() {
  if (avatarState.gender === "male") {
    // Male defaults - more angular features
    avatarState.faceWidth = 85;
    avatarState.faceHeight = 105;
    // Keep current facial hair if any
  } else if (avatarState.gender === "female") {
    // Female defaults - softer features
    avatarState.faceWidth = 75;
    avatarState.faceHeight = 95;
    avatarState.beardStyle = "none";
    avatarState.moustacheStyle = "none";
  } else {
    // Neutral - middle ground
    avatarState.faceWidth = 80;
    avatarState.faceHeight = 100;
  }
}

function randomizeAvatar() {
  const colors = [
    "#f4c2a6",
    "#e8b69a",
    "#d4a384",
    "#c89872",
    "#b08860",
    "#8b6f47",
  ];
  const hairColors = [
    "#000000",
    "#2c1608",
    "#4a3728",
    "#6c4b2f",
    "#8b6f47",
    "#daa520",
    "#ff6347",
    "#8b008b",
  ];
  const eyeColors = [
    "#654321",
    "#8b4513",
    "#006400",
    "#4169e1",
    "#808080",
    "#2f4f4f",
  ];
  const clothingColors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f39c12",
    "#9b59b6",
    "#1abc9c",
    "#34495e",
  ];
  const bgColors = [
    "#e0e0e0",
    "#ffd700",
    "#87ceeb",
    "#98fb98",
    "#dda0dd",
    "#f0e68c",
    "#fff0f5",
  ];

  avatarState.skinColor = colors[Math.floor(Math.random() * colors.length)];
  avatarState.faceWidth = 60 + Math.floor(Math.random() * 40);
  avatarState.faceHeight = 80 + Math.floor(Math.random() * 40);
  avatarState.eyeColor =
    eyeColors[Math.floor(Math.random() * eyeColors.length)];
  avatarState.eyeSize = 10 + Math.floor(Math.random() * 15);
  avatarState.eyeShape = ["normal", "round", "almond"][
    Math.floor(Math.random() * 3)
  ];
  avatarState.hairColor =
    hairColors[Math.floor(Math.random() * hairColors.length)];
  avatarState.hairStyle = ["short", "long", "curly", "bald"][
    Math.floor(Math.random() * 4)
  ];
  avatarState.mouthExpression = ["smile", "neutral", "sad", "laugh"][
    Math.floor(Math.random() * 4)
  ];
  avatarState.clothingColor =
    clothingColors[Math.floor(Math.random() * clothingColors.length)];
  avatarState.clothingStyle = ["tshirt", "hoodie", "formal"][
    Math.floor(Math.random() * 3)
  ];
  avatarState.bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  saveState();
  syncControlsWithState();
  updateAvatar();
}

// Download functions
function openDownloadModal() {
  document.getElementById("download-modal").style.display = "block";
}

function closeDownloadModal() {
  document.getElementById("download-modal").style.display = "none";
}

function downloadAvatar(format, size) {
  const svg = document.getElementById("avatar-svg");
  const svgData = new XMLSerializer().serializeToString(svg);

  if (format === "svg") {
    // Download as SVG
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "avatar.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    // Download as PNG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const sizeNum = parseInt(size);
    canvas.width = sizeNum;
    canvas.height = sizeNum;

    img.onload = function () {
      ctx.drawImage(img, 0, 0, sizeNum, sizeNum);
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `avatar_${sizeNum}x${sizeNum}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  }

  closeDownloadModal();
}
