export const socialBtnVariants = {
    hidden: {
        opacity: 0,
        fill: "rgba(29, 29, 29, 0)",
        y: 5
    },
    visible: {
        opacity: 1,
        fill: "rgba(29, 29, 29, 1)",
        y: 0,
        transition: {
        default: {
                duration: 0.7,
                ease: "easeInOut"
            }
        }
    }
};