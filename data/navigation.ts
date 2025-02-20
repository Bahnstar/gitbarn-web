import {
  ChatBubbleLeftEllipsisIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  TruckIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingCartIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Orders", href: "/orders", icon: TruckIcon },
  { name: "Products", href: "/products", icon: BuildingStorefrontIcon },
  { name: "Support", href: "/support", icon: ChatBubbleLeftEllipsisIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Documents", href: "/documents", icon: DocumentDuplicateIcon },
  { name: "Cart", href: "/cart", icon: ShoppingCartIcon },
  { name: "Users", href: "/users", icon: UserIcon, role: "support" },
]

export default navigation
