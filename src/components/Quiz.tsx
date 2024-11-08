import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { generateQuestions } from "@/services/openai";
import { useQuery } from "@tanstack/react-query";

interface QuizProps {
  jobType: string;
  difficulty: string;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Quiz = ({ jobType, difficulty }: QuizProps) => {
  const [currentAnswers, setCurrentAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const { data: questions, isLoading, error } = useQuery({
    queryKey: ['questions', jobType, difficulty],
    queryFn: () => generateQuestions(jobType, difficulty),
  });

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    if (!questions) return;
    
    if (Object.keys(currentAnswers).length < questions.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor responde todas las preguntas antes de validar",
      });
      return;
    }

    setShowResults(true);
    const correctAnswers = questions.reduce((acc, q, index) => {
      return currentAnswers[index] === q.correctAnswer ? acc + 1 : acc;
    }, 0);

    toast({
      title: "¡Quiz completado!",
      description: `Has acertado ${correctAnswers} de ${questions.length} preguntas`,
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg">Generando preguntas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error al generar las preguntas. Por favor, intenta de nuevo.</p>
      </div>
    );
  }

  if (!questions) return null;

  return (
    <div className="space-y-8">
      {questions.map((question, index) => (
        <Card key={index} className="bg-gray-200 shadow-lg border border-gray-200 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">{index + 1}. {question.question}</h3>
          <RadioGroup
            onValueChange={(value) => handleAnswerSelect(index, value)}
            value={currentAnswers[index]}
          >
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <div 
                  className={`h-5 w-5 border-2 rounded cursor-pointer flex items-center justify-center ${currentAnswers[index] === option ? 'bg-blue-500' : 'bg-white'}`} 
                  onClick={() => handleAnswerSelect(index, option)}
                >
                  {currentAnswers[index] === option && <div className="h-3 w-3 bg-white rounded-full" />}
                </div>
                <RadioGroupItem 
                  value={option} 
                  id={`q${index}-${optionIndex}`} 
                  className="hidden"
                />
                <Label htmlFor={`q${index}-${optionIndex}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          {showResults && (
            <div className={`mt-4 p-2 rounded ${
              currentAnswers[index] === question.correctAnswer
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}>
              {currentAnswers[index] === question.correctAnswer
                ? "¡Correcto!"
                : `Incorrecto. La respuesta correcta era: ${question.correctAnswer}`}
            </div>
          )}
        </Card>
      ))}
      
      {!showResults && (
        <div className="text-center">
          <Button onClick={handleSubmit} size="lg">
            Validar Respuestas
          </Button>
        </div>
      )}

    </div>
  );
};

export default Quiz;