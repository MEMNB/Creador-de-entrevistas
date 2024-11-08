import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import JobSelection from "@/components/JobSelection";
import DifficultySelection from "@/components/DifficultySelection";
import Quiz from "@/components/Quiz";
import { toast } from "@/components/ui/use-toast";

type JobType = "frontend" | "backend" | "fullstack" | "";
type Difficulty = "easy" | "medium" | "hard" | "";

const Index = () => {
  const [jobType, setJobType] = useState<JobType>("");
  const [difficulty, setDifficulty] = useState<Difficulty>("");
  const [quizStarted, setQuizStarted] = useState(false);

  const handleJobSelect = (job: JobType) => {
    setJobType(job);
    toast({
      title: "Trabajo seleccionado",
      description: `Has elegido: ${job}`,
    });
  };

  const handleDifficultySelect = (diff: Difficulty) => {
    setDifficulty(diff);
    setQuizStarted(true);
    toast({
      title: "Nivel seleccionado",
      description: `Has elegido nivel: ${diff}`,
    });
  };

  const resetQuiz = () => {
    setJobType("");
    setDifficulty("");
    setQuizStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Práctica de Entrevista Técnica
        </h1>
        
        {!jobType && <JobSelection onSelect={handleJobSelect} />}
        
        {jobType && !difficulty && (
          <DifficultySelection onSelect={handleDifficultySelect} />
        )}
        
        {quizStarted && (
          <>
            <Quiz jobType={jobType} difficulty={difficulty} />
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={resetQuiz}>
                Reiniciar Quiz
              </Button>
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                Volver a la página principal
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;