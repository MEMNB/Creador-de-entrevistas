import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, Server, Code } from "lucide-react";

type JobType = "frontend" | "backend" | "fullstack";

interface JobSelectionProps {
  onSelect: (job: JobType) => void;
}

const JobSelection = ({ onSelect }: JobSelectionProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("frontend")}>
        <div className="text-center space-y-4">
          <Code2 className="w-12 h-12 mx-auto text-blue-500" />
          <h2 className="text-2xl font-semibold">Frontend</h2>
          <p className="text-gray-600">Desarrollo de interfaces y experiencia de usuario</p>
          <Button className="w-full">Seleccionar Frontend</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("backend")}>
        <div className="text-center space-y-4">
          <Server className="w-12 h-12 mx-auto text-green-500" />
          <h2 className="text-2xl font-semibold">Backend</h2>
          <p className="text-gray-600">Desarrollo de servidores y lógica de negocio</p>
          <Button className="w-full">Seleccionar Backend</Button>
        </div>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect("fullstack")}>
        <div className="text-center space-y-4">
          <Code className="w-12 h-12 mx-auto text-purple-500" />
          <h2 className="text-2xl font-semibold">Fullstack</h2>
          <p className="text-gray-600">Desarrollo completo frontend y backend</p>
          <Button className="w-full">Seleccionar Fullstack</Button>
        </div>
      </Card>
    </div>
  );
};

export default JobSelection;