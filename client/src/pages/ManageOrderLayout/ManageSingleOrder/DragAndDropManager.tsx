import { FC, SetStateAction, useMemo, useState } from "react";
import { fieldsDragDrop } from "../../../core/config/fieldsArr/allFields/manageOrders/show";
import { OrderType } from "../../../types/types";
import { Ham } from "lucide-react";
import { OrderStatusType } from "../../../types/allTypes/orders";
import SpinnerBtnReact from "../../../UI/components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import { useMutation } from "@tanstack/react-query";
import { updateStatusOrderAPI } from "../../../core/api/APICalls/manageOrders";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useParams } from "react-router-dom";

type PropsType = {
  order: OrderType;
  setIsDelivered: React.Dispatch<SetStateAction<boolean>>;
};

type StatusState = {
  prev: OrderStatusType | null;
  curr: OrderStatusType;
};

const getIndexes = (
  newStatus: OrderStatusType,
  status: StatusState,
  isEClick?: boolean
) => {
  const oldI = fieldsDragDrop.findIndex(
    (el) => el.field === (isEClick ? status.curr : status.prev)
  );
  const newI = fieldsDragDrop.findIndex((el) => el.field === newStatus);

  return {
    oldI,
    newI,
  };
};

const DragAndDropManager: FC<PropsType> = ({ order, setIsDelivered }) => {
  const [status, setStatus] = useState<StatusState>({
    prev: null,
    curr: order.status,
  });
  const [isDragging, setIsDragging] = useState(false);
  // const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const draggableRef = useRef<HTMLDivElement | null>(null);
  const orderId = useParams()?.orderId;

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const { isPending, mutate } = useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: OrderStatusType;
    }) => updateStatusOrderAPI({ orderId, status }),
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
      setStatus((prev) => ({
        prev: null,
        curr: prev.prev as OrderStatusType,
      }));
    },
    onSuccess: () => {
      if (status.curr === "delivered") setIsDelivered(true);
      showToastMsg("Status updated", "SUCCESS");
    },
  });

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

    const { oldI, newI } = getIndexes(newStatus as OrderStatusType, status);

    if (
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
    mutate({
      orderId: orderId as string,
      status: newStatus as OrderStatusType,
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    const statusEl = (e.currentTarget as HTMLDivElement).dataset.status;

    const { oldI, newI } = getIndexes(
      statusEl as OrderStatusType,
      status as StatusState,
      true
    );

    if (newI > oldI) {
      setStatus({ prev: null, curr: statusEl as OrderStatusType });
      mutate({
        orderId: orderId as string,
        status: statusEl as OrderStatusType,
      });
    }
  };

  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-10 gap-y-5">
      {fieldsDragDrop.map((el, i) => {
        const currI = fieldsDragDrop.findIndex(
          (el) => el.field === status.curr
        );

        return i === currI && isPending ? (
          <SpinnerBtnReact />
        ) : (
          <div
            data-status={el.field}
            // DATA TRANSFER
            // onDragOver={allowDrop}
            // onDragLeave={handleDragLeave}
            // onDrop={(e) => handleDrop(e, el.field)}
            // STATE MANAGEMENT
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={(e) => (window.innerWidth < 768 ? handleClick(e) : null)}
            key={el.id}
            className="border-2 border-[#333] cursor-pointer md:cursor-default rounded-xl px-6 py-2 flex justify-center items-center relative el__flow"
          >
            {i === iStatus && (
              <div
                draggable
                // STATE MANAGEMENT
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                // DATA TRANSFER
                // onDragStart={(e) => handleDragStart(e, el.field)}
                className={`bg-[#111] border-2 border-orange-500 text-orange-500 rounded-xl p-2 el__flow hover:scale-110 cursor-pointer w-fit h-fit flex justify-center items-center right-0 bottom-1/2 absolute ${
                  isDragging ? "opacity-50" : "opacity-100"
                }`}
              >
                <Ham className="min-w-[35px] min-h-[35px] " />
              </div>
            )}
            <span className="txt__02">{el.label}</span>
          </div>
        );
      })}
    </div>
  );
};
export default DragAndDropManager;

// DATA TRANSFER
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

// MOUSE EVENTS
/*
    const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);

    const el = draggableRef?.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMouseUp = () => {
    setIsDragging(false);

    const el = draggableRef?.current;
    if (!el) return;

    el.style.position = "absolute";
    el.style.right = "0";
    el.style.bottom = "50%";
    el.style.opacity = "1";
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = draggableRef?.current;
      if (!el) return;

      if (!isDragging) {
        el.style.position = "absolute";
        el.style.right = "0";
        el.style.bottom = "50%";
        return;
      }

      el.style.position = "fixed";
      el.style.zIndex = "1000";
      el.style.left = `${e.clientX - offset.x}px`;
      el.style.top = `${e.clientY - offset.y}px`;
      el.style.scale = "1.2";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);
  */
