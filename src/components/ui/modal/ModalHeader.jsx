import { Icon } from "@iconify/react";
import { Fragment } from "react";

export default function ModalHeader({
  title,
  desc,
  isSideModal = false,
  closeModal,
  useText,
  border = false,
  borderColor = "border-slate-200",
}) {
  // Build border classes based on props
  const borderClass = border ? `border-b ${borderColor}` : "";

  return (
    <Fragment>
      {isSideModal ? (
        <div
          className={`w-full py-3 flex items-center justify-between ${borderClass}`}
        >
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}
          </div>

          <button
            className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-gray-100"
            onClick={closeModal}
            aria-label="Close modal"
          >
            {!useText ? (
              <Icon icon="mdi:close" width={20} />
            ) : (
              <span className="border border-gray-300 rounded-full px-3 py-1 text-gray-700 text-sm font-medium">
                Close
              </span>
            )}
          </button>
        </div>
      ) : (
        <header className={`flex items-start justify-between ${borderClass}`}>
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {desc && (
              <p className="text-sm text-gray-600 mt-1 max-w-md">{desc}</p>
            )}
          </div>

          <button
            className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-gray-100"
            onClick={closeModal}
            aria-label="Close modal"
          >
            {!useText ? (
              <Icon icon="akar-icons:circle-x-fill" width={20} />
            ) : (
              <span className="border border-gray-300 rounded-full px-3 py-1 text-gray-700 text-sm font-medium">
                Close
              </span>
            )}
          </button>
        </header>
      )}
    </Fragment>
  );
}
