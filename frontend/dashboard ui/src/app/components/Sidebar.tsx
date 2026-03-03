import { 
  LayoutGrid, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Wallet, 
  Home, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  Menu,
  Leaf
} from "lucide-react";
import { cn } from "./ui/utils";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const navGroups = [
    {
      title: "DASHBOARD",
      items: [
        { icon: LayoutGrid, label: "Overview", active: true, badge: null },
        { icon: Calendar, label: "Schedule", active: false, badge: null },
        { icon: Users, label: "Customer", active: false, badge: null },
      ],
    },
    {
      title: "ANALYTICAL",
      items: [
        { icon: ArrowLeftRight, label: "Transaction", active: false, badge: "12" },
        { icon: Wallet, label: "Wallet", active: false, badge: null },
      ],
    },
    {
      title: "PRODUCTS",
      items: [
        { icon: Home, label: "Showroom", active: false, badge: null },
        { icon: MessageSquare, label: "Feedback", active: false, badge: "9" },
      ],
    },
    {
      title: "SECURITY AND PRIVACY",
      items: [
        { icon: HelpCircle, label: "Help Center", active: false, badge: null },
        { icon: Settings, label: "Settings", active: false, badge: null },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="text-green-700 text-2xl">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xl font-normal text-gray-900">Carpo</span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          <div className="space-y-6">
            {navGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="px-2 text-xs font-normal text-gray-400 uppercase tracking-wider">
                  {group.title}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors",
                        item.active
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-green-700 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
