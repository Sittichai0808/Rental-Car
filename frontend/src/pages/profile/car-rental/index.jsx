import React from "react";
import { CarRentalCard } from "@/components/CardRentalCard";
import Image from "next/image";
export default function CarRentalPage() {
  return (
    <div>
      <div className="mb-20 ">
        <div className="flex flex-col gap-5 ">
          <CarRentalCard />
          <CarRentalCard />
          <CarRentalCard />
        </div>
      </div>
    </div>
  );
}
