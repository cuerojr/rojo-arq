export const brandVariants = {
    hidden: {
        opacity: 0,
        fill: "rgba(29, 29, 29, 0)",
        x: -3
    },
    visible: {
        opacity: 1,
        fill: "rgba(29, 29, 29, 1)",
        x: 0,
        transition: {
        default: {
            duration: 1,
            ease: "easeInOut"
        }
        }
    }
};