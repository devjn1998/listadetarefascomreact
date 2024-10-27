import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../Title";

const TaskPage = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-6 ">
        <div className="text-3xl text-slate-100 font-bold flex justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-0 left-0 bottom-0 top-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <Title>Gerenciador de tarefas</Title>
        </div>
        <div className="bg-slate-300 p-6 rounded-md">
          <h1 className="text-2xl text-slate-700 font-bold">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
