import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import {assets} from '../../assets/assets_frontend/assets.js'

function Data() {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="flex items-center mb-8">
        <span className="text-2xl font-bold text-charcoal cursor-pointer" onClick={() => navigate("/")}>Aurea</span>
      </div>

      <img
        className="h-[100px] rounded-full sm:w-[100px]"
        src={userData.image ? userData.image : assets.upload_area}
        alt=""
      />

      <p className="text-xl font-semibold">{userData.name}</p>
    </div>
  );
}

export default Data;
