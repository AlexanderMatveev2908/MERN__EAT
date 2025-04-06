import { FC, useMemo, useState } from "react";
import { fieldsDragDrop } from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import { OrderType } from "../../../types/types";
import { Ham } from "lucide-react";
import { OrderStatusType } from "../../../types/allTypes/orders";
import SpinnerBtnReact from "../../../UI/components/loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  order: OrderType;
};

type StatusState = {
  prev: OrderStatusType | null;
  curr: OrderStatusType;
};

const getIndexes = (newStatus: OrderStatusType, status: StatusState) => {
  const oldI = fieldsDragDrop.findIndex((el) => el.field === status.prev);
  const newI = fieldsDragDrop.findIndex((el) => el.field === newStatus);

  return {
    oldI,
    newI,
  };
};

const DragAndDropManager: FC<PropsType> = ({ order }) => {
  const [status, setStatus] = useState<StatusState>({
    prev: null,
    curr: order.status,
  });
  const [isDragging, setIsDragging] = useState(false);

  const iStatus = useMemo(
    () => fieldsDragDrop.findIndex((el) => el.field === status.curr),
    [status.curr]
  );

  const handleDragStart = () => {
    setStatus((prev) => ({ ...prev, prev: prev.curr }));
    setIsDragging(true);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    const newStatus = (e.currentTarget as HTMLDivElement).dataset.status;

    const rect = e.currentTarget.getBoundingClientRect();
    const gap = 200;
    const startX = rect.left - gap;
    const endX = rect.right + gap;
    const startY = rect.top - gap;
    const endY = rect.bottom + gap;

    const { oldI, newI } = getIndexes(newStatus as OrderStatusType, status);

    if (
      e.clientX >= startX &&
      e.clientX <= endX &&
      e.clientY >= startY &&
      e.clientY <= endY &&
      (e.currentTarget as HTMLDivElement).dataset?.status !== status.prev &&
      newI > oldI
    )
      e.currentTarget.classList.add("el__drag_over");
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("el__drag_over");
  };
  const handleDrop = (e: React.DragEvent) => {
    const newStatus = (e.currentTarget as HTMLDivElement).dataset.status;

    setIsDragging(false);
    e.currentTarget.classList.remove("el__drag_over");

    const { oldI, newI } = getIndexes(newStatus as OrderStatusType, status);

    if (newI <= oldI) {
      setStatus((prev) => ({ prev: null, curr: prev.prev as OrderStatusType }));
      return;
    }

    setStatus({ prev: null, curr: newStatus as OrderStatusType });
  };
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5">
      {fieldsDragDrop.map((el, i) =>
        i === 0 ? (
          <SpinnerBtnReact />
        ) : (
          <div
            data-status={el.field}
            // onDragOver={allowDrop}
            // onDragLeave={handleDragLeave}
            // onDrop={(e) => handleDrop(e, el.field)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            key={el.id}
            className="border-2 border-[#333] rounded-xl px-6 py-2 flex justify-center items-center relative el__flow"
          >
            {i === iStatus && (
              <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // onDragStart={(e) => handleDragStart(e, el.field)}
                className={`bg-[#111] border-2 border-orange-500 text-orange-500 rounded-xl absolute right-0 bottom-1/2 p-2 el__flow hover:scale-110 cursor-pointer ${
                  isDragging ? "opacity-50" : "opacity-gap"
                }`}
              >
                <Ham className="min-w-[35px] min-h-[35px] " />
              </div>
            )}
            <span className="txt__02">{el.label}</span>
          </div>
        )
      )}
    </div>
  );
};
export default DragAndDropManager;

/*
  const handleDragStart = (e: React.DragEvent, field: string) =>
    e.dataTransfer.setData("status", field);
  const handleDrop = (e: React.DragEvent, field: string) => {
    const draggedStatus = e.dataTransfer.getData("status");
    // i do not check cause i am pretty sure i will find an el inside an array sync and not fetched that i wrote in core
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
  */
