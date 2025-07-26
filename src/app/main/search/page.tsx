import React from "react";
import Sidebar from "@/component/Sidebar/Sidebar";
import OhgoTable from "@/component/OhgoTable/OhgoTable";

export const dynamic = "force-dynamic";

const Search = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const vendingMachineData = await fetch(`${baseUrl}/api/vending`, {
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
