import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Resizable } from "react-resizable";
import "./App.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const App = () => {
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "a", x: 0, y: 0, w: 1, h: 2 },
      { i: "b", x: 1, y: 0, w: 1, h: 2 },
      { i: "c", x: 2, y: 0, w: 1, h: 2 },
    ],
  });

  const onResize = (layout, oldItem, newItem, placeholder, e, element) => {
    const index = layouts.lg.findIndex((item) => item.i === newItem.i);
    const newLayouts = [...layouts.lg];
    newLayouts[index] = newItem;
    setLayouts({ lg: newLayouts });
  };

  return (
    <div className="App">
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        onResize={onResize}
      >
        {layouts.lg.map((item) => (
          <div key={item.i} className="component">
            <DraggableComponent>
              <Resizable
                className="resize-handler"
                height={100}
                width={100}
                minConstraints={[100, 100]}
                maxConstraints={[400, 400]}
                resizeHandles={["s", "w", "e", "sw", "se"]}
              >
                <div className="image-container" />
              </Resizable>
            </DraggableComponent>
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

const DraggableComponent = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartX;
      const deltaY = e.clientY - dragStartY;
      setPositionX((prevX) => prevX + deltaX);
      setPositionY((prevY) => prevY + deltaY);
      setDragStartX(e.clientX);
      setDragStartY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="draggable-container"
      style={{ transform: `translate(${positionX}px, ${positionY}px)` }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default App;
