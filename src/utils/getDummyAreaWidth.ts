"use client";

export default function getDummyAreaWidth(
  styles: string,
  classes: string,
  type: string,
  text: string,
) {
  const dummyArea = document.createElement(type);
  dummyArea.textContent = text;
  dummyArea.setAttribute("style", styles); // Set the styles using setAttribute method
  dummyArea.className = classes;
  document.body.appendChild(dummyArea);

  const width = dummyArea.offsetWidth;

  const elementInfo = {
    width: width,
    styles: dummyArea.getAttribute("style"), // Get the styles using getAttribute method
    textContent: dummyArea.textContent,
  };
  console.log(elementInfo);

  document.body.removeChild(dummyArea);
  return width;
}
