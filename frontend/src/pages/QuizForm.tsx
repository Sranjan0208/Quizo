import { useState } from "react";
import { createQuiz } from "@/api/quizzes";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createQuiz({ title, description });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
      <Card className="w-96 bg-slate-900/90 backdrop-blur-xl border border-slate-800">
        <CardHeader>
          <CardTitle className="text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Create New Quiz
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Create Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
