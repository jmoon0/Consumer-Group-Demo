import { Heart, Lightbulb, Search, ShoppingBag, Sparkles } from "lucide-react";
import { useState } from "react";
import ChatModal from "@/components/ChatModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (query: string) => void;
  onChat: (ids: number[]) => void;
}

export default function Header({ onSearch, onChat }: HeaderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <>
      {/* Top Navigation */}
      <div className="bg-gray-100 py-2 text-xs">
        <div className="container mx-auto flex justify-between px-4">
          <div className="flex items-center gap-4">
            <img
              src="\Logo_NIKE.svg.svg"
              alt="Nike Logo"
              width={30}
              height={30}
            />
            <a href="#" className="text-black hover:underline">
              Find a Store
            </a>
            <span>|</span>
            <a href="#" className="text-black hover:underline">
              Help
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-black hover:underline">
              Join Us
            </a>
            <span>|</span>
            <a href="#" className="text-black hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-10 bg-white py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <a href="/" className="flex-shrink-0">
              <img
                src="\Logo_NIKE.svg.svg"
                alt="Nike Logo"
                width={70}
                height={70}
              />
            </a>
            <nav className="hidden lg:block">
              <ul className="flex gap-6 font-medium">
                <li>
                  <a href="#" className="hover:text-gray-500">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500">
                    Kids
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500">
                    Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-500">
                    SNKRS
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="icon" className="rounded-full">
              
              <Lightbulb className="size-6" />
              
            </Button> */}
            <Button
              variant="ghost"
              onClick={() => setIsChatOpen(true)}
              className="border-2 border-black rounded-full px-4 py-2 flex items-center gap-2 bg-gradient-to-r from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 transition-colors duration-150 ease-in-out shadow-sm" // <-- Modified classes
            >
              <span className="text-sm font-medium">SmartAssist</span>
              <Lightbulb className="size-5" />
            </Button>
            <div className="relative hidden md:block">
              <form
                onSubmit={handleSubmit}
                className="flex h-10 w-70 items-center rounded-full px-4 bg-gradient-to-r from-gray-50 to-gray-200 shadow-sm" // <-- Modified classes
              >
                <Search className="mr-2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="AI-Powered Search"
                  value={query}
                  onChange={handleSearch}
                  // Ensure Input background is transparent so form gradient shows
                  className="h-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-500" // <-- Added placeholder color
                />
                <Sparkles className="ml-2 h-4 w-4 text-gray-500" />{" "}
                {/* Added ml-2 for spacing */}
              </form>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      {isChatOpen && (
        <ChatModal onClose={() => setIsChatOpen(false)} onChat={onChat} />
      )}
    </>
  );
}
