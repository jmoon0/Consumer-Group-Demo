export default function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 font-bold uppercase">Featured</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Air Force 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Jordan 1
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Metcon
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Air Max
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold uppercase">Shop By Sport</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Running
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Basketball
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Soccer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Training
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold uppercase">About Nike</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold uppercase">Get Help</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Order Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
