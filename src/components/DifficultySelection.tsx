import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Flame } from "lucide-react";

type Difficulty = "easy" | "medium" | "hard";

interface DifficultySelectionProps {
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelection = ({ onSelect }: DifficultySelectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("easy")}>
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 mx-auto text-green-500" />
          <h2 className="text-2xl font-semibold">Fácil</h2>
          <p className="text-gray-600">Preguntas básicas para principiantes</p>
          <Button variant="outline" className="w-full">Nivel Fácil</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("medium")}>
        <div className="text-center space-y-4">
          <Zap className="w-12 h-12 mx-auto text-yellow-500" />
          <h2 className="text-2xl font-semibold">Medio</h2>
          <p className="text-gray-600">Preguntas para desarrolladores intermedios</p>
          <Button variant="outline" className="w-full">Nivel Medio</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("hard")}>
        <div className="text-center space-y-4">
          <Flame className="w-12 h-12 mx-auto text-red-500" />
          <h2 className="text-2xl font-semibold">Difícil</h2>
          <p className="text-gray-600">Preguntas avanzadas para expertos</p>
          <Button variant="outline" className="w-full">Nivel Difícil</Button>
        </div>
      </Card>
    </div>
  );
};

export default DifficultySelection;