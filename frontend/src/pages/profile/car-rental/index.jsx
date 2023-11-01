import React from "react";
import { CarRentalCard } from "@/components/CardRentalCard";

export default function CarRentalPage() {
  return (
    <div>
      <div className="mb-40 ">
        <div className="flex flex-col gap-5 ">
          <CarRentalCard />
        </div>
      </div>
    </div>
  );
}
