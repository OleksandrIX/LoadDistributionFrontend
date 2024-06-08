import {createIcon} from "@chakra-ui/react";

export const WorkloadIcon = createIcon({
    displayName: "WorkloadIcon",
    viewBox: "0 0 48 48",
    defaultProps: {
        fill: "none"
    },
    path: [
        <path
            d="M34 24L18 24"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />,
        <path
            d="M24 18L18 24L24 30"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />,
        <circle cx="38" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="4"/>,
        <path
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            d="M40.706 13C39.9214 11.8109 39.0133 10.7105 38 9.71713C34.3925 6.18064 29.4509 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C29.4509 44 34.3925 41.8194 38 38.2829C39.0133 37.2895 39.9214 36.1891 40.706 35"
        />
    ]
});
