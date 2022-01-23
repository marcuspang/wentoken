import { Icon, IconProps } from "@chakra-ui/react";

const LogoIcon = ({ ...props }: IconProps) => {
  return (
    <Icon
      viewBox="0 0 88 88"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#prefix__filter0_d_43_1342)">
        <path
          d="M14 41l28.465-28.465a5 5 0 017.07 0L78 41 49.535 69.465a5 5 0 01-7.07 0L14 41z"
          fill="#000"
        />
      </g>
      <path
        d="M30.245 41.244L42.71 28.78a5 5 0 017.071 0l12.465 12.464-12.465 12.464a5 5 0 01-7.071 0L30.245 41.244z"
        fill="#fff"
      />
      <defs>
        <filter
          id="prefix__filter0_d_43_1342"
          x="0"
          y=".071"
          width="92"
          height="87.858"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_43_1342"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.525 0 0 0 0 0.525 0 0 0 0 0.525 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_43_1342"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_43_1342"
            result="shape"
          />
        </filter>
      </defs>
    </Icon>
  );
};

export default LogoIcon;
