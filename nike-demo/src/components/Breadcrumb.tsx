interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="container mx-auto px-4 py-2 text-xs">
      <div className="flex items-center gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-500">/</span>}
            {item.active ? (
              <span className="font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-black hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
