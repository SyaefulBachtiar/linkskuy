import { useRef, useEffect, useState } from "react";

export default function DraggableDivs() {
  
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const containerRef = useRef(null);

  const [zIndexMap, setZIndexMap] = useState({
    div1: 1,
    div2: 1,
  });

  const [zCounter, setZCounter] = useState(1);

  const getBoundingRect = (ref) => ref.current.getBoundingClientRect();

  const isOverlap = (rectA, rectB) => {
    return !(rectA.bottom <= rectB.top || rectA.top >= rectB.bottom);
  };

  const makeDraggable = (ref, id) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = (e) => {
      const newZ = zCounter + 1;
      setZCounter(newZ);
      setZIndexMap((prev) => ({
        ...prev,
        [id]: newZ,
      }));

      pos = {
        left: ref.current.offsetLeft,
        top: ref.current.offsetTop,
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
      const dy = e.clientY - pos.y;

      const container = containerRef.current.getBoundingClientRect();
      const box = ref.current.getBoundingClientRect();

      let newTop = pos.top + dy;

      // Batas vertikal
      if (newTop < 0) newTop = 0;
      if (newTop + box.height > container.height)
        newTop = container.height - box.height;

      ref.current.style.top = `${newTop}px`;
    };

    const mouseUpHandler = () => {
      const currentBox = getBoundingRect(ref);
      const otherRef = id === "div1" ? div2Ref : div1Ref;
      const otherBox = getBoundingRect(otherRef);

      if (isOverlap(currentBox, otherBox)) {
        const currentHeight = currentBox.height;
        const container = containerRef.current.getBoundingClientRect();

        // Cari posisi terdekat atas atau bawah untuk menghindari tumpang tindih
        const newTopUp = otherBox.top - currentHeight - 1 - container.top;
        const newTopDown = otherBox.bottom + 1 - container.top;

        const maxTop = container.height - currentHeight;

        let finalTop = newTopDown;
        if (newTopUp >= 0) {
          finalTop =
            Math.abs(currentBox.top - newTopUp) <
            Math.abs(currentBox.top - newTopDown)
              ? newTopUp
              : newTopDown;
        }

        // Jaga agar tetap dalam container
        if (finalTop < 0) finalTop = 0;
        if (finalTop > maxTop) finalTop = maxTop;

        ref.current.style.top = `${finalTop}px`;
      }

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    ref.current.addEventListener("mousedown", mouseDownHandler);
  };

  useEffect(() => {
    makeDraggable(div1Ref, "div1");
    makeDraggable(div2Ref, "div2");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        ref={containerRef}
        className="wadah w-[500px] h-[400px] relative bg-gray-100 overflow-hidden border"
      >
        <div
          ref={div1Ref}
          className="div-1 w-full h-[100px] bg-blue-500 absolute cursor-move"
          style={{ top: "50px", zIndex: zIndexMap.div1 }}
        ></div>
        <div
          ref={div2Ref}
          className="div-2 w-full h-[100px] bg-red-500 absolute cursor-move"
          style={{ top: "200px", zIndex: zIndexMap.div2 }}
        ></div>
      </div>
    </div>
  );
}
