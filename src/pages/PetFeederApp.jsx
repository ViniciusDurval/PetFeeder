import { useEffect, useState, useRef } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Modal from "../components/Modal";
import { Clock, Utensils, History, Trash2, Loader } from "lucide-react";

export default function PetFeederApp() {
  const [amountPerCent, setAmountPerCent] = useState(100);
  const [schedules, setSchedules] = useState(["08:00", "12:00", "18:00"]);
  const [schedulesHistory, setSchedulesHistory] = useState([]);
  const [newSchedule, setNewSchedule] = useState("");
  const [modalType, setModalType] = useState(null); // "confirmRemoveTime" | "history" | null
  const [removedTime, setRemovedTime] = useState(null);
  const [isFeeding, setIsFeeding] = useState(false);
  // Confirmação da Liberação da Ração
  const [showPopup, setShowPopup] = useState(false);
  const [hidePopup, setHidePopup] = useState(false);

  // Adiciona um horário programado para liberar a ração
  const addSchedule = () => {
    if (newSchedule && !schedules.includes(newSchedule)) {
      setSchedules([...schedules, newSchedule]);
      setNewSchedule("");
    }
  }

  // Remove um horário programado
  const removeSchedule = (timeToRemove, confirm, type) => {
    setRemovedTime(timeToRemove);
    if (confirm) {
      if (type == "history") {
        setSchedulesHistory(schedulesHistory.filter((time, index) => index !== timeToRemove));
      }
      else {
        setSchedules(schedules.filter(time => time !== removedTime));
        setModalType(null);
      }

      return;
    }

    setModalType("confirmRemoveTime");
  }

  const feedReleaseHistory = () => {
    // sempre que liberar a ração pega o hórario que foi liberado
    const time = new Date();
    const timeReleased = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSchedulesHistory([...schedulesHistory, timeReleased]);
  }

  // Liberando conforme o hórario
  const alertedTime = useRef([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

      if(schedules.includes(formatTime) && !alertedTime.current.includes(formatTime)){
        feedRelease();
        alertedTime.current.push(formatTime);
      }

    },1000 *10); //Checa de 10 em 10 segundos

    return () => clearInterval(interval);
  },[schedules]);

  // Simulando a liberação da ração
  const feedRelease = () => {
    if (amountPerCent > 0) {
      // mandar(ia) o sinal pra o arduino liberar ;-;
      //...

      // Registra o horário da liberação da ração
      feedReleaseHistory();

      // Indisponibiliza o btn por alguns segundos pra evitar multiplos clicks de uma vez
      setIsFeeding(true);
      setTimeout(() => {
        setIsFeeding(false);
        setShowPopup(true);
        setHidePopup(false);
        amountPerCent > 12 ? setAmountPerCent(amountPerCent - 12) : setAmountPerCent(0)

        setTimeout(() => {
          setHidePopup(true); // dispara animação de saída

          setTimeout(() => {
            setShowPopup(false);
            setHidePopup(false);
          }, 500); // Tempo da animação de saída
        }, 3000); // Tempo que o popup fica visível
      }, 3500); // Tempo da simulação de liberação da ração
    };
  }

  return (
    <>
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center transition-colors duration-500, ease-in-out">
        <h1 className="dark:text-white text-black text-2xl font-bold mb-4">Dispenser de Ração</h1>

        <Card className="w-full max-w-md">
          <CardContent>
            <Utensils size={48} className="text-yellow-500 mb-2" />
            <p className="text-lg">Ração disponível: <span className="font-bold">{amountPerCent}%</span></p>
            <Button className="mt-4" onClick={feedRelease} disable={isFeeding}>
              {isFeeding ? <Loader className="animate-spin" /> : "Liberar Ração"}
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full max-w-md mt-4">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <Clock size={20} />
              <h2 className="text-lg font-semibold">Horários Programados</h2>
            </div>
            <ul className="list-disc pl-5 p-2">
              {schedules.map((time, index) => (
                <div key={index} className="flex justify-between">
                  <li className="dark:text-gray-200 text-gray-700">{time}</li>
                  <Button variant="ghost" onClick={() => removeSchedule(time, false)}>
                    <Trash2 className="text-gray-700 dark:text-white" size={16} />
                  </Button>
                </div>
              ))}
            </ul>
            <div className="flex mt-4 space-x-2">
              <input
                type="time"
                value={newSchedule}
                onChange={(e) => setNewSchedule(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white transition-colors duration-500 ease-in-out"
              />
              <Button variant="outline" onClick={addSchedule}>Adicionar</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4 mt-6">
          <Button variant="ghost" onClick={() => setModalType("history")}>
            <History size={24} />
          </Button>
        </div>

        <Modal
          isOpen={modalType !== null}
          type={modalType}
          onClose={() => setModalType(null)}
          onConfirm={() => removeSchedule(removedTime, true)}
          setSchedulesHistory={setSchedulesHistory}
        >
          {modalType === "confirmRemoveTime" && (
            <p className="dark:text-white">Tem certeza que deseja excluir o horário {removedTime}?</p>
          )}

          {modalType === "history" && (
            <ul>
              {schedulesHistory.length > 0 ? (
                schedulesHistory.map((time, index) => (
                  <div key={index} className="flex justify-between">
                    <li className="dark:text-white">{time}</li>
                    <Button variant="ghost" onClick={() => removeSchedule(index, true, "history")}>
                      <Trash2 className="text-gray-700 dark:text-white" size={16} />
                    </Button>
                  </div>
                ))
              ) : (
                <li className="dark:text-white">Nenhum registro ainda.</li>
              )}
            </ul>
          )}
        </Modal>

        {showPopup && (
          <div className={`fixed top-20 right-4 ${amountPerCent > 0 ? "bg-green-500" : "bg-red-500"} text-white px-4 py-4 rounded-lg shadow-lg ${hidePopup ? "animate-slide-out" : "animate-slide-in"}`}>
            {amountPerCent > 0 ? <span>Ração liberada com sucesso!</span> : <span>Ração insuficiente!</span>}
          </div>
        )}

      </div>
    </>
  );
}
