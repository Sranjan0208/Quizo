import { Button } from "@/components/ui/button";
import { logout } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Quizo
        </h1>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}
