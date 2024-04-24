import {
    ChatBubbleLeftEllipsisIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    TruckIcon,
    HomeIcon,
} from "@heroicons/react/24/outline"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Orders", href: "/orders", icon: TruckIcon },
    { name: "Support", href: "/support", icon: ChatBubbleLeftEllipsisIcon },
    { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
    { name: "Reports", href: "/reports", icon: ChartPieIcon },
]

export default navigation