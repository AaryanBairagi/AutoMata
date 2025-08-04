import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import React from "react";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";

type Props = {
    title: string;
    subheading: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

const CustomModal = ({ children, subheading, title }: Props) => {
    const { isOpen, setClose } = useModal();
    const handleClose = () => setClose();

return (
    <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent className="mx-auto w-full bg-background/80 backdrop-blur-lg shadow-xl border-1 border-white/20 rounded-xl">
        {/* Header */}
        <DrawerHeader className="pt-6 px-6">
            <DrawerTitle className="text-2xl font-semibold text-center text-white">
                {title}
            </DrawerTitle>
            <DrawerDescription className="text-center text-muted-foreground mt-2">
                {subheading}
            </DrawerDescription>
        </DrawerHeader>

        {/* Body */}
        <div className="flex flex-col items-center px-6 pb-4">
            <div className="w-full max-w-xl">{children}</div>
        </div>

        {/* Footer */}
        <DrawerFooter className="px-6 pb-6 pt-2 border-t border-white/10">
            <DrawerClose>
                <Button onClick={handleClose} className="w-[160px] mx-auto bg-red-700 border-0.5 border-white text-foreground hover:bg-red-700/40">
                Close
                </Button>
            </DrawerClose>
        </DrawerFooter>
        </DrawerContent>
    </Drawer>
);
};

export default CustomModal;









// import {
//     Drawer,
//     DrawerClose,
//     DrawerContent,
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader,
//     DrawerTitle,
// } from "@/components/ui/drawer";

// import React from "react";
// import { useModal } from "@/providers/modal-provider";
// import { Button } from "../ui/button";



// type Props = {
//     title: string
//     subheading : string 
//     children : React.ReactNode
//     defaultOpen?: boolean
// }

// const CustomModal = ({children,subheading,title,defaultOpen}:Props) => {
//     const { isOpen , setClose } = useModal();
//     const handleClose = () => setClose();
//     return(
//     <Drawer open={isOpen} onClose={handleClose}>
//         <DrawerContent>
//             <DrawerHeader>
//                 <DrawerTitle className="text-center">{title}</DrawerTitle>
//                 <DrawerDescription className="text-center flex flex-col items-center gap-4 h-96">
//                     {subheading}
//                     {children}
//                 </DrawerDescription>
//             </DrawerHeader>
//             <DrawerFooter className="flex flex-col gap-4 bg-background border-t-[1px] border-t-muted">
//                 <DrawerClose>
//                     <Button className="w- border-1 rounded-xl bg-white text-black shadow-md hover:bg-white/40" variant="ghost" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </DrawerClose>
//             </DrawerFooter>
//         </DrawerContent>
//     </Drawer>
//     )
// }

// export default CustomModal