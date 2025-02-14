import { useEffect, useState } from "react";
import { getQuizzes, deleteQuiz, updateQuiz } from "@/api/quizzes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

type Quiz = {
  id: string;
  title: string;
  description: string;
};

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    }
  };

  const handleEditClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setEditTitle(quiz.title);
    setEditDescription(quiz.description);
    setOpenDialogId(quiz.id);
  };

  const handleUpdate = async () => {
    if (selectedQuiz) {
      try {
        await updateQuiz(selectedQuiz.id, {
          title: editTitle,
          description: editDescription,
        });
        await fetchQuizzes();
        setOpenDialogId(null);
      } catch (error) {
        console.error("Failed to update quiz:", error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteQuiz(id);
      fetchQuizzes();
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Your Quizzes
          </h2>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            onClick={() => navigate("/create")}
          >
            + Create New Quiz
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {quiz.title}
              </h3>
              <p className="text-slate-400 mb-4">{quiz.description}</p>
              <div className="flex justify-between gap-4">
                <Dialog
                  open={openDialogId === quiz.id}
                  onOpenChange={(isOpen) =>
                    setOpenDialogId(isOpen ? quiz.id : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                      onClick={() => handleEditClick(quiz)}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white border-none">
                    <DialogHeader>
                      <DialogTitle>Edit Quiz</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="bg-white/20 text-white placeholder-gray-300"
                    />
                    <Input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-white/20 text-white placeholder-gray-300"
                    />
                    <Button
                      onClick={handleUpdate}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Update Quiz
                    </Button>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDelete(quiz.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
