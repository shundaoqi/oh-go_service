import Sidebar from "@/component/Sidebar/Sidebar";
import { Stack } from "@mui/material";
import { VendingMachine } from "../../../../type/type";
import FloorOhgoBox from "@/component/FloorOhgoBox/FloorOhgoBox";

const fetchAllVending = async () => {
  const res = await fetch("http://localhost:3000/api/vending");
  if (!res.ok) throw new Error("Failed to fetch vending data");
  return res.json();
};

const mypage = async () => {
  const vendingData = await fetchAllVending();

  return (
    <main className="p-4">
      <Sidebar>
        <Stack direction="row" alignItems="center" spacing={3}>
          {vendingData.length > 0 ? (
            vendingData.map((vending: VendingMachine) => (
              <div key={vending.vendingmachine_no}>
                <FloorOhgoBox floor={vending.vendingmachine_name} floor_no={vending.vendingmachine_no} />
              </div>
            ))
          ) : (
            <p>No vending machines available</p>
          )}
        </Stack>
      </Sidebar>
    </main>
  );
};

export default mypage;
