import { FC, useState } from "react";
import { fieldsDragDrop } from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import { OrderType } from "../../../types/types";
import { Ham } from "lucide-react";
import { OrderStatusType } from "../../../types/allTypes/orders";

type PropsType = {
  order: OrderType;
};

const DragAndDropManager: FC<PropsType> = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const [isDragging, setIsDragging] = useState(false);

  const iStatus = fieldsDragDrop.findIndex((el) => el.field === status);

  const handleDragStart = (e: React.DragEvent, field: string) =>
    e.dataTransfer.setData("status", field);
  const handleDrop = (e: React.DragEvent, field: string) => {
    const draggedStatus = e.dataTransfer.getData("status");
    // i do not check cause i am pretty sure i will find an el inside an array sync and not fetched
    const draggedStatusI = fieldsDragDrop.findIndex(
      (el) => el.field === draggedStatus
    );

    e.currentTarget.classList.remove("el__drag_over");
    setIsDragging(false);

    const newStatusI = fieldsDragDrop.findIndex((el) => el.field === field);
    if (newStatusI <= draggedStatusI) return;

    setStatus(field as OrderStatusType);
  };
  const allowDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    e.currentTarget.classList.add("el__drag_over");
  };
  const handleDragLeave = (e: React.DragEvent) =>
    e.currentTarget.classList.remove("el__drag_over");

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5">
      {fieldsDragDrop.map((el, i) => (
        <div
          onDragOver={allowDrop}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, el.field)}
          key={el.id}
          className="border-2 border-[#333] rounded-xl px-6 py-2 flex justify-center items-center relative el__flow"
        >
          {i === iStatus && (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, el.field)}
              className={`bg-[#111] border-2 border-orange-500 text-orange-500 rounded-xl absolute right-0 bottom-1/2 p-2 el__flow hover:scale-110 cursor-pointer ${
                isDragging ? "opacity-50" : "opacity-100"
              }`}
            >
              <Ham className="min-w-[35px] min-h-[35px] " />
            </div>
          )}
          <span className="txt__02">{el.label}</span>
        </div>
      ))}
    </div>
  );
};
export default DragAndDropManager;
