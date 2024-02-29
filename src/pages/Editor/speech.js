function mathRecognition(speech) {
  // Define superscript and subscript mappings
  const SUP = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ᶦ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    q: "ᑫ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ",
    "+": "⁺",
    "-": "⁻",
  };
  const SUB = {
    0: "₀",
    1: "₁",
    2: "₂",
    3: "₃",
    4: "₄",
    5: "₅",
    6: "₆",
    7: "₇",
    8: "₈",
    9: "₉",
    a: "ₐ",
    e: "ₑ",
    h: "ₕ",
    i: "ᵢ",
    j: "ⱼ",
    k: "ₖ",
    l: "ₗ",
    m: "ₘ",
    n: "ₙ",
    o: "ₒ",
    p: "ₚ",
    r: "ᵣ",
    s: "ₛ",
    t: "ₜ",
    u: "ᵤ",
    v: "ᵥ",
    x: "ₓ",
  };

  // Convert text to superscript
  function toSup(text) {
    return text
      .split("")
      .map((char) => SUP[char] || char)
      .join("");
  }

  // Convert text to subscript
  function toSub(text) {
    return text
      .split("")
      .map((char) => SUB[char] || char)
      .join("");
  }

  // Remove stopwords from speech
  function removeStopwords(speech) {
    const stopWords = new Set(["y", "a", "d", "into"]);
    const words = speech.toLowerCase().split(/\s+/);
    return words.filter((word) => !stopWords.has(word)).join(" ");
  }

  // Replace certain words with their mathematical symbols
  function replaceWords(speech) {
    return speech
      .replace(/plus/g, "+")
      .replace(/add/g, "+")
      .replace(/multiply/g, "x")
      .replace(/into/g, "x")
      .replace(/minus/g, "-")
      .replace(/integration/g, "∫")
      .replace(/factorial/g, "!")
      .replace(/squared/g, "²")
      .replace(/square/g, "²")
      .replace(/equal/g, "=")
      .replace(/equals/g, "=")
      .replace(/cube/g, "³")
      .replace(/zero/g, "0")
      .replace(/one/g, "1")
      .replace(/two/g, "2")
      .replace(/three/g, "3")
      .replace(/four/g, "4")
      .replace(/five/g, "5")
      .replace(/six/g, "6")
      .replace(/seven/g, "7")
      .replace(/eight/g, "8")
      .replace(/nine/g, "9")
      .replace(/theta/g, "θ")
      .replace(/10/g, "tan")
      .replace(/\[/g, "²(")
      .replace(/\]/g, ")")
      .replace(/\//g, "÷");
  }

  // Replace 'pi' with π
  function replacePi(speech) {
    return speech.replace(/\b(pi|fi|bye)\b/g, "π");
  }

  // Replace 'raise' or 'power' with superscript
  function replacePower(speech) {
    const words = speech.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      if (words[i] === "raise" || words[i] === "power") {
        let j = i + 1;
        while (j < words.length && words[j] !== "stop") {
          // Check if the word needs to be converted to superscript or subscript
          if (words[j].includes("_")) {
            const parts = words[j].split("_");
            parts[1] = toSub(parts[1]); // Convert the subscript part
            words[j] = parts.join(""); // Rejoin with the superscript part
          } else {
            words[j] = toSup(words[j]); // Convert to superscript
          }
          j++;
        }
        words[i] = ""; // Remove 'raise' or 'power' word
      }
    }
    return words.join("");
  }

  // Replace 'bracket' with '(' and ')' for bracketing
  function replaceBracket(speech) {
    return speech.replace(/\bbracket\b/g, "(").replace(/\bstop\b/g, ")");
  }

  // Apply all transformations
  let result = removeStopwords(speech);
  result = replaceWords(result);
  result = replacePi(result);
  result = replacePower(result);
  result = replaceBracket(result);

  return result;
}

export default mathRecognition;
