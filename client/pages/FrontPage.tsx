import React from "react";
import TravelComponet from "./components/TravelComponet";
import MapUber from "./components/Map";
import { useState } from "react";
import { EndTravel } from "./components/EndTravel";

function FrontPage() {
  const [endTravel, setEndTravel] = useState<boolean>(false);
  const [startTravel, setStartTravel] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-10 h-[100%] w-[100%]">
      <TravelComponet setStartTravel={setStartTravel} />
      {startTravel ? <MapUber setEndTravel={setEndTravel} />  : null}
      {endTravel ? <EndTravel /> : null}
    </div>
  );
}

export default FrontPage;
