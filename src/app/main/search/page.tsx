import React from "react";
import Sidebar from "@/component/Sidebar/Sidebar";
import OhgoTable from "@/component/OhgoTable/OhgoTable";

const Search = async () => {
  const vendingMachineData = await fetch("http://localhost:3000/api/vending", {
    method: "GET",
    next: { revalidate: 60 }, // 60秒ごとに再検証
  });

  const vendingMachineList = await vendingMachineData.json();

  return (
    <Sidebar>
      <OhgoTable vendingMachineList={vendingMachineList} />
    </Sidebar>
  );
};

export default Search;
