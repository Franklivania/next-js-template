"use client";

import { Fragment, useEffect, useState, useMemo } from "react";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";
import { useClickOutside } from "@/hooks/useClickOutside";

// Remove TypeScript types for JS file
const SIZE_CLASSES = {
  small: {
    default: "w-[90%] max-w-md",
    side: "w-[35%]",
    float: "max-w-sm",
  },
  medium: {
    default: "w-[95%] max-w-2xl",
    side: "w-[50%]",
    float: "max-w-md",
  },
  large: {
    default: "w-[95%] max-w-5xl",
    side: "w-[65%]",
    float: "max-w-lg",
  },
};

function getModalClasses({ variant, size, delayShow, className }) {
  switch (variant) {
    case "side":
      return [
        "h-screen bg-white text-gray-900 px-6 z-[999] py-4 fixed top-0 right-0 flex flex-col items-start transition-all duration-300 ease-out shadow-2xl",
        delayShow ? "translate-x-0" : "translate-x-full",
        SIZE_CLASSES[size].side,
        className,
      ].join(" ");
    case "float":
      return [
        "w-full",
        SIZE_CLASSES[size].float,
        "h-fit max-h-[90vh] overflow-hidden rounded-2xl z-[999] py-4 px-4 fixed top-6 right-6 flex flex-col bg-white shadow-2xl transition-all duration-300 ease-out",
        delayShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        className,
      ].join(" ");
    default:
      return [
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] transition-all duration-300 ease-out",
        delayShow ? "opacity-100 scale-100" : "opacity-0 scale-95",
        SIZE_CLASSES[size].default,
        className,
      ].join(" ");
  }
}

export default function Modal({
  children,
  show,
  title,
  desc,
  variant = "default",
  size = "medium",
  closeModal,
  className = "",
  useText,
  border = false,
  borderColor = "border-slate-200",
}) {
  const [delayShow, setDelayShow] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setDelayShow(true), 100);
      return () => clearTimeout(timer);
    }
    setDelayShow(false);
  }, [show]);

  const ref = useClickOutside(closeModal, show);

  // Memoize modal classes for performance
  const modalClasses = useMemo(
    () => getModalClasses({ variant, size, delayShow, className }),
    [variant, size, delayShow, className]
  );

  // Memoize ModalHeader props
  const modalHeaderProps = useMemo(
    () => ({
      title,
      desc,
      closeModal,
      ...(variant === "side" && { isSideModal: true }),
      useText,
      border,
      borderColor,
    }),
    [title, desc, closeModal, variant, useText, border, borderColor]
  );

  // Memoize modal content for children
  const modalContent = useMemo(() => {
    switch (variant) {
      case "side":
        return (
          <div className={modalClasses} ref={ref}>
            <ModalHeader {...modalHeaderProps} />
            <div className="w-full flex-1 overflow-y-auto py-4 modal-scrollbar">
              {children}
            </div>
          </div>
        );
      case "float":
        return (
          <div className={modalClasses} ref={ref}>
            <ModalHeader {...modalHeaderProps} />
            <div className="w-full flex-1 overflow-y-auto py-2 modal-scrollbar">
              {children}
            </div>
          </div>
        );
      default:
        return (
          <div className={modalClasses} ref={ref}>
            <div className="w-full h-full bg-white text-gray-900 px-6 py-6 flex flex-col gap-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
              <ModalHeader {...modalHeaderProps} />
              <div className="w-full flex-1 overflow-y-auto modal-scrollbar">
                {children}
              </div>
            </div>
          </div>
        );
    }
  }, [variant, modalClasses, ref, modalHeaderProps, children]);

  // Don't render anything if show is false
  if (!show) {
    return null;
  }

  return (
    <Fragment>
      <Backdrop show={show} onClose={closeModal} />
      {modalContent}
    </Fragment>
  );
}

/**
 * How to use the Modal component:
 *
 * Example:
 *
 * import Modal from './modal';
 * import { useState } from 'react';
 *
 * function Example() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>
 *         Open Modal
 *       </button>
 *       <Modal
 *         show={open}
 *         closeModal={() => setOpen(false)}
 *         title="Modal Title"
 *         desc="Optional description for your modal."
 *         border={true}
 *         borderColor="border-red-500"
 *       >
 *         <div>
 *           Your modal content goes here.
 *         </div>
 *       </Modal>
 *     </>
 *   );
 * }
 *
 * Props:
 * - show: boolean (controls modal visibility)
 * - closeModal: function (called to close the modal)
 * - title: string (modal header title)
 * - desc?: string (optional description)
 * - size?: 'small' | 'medium' | 'large' (optional, default 'medium')
 * - variant?: 'default' | 'side' | 'float' (optional, default 'default')
 * - className?: string (optional, extra classes for modal)
 * - useText?: boolean (optional, use text instead of icon for close button)
 * - border?: boolean (optional, show border bottom in header, default false)
 * - borderColor?: string (optional, border bottom color class, default 'border-slate-200')
 * - children: React.ReactNode (modal content)
 */
