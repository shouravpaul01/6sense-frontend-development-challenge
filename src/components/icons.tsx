import { SVGProps } from "react";
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const AddIcon = ({ size = 36, width, height, ...props }:IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      viewBox="0 -960 960 960"
      {...props}
      fill="#1f1f1f"
    >
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
    </svg>
  );
};

export const DeleteIcon = ({ size = 36, width, height, ...props }:IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || height}
      width={size || width}
      viewBox="0 -960 960 960"
      {...props}
      fill="#1f1f1f"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
};
