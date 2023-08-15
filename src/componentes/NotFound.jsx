import { Link as Anchor } from "react-router-dom";
import './styles/slime.css'

export default function NotFound() {
  return (
    <div>
      <h1 className="text-white relative top-[10rem]">Not Found :P</h1>
        <div className="scene">
          <div className="floor"></div>
          <div className="cube">
            <div className="front"></div>
            <div className="back"></div>
            <div className="left"></div>
            <div className="right"></div>
            <div className="top"></div>
            <div className="bottom"></div>
          </div>
          <div className="anvil">
            <div className="head">
              <div className="front"></div>
              <div className="back"></div>
              <div className="left"></div>
              <div className="right"></div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="neck">
              <div className="front"></div>
              <div className="back"></div>
              <div className="left"></div>
              <div className="right"></div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="guard">
              <div className="front"></div>
              <div className="back"></div>
              <div className="left"></div>
              <div className="right"></div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <div className="base">
              <div className="front"></div>
              <div className="back"></div>
              <div className="left"></div>
              <div className="right"></div>
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </div>
        </div>
    </div>
  );
}
