import { useEffect, useRef, useState } from "react";
import useMousePosition from "./test1";
import { Select, Button } from "antd";
const Circle = () => {
  const canvasRef = useRef();
  const [coords, handleCoords] = useMousePosition(true);

  const image = new Image();
  image.src =
    "https://vinavic.vn/wp-content/uploads/2016/09/mot-so-ban-ve-ho-so-thiet-ke-ky-thuat-thi-cong-cong-trinh-kien-truc_4_.jpg";

  const [point, setpoint] = useState([]);

  useEffect(() => {
    const pointFromStorage = JSON.parse(localStorage.getItem("point"));
    setpoint(pointFromStorage);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const drawpoint = () => {
    point.forEach((point) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const { x, y } = point;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);

      ctx.fill();
      console.log("hello1");
    });
  };

  return (
    <>
      <div className="container">
        <canvas
          id="canvas"
          ref={canvasRef}
          width="1210"
          height="525"
          style={{ border: "2px solid black", borderRadius: "15px" }}
          onClick={(e) => {
            handleCoords(e);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const color = "#79ACD9";
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(coords.x, coords.y, 6, 0, 2 * Math.PI);
            ctx.fill();
            drawpoint();
          }}
        />
      </div>

      <Button
        type="primary"
        onClick={() => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          point.push({
            x: coords.x,
            y: coords.y,
          });
          localStorage.setItem("point", JSON.stringify(point));
          ctx.save(0, 0, canvas.width, canvas.height);
        }}
      >
        SAVE
      </Button>
      <Select
        showSearch
        style={{
          width: 200,
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "1",
            label: "MP1A",
          },
          {
            value: "2",
            label: "MP1B",
          },
        ]}
      />
    </>
  );
};

export default Circle;
