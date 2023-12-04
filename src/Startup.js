import React from "react";
import Filters from "./_Shared/Filters";
export default function Startup()
{
  const onUpdateVars = () => {}
  return (
    <>
    <Filters links={[]} updateVars={onUpdateVars}/>
    <div className="card p-2 m-2">
      Place for a Dashboard.
    </div>
    </>
  );
}